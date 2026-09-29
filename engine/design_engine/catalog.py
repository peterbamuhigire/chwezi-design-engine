"""Deterministic offline catalog search with typed routing, calibrated abstention and doctrine lint.

M10-10 extensions (EXTENDS commit 02aa6c9):

- T01 doctrine lint: typography and google-fonts records carry structured slots (``heading``,
  ``body``, ``mono``, optional ``accent``). A slot naming a banned family (hard, secondary,
  monospace, or a banned prefix) fails, as does a watchlisted face (treated as "pending": a
  catalogue record is a positive recommendation, so an unresolved face may not be encoded).
  ``conditionalPrimaryOnly`` faces (Source Sans) are allowed only in ``body``. Any other field
  that names a banned family fails unless the field is ``must_not`` or ``avoid``. The lists are
  read from ``doctrine/references/ai-slop-banned-fonts.json`` at load time; nothing is hardcoded.
  Matching follows ``hooks/lib/font-matcher.js`` (shared vectors in
  ``tests/fixtures/font-matcher-vectors.json``).
- T03 palette contrast: ``content.tokens`` semantic pairs are checked with the WCAG 2.2
  relative-luminance ratio (text pairs >= 4.5:1, ``border``/``ring`` >= 3:1), including an
  optional ``dark`` override block. Framework-default hexes raise an AS1 advisory warning.
- T04 lifecycle: ``replacement_id`` is required on deprecated records and must resolve to an
  active record; ``recheck_due`` defaults to reviewed + 365 days (human authority) or + 90 days
  (original synthesis).
- T05 ranking: BM25 (k1 1.5, b 0.75; tags x3, title x2, content x1) through the vendored shared
  module ``retrieval_metrics.py``; per-domain score floors plus a query-token coverage minimum
  read from ``data/retrieval-calibration.json``. BM25, calibration and the query contract are
  ideas adapted from UI UX Pro Max (nextlevelbuilder/ui-ux-pro-max-skill, MIT,
  https://github.com/nextlevelbuilder/ui-ux-pro-max-skill, commit 09170ee); re-implemented, no
  code or data copied.
"""

from __future__ import annotations

from dataclasses import asdict, dataclass, field
from datetime import date, timedelta
from difflib import get_close_matches
import json
import re
import unicodedata
from pathlib import Path
from typing import Any, Iterable

from .retrieval_metrics import BM25


DOMAINS = (
    "product",
    "style",
    "typography",
    "color",
    "landing",
    "chart",
    "ux",
    "icons",
    "react",
    "web",
    "google-fonts",
    "gsap",
)

STACKS = (
    "html-tailwind",
    "react",
    "nextjs",
    "astro",
    "vue",
    "nuxtjs",
    "nuxt-ui",
    "svelte",
    "swiftui",
    "react-native",
    "flutter",
    "shadcn",
    "jetpack-compose",
    "threejs",
    "angular",
    "laravel",
    "javafx",
    "wpf",
    "winui",
    "avalonia",
    "uno",
    "uwp",
)

SYNONYMS = {
    "admin": "backoffice",
    "administrator": "backoffice",
    "analytics": "dashboard",
    "dashboards": "dashboard",
    "commerce": "ecommerce",
    "colour": "color",
    "colours": "color",
    "colors": "color",
    "font": "typography",
    "fonts": "typography",
    "typeface": "typography",
    "typefaces": "typography",
    "licence": "license",
    "login": "authentication",
    "signin": "authentication",
    "signup": "onboarding",
    "palettes": "palette",
    "reports": "report",
    "visualisation": "visualization",
    "visualise": "visualization",
}

STOP_WORDS = frozenset(
    {
        "a", "an", "and", "are", "as", "at", "be", "best", "by", "can", "for", "from", "how",
        "i", "in", "into", "is", "it", "me", "my", "need", "of", "on", "or", "our", "please",
        "should", "some", "that", "the", "this", "to", "use", "we", "what", "which", "with",
    }
)

TOKEN_RE = re.compile(r"[a-z0-9]+(?:-[a-z0-9]+)*")

FIELD_BOOSTS = {"tags": 3.0, "title": 2.0, "content": 1.0}

