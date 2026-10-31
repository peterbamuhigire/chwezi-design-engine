"""Unit tests for scripts/validate_portability.py (unittest style; runs without pytest)."""

import json
import tempfile
import unittest
from pathlib import Path

from scripts.validate_portability import ALLOWLIST, main, scan_portability

ROOT = Path(__file__).resolve().parents[1]
# Built from parts so this file does not itself contain the patterns it detects.
WEBROOT = "C:" + "\\" + "wam" + "p64" + "\\" + "www" + "\\" + "sibling-engine"
DRIVE = "D:" + "\\" + "Projects" + "\\" + "thing"
HOME = "/" + "home" + "/" + "alice" + "/notes"
USERS = "/" + "Users" + "/" + "bob" + "/Desktop"


def make_tree(files: dict[str, str], allowlist: dict | None = None) -> Path:
    base = Path(tempfile.mkdtemp(prefix="portability-test-"))
    for rel, text in files.items():
        target = base / rel
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(text, encoding="utf-8")
    gov = base / ALLOWLIST
    gov.parent.mkdir(parents=True, exist_ok=True)
    gov.write_text(json.dumps(allowlist if allowlist is not None else {"entries": []}), encoding="utf-8")
    return base


class RepositoryTests(unittest.TestCase):
    def test_repository_has_no_unlisted_machine_paths_or_escaping_links(self):
        result = scan_portability(ROOT)
        self.assertEqual(result["findings"], [])
        self.assertEqual(result["allowlist_problems"], [])
        self.assertFalse(result["unreadable"])


class PathDetectionTests(unittest.TestCase):
    def kinds(self, text: str) -> list[str]:
        tree = make_tree({"notes.md": text})
        return [f.split("(")[1].split(")")[0] for f in scan_portability(tree)["findings"] if "machine-specific" in f]

    def test_each_pattern_family_is_detected(self):
        self.assertEqual(self.kinds(f"See `{WEBROOT}` for the checkout."), ["windows-webroot", "windows-drive-path"])
        self.assertEqual(self.kinds(f"Saved to {DRIVE}."), ["windows-drive-path"])
        self.assertEqual(self.kinds(f"Open {HOME}"), ["home-path"])
        self.assertEqual(self.kinds(f"Open {USERS}"), ["users-path"])

    def test_placeholders_and_escaped_newlines_are_not_paths(self):
        for text in (
            "Use C:" + "\\Users\\<name>\\Downloads as an example.",
            "Home is /" + "home" + "/user/project in the docs.",
            "console.error('  Visible elements:\\n  ' + found);",
            "Fetch https://example.org/path and mailto:a@b.c.",
        ):
            self.assertEqual(self.kinds(text), [], text)


class LinkTests(unittest.TestCase):
    def findings(self, text: str, extra: dict[str, str] | None = None) -> list[str]:
        files = {"skills/a/SKILL.md": text, "skills/a/ref.md": "ok\n"}
        files.update(extra or {})
        return scan_portability(make_tree(files))["findings"]

    def test_link_that_climbs_out_of_the_repository_is_flagged(self):
        found = self.findings("See [gate](../../../sibling-engine/docs/gate.md).")
        self.assertEqual(len(found), 1)
        self.assertIn("link-leaves-repository", found[0])

    def test_broken_in_repository_link_is_flagged_and_good_link_is_not(self):
        found = self.findings("[missing](missing.md) and [present](ref.md) and [anchor](ref.md#top).")
        self.assertEqual(len(found), 1)
        self.assertIn("broken-relative-link: missing.md", found[0])

    def test_code_spans_fences_urls_and_anchors_are_ignored(self):
        text = "Format `0.0%_);[Red](0.0%)`.\n\n```md\n[x](nowhere.md)\n```\n\n[web](https://example.org/a) [here](#top) [mail](mailto:a@b.c)\n"
        self.assertEqual(self.findings(text), [])


class AllowlistTests(unittest.TestCase):
    def scan(self, allowlist: dict, text: str = None) -> dict:
        return scan_portability(make_tree({"docs/old.md": text or f"Old note about {WEBROOT}.\n"}, allowlist))

    def test_allowlisted_file_with_a_reason_passes(self):
        result = self.scan({"entries": [{"path": "docs/old.md", "max_hits": 2, "reason": "historical record"}]})
        self.assertEqual(result["findings"], [])

    def test_ratchet_fails_when_hits_exceed_the_recorded_count(self):
        result = self.scan({"entries": [{"path": "docs/old.md", "max_hits": 1, "reason": "historical record"}]})
        self.assertEqual(len(result["findings"]), 1)
        self.assertIn("exceed the allowlisted 1", result["findings"][0])

    def test_entry_without_a_reason_is_a_problem(self):
        result = self.scan({"entries": [{"path": "docs/old.md", "max_hits": 2}]})
        self.assertTrue(any("non-empty `reason`" in p for p in result["allowlist_problems"]))

    def test_stale_entry_fails_so_the_list_only_shrinks(self):
        result = self.scan({"entries": [{"path": "docs/gone.md", "reason": "was needed once"}]}, text="Clean text.\n")
        self.assertEqual(len(result["findings"]), 1)
        self.assertIn("stale allowlist entry", result["findings"][0])

    def test_link_ratchet_applies_to_link_findings(self):
        files = {"docs/old.md": "[a](../../../x/y.md) [b](../../../x/z.md)\n"}
        loose = scan_portability(make_tree(files, {"entries": [{"path": "docs/old.md", "max_links": 1, "reason": "historical record"}]}))
        self.assertTrue(any("link findings exceed" in f for f in loose["findings"]))
        exact = scan_portability(make_tree(files, {"entries": [{"path": "docs/old.md", "max_links": 2, "reason": "historical record"}]}))
        self.assertEqual(exact["findings"], [])


class CommandLineTests(unittest.TestCase):
    def test_exit_codes(self):
        clean = make_tree({"a.md": "Clean.\n"})
        dirty = make_tree({"a.md": f"Path {DRIVE}.\n"})
        missing = Path(tempfile.mkdtemp(prefix="portability-test-"))
        self.assertEqual(main(["--root", str(clean)]), 0)
        self.assertEqual(main(["--root", str(dirty)]), 1)
        self.assertEqual(main(["--root", str(missing)]), 2)


if __name__ == "__main__":
    unittest.main()
