from __future__ import annotations

import json
from pathlib import Path

import pytest

from engine.design_engine.catalog import Catalog, CatalogError, NoResultsError, default_catalog_path
from engine.design_engine.decisions import DecisionError, build_design_system, format_decision
from engine.design_engine.persistence import PersistenceError, resolve_project, save_page_override, save_project


@pytest.fixture()
def catalog() -> Catalog:
    return Catalog.from_file(default_catalog_path())


def test_catalog_has_all_domains_and_stacks(catalog: Catalog) -> None:
    # M10-10: the original 13 records are kept; T02/T03/T09 add approved, cited records (>= 60 total).
    assert len(catalog.records) >= 60
    assert len(catalog.stack_guidance) == 22


def test_search_is_deterministic_and_explains_match(catalog: Catalog) -> None:
    first = catalog.search("usability research retest", domain="ux", stack="react")
    second = catalog.search("usability research retest", domain="ux", stack="react")
    assert first == second
    assert first["results"][0]["record_id"] == "ux-observe-fix-retest"
    assert first["results"][0]["explanation"]


def test_synonyms_and_explicit_domain_work(catalog: Catalog) -> None:
    result = catalog.search("colour contrast danger", domain="color")
    assert result["route"]["reason"] == "explicit domain"
    assert result["results"][0]["record_id"] == "color-semantic-state"


def test_invalid_domain_and_stack_are_typed_errors(catalog: Catalog) -> None:
    with pytest.raises(CatalogError):
        catalog.search("button", domain="not-a-domain")
    with pytest.raises(CatalogError):
        catalog.search("button", stack="not-a-stack")
    assert catalog.search("component state", domain="react", stack="vue")["abstained"] is True


def test_status_filter_keeps_deprecated_guidance_out_of_current_results(catalog: Catalog) -> None:
    assert catalog.search("legacy flat", domain="style")["abstained"] is True
    legacy = catalog.search("legacy flat", domain="style", status="legacy")
    assert legacy["results"][0]["record_id"] == "style-legacy-flat"


def test_strict_search_abstains_instead_of_fabricating(catalog: Catalog) -> None:
    with pytest.raises(NoResultsError):
        catalog.search("quantum telescope", domain="chart", strict=True)


def test_decision_builder_rejects_unknown_and_contradictory_constraints(catalog: Catalog) -> None:
    brief = {
        "name": "Workshop booking",
        "audience": "community coordinator",
        "job": "reserve a room",
        "outcome": "submit a valid booking",
        "must_have": ["keyboard"],
        "must_not": ["keyboard"],
    }
    with pytest.raises(DecisionError):
        build_design_system(brief, catalog)
    with pytest.raises(DecisionError):
        build_design_system({**brief, "must_not": [], "unknown": "nope"}, catalog)


def test_decision_builder_returns_shared_structured_and_markdown_views(catalog: Catalog) -> None:
    decision = build_design_system(
        {
            "name": "Workshop booking",
            "audience": "community coordinator",
            "job": "reserve a room and review capacity",
            "outcome": "submit a valid booking",
            "mode": "app",
            "stack": "react",
            "density": 4,
            "motion": 2,
            "variance": 5,
        },
        catalog,
    )
    assert decision["evidence_contract"]["status"] == "NOT_ASSESSED"
    markdown = format_decision(decision, "markdown")
    assert "Workshop booking" in markdown
    assert "NOT_ASSESSED" in markdown
    assert json.loads(format_decision(decision, "json")) == decision


def test_persistence_is_atomic_non_destructive_and_page_overrides_merge(tmp_path: Path, catalog: Catalog) -> None:
    decision = build_design_system(
        {
            "name": "Workshop booking",
            "audience": "coordinator",
            "job": "book a room",
            "outcome": "confirm a reservation",
        },
        catalog,
    )
    saved = save_project(tmp_path, "community-workshops", decision)
    assert saved.is_file()
    with pytest.raises(PersistenceError):
        save_project(tmp_path, "community-workshops", decision)
    save_page_override(tmp_path, "community-workshops", "calendar", {"dials": {"density": 7}})
    resolved = resolve_project(tmp_path, "community-workshops", "calendar")
    assert resolved["dials"]["density"] == 7
    with pytest.raises(PersistenceError):
        save_project(tmp_path, "../escape", decision)



