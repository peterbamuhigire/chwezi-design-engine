import importlib.util
import subprocess
import sys
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "scripts" / "check_file_count.py"
spec = importlib.util.spec_from_file_location("check_file_count", MODULE_PATH)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


def test_checkout_limit_is_inclusive(tmp_path):
    for index in range(5000):
        (tmp_path / f"{index}.txt").touch()
    assert module.count_entries(tmp_path, "checkout") == 5000


def test_checkout_over_limit_fails_at_5001(tmp_path):
    for index in range(5001):
        (tmp_path / f"{index}.txt").touch()
    assert module.count_entries(tmp_path, "checkout") == 5001


def test_package_mode_excludes_transient_directory_entries(tmp_path):
    (tmp_path / "kept.txt").touch()
    cache = tmp_path / ".git"
    cache.mkdir()
    (cache / "object").touch()
    assert module.count_entries(tmp_path, "checkout") == 2
    assert module.count_entries(tmp_path, "package") == 1


def test_unreadable_subtree_fails_closed_instead_of_returning_partial_count(tmp_path, monkeypatch, capsys):
    (tmp_path / "visible.txt").touch()

    def walk_with_unreadable_subtree(root, *, followlinks, onerror):
        assert followlinks is False
        onerror(PermissionError("fixture: unreadable subtree"))
        yield  # pragma: no cover - onerror must abort before yielding a count

    monkeypatch.setattr(module.os, "walk", walk_with_unreadable_subtree)
    monkeypatch.setattr(sys, "argv", [str(MODULE_PATH), str(tmp_path)])
    assert module.main() == 2
    assert "FAIL: cannot count all entries: fixture: unreadable subtree" in capsys.readouterr().out


def test_engine_validator_fails_a_checkout_over_the_limit(tmp_path):
    font_categories = (
        "01-formal-institutional",
        "02-editorial-literary",
        "03-modern-product-grotesque",
        "04-technical-data-code",
        "05-friendly-humanist",
        "06-expressive-display-artistic",
        "07-script-cursive-handwritten",
        "08-body-ui-workhorses",
    )
    for category in font_categories:
        (tmp_path / "fonts" / category).mkdir(parents=True)
    registry = tmp_path / "tools" / "slop-detector" / "rules" / "registry.json"
    registry.parent.mkdir(parents=True)
    registry.write_text('{"rules": []}\n', encoding="utf-8")
    for index in range(4999):
        (tmp_path / f"{index}.txt").touch()
    assert module.count_entries(tmp_path, "checkout") == 5000
    (tmp_path / "one-over.txt").touch()
    validator = MODULE_PATH.with_name("validate_engine.py")
    result = subprocess.run(
        [sys.executable, str(validator), "--root", str(tmp_path)],
        capture_output=True,
        text=True,
        check=False,
    )
    assert result.returncode == 1
    assert "file-count-checkout=5001/5000" in result.stdout
    assert "SLOP-REGISTRY ERROR" not in result.stdout
    assert "missing_font_categories" not in result.stdout
