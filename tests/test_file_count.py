import importlib.util
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
