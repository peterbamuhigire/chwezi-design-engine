import json
import re
from pathlib import Path

from scripts.validate_route_existence import active_skills, validate_routes


ROOT = Path(__file__).resolve().parents[1]


def test_routing_and_repaired_route_fixtures_resolve():
    assert validate_routes(ROOT) == []


def test_new_skills_do_not_reduce_the_frozen_zero_debt_inventory():
    baseline = json.loads((ROOT / "tests" / "quality-baseline.json").read_text(encoding="utf-8"))
    assert len(active_skills(ROOT)) >= baseline["skills"] == baseline["fully_compliant"]


def test_design_standards_register_keeps_primary_source_fields():
    path = ROOT / "governance" / "standards-source-register.md"
    text = path.read_text(encoding="utf-8")
    rows = [line for line in text.splitlines() if line.startswith("| DGN-")]
    assert len(rows) >= 5
    for row in rows:
        assert "https://" in row
        assert re.search(r"202[6-9]-\d{2}-\d{2}", row)
        assert row.count("|") >= 8