# ---------------------------------------------------------------------------------------------
# M10-10 additions (T01-T10). Hand-computed values are shown in comments.
# ---------------------------------------------------------------------------------------------

import copy
import hashlib
import re
import subprocess
import sys

from engine.design_engine.catalog import FontDoctrine, contrast_ratio, default_doctrine_path
from engine.design_engine.decisions import normalise_mode
from engine.design_engine.persistence import load_project

ROOT = Path(__file__).resolve().parents[1]
FIXTURES = ROOT / "tests" / "fixtures"
VALIDATOR = ROOT / "scripts" / "validate_design_catalog.py"
QUERY = ROOT / "scripts" / "design_query.py"


def _payload() -> dict:
    return json.loads(default_catalog_path().read_text(encoding="utf-8"))


def _typography(record_id: str, **content) -> dict:
    body = {"heading": "Spectral", "body": "Public Sans", "group": "01", "use_case": "test"}
    body.update(content)
    return {
        "id": record_id, "domain": "typography", "status": "active", "title": "Test pairing", "tags": ["typography"],
        "content": body, "evidence": {"source_type": "human_authority", "citation": "pairing-catalog.md F2", "reviewed": "2026-09-29"},
        "licence": "OFL-1.1",
    }


def _with(record: dict) -> Catalog:
    payload = _payload()
    payload["records"].append(record)
    return Catalog(payload)


def _run(script: Path, *args: str) -> subprocess.CompletedProcess:
    return subprocess.run([sys.executable, "-X", "utf8", str(script), *args], capture_output=True, text=True, encoding="utf-8", cwd=ROOT)


# T01 doctrine lint ---------------------------------------------------------------------------

def test_banned_heading_fixture_fails_validation() -> None:
    result = _run(VALIDATOR, str(FIXTURES / "catalog" / "banned-heading.json"))
    assert result.returncode == 1
    assert "Inter" in result.stdout and "banned" in result.stdout


def test_source_sans_body_under_approved_display_passes() -> None:
    _with(_typography("type-test-source-sans-body", heading="Spectral", body="Source Sans 3"))


def test_source_sans_as_heading_fails() -> None:
    with pytest.raises(CatalogError, match="paired body face"):
        _with(_typography("type-test-source-sans-head", heading="Source Sans 3"))


def test_prefix_ban_catches_plex_cut() -> None:
    with pytest.raises(CatalogError, match="IBM Plex Sans Condensed"):
        _with(_typography("type-test-plex", heading="IBM Plex Sans Condensed"))
    with pytest.raises(CatalogError, match="prefix"):
        _with(_typography("type-test-plex-math", heading="IBM Plex Math"))


def test_watchlisted_face_is_pending_and_fails() -> None:
    watch = json.loads(default_doctrine_path().read_text(encoding="utf-8"))["watchlist"]
    assert watch, "doctrine sidecar has a watchlist"
    with pytest.raises(CatalogError, match="watchlist"):
        _with(_typography("type-test-watch", heading=watch[0]["family"]))


def test_banned_family_in_other_field_fails_except_avoid() -> None:
    with pytest.raises(CatalogError, match="Poppins"):
        _with(_typography("type-test-rules", rules=["pairs well with Poppins"]))
    allowed = _typography("type-test-avoid")
    allowed["avoid"] = ["Poppins", "IBM Plex Sans"]
    _with(allowed)


def test_shared_font_matcher_vectors_match_python_lint() -> None:
    doctrine = FontDoctrine.from_file(default_doctrine_path())
    vectors = json.loads((FIXTURES / "font-matcher-vectors.json").read_text(encoding="utf-8"))["vectors"]
    for vector in vectors:
        assert doctrine.banned_kind(vector["family"]) == vector["expect"], vector
        if vector.get("context"):
            kind = doctrine.classify(vector["family"], "heading" if vector["context"] == "heading" else "body")
            assert kind == vector["context_expect"], vector


# T02 typography records -------------------------------------------------------------------------

