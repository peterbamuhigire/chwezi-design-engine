import json
import re
from pathlib import Path

from scripts.validate_route_existence import active_skills, validate_routes


ROOT = Path(__file__).resolve().parents[1]


def test_routing_and_repaired_route_fixtures_resolve():
    assert validate_routes(ROOT) == []


def test_new_skills_do_not_reduce_the_frozen_zero_debt_inventory():
    baseline = json.loads((ROOT / "tests" / "quality-baseline.json").read_text(encoding="utf-8"))
    skills = active_skills(ROOT)
    manifest = json.loads((ROOT / ".claude-plugin" / "plugin.json").read_text(encoding="utf-8"))
    manifest_skills = {(ROOT / item / "SKILL.md").resolve() for item in manifest["skills"]}
    discovered_skills = {path.resolve() for path in skills.values()}
    assert baseline["skills"] == baseline["fully_compliant"] == 101
    assert len(skills) == len(manifest["skills"]) == 102
    assert manifest_skills == discovered_skills


def test_design_standards_register_keeps_primary_source_fields():
    path = ROOT / "governance" / "standards-source-register.md"
    text = path.read_text(encoding="utf-8")
    rows = [line for line in text.splitlines() if line.startswith("| DGN-")]
    ids = {row.split("|", 2)[1].strip() for row in rows}
    assert {f"DGN-{number:03d}" for number in range(1, 12)} | {"DGN-013"} <= ids
    for row in rows:
        assert "https://" in row
        assert re.search(r"202[6-9]-\d{2}-\d{2}", row)
        assert row.count("|") >= 8


def test_active_skills_do_not_depend_on_the_legacy_machine_webroot():
    for skill in active_skills(ROOT).values():
        assert "wamp64" not in skill.read_text(encoding="utf-8").lower(), skill.relative_to(ROOT)
