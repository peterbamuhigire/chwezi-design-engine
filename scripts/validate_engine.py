"""Validate design-system-skills structure and prevent quality regression."""

from __future__ import annotations

import argparse
import json
import re
import sys
from collections import Counter
from pathlib import Path

import yaml


ALLOWED_FRONTMATTER = {"name", "description", "license", "allowed-tools", "metadata"}
REQUIRED_HEADINGS = {
    "use when",
    "do not use when",
    "workflow",
    "outputs",
    "anti-patterns",
    "examples",
    "references",
}
PORTABLE_HEADINGS = {"capability contract", "degraded mode", "decision rules"}
ENCODING_NOISE = ("\ufffd", "â€”", "â€“", "â€™", "Ã—", "Â§")
FONT_CATEGORIES = (
    "01-formal-institutional",
    "02-editorial-literary",
    "03-modern-product-grotesque",
    "04-technical-data-code",
    "05-friendly-humanist",
    "06-expressive-display-artistic",
    "07-script-cursive-handwritten",
    "08-body-ui-workhorses",
)


def frontmatter(text: str) -> tuple[dict, str | None]:
    match = re.match(r"^---\s*\n(.*?)\n---\s*\n", text, re.S)
    if not match:
        return {}, "missing or unclosed frontmatter"
    try:
        data = yaml.safe_load(match.group(1)) or {}
    except yaml.YAMLError as exc:
        return {}, f"invalid YAML: {exc.__class__.__name__}"
    return data if isinstance(data, dict) else {}, None


def is_empty_section(text: str, heading: str) -> bool:
    pattern = rf"(?ims)^##\s+{re.escape(heading)}\s*$\n(.*?)(?=^##\s+|\Z)"
    match = re.search(pattern, text)
    if not match:
        return True
    body = re.sub(r"<!--.*?-->", "", match.group(1), flags=re.S).strip()
    return not body


def section_body(text: str, heading_pattern: str) -> str:
    pattern = rf"(?ims)^##\s+(?:{heading_pattern})\s*$\n(.*?)(?=^##\s+|\Z)"
    match = re.search(pattern, text)
    return match.group(1).strip() if match else ""


# Owner rule (copyright): book extractions, book summaries and chapter-by-chapter notes are
# never stored in the repository. Plan and audit documents may name books; they may not
# store, link to or cite extraction material.
EXTRACTION_DIR_NAMES = {"book-extractions", "extracted-books", "book-study", "book-notes"}
EXTRACTION_FILE_SUFFIXES = ("-extraction.md", "-extractions.md")
EXTRACTION_SCAN_TREES = (
    "skills", "doctrine", "docs", "governance", "templates", "prompts", "integration", "engine", "rules",
)
# Files that state the rule itself and therefore must name the forbidden folders.
EXTRACTION_RULE_FILES = {"rules/common/core.md", "governance/skill-authoring-standard.md"}
EXTRACTION_TEXT_PATTERNS = (
    re.compile(r"book-extractions/|extracted-books/|book-study/"),
    re.compile(r"[\w-]+-extractions?\.md"),
    re.compile(r"(?i)\bbook[- ]study\s+\d+"),
    re.compile(r"(?im)^#{1,6}\s+chapter\s+\d+\b"),
)


def scan_book_extractions(root: Path) -> list[str]:
    violations: list[str] = []
    for path in root.rglob("*"):
        rel = path.relative_to(root)
        if ".git" in rel.parts or "node_modules" in rel.parts:
            continue
        if path.is_dir() and path.name.lower() in EXTRACTION_DIR_NAMES:
            violations.append(f"{rel.as_posix()}/ folder present")
        elif path.is_file() and path.name.lower().endswith(EXTRACTION_FILE_SUFFIXES):
            violations.append(f"{rel.as_posix()} extraction file present")
    for sub in EXTRACTION_SCAN_TREES:
        for text_path in (root / sub).rglob("*.md"):
            rel = text_path.relative_to(root).as_posix()
            if rel in EXTRACTION_RULE_FILES:
                continue
            body = text_path.read_text(encoding="utf-8", errors="ignore")
            if any(pattern.search(body) for pattern in EXTRACTION_TEXT_PATTERNS):
                violations.append(f"{rel} links to or cites extraction material")
    return sorted(set(violations))


SLOP_REGISTRY = Path("tools/slop-detector/rules/registry.json")
MARKER_RE = re.compile(r"<!--\s*rule:([^\s>]+)\s*-->")