def test_typography_records_are_cited_and_cover_every_group(catalog: Catalog) -> None:
    pairings = [r for r in catalog.records if r["domain"] == "typography" and "heading" in r["content"]]
    assert len(pairings) >= 24
    groups: dict[str, int] = {}
    for record in pairings:
        assert record["evidence"]["source_type"] == "human_authority"
        assert record["evidence"]["citation"].strip()
        assert record["licence"].strip()
        groups[record["content"]["group"]] = groups.get(record["content"]["group"], 0) + 1
    assert all(groups.get(f"{n:02d}", 0) >= 3 for n in range(1, 9)), groups


def test_statutory_and_dashboard_queries_return_expected_groups(catalog: Catalog) -> None:
    statutory = catalog.search("statutory report typography", domain="typography")
    assert statutory["results"][0]["content"]["group"] == "01"
    dashboard = catalog.search("dashboard typography")
    assert dashboard["results"][0]["content"]["group"] == "04"


# T03 contrast ---------------------------------------------------------------------------------

def test_contrast_ratio_matches_hand_computation() -> None:
    # #8A8A8A: c = 138/255 = 0.541176; ((c + 0.055) / 1.055) ** 2.4 = 0.254120 = L
    # #FFFFFF: L = 1.0 ; ratio = 1.05 / (0.254120 + 0.05) = 3.4526 -> 3.45
    assert round(contrast_ratio("#8A8A8A", "#FFFFFF"), 2) == 3.45
    assert round(contrast_ratio("#000000", "#FFFFFF"), 2) == 21.0


def test_low_contrast_fixture_fails_and_prints_ratio() -> None:
    result = _run(VALIDATOR, str(FIXTURES / "catalog" / "low-contrast-palette.json"))
    assert result.returncode == 1
    assert "3.45:1" in result.stdout


def test_shipped_palettes_pass_and_framework_hex_warns(catalog: Catalog) -> None:
    palettes = [r for r in catalog.records if "tokens" in r["content"]]
    assert len(palettes) >= 6
    assert catalog.contrast_report and all(row["pass"] for row in catalog.contrast_report)
    record = copy.deepcopy(palettes[0])
    record["id"] = "color-test-framework-hex"
    record["content"]["tokens"]["ring"] = "#2563EB"
    warned = _with(record)
    assert any("framework-default hex" in w and "#2563EB" in w for w in warned.warnings)


# T04 lifecycle -----------------------------------------------------------------------------------

def test_deprecated_record_needs_resolvable_replacement() -> None:
    payload = _payload()
    legacy = next(r for r in payload["records"] if r["id"] == "style-legacy-flat")
    legacy.pop("replacement_id")
    with pytest.raises(CatalogError, match="replacement_id"):
        Catalog(payload)
    legacy["replacement_id"] = "does-not-exist"
    with pytest.raises(CatalogError, match="active record"):
        Catalog(payload)


def test_include_deprecated_returns_successor(catalog: Catalog) -> None:
    result = catalog.search("legacy flat", domain="style", include_deprecated=True)
    hit = next(r for r in result["results"] if r["record_id"] == "style-legacy-flat")
    assert hit["successor"] == "style-feature-first-hierarchy"


def test_stale_warnings_with_as_of() -> None:
    result = _run(VALIDATOR, str(default_catalog_path()), "--as-of", "2027-12-01", "--quiet-contrast")
    assert result.returncode == 0
    assert re.search(r"WARN stale: \S+ recheck_due 2026-", result.stdout)
    assert "WARN stale" not in _run(VALIDATOR, str(default_catalog_path()), "--as-of", "2026-09-30", "--quiet-contrast").stdout


# T05 BM25 and calibration -------------------------------------------------------------------------

def test_search_reports_calibration_score_and_coverage(catalog: Catalog) -> None:
    result = catalog.search("dashboard")
    assert result["calibration_version"] != "uncalibrated"
    assert result["results"] and {"score", "coverage"} <= set(result["results"][0])


def test_coverage_minimum_abstains_on_out_of_scope_query(catalog: Catalog) -> None:
    assert catalog.search("chart of accounts ifrs")["abstained"] is True


# T07 CLI -----------------------------------------------------------------------------------------

def test_design_query_search_prints_json() -> None:
    result = _run(QUERY, "search", "dashboard typography")
    assert result.returncode == 0
    payload = json.loads(result.stdout)
    assert payload["calibration_version"] and payload["results"]


def test_design_query_strict_abstains() -> None:
    result = _run(QUERY, "search", "quantum telescope", "--strict")
    assert result.returncode == 2
    assert json.loads(result.stdout)["abstained"] is True


