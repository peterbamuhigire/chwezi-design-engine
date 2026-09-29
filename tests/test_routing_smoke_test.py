"""Unit tests for the design routing smoke test (M10-03-T05, T06, T11)."""

from __future__ import annotations

import importlib.util
import sys
from pathlib import Path

SCRIPT = Path(__file__).resolve().parents[1] / "scripts" / "routing_smoke_test.py"
SPEC = importlib.util.spec_from_file_location("design_routing_smoke_test", SCRIPT)
MODULE = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = MODULE
SPEC.loader.exec_module(MODULE)

POSITIVE = (
    "- prompt: Check these foreground and background pairs against WCAG contrast requirements.\n"
    "  expected: accessible-color-and-contrast\n"
)


def write(tmp_path: Path, text: str) -> Path:
    path = tmp_path / "fixtures.yml"
    path.write_text(text, encoding="utf-8")
    return path


def test_live_fixtures_pass_at_the_ci_floor():
    assert MODULE.main(["--min-rank1", "92", "--lint-fixtures"]) == 0


def test_floor_above_measured_precision_fails(tmp_path, capsys):
    path = write(tmp_path, POSITIVE + "- prompt: Draw the wordmark, lockups and favicon variants.\n  expected: brand-style-guide\n")
    assert MODULE.main(["--fixtures", str(path), "--min-rank1", "100"]) == 1
    assert "RATCHET" in capsys.readouterr().out


def test_owner_ranked_below_self_fails(tmp_path, capsys):
    # The negative prompt is really a contrast task, so the owner named here ranks below self.
    path = write(
        tmp_path,
        POSITIVE
        + "  negatives:\n"
        + "    - prompt: Check that these text and background pairs pass WCAG contrast.\n"
        + "      owner: logo-and-wordmark-design\n",
    )
    assert MODULE.main(["--fixtures", str(path)]) == 1
    assert "NEGATIVE FAIL" in capsys.readouterr().out


def test_cross_engine_owner_is_not_assessed_locally(tmp_path, capsys):
    path = write(
        tmp_path,
        POSITIVE + "  negatives:\n    - prompt: Write the ROI business case.\n      owner: srs-skills/02-business-case\n",
    )
    assert MODULE.main(["--fixtures", str(path)]) == 0
    assert "not_assessed=1" in capsys.readouterr().out


def test_lint_flags_slug_bearing_prompt(tmp_path, capsys):
    path = write(tmp_path, "- prompt: Improve our accessible color and contrast for the site.\n  expected: accessible-color-and-contrast\n")
    assert MODULE.main(["--fixtures", str(path), "--lint-fixtures"]) == 1
    assert "slug-in-prompt" in capsys.readouterr().out


def test_lint_rule_strips_numeric_prefix():
    assert MODULE.lint_prompt("write the business case", "02-business-case", "")
    assert MODULE.lint_prompt("pick a palette", "02-business-case", "") == []