def heading_slug(heading: str) -> str:
    """GitHub-style anchor slug (matches tools/slop-detector/lib/registry.mjs slugify)."""
    return re.sub(r"\s", "-", re.sub(r"[^\w\s-]", "", heading.strip().lower()))


def scan_slop_registry(root: Path) -> dict:
    """Registry integrity for the chwezi-slop detector (M10-09-T05).

    Every rule's flag/pass fixtures exist, every doctrine_ref file and anchor
    (heading slug or ``rule:<id>`` marker) resolves, and rule IDs are unique.
    """
    path = root / SLOP_REGISTRY
    if not path.is_file():
        return {"slop_rules": 0, "slop_fixtures": 0, "slop_registry_errors": [f"{SLOP_REGISTRY.as_posix()} missing"]}
    errors: list[str] = []
    try:
        rules = json.loads(path.read_text(encoding="utf-8")).get("rules", [])
    except json.JSONDecodeError as error:
        return {"slop_rules": 0, "slop_fixtures": 0, "slop_registry_errors": [f"registry is not valid JSON: {error}"]}
    ids = [rule.get("id") for rule in rules]
    for rule_id, count in Counter(ids).items():
        if count > 1:
            errors.append(f"duplicate rule id {rule_id}")
    docs: dict[Path, tuple[set[str], set[str]]] = {}
    fixtures: set[str] = set()
    for rule in rules:
        rule_id = rule.get("id", "?")
        for key in ("flag", "pass"):
            rel = (rule.get("fixtures") or {}).get(key)
            if not rel or not (root / rel).is_file():
                errors.append(f"{rule_id}: {key} fixture missing ({rel})")
            else:
                fixtures.add(rel)
        ref = rule.get("doctrine_ref", "")
        doc_rel, _, anchor = ref.partition("#")
        doc = root / doc_rel
        if not doc_rel or not doc.is_file():
            errors.append(f"{rule_id}: doctrine_ref file missing ({doc_rel})")
            continue
        if doc not in docs:
            text = doc.read_text(encoding="utf-8")
            slugs = {heading_slug(h) for h in re.findall(r"^#{1,6}\s+(.+?)\s*#*\s*$", text, re.M)}
            docs[doc] = (slugs, set(MARKER_RE.findall(text)))
        slugs, markers = docs[doc]
        ok = anchor[5:] in markers if anchor.startswith("rule:") else anchor in slugs
        if not anchor or not ok:
            errors.append(f"{rule_id}: doctrine_ref anchor #{anchor} not found in {doc_rel}")
    return {"slop_rules": len(rules), "slop_fixtures": len(fixtures), "slop_registry_errors": errors}


# Report-only size warning beside the 500-line cap (M10-04-T07, Caveman CV-06).
# Size warnings never enter failure_counts, so baselines and exit status are unchanged.
DEFAULT_MAX_SKILL_BYTES = 20480