TYPOGRAPHY_DOMAINS = {"typography", "google-fonts"}
FONT_SLOTS = ("heading", "body", "mono", "accent")
FONT_GROUPS = {"01", "02", "03", "04", "05", "06", "07", "08"}
EXEMPT_FIELDS = {"must_not", "avoid"}

# Text pairs need 4.5:1 (SC 1.4.3); non-text pairs need 3:1 (SC 1.4.11).
TEXT_PAIRS = (
    ("primary", "on_primary"),
    ("secondary", "on_secondary"),
    ("surface", "on_surface"),
    ("background", "foreground"),
    ("muted", "on_muted"),
    ("destructive", "on_destructive"),
)
NON_TEXT_PAIRS = (("border", "surface"), ("ring", "background"))
HEX_RE = re.compile(r"^#[0-9A-Fa-f]{6}$")

# AS1 advisory: stock framework primaries that signal an unconsidered default. Values are the
# published defaults of the named palettes (Tailwind CSS v3 default palette, Bootstrap 5,
# Material Design 2 baseline). A match is a WARN, never a failure.
FRAMEWORK_DEFAULT_HEXES = {
    "#2563EB": "Tailwind blue-600",
    "#3B82F6": "Tailwind blue-500",
    "#4F46E5": "Tailwind indigo-600",
    "#6366F1": "Tailwind indigo-500",
    "#8B5CF6": "Tailwind violet-500",
    "#7C3AED": "Tailwind violet-600",
    "#0D6EFD": "Bootstrap 5 primary",
    "#6200EE": "Material Design 2 baseline primary",
}

RECHECK_DAYS = {"human_authority": 365, "original_synthesis": 90}


class CatalogError(ValueError):
    """Base error for invalid catalog requests or records."""


class NoResultsError(CatalogError):
    """Raised only when callers request strict search results."""


@dataclass(frozen=True)
class RouteDecision:
    domain: str
    confidence: float
    alternatives: tuple[tuple[str, float], ...]
    reason: str

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass(frozen=True)
class SearchResult:
    record_id: str
    domain: str
    title: str
    score: float
    status: str
    stack: str | None
    explanation: tuple[str, ...]
    content: dict[str, Any]
    coverage: float = 0.0
    successor: str | None = None

    def to_dict(self) -> dict[str, Any]:
        payload = asdict(self)
        payload["explanation"] = list(self.explanation)
        if payload["successor"] is None:
            payload.pop("successor")
        return payload


def _tokens(value: str) -> list[str]:
    normal = unicodedata.normalize("NFKC", value).casefold().replace("_", "-")
    expanded: list[str] = []
    for word in TOKEN_RE.findall(normal):
        parts = [word] + (word.split("-") if "-" in word else [])
        for part in parts:
            if part in STOP_WORDS or not part:
                continue
            expanded.append(SYNONYMS.get(part, part))
    return expanded


# ---------------------------------------------------------------------------------------------
# Font doctrine (T01). Python port of the matcher rules in hooks/lib/font-matcher.js.
# ---------------------------------------------------------------------------------------------


def _norm_family(name: str) -> str:
    return re.sub(r"\s+", " ", re.sub(r"[\"'`\\]", "", str(name or ""))).strip().lower()


