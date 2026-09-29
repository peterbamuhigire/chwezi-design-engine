"""Check that representative prompts retrieve the expected design skill.

Tier 2 routing proxy (lexical; not live routing — see addyosmani/agent-skills issue #620).

Modes and flags:
  (default)          positives must place the expected skill in the top three; owned
                     negatives must pass; exit 1 on any failure.
  --min-rank1 PCT    also fail when precision@1 falls below PCT (ratchet floor, M10-03-T11).
  --lint-fixtures    also fail when a prompt contains its expected slug or copies the
                     expected description (word-trigram overlap >= 0.6) (M10-03-T05).
  --fixtures PATH    alternative fixture file (used by the unit tests).

Negative semantics (M10-03-T06, adapted from addyosmani/agent-skills, MIT,
https://github.com/addyosmani/agent-skills, commit 2686b62, scripts/run-evals.js; paraphrased):
a negative belongs to its fixture's expected skill. It passes when that skill is not rank 1
(or scores 0) and, if an ``owner`` is named, the owner ranks strictly above it with a
score above 0. An owner written ``<engine-id>/<skill>`` lives in another engine and is
reported NOT_ASSESSED here; the portfolio union check evaluates it.
"""

from __future__ import annotations

import argparse
import math
import re
import sys
from collections import Counter
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_FIXTURES = ROOT / "tests" / "routing-fixtures.yml"
TRIGRAM_LIMIT = 0.6

# --- vendored ranker core -------------------------------------------------------------
# vendored from chwezi-dev-engine/scripts/routing_smoke_test.py @ 317b4755d2cfd96dde0c1ec42de9d87687940312
# sha256: 92b106e5d8d6c07dcd107bb8119356a19e50fdd54b993c897887e1cae8bac372
# Copied unchanged: STOPWORDS, TOKEN_RE, tokenize, build_index, cosine, rank. Engines stay
# independent (no cross-repo import); the M10-02 drift register records this pair so a later
# divergence is detected. Local change outside this block: signals are keyed by frontmatter name.
TOKEN_RE = re.compile(r"[a-z0-9]+")

STOPWORDS = {
    "use", "when", "the", "a", "an", "and", "or", "for", "to", "of", "in", "on",
    "with", "this", "that", "is", "are", "be", "by", "as", "it", "its", "at",
    "from", "into", "across", "before", "after", "any", "all", "not", "no",
    "skill", "skills", "apply", "applies", "need", "needs", "needed", "work",
    "working", "rather", "than", "your", "you", "they", "them", "build",
    "building", "create", "creating", "make", "making", "design", "designing",
    "implement", "implementing", "should", "must", "can", "via", "per", "if",
}


def tokenize(text: str) -> list[str]:
    return [t for t in TOKEN_RE.findall(text.lower()) if t not in STOPWORDS and len(t) > 2]


def build_index(signals: dict[str, str]):
    docs = {slug: Counter(tokenize(text)) for slug, text in signals.items()}
    df: Counter = Counter()
    for counts in docs.values():
        df.update(counts.keys())
    n = len(docs)
    idf = {term: math.log((n + 1) / (freq + 1)) + 1 for term, freq in df.items()}

    def vec(counts: Counter) -> dict[str, float]:
        return {t: c * idf.get(t, math.log(n + 1) + 1) for t, c in counts.items()}

    vectors = {slug: vec(counts) for slug, counts in docs.items()}
    return vectors, idf, vec


def cosine(a: dict[str, float], b: dict[str, float]) -> float:
    if not a or not b:
        return 0.0
    common = set(a) & set(b)
    dot = sum(a[t] * b[t] for t in common)
    na = math.sqrt(sum(v * v for v in a.values()))
    nb = math.sqrt(sum(v * v for v in b.values()))
    return dot / (na * nb) if na and nb else 0.0


def rank(task: str, vectors, vec) -> list[tuple[str, float]]:
    q = vec(Counter(tokenize(task)))
    scored = [(slug, cosine(q, v)) for slug, v in vectors.items()]
    scored.sort(key=lambda kv: kv[1], reverse=True)
    return scored
# --- end vendored ranker core ---------------------------------------------------------


def descriptions(root: Path) -> dict[str, str]:
    found: dict[str, str] = {}
    for path in root.glob("skills/**/SKILL.md"):
        if "_TEMPLATE" in path.parts:
            continue
        text = path.read_text(encoding="utf-8")
        match = re.match(r"^---\s*\n(.*?)\n---", text, re.S)
        if not match:
            continue
        data = yaml.safe_load(match.group(1)) or {}
        if data.get("name") and data.get("description"):
            found[str(data["name"])] = " ".join(str(data["description"]).split())
    return found