def scan(root: Path, max_skill_bytes: int = DEFAULT_MAX_SKILL_BYTES) -> dict:
    skill_files = [p for p in root.glob("skills/**/SKILL.md") if "_TEMPLATE" not in p.parts]
    findings: list[dict] = []
    names: list[str] = []
    size_warnings: list[dict] = []

    for path in sorted(skill_files):
        text = path.read_text(encoding="utf-8")
        data, yaml_error = frontmatter(text)
        failed: list[str] = []
        if yaml_error:
            failed.append("frontmatter_yaml")
        name = data.get("name")
        description = data.get("description")
        metadata = data.get("metadata") if isinstance(data.get("metadata"), dict) else {}
        if name:
            names.append(str(name))
        if name != path.parent.name:
            failed.append("identity")
        if set(data) - ALLOWED_FRONTMATTER:
            failed.append("frontmatter_keys")
        if not isinstance(description, str) or not description.startswith("Use when") or len(description) > 350:
            failed.append("trigger")
        if metadata.get("portable") is not True or not {"claude-code", "codex"}.issubset(
            set(metadata.get("compatible_with", []))
        ):
            failed.append("portable_metadata")

        headings = {h.strip().lower() for h in re.findall(r"^##\s+(.+?)\s*$", text, re.M)}
        if not REQUIRED_HEADINGS.issubset(headings):
            failed.append("required_sections")
        if not PORTABLE_HEADINGS.issubset(headings):
            failed.append("portable_contracts")
        if not ({"required inputs", "inputs"} & headings):
            failed.append("input_contract")
        input_body = section_body(text, r"Required Inputs|Inputs")
        output_body = section_body(text, "Outputs")
        decision_body = section_body(text, r"Decision Rules")
        anti_body = section_body(text, r"Anti-Patterns(?:\s*\([^\n]+\))?")
        if "|" not in input_body and not re.match(r"(?i)^None\b", input_body.strip()):
            failed.append("input_contract")
        if "|" not in output_body:
            failed.append("output_contract")
        if "|" not in decision_body or not re.search(r"fail|wrong|risk|consequence", decision_body, re.I):
            failed.append("decision_contract")
        anti_count = len(re.findall(r"(?m)^\s*[-*]\s+", anti_body))
        if anti_count < 5:
            failed.append("anti_pattern_depth")
        if not re.search(r"\b(stop|block|refuse|no-ship)\b", text, re.I):
            failed.append("stop_condition")
        if not re.search(r"\b(recover|recovery|fallback|degraded|conditional|unverified)\b", text, re.I):
            failed.append("recovery_condition")
        for heading in ("Workflow", "Outputs", "Anti-Patterns", "Examples", "References"):
            if is_empty_section(text, heading):
                failed.append("empty_contract_section")
                break
        if len(text.splitlines()) > 500:
            failed.append("line_limit")
        size = path.stat().st_size
        if size > max_skill_bytes:
            size_warnings.append({"path": path.relative_to(root).as_posix(), "bytes": size, "lines": len(text.splitlines())})
        if any(marker in text for marker in ENCODING_NOISE):
            failed.append("encoding_noise")
        if not (path.parent / "examples").is_dir():
            failed.append("worked_example")
        findings.append({"path": path.relative_to(root).as_posix(), "failed": sorted(set(failed))})

    extraction_violations = scan_book_extractions(root)
    duplicates = sorted(name for name, count in Counter(names).items() if count > 1)
    missing_fonts = [name for name in FONT_CATEGORIES if not (root / "fonts" / name).is_dir()]
    counts = Counter(code for item in findings for code in item["failed"])
    return {
        "skills": len(skill_files),
        "fully_compliant": sum(not item["failed"] for item in findings),
        "failure_counts": dict(sorted(counts.items())),
        "duplicate_names": duplicates,
        "missing_font_categories": missing_fonts,
        "book_extraction_violations": extraction_violations,
        "findings": [item for item in findings if item["failed"]],
        "size_warnings": size_warnings,
        "max_skill_bytes": max_skill_bytes,
        **scan_slop_registry(root),
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--baseline", type=Path)
    parser.add_argument("--json", action="store_true")
    parser.add_argument("--max-skill-bytes", type=int, default=DEFAULT_MAX_SKILL_BYTES,
                        help="report-only SKILL.md size warning threshold in bytes; never changes the exit status")
    args = parser.parse_args()
    result = scan(args.root.resolve(), args.max_skill_bytes)
    regressions: dict[str, tuple[int, int]] = {}
    if args.baseline:
        baseline = json.loads(args.baseline.read_text(encoding="utf-8"))
        current = result["failure_counts"]
        for key in set(current) | set(baseline.get("failure_counts", {})):
            before = int(baseline.get("failure_counts", {}).get(key, 0))
            after = int(current.get(key, 0))
            if after > before:
                regressions[key] = (before, after)
        if result["skills"] < int(baseline.get("skills", 0)):
            regressions["skill_count_drop"] = (int(baseline["skills"]), result["skills"])
        # Regression-only floors for the chwezi-slop registry (M10-09-T05).
        for key in ("slop_rules", "slop_fixtures"):
            if key in baseline and result[key] < int(baseline[key]):
                regressions[f"{key}_drop"] = (int(baseline[key]), result[key])
    result["regressions"] = regressions
    if args.json:
        print(json.dumps(result, indent=2))
    else:
        print(f"skills={result['skills']} fully_compliant={result['fully_compliant']}")
        for key, count in result["failure_counts"].items():
            print(f"{key}={count}")
        for key, values in regressions.items():
            print(f"REGRESSION {key}: {values[0]} -> {values[1]}")
        for item in result["book_extraction_violations"]:
            print(f"BOOK-EXTRACTION VIOLATION {item}")
        print(f"slop_rules={result['slop_rules']} slop_fixtures={result['slop_fixtures']}")
        for item in result["slop_registry_errors"]:
            print(f"SLOP-REGISTRY ERROR {item}")
        for item in result["size_warnings"]:
            print(f"WARN skill-bytes {item['path']}: {item['bytes']} bytes > {result['max_skill_bytes']} ({item['lines']} lines; report-only)")
    return 1 if (
        regressions
        or result["duplicate_names"]
        or result["missing_font_categories"]
        or result["book_extraction_violations"]
        or result["slop_registry_errors"]
    ) else 0


if __name__ == "__main__":
    sys.exit(main())