@dataclass
class FontDoctrine:
    hard: dict[str, str] = field(default_factory=dict)
    secondary: dict[str, str] = field(default_factory=dict)
    mono: dict[str, str] = field(default_factory=dict)
    conditional: dict[str, str] = field(default_factory=dict)
    prefixes: list[str] = field(default_factory=list)
    watchlist: dict[str, str] = field(default_factory=dict)
    source: str = "in-memory"

    @classmethod
    def from_payload(cls, payload: dict[str, Any], source: str = "in-memory") -> "FontDoctrine":
        def names(key: str) -> dict[str, str]:
            return {_norm_family(item["family"]): item["family"] for item in payload.get(key, []) if item.get("family")}

        return cls(
            hard=names("hardBan"),
            secondary=names("secondaryBan"),
            mono=names("monospaceBanned"),
            conditional=names("conditionalPrimaryOnly"),
            prefixes=[item["prefix"] for item in payload.get("hardBanFamilyPrefixes", []) if item.get("prefix")],
            watchlist=names("watchlist"),
            source=source,
        )

    @classmethod
    def from_file(cls, path: str | Path) -> "FontDoctrine":
        target = Path(path)
        try:
            payload = json.loads(target.read_text(encoding="utf-8"))
        except FileNotFoundError as exc:
            raise CatalogError(f"font doctrine sidecar not found: {target}") from exc
        return cls.from_payload(payload, str(target))

    def banned_kind(self, family: str) -> str | None:
        """Same order as font-matcher.js bannedEntry: hard, prefix, secondary, mono."""
        low = _norm_family(family)
        if not low:
            return None
        if low in self.hard:
            return "hard"
        if any(low.startswith(_norm_family(prefix)) for prefix in self.prefixes):
            return "prefix"
        if low in self.secondary:
            return "secondary"
        if low in self.mono:
            return "mono"
        return None

    def classify(self, family: str, slot: str) -> str | None:
        """None when the face may sit in ``slot``; otherwise the reason kind."""
        kind = self.banned_kind(family)
        if kind:
            return kind
        low = _norm_family(family)
        if low in self.conditional and slot != "body":
            return "conditional"
        if low in self.watchlist:
            return "watchlist"
        return None

    def banned_names(self) -> list[str]:
        return sorted({*self.hard.values(), *self.secondary.values(), *self.mono.values(), *self.prefixes}, key=len, reverse=True)


def default_doctrine_path() -> Path:
    return Path(__file__).resolve().parents[2] / "doctrine" / "references" / "ai-slop-banned-fonts.json"


def _walk_strings(value: Any, path: str) -> Iterable[tuple[str, str]]:
    if isinstance(value, str):
        yield path, value
    elif isinstance(value, dict):
        for key, item in value.items():
            if key in EXEMPT_FIELDS:
                continue
            yield from _walk_strings(item, f"{path}.{key}")
    elif isinstance(value, list):
        for index, item in enumerate(value):
            yield from _walk_strings(item, f"{path}[{index}]")


# ---------------------------------------------------------------------------------------------
# Contrast (T03): WCAG 2.2 relative luminance, standard library only.
# ---------------------------------------------------------------------------------------------


def relative_luminance(hex_value: str) -> float:
    if not HEX_RE.match(hex_value or ""):
        raise CatalogError(f"colour must be #RRGGBB: {hex_value!r}")
    channels = []
    for index in (1, 3, 5):
        c = int(hex_value[index : index + 2], 16) / 255.0
        channels.append(c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4)
    r, g, b = channels
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast_ratio(first: str, second: str) -> float:
    a, b = relative_luminance(first), relative_luminance(second)
    lighter, darker = max(a, b), min(a, b)
    return (lighter + 0.05) / (darker + 0.05)


def _parse_date(value: Any, what: str) -> date:
    try:
        return date.fromisoformat(str(value))
    except ValueError as exc:
        raise CatalogError(f"{what} must be an ISO date (YYYY-MM-DD): {value!r}") from exc


# ---------------------------------------------------------------------------------------------
# Catalogue
# ---------------------------------------------------------------------------------------------

_INDEX_CACHE: dict[tuple[str, str, int], tuple[BM25, tuple[set[str], ...]]] = {}


