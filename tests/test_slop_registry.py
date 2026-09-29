"""Registry-integrity check for the chwezi-slop detector (M10-09-T05)."""
import json
import shutil
from pathlib import Path

from scripts.validate_engine import heading_slug, scan_slop_registry


ROOT = Path(__file__).resolve().parents[1]
REGISTRY = ROOT / "tools/slop-detector/rules/registry.json"


def test_registry_integrity_passes():
    result = scan_slop_registry(ROOT)
    assert result["slop_registry_errors"] == []
    assert result["slop_rules"] >= 30
    assert result["slop_fixtures"] >= 2 * 30


def test_heading_slug_matches_github_anchors():
    assert heading_slug("1. Hard ban (primary offenders)") == "1-hard-ban-primary-offenders"
    assert heading_slug("Colour & layout (when present)") == "colour--layout-when-present"


def _copy_engine_subset(tmp_path: Path) -> Path:
    for rel in ("tools/slop-detector/rules", "tests/fixtures/slop", "tests/fixtures/slop-browser", "doctrine", "governance", "skills/04-web-and-ui-design/interface-craft-micro-details", "skills/09-design-systems-tokens-and-theming/design-tokens-and-naming"):
        shutil.copytree(ROOT / rel, tmp_path / rel)
    return tmp_path


def test_missing_fixture_duplicate_id_and_bad_anchor_fail(tmp_path):
    root = _copy_engine_subset(tmp_path)
    registry_path = root / "tools/slop-detector/rules/registry.json"
    data = json.loads(registry_path.read_text(encoding="utf-8"))
    data["rules"][0]["fixtures"]["flag"] = "tests/fixtures/slop/absent.flag.css"
    data["rules"][1]["doctrine_ref"] = "doctrine/references/ai-slop-taxonomy.md#no-such-heading"
    data["rules"].append(dict(data["rules"][2]))
    registry_path.write_text(json.dumps(data), encoding="utf-8")
    errors = scan_slop_registry(root)["slop_registry_errors"]
    assert any("fixture missing" in e for e in errors)
    assert any("anchor #no-such-heading" in e for e in errors)
    assert any("duplicate rule id" in e for e in errors)