def test_design_query_persist_refuses_unverified_output(tmp_path: Path) -> None:
    decision = {"brief": {"name": "x", "mode": "operate"}, "decisions": {"chart": None}, "abstained_domains": ["chart"]}
    path = tmp_path / "decision.json"
    path.write_text(json.dumps(decision), encoding="utf-8")
    store = tmp_path / "store"
    refused = _run(QUERY, "persist", "--project", "demo", "--decision", str(path), "--root", str(store))
    assert refused.returncode == 3 and not store.exists()
    accepted = _run(QUERY, "persist", "--project", "demo", "--decision", str(path), "--root", str(store),
                    "--accept-abstention", "Peter: chart not needed on this surface")
    assert accepted.returncode == 0
    stored = json.loads((store / "demo" / "design-system.json").read_text(encoding="utf-8"))
    assert stored["accepted_abstention"]["by"] == "Peter"


def test_vendored_metrics_hash_matches_header() -> None:
    raw = (ROOT / "engine" / "design_engine" / "retrieval_metrics.py").read_bytes().replace(b"\r\n", b"\n")
    header, _, body = raw.partition(b"\n")
    assert header.startswith(b"# vendored-from: chwezi-engine-agents@")
    assert header.decode().rsplit("sha256:", 1)[1].strip() == hashlib.sha256(body).hexdigest()


# T09 WCAG mirror -----------------------------------------------------------------------------------

def _wcag_a_aa_from_doctrine() -> set[str]:
    """SC numbers named in wcag-2.2-criteria.md, minus those marked AAA or obsolete next to them."""
    text = (ROOT / "doctrine" / "references" / "wcag-2.2-criteria.md").read_text(encoding="utf-8")
    matches = list(re.finditer(r"(?<![\d.])(\d\.\d{1,2}\.\d{1,2})(?![.\d])", text))
    found: set[str] = set()
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        window = text[match.end() : min(end, match.end() + 80)]
        if "AAA" in window or "obsolete" in window:
            continue
        found.add(match.group(1))
    return found


def test_every_a_aa_criterion_in_doctrine_has_exactly_one_record(catalog: Catalog) -> None:
    expected = _wcag_a_aa_from_doctrine()
    records = [r["content"]["sc"] for r in catalog.records if r["domain"] == "ux" and "sc" in r["content"]]
    assert len(records) == len(set(records)), "duplicate SC records"
    assert set(records) == expected


def test_target_size_query_returns_2_5_8(catalog: Catalog) -> None:
    top = catalog.search("target size", domain="ux")["results"][0]
    assert top["content"]["sc"] == "2.5.8"
    assert "24x24 CSS px" in top["content"]["do"] and "44x44 pt" in top["content"]["do"] and "48x48 dp" in top["content"]["do"]


# T10 visitor modes ---------------------------------------------------------------------------------

@pytest.mark.parametrize(
    ("given", "mode", "alias"),
    [("app", "operate", "app"), ("marketing", "persuade", "marketing"), ("persuade", "persuade", None),
     ("operate", "operate", None), ("read", "read", None), ("experience", "experience", None)],
)
def test_mode_normalisation(given: str, mode: str, alias, catalog: Catalog) -> None:
    assert normalise_mode(given) == (mode, alias)
    decision = build_design_system(
        {"name": "Mode check", "audience": "coordinator", "job": "book a room", "outcome": "confirm a booking", "mode": given}, catalog
    )
    assert decision["brief"]["mode"] == mode
    assert decision["brief"].get("mode_alias_from") == alias


def test_unknown_mode_raises(catalog: Catalog) -> None:
    with pytest.raises(DecisionError):
        build_design_system({"name": "x", "audience": "y", "job": "z", "outcome": "w", "mode": "brochure"}, catalog)


def test_legacy_persisted_project_normalises_at_read_time() -> None:
    root = FIXTURES / "design-projects"
    stored = (root / "legacy-marketing" / "design-system.json").read_bytes()
    loaded = load_project(root, "legacy-marketing")
    assert loaded["brief"]["mode"] == "persuade"
    assert loaded["brief"]["mode_alias_from"] == "marketing"
    assert (root / "legacy-marketing" / "design-system.json").read_bytes() == stored