class Catalog:
    """Load and search an independently authored, versioned JSON catalog."""

    def __init__(
        self,
        payload: dict[str, Any],
        source: Path | None = None,
        *,
        doctrine: FontDoctrine | None = None,
        calibration: dict[str, Any] | None = None,
    ):
        self.source = source
        self.payload = payload
        self.revision = str(payload.get("catalog_revision", "unversioned"))
        self.records = tuple(payload.get("records", ()))
        self.stack_guidance = tuple(payload.get("stack_guidance", ()))
        self.doctrine = doctrine or FontDoctrine.from_file(default_doctrine_path())
        self.calibration = calibration or {}
        self.contrast_report: list[dict[str, Any]] = []
        self.warnings: list[str] = []
        self._validate()

    @classmethod
    def from_file(cls, path: str | Path, *, calibration_path: str | Path | None = None, doctrine_path: str | Path | None = None) -> "Catalog":
        source = Path(path).resolve()
        try:
            payload = json.loads(source.read_text(encoding="utf-8"))
        except FileNotFoundError as exc:
            raise CatalogError(f"catalog not found: {source}") from exc
        except json.JSONDecodeError as exc:
            raise CatalogError(f"catalog is not valid JSON: {source}") from exc
        if not isinstance(payload, dict):
            raise CatalogError("catalog root must be an object")
        calibration = None
        cal_file = Path(calibration_path) if calibration_path else source.parent / "retrieval-calibration.json"
        if cal_file.is_file():
            calibration = json.loads(cal_file.read_text(encoding="utf-8"))
        doctrine = FontDoctrine.from_file(doctrine_path) if doctrine_path else None
        return cls(payload, source, doctrine=doctrine, calibration=calibration)

    # -- validation ---------------------------------------------------------------------------

    def _validate(self) -> None:
        if self.payload.get("schema_version") != "1.0":
            raise CatalogError("unsupported catalog schema_version")
        if not self.revision:
            raise CatalogError("catalog_revision is required")
        ids: set[str] = set()
        for record in self.records:
            required = {"id", "domain", "title", "tags", "status", "content", "evidence"}
            missing = required.difference(record)
            if missing:
                raise CatalogError(f"record missing fields: {sorted(missing)}")
            record_id = str(record["id"])
            if record_id in ids:
                raise CatalogError(f"duplicate record id: {record_id}")
            ids.add(record_id)
            if record["domain"] not in DOMAINS:
                raise CatalogError(f"unknown domain: {record['domain']}")
            if record["status"] not in {"active", "supplemental", "deprecated"}:
                raise CatalogError(f"invalid status for {record_id}")
            if not isinstance(record["tags"], list) or not record["tags"]:
                raise CatalogError(f"record tags must be non-empty: {record_id}")
            evidence = record["evidence"]
            if not isinstance(evidence, dict) or not evidence.get("source_type") or not evidence.get("reviewed"):
                raise CatalogError(f"record evidence is incomplete: {record_id}")
            if evidence["source_type"] == "human_authority" and not str(evidence.get("citation", "")).strip():
                raise CatalogError(f"human_authority record needs evidence.citation: {record_id}")
            self._lint_fonts(record)
            self._check_palette(record)
            self._check_ux(record)
        self._check_lifecycle()
        seen_stacks: set[str] = set()
        for guidance in self.stack_guidance:
            stack = guidance.get("stack")
            if stack not in STACKS:
                raise CatalogError(f"unknown stack: {stack}")
            if stack in seen_stacks:
                raise CatalogError(f"duplicate stack guidance: {stack}")
            seen_stacks.add(stack)
            if not guidance.get("guidance") or not guidance.get("supported_versions"):
                raise CatalogError(f"incomplete stack guidance: {stack}")
        missing_domains = set(DOMAINS).difference(record["domain"] for record in self.records)
        if missing_domains:
            raise CatalogError(f"catalog has no records for domains: {sorted(missing_domains)}")
        missing_stacks = set(STACKS).difference(seen_stacks)
        if missing_stacks:
            raise CatalogError(f"catalog has no guidance for stacks: {sorted(missing_stacks)}")

    def _lint_fonts(self, record: dict[str, Any]) -> None:
        record_id = record["id"]
        content = record["content"] if isinstance(record["content"], dict) else {}
        if record["domain"] in TYPOGRAPHY_DOMAINS:
            has_slots = any(slot in content for slot in FONT_SLOTS)
            if not has_slots and content.get("kind") != "guidance":
                raise CatalogError(f"{record_id}: typography record needs heading/body slots or content.kind 'guidance'")
            if has_slots:
                for slot in ("heading", "body", "group", "use_case"):
                    if not str(content.get(slot, "")).strip():
                        raise CatalogError(f"{record_id}: typography record is missing content.{slot}")
                if str(content["group"]) not in FONT_GROUPS:
                    raise CatalogError(f"{record_id}: content.group must be one of 01-08")
                if not str(record.get("licence", "")).strip():
                    raise CatalogError(f"{record_id}: typography record needs a licence")
                if str(content["group"]) == "07":
                    rules = " ".join(map(str, content.get("rules", []))).casefold()
                    if "never body" not in rules:
                        raise CatalogError(f"{record_id}: group 07 records must state 'signature moment only, never body' in content.rules")
                for slot in FONT_SLOTS:
                    if slot not in content:
                        continue
                    family = content[slot]
                    if not isinstance(family, str) or not family.strip():
                        raise CatalogError(f"{record_id}: content.{slot} must be a family name")
                    kind = self.doctrine.classify(family, slot)
                    if kind == "watchlist":
                        raise CatalogError(f"{record_id}: content.{slot} '{family}' is on the font watchlist (status pending); approved records may not encode it")
                    if kind == "conditional":
                        raise CatalogError(f"{record_id}: content.{slot} '{family}' is permitted only as a paired body face")
                    if kind:
                        raise CatalogError(f"{record_id}: content.{slot} '{family}' is banned by doctrine ({kind})")
        slot_values = {slot: content.get(slot) for slot in FONT_SLOTS} if record["domain"] in TYPOGRAPHY_DOMAINS else {}
        scan = {key: value for key, value in record.items() if key not in EXEMPT_FIELDS}
        if slot_values:
            scan = dict(scan)
            scan["content"] = {key: value for key, value in content.items() if key not in FONT_SLOTS}
        for path, text in _walk_strings(scan, record_id):
            for name in self.doctrine.banned_names():
                pattern = r"(?<![A-Za-z0-9])" + re.escape(name) + (r"" if name in self.doctrine.prefixes else r"(?![A-Za-z0-9])")
                if re.search(pattern, text):
                    raise CatalogError(f"{path}: names banned family '{name}' outside must_not/avoid")

    def _check_palette(self, record: dict[str, Any]) -> None:
        content = record["content"] if isinstance(record["content"], dict) else {}
        tokens = content.get("tokens")
        if tokens is None:
            return
        record_id = record["id"]
        if record["domain"] != "color" or not isinstance(tokens, dict):
            raise CatalogError(f"{record_id}: content.tokens is only valid on colour records and must be an object")
        themes = [("light", tokens)]
        if isinstance(tokens.get("dark"), dict):
            base = {key: value for key, value in tokens.items() if key != "dark"}
            themes.append(("dark", {**base, **tokens["dark"]}))
        for theme, values in themes:
            for (fg_key, bg_key), minimum in [(pair[::-1], 4.5) for pair in TEXT_PAIRS] + [(pair, 3.0) for pair in NON_TEXT_PAIRS]:
                if fg_key not in values or bg_key not in values:
                    raise CatalogError(f"{record_id}: palette ({theme}) is missing token pair {fg_key}/{bg_key}")
                ratio = contrast_ratio(values[fg_key], values[bg_key])
                passed = ratio >= minimum
                self.contrast_report.append(
                    {"record": record_id, "theme": theme, "pair": f"{fg_key}/{bg_key}", "ratio": round(ratio, 2), "minimum": minimum, "pass": passed}
                )
                if not passed:
                    raise CatalogError(f"{record_id}: contrast {fg_key}/{bg_key} ({theme}) is {ratio:.2f}:1, below {minimum}:1")
            for key, value in values.items():
                if isinstance(value, str) and value.upper() in FRAMEWORK_DEFAULT_HEXES:
                    self.warnings.append(f"WARN AS1 framework-default hex: {record_id} {theme}.{key} {value.upper()} ({FRAMEWORK_DEFAULT_HEXES[value.upper()]})")

    def _check_ux(self, record: dict[str, Any]) -> None:
        content = record["content"] if isinstance(record["content"], dict) else {}
        if record["domain"] != "ux" or "sc" not in content:
            return
        for key in ("sc", "level", "platform", "do", "dont", "severity", "code_good", "code_bad", "doctrine_ref"):
            if not str(content.get(key, "")).strip():
                raise CatalogError(f"{record['id']}: WCAG ux record is missing content.{key}")
        if content["level"] not in {"A", "AA"}:
            raise CatalogError(f"{record['id']}: WCAG ux record level must be A or AA")

    def recheck_due(self, record: dict[str, Any]) -> date:
        evidence = record["evidence"]
        if evidence.get("recheck_due"):
            return _parse_date(evidence["recheck_due"], f"{record['id']} recheck_due")
        reviewed = _parse_date(evidence["reviewed"], f"{record['id']} reviewed")
        return reviewed + timedelta(days=RECHECK_DAYS.get(evidence["source_type"], 90))

    def _check_lifecycle(self) -> None:
        by_id = {record["id"]: record for record in self.records}
        for record in self.records:
            reviewed = _parse_date(record["evidence"]["reviewed"], f"{record['id']} reviewed")
            if self.recheck_due(record) < reviewed:
                raise CatalogError(f"{record['id']}: recheck_due precedes reviewed")
            if record["status"] == "deprecated":
                successor = record.get("replacement_id")
                if not successor:
                    raise CatalogError(f"{record['id']}: deprecated record needs replacement_id")
                target = by_id.get(successor)
                if target is None or target["status"] != "active":
                    raise CatalogError(f"{record['id']}: replacement_id '{successor}' must resolve to an active record")
            elif record.get("replacement_id"):
                raise CatalogError(f"{record['id']}: replacement_id is only valid on deprecated records")

    def stale_records(self, as_of: date) -> list[tuple[str, date]]:
        return sorted(((record["id"], self.recheck_due(record)) for record in self.records if self.recheck_due(record) < as_of), key=lambda item: item[0])

    # -- retrieval ----------------------------------------------------------------------------

    @property
    def calibration_version(self) -> str:
        return str(self.calibration.get("calibration_version", "uncalibrated"))

    def _floor(self, domain: str) -> float:
        return float(self.calibration.get("domain_floors", {}).get(domain, 0.0))

    @property
    def coverage_minimum(self) -> float:
        return float(self.calibration.get("coverage_minimum", 0.0))

    def _index(self) -> tuple[BM25, tuple[set[str], ...]]:
        key = (str(self.source), self.revision, len(self.records))
        cached = _INDEX_CACHE.get(key)
        if cached is not None and self.source is not None:
            return cached
        documents = []
        vocab_sets = []
        for record in self.records:
            fields = {
                "tags": _tokens(" ".join(map(str, record["tags"]))),
                "title": _tokens(str(record["title"])),
                "content": _tokens(" ".join(text for _, text in _walk_strings(record["content"], ""))),
            }
            documents.append(fields)
            vocab_sets.append(set(fields["tags"]) | set(fields["title"]) | set(fields["content"]))
        built = (BM25(k1=1.5, b=0.75, boosts=FIELD_BOOSTS).fit(documents), tuple(vocab_sets))
        if self.source is not None:
            _INDEX_CACHE[key] = built
        return built

    def _query_tokens(self, query: str) -> tuple[list[str], list[str]]:
        """Distinct query tokens, with unknown words corrected to the nearest vocabulary token."""
        raw = list(dict.fromkeys(_tokens(query)))
        if not raw:
            raise CatalogError("query must contain searchable text")
        _, vocab_sets = self._index()
        vocabulary = sorted(set().union(*vocab_sets)) if vocab_sets else []
        known = set(vocabulary)
        tokens: list[str] = []
        notes: list[str] = []
        for token in raw:
            if token in known or len(token) < 4 or token.isdigit():
                tokens.append(token)
                continue
            match = get_close_matches(token, vocabulary, n=1, cutoff=0.82)
            if match:
                tokens.append(match[0])
                notes.append(f"typo correction: {token} -> {match[0]}")
            else:
                tokens.append(token)
        return list(dict.fromkeys(tokens)), notes

    def _record_scores(self, tokens: list[str]) -> list[tuple[float, float]]:
        bm25, vocab_sets = self._index()
        results = []
        for index in range(len(self.records)):
            score = bm25.score(tokens, index)
            coverage = len(set(tokens) & vocab_sets[index]) / len(tokens)
            results.append((score, coverage))
        return results

    def route(self, query: str, domain: str | None = None) -> RouteDecision:
        if domain is not None and domain not in DOMAINS and domain != "all":
            raise CatalogError(f"invalid domain: {domain}")
        tokens, _ = self._query_tokens(query)
        scored = self._record_scores(tokens)
        best: dict[str, float] = {candidate: 0.0 for candidate in DOMAINS}
        for record, (score, _) in zip(self.records, scored):
            if record["status"] == "deprecated":
                continue
            best[record["domain"]] = max(best[record["domain"]], score)
        ranked = sorted(((name, round(value, 3)) for name, value in best.items()), key=lambda item: (-item[1], item[0]))
        if domain and domain != "all":
            return RouteDecision(domain, 1.0, tuple(ranked[:3]), "explicit domain")
        top_score = ranked[0][1]
        second_score = ranked[1][1]
        if top_score <= 0:
            return RouteDecision("style", 0.0, tuple(ranked[:3]), "no domain evidence; conservative style fallback")
        confidence = min(1.0, top_score / max(1e-9, top_score + second_score))
        return RouteDecision(ranked[0][0], round(confidence, 3), tuple(ranked[1:3]), "BM25 domain evidence")

    def search(
        self,
        query: str,
        *,
        domain: str | None = None,
        stack: str | None = None,
        status: str = "current",
        limit: int = 8,
        strict: bool = False,
        include_deprecated: bool = False,
        calibrated: bool = True,
    ) -> dict[str, Any]:
        if not isinstance(limit, int) or limit < 1 or limit > 50:
            raise CatalogError("limit must be an integer between 1 and 50")
        if stack is not None and stack not in STACKS:
            raise CatalogError(f"invalid stack: {stack}")
        if status not in {"current", "all", "legacy"}:
            raise CatalogError("status must be current, all, or legacy")
        if include_deprecated and status == "current":
            status = "all"
        route = self.route(query, domain)
        tokens, notes = self._query_tokens(query)
        scored = self._record_scores(tokens)
        by_id = {record["id"]: record for record in self.records}
        candidates: list[SearchResult] = []
        below_floor = 0
        for record, (bm25_score, coverage) in zip(self.records, scored):
            if route.domain != "all" and record["domain"] != route.domain:
                continue
            declared_stacks = set(record.get("stacks", []))
            if record.get("stack"):
                declared_stacks.add(record["stack"])
            if stack and declared_stacks and stack not in declared_stacks:
                continue
            if status == "current" and record["status"] == "deprecated":
                continue
            if status == "legacy" and record["status"] != "deprecated":
                continue
            if bm25_score <= 0:
                continue
            score = bm25_score
            explanation: list[str] = [f"BM25 {bm25_score:.3f} (tags x3, title x2, content x1)", f"query-token coverage {coverage:.2f}", *notes]
            if stack and (record.get("stack") == stack or stack in record.get("stacks", [])):
                score += 1.0
                explanation.append(f"stack match: {stack}")
            elif stack and record.get("stack") is not None:
                score -= 0.5
            if record["status"] == "active":
                score += 0.01
            if calibrated and (bm25_score < self._floor(record["domain"]) or coverage < self.coverage_minimum):
                below_floor += 1
                continue
            successor = record.get("replacement_id") if record["status"] == "deprecated" else None
            if successor:
                explanation.append(f"deprecated; successor: {successor} ({by_id[successor]['title']})")
            candidates.append(
                SearchResult(
                    record_id=record["id"],
                    domain=record["domain"],
                    title=record["title"],
                    score=round(score, 3),
                    status=record["status"],
                    stack=record.get("stack"),
                    explanation=tuple(explanation),
                    content=record["content"],
                    coverage=round(coverage, 3),
                    successor=successor,
                )
            )
        results = sorted(candidates, key=lambda item: (-item.score, item.record_id))[:limit]
        if strict and not results:
            raise NoResultsError("no records satisfied the query and filters")
        payload = {
            "schema_version": "1.0",
            "catalog_revision": self.revision,
            "calibration_version": self.calibration_version,
            "query": query,
            "query_tokens": tokens,
            "route": route.to_dict(),
            "filters": {"domain": domain, "stack": stack, "status": status},
            "results": [item.to_dict() for item in results],
            "abstained": not bool(results),
        }
        if not results:
            payload["abstention_reason"] = (
                f"{below_floor} candidate(s) below the calibrated floor or coverage minimum" if below_floor else "no record matched the query and filters"
            )
        return payload


def default_catalog_path() -> Path:
    return Path(__file__).resolve().parents[2] / "data" / "design-catalog.json"


def default_calibration_path() -> Path:
    return Path(__file__).resolve().parents[2] / "data" / "retrieval-calibration.json"
