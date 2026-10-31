"""Workspace-map resolution for scripts/validate_cross_engine_routes.py (unittest style)."""

import contextlib
import io
import json
import os
import tempfile
import unittest
from pathlib import Path

import yaml

from scripts.validate_cross_engine_routes import load_workspace_map, main, validate_cross_engine_routes

ROOT = Path(__file__).resolve().parents[1]
FIXTURES = yaml.safe_load((ROOT / "tests" / "cross-engine-route-fixtures.yml").read_text(encoding="utf-8"))
REPOSITORIES = sorted({f["target_repository"] for f in FIXTURES})


def renamed_workspace(prefix: str = "checkout-of-") -> tuple[Path, dict[str, Path]]:
    """A temp workspace whose folders do not carry the repository names, plus the map to them."""
    base = Path(tempfile.mkdtemp(prefix="xengine-test-"))
    mapping = {}
    for repo in REPOSITORIES:
        folder = base / f"{prefix}{repo}"
        mapping[repo] = folder
        for fixture in FIXTURES:
            if fixture["target_repository"] == repo:
                target = folder / fixture["target"]
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_text("fixture target\n", encoding="utf-8")
    return base, mapping


def run_main(argv: list[str], env: dict[str, str] | None = None) -> tuple[int, str]:
    buffer = io.StringIO()
    saved = {k: os.environ.get(k) for k in (env or {})}
    os.environ.update(env or {})
    try:
        with contextlib.redirect_stdout(buffer):
            code = main(argv)
    finally:
        for key, value in saved.items():
            if value is None:
                os.environ.pop(key, None)
            else:
                os.environ[key] = value
    return code, buffer.getvalue()


class ResolutionTests(unittest.TestCase):
    def test_default_layout_cannot_find_renamed_checkouts(self):
        base, _ = renamed_workspace()
        findings = validate_cross_engine_routes(ROOT, base)
        self.assertEqual(len(findings), len(FIXTURES))
        self.assertTrue(all("NOT ASSESSED" in f for f in findings))

    def test_mapped_checkouts_resolve_even_when_folder_names_differ(self):
        base, mapping = renamed_workspace()
        self.assertEqual(validate_cross_engine_routes(ROOT, base, mapping), [])

    def test_an_unmapped_repository_stays_not_assessed(self):
        base, mapping = renamed_workspace()
        dropped = REPOSITORIES[0]
        del mapping[dropped]
        findings = validate_cross_engine_routes(ROOT, base, mapping)
        expected = sum(1 for f in FIXTURES if f["target_repository"] == dropped)
        self.assertEqual(len(findings), expected)
        self.assertTrue(all(dropped in f and "NOT ASSESSED" in f for f in findings))

    def test_a_map_entry_pointing_nowhere_is_not_a_pass_and_does_not_fall_back_silently(self):
        base, mapping = renamed_workspace()
        repo = REPOSITORIES[0]
        (base / repo).mkdir()  # a same-named folder exists, but the map names a different, missing one
        mapping[repo] = base / "gone"
        findings = validate_cross_engine_routes(ROOT, base, mapping)
        self.assertTrue(findings and all("mapped to gone" in f for f in findings))

    def test_missing_target_file_in_a_resolved_repository_is_a_finding(self):
        base, mapping = renamed_workspace()
        victim = FIXTURES[0]
        (mapping[victim["target_repository"]] / victim["target"]).unlink()
        findings = validate_cross_engine_routes(ROOT, base, mapping)
        self.assertEqual(len(findings), 1)
        self.assertIn("target not found", findings[0])

    def test_several_workspace_roots_are_searched_in_order(self):
        first = Path(tempfile.mkdtemp(prefix="xengine-empty-"))
        base, mapping = renamed_workspace(prefix="")
        self.assertEqual(validate_cross_engine_routes(ROOT, [first, base]), [])


class MapFileTests(unittest.TestCase):
    def write_map(self, data: object, name: str = "map.json") -> Path:
        path = Path(tempfile.mkdtemp(prefix="xengine-map-")) / name
        path.write_text(json.dumps(data), encoding="utf-8")
        return path

    def test_relative_paths_resolve_from_the_map_files_folder(self):
        path = self.write_map({"a-repo": "checkouts/a"})
        self.assertEqual(load_workspace_map(path)["a-repo"], (path.parent / "checkouts" / "a").resolve())

    def test_wrapped_and_flat_forms_are_accepted(self):
        self.assertIn("r", load_workspace_map(self.write_map({"map": {"r": "x"}})))
        self.assertIn("r", load_workspace_map(self.write_map({"r": "x"})))

    def test_malformed_maps_raise(self):
        for bad in ([], {"r": 3}, {"r": ""}, "text"):
            with self.assertRaises(ValueError):
                load_workspace_map(self.write_map(bad))
        with self.assertRaises(ValueError):
            load_workspace_map(Path(tempfile.mkdtemp(prefix="xengine-map-")) / "absent.json")


class CommandLineTests(unittest.TestCase):
    def test_map_flags_resolve_the_routes(self):
        base, mapping = renamed_workspace()
        argv = ["--workspace-root", str(base)] + [item for repo, path in mapping.items() for item in ("--map", f"{repo}={path}")]
        code, out = run_main(argv)
        self.assertEqual(code, 0, out)
        self.assertIn("PASS", out)

    def test_map_file_flag_and_environment_variable_resolve_the_routes(self):
        base, mapping = renamed_workspace()
        map_file = base / "workspace-map.json"
        map_file.write_text(json.dumps({repo: str(path) for repo, path in mapping.items()}), encoding="utf-8")
        code, out = run_main(["--workspace-root", str(base), "--workspace-map", str(map_file)])
        self.assertEqual(code, 0, out)
        code, out = run_main(["--workspace-root", str(base)], env={"CHWEZI_WORKSPACE_MAP": str(map_file)})
        self.assertEqual(code, 0, out)

    def test_without_a_map_the_renamed_workspace_fails(self):
        base, _ = renamed_workspace()
        code, out = run_main(["--workspace-root", str(base)])
        self.assertEqual(code, 1)
        self.assertIn("NOT ASSESSED", out)

    def test_bad_map_arguments_exit_2(self):
        self.assertEqual(run_main(["--map", "no-equals-sign"])[0], 2)
        self.assertEqual(run_main(["--workspace-map", str(Path(tempfile.mkdtemp()) / "absent.json")])[0], 2)


if __name__ == "__main__":
    unittest.main()