def signals_for(catalog: dict[str, str]) -> dict[str, str]:
    # Weight the name, as the dev ranker does: it is the strongest routing token.
    return {name: f"{name} {name} {desc}" for name, desc in catalog.items()}


def word_trigrams(text: str) -> set[tuple[str, ...]]:
    words = re.findall(r"[a-z0-9]+", text.lower())
    return {tuple(words[i : i + 3]) for i in range(len(words) - 2)}


def lint_prompt(prompt: str, slug: str, description: str) -> list[str]:
    findings: list[str] = []
    normal = " " + re.sub(r"[^a-z0-9]+", " ", prompt.lower()).strip() + " "
    phrase = re.sub(r"^\d+-", "", slug.lower()).replace("-", " ").strip()
    if phrase and f" {phrase} " in normal:
        findings.append(f"slug-in-prompt '{phrase}'")
    grams = word_trigrams(prompt)
    if grams:
        overlap = len(grams & word_trigrams(description)) / len(grams)
        if overlap >= TRIGRAM_LIMIT:
            findings.append(f"description-copy trigram overlap {overlap:.2f}")
    return findings


def evaluate(fixtures: list[dict], catalog: dict[str, str]) -> dict:
    vectors, _idf, vec = build_index(signals_for(catalog))
    top1 = top3 = 0
    failures: list[str] = []
    negatives = negatives_passed = 0
    not_assessed: list[str] = []
    for item in fixtures:
        expected = item["expected"]
        if expected not in catalog:
            failures.append(f"FIXTURE ERROR expected skill missing: {expected}")
            continue
        ranked = rank(item["prompt"], vectors, vec)
        order = [name for name, _ in ranked]
        position = order.index(expected) + 1
        top1 += position == 1
        top3 += position <= 3
        if position > 3:
            failures.append(f"FAIL expected={expected} rank={position} actual={order[:3]} prompt={item['prompt']}")
        for negative in item.get("negatives") or []:
            owner = negative.get("owner")
            if owner and "/" in owner:
                not_assessed.append(f"{expected} vs {owner}: cross-engine owner (union check)")
                continue
            negatives += 1
            neg_ranked = rank(negative["prompt"], vectors, vec)
            neg_order = [name for name, _ in neg_ranked]
            neg_scores = dict(neg_ranked)
            self_score = neg_scores[expected]
            problems = []
            if neg_order[0] == expected and self_score > 0:
                problems.append("skill ranks first")
            if owner:
                if owner not in neg_scores:
                    problems.append(f"owner {owner} is not an active skill")
                elif not (neg_scores[owner] > 0 and neg_order.index(owner) < neg_order.index(expected)):
                    problems.append(f"owner {owner} (rank {neg_order.index(owner) + 1}) does not outrank {expected} (rank {neg_order.index(expected) + 1})")
            if problems:
                failures.append(f"NEGATIVE FAIL skill={expected} owner={owner}: {'; '.join(problems)} prompt={negative['prompt']}")
            else:
                negatives_passed += 1
    return {
        "fixtures": len(fixtures),
        "top1": top1,
        "top3": top3,
        "negatives": negatives,
        "negatives_passed": negatives_passed,
        "not_assessed": not_assessed,
        "failures": failures,
    }


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--fixtures", type=Path, default=DEFAULT_FIXTURES)
    parser.add_argument("--min-rank1", type=float, default=None, help="Fail when precision@1 (percent) is below this floor.")
    parser.add_argument("--lint-fixtures", action="store_true", help="Fail on slug-bearing or description-copying prompts.")
    args = parser.parse_args(argv)

    fixtures = yaml.safe_load(args.fixtures.read_text(encoding="utf-8")) or []
    catalog = descriptions(ROOT)
    result = evaluate(fixtures, catalog)
    total = result["fixtures"] or 1
    p1 = 100 * result["top1"] / total
    p3 = 100 * result["top3"] / total
    print(
        f"routing fixtures={result['fixtures']} precision@1={p1:.0f}% precision@3={p3:.0f}% "
        f"owned_negatives={result['negatives_passed']}/{result['negatives']} "
        f"not_assessed={len(result['not_assessed'])} (lexical proxy; not live routing)"
    )
    failures = list(result["failures"])
    if args.lint_fixtures:
        lint = []
        for item in fixtures:
            findings = lint_prompt(item["prompt"], item["expected"], catalog.get(item["expected"], ""))
            lint.extend(f"LINT {item['expected']}: {finding} prompt={item['prompt']}" for finding in findings)
        print(f"fixture lint: {len(lint)} finding(s)")
        failures.extend(lint)
    if args.min_rank1 is not None and p1 < args.min_rank1:
        failures.append(f"RATCHET precision@1 {p1:.1f}% is below the floor {args.min_rank1:g}%")
    for line in failures:
        print(line)
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
