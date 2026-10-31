#!/usr/bin/env python3
"""Fail on machine-specific paths and on links that leave the repository.

Two checks, both deterministic text scans over every text file in the tree:

1. Machine-specific paths: a Windows web-root folder, a Windows drive path, `/home/<user>/`
   or `/Users/<user>`. A path that names one developer's machine breaks on every other
   checkout, and a user name does not belong in a public repository.
2. Markdown links that leave the repository (a relative link that climbs above the
   repository root, for example into a sibling checkout) or that point at a file that
   does not exist. Sibling engines are named by identifier and resolved through the
   workspace map, never by a relative path.

Known and justified exceptions live in `governance/portability-allowlist.json`. Every
entry needs a reason. An entry may carry `max_hits` (path hits) and `max_links` (link
findings) as ratchets: more than the recorded count fails. An entry that matches no file
with an issue is stale and fails, so the list can only shrink as files are repaired.
Vendored third-party documentation under `fonts/` is checked for paths but not for links
(its images are not committed).

Exit codes: 0 clean, 1 findings, 2 the allowlist or tree could not be read.
"""

from __future__ import annotations

import argparse
import fnmatch
import json
import os
import re
import sys
from pathlib import Path

ALLOWLIST = Path("governance") / "portability-allowlist.json"
SKIP_DIRS = {".git", "node_modules", "__pycache__", ".cache", ".venv", "venv"}
LINK_SKIP_PREFIXES = ("fonts/",)
BINARY_SUFFIXES = {
    ".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico", ".pdf", ".docx", ".pptx", ".xlsx",
    ".woff", ".woff2", ".ttf", ".otf", ".eot", ".ttc", ".zip", ".gz", ".pyc", ".svgz",
}
PLACEHOLDER_USERS = {"user", "username", "you", "name", "example", "runner", "ubuntu", "me", "your-name"}

PATH_PATTERNS = (
    ("windows-webroot", re.compile("wam" "p64", re.I)),
    ("windows-drive-path", re.compile(r"(?<![A-Za-z0-9])[A-Za-z]:(?:\\{1,2}|/)[A-Za-z0-9_$.][^\s`'\"<>|]*")),
    ("home-path", re.compile(r"/home/([A-Za-z_][A-Za-z0-9_-]*)/")),
    ("users-path", re.compile(r"/Users/([A-Za-z_][A-Za-z0-9_.-]*)")),
)
PLACEHOLDER_DRIVE_USER = re.compile(r"[A-Za-z]:\\{1,2}Users\\{1,2}(?:<[^>]*>|\{[^}]*\}|%[A-Za-z_]+%|user\b|username\b|you\b|name\b)", re.I)
LINK = re.compile(r"!?\[[^\]\n]*\]\(([^)\n]+)\)")
INLINE_CODE = re.compile(r"`[^`\n]*`")
SCHEME = re.compile(r"^[A-Za-z][A-Za-z0-9+.-]*:")


def iter_files(root: Path):
    for current, dirs, files in os.walk(root, followlinks=False):
        dirs[:] = sorted(d for d in dirs if d not in SKIP_DIRS and not (Path(current) / d).is_symlink())
        for name in sorted(files):
            path = Path(current) / name
            if path.suffix.lower() in BINARY_SUFFIXES or path.is_symlink():
                continue
            yield path


def read_text(path: Path) -> str | None:
    try:
        data = path.read_bytes()
    except OSError:
        return None
    if b"\x00" in data[:4096]:
        return None
    try:
        return data.decode("utf-8")
    except UnicodeDecodeError:
        return None


def path_hits(text: str) -> list[tuple[int, str, str]]:
    """Return (line, kind, excerpt) for each machine-specific path in the text."""
    hits: list[tuple[int, str, str]] = []
    for number, line in enumerate(text.splitlines(), 1):
        for kind, pattern in PATH_PATTERNS:
            for match in pattern.finditer(line):
                if kind in ("home-path", "users-path") and match.group(1).lower() in PLACEHOLDER_USERS:
                    continue
                if kind == "windows-drive-path" and PLACEHOLDER_DRIVE_USER.match(line, match.start()):
                    continue
                hits.append((number, kind, match.group(0)[:60]))
    return hits


def link_findings(root: Path, path: Path, text: str) -> list[tuple[int, str, str]]:
    """Return (line, kind, target) for relative links that escape the repository or do not resolve."""
    found: list[tuple[int, str, str]] = []
    in_fence = False
    for number, line in enumerate(text.splitlines(), 1):
        if line.lstrip().startswith(("```", "~~~")):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        for match in LINK.finditer(INLINE_CODE.sub("", line)):
            raw = match.group(1).strip()
            target = raw[1:].split(">", 1)[0] if raw.startswith("<") else raw.split()[0]
            target = target.split("#", 1)[0].split("?", 1)[0]
            if not target or SCHEME.match(target) or target.startswith("/"):
                continue
            resolved = Path(os.path.normpath(path.parent / target))
            try:
                resolved.relative_to(root)
            except ValueError:
                found.append((number, "link-leaves-repository", target))
                continue
            if not resolved.exists():
                found.append((number, "broken-relative-link", target))
    return found


def load_allowlist(root: Path) -> tuple[list[dict], list[str]]:
    path = root / ALLOWLIST
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        return [], [f"cannot read {ALLOWLIST.as_posix()}: {exc}"]
    entries = data.get("entries") if isinstance(data, dict) else None
    if not isinstance(entries, list):
        return [], [f"{ALLOWLIST.as_posix()} must hold an `entries` list"]
    problems: list[str] = []
    for index, entry in enumerate(entries):
        if not isinstance(entry, dict) or not str(entry.get("path", "")).strip():
            problems.append(f"allowlist entry {index} needs a `path`")
        elif not str(entry.get("reason", "")).strip():
            problems.append(f"allowlist entry {entry['path']} needs a non-empty `reason`")
        else:
            for key in ("max_hits", "max_links"):
                if key in entry and not isinstance(entry[key], int):
                    problems.append(f"allowlist entry {entry['path']} has a non-integer `{key}`")
    return entries, problems


def scan_portability(root: Path) -> dict:
    """Scan the tree. Returns findings, allowlist problems and summary counts."""
    entries, problems = load_allowlist(root)
    if problems and not entries:
        return {"findings": [], "allowlist_problems": problems, "files_scanned": 0, "path_hit_files": 0, "link_findings": 0, "unreadable": True}
    findings: list[str] = []
    used: set[int] = set()
    scanned = path_hit_files = link_total = 0
    for path in iter_files(root):
        text = read_text(path)
        if text is None:
            continue
        scanned += 1
        rel = path.relative_to(root).as_posix()
        hits = path_hits(text)
        links: list[tuple[int, str, str]] = []
        if path.suffix.lower() == ".md" and not rel.startswith(LINK_SKIP_PREFIXES):
            links = link_findings(root, path, text)
        if hits:
            path_hit_files += 1
        link_total += len(links)
        if not hits and not links:
            continue
        owner = next((i for i, e in enumerate(entries) if fnmatch.fnmatch(rel, str(e.get("path", "")))), None)
        if owner is None:
            findings.extend(f"{rel}:{n} machine-specific path ({kind}): {excerpt}" for n, kind, excerpt in hits)
            findings.extend(f"{rel}:{n} {kind}: {target}" for n, kind, target in links)
            continue
        used.add(owner)
        max_hits, max_links = entries[owner].get("max_hits"), entries[owner].get("max_links")
        if isinstance(max_hits, int) and len(hits) > max_hits:
            findings.append(f"{rel}: {len(hits)} machine-specific paths exceed the allowlisted {max_hits}")
        if isinstance(max_links, int) and len(links) > max_links:
            findings.append(f"{rel}: {len(links)} link findings exceed the allowlisted {max_links}")
    for index, entry in enumerate(entries):
        if index not in used:
            findings.append(f"stale allowlist entry (matches no file with an issue): {entry.get('path')}")
    return {
        "findings": findings,
        "allowlist_problems": problems,
        "files_scanned": scanned,
        "path_hit_files": path_hit_files,
        "link_findings": link_total,
        "unreadable": False,
    }


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    args = parser.parse_args(argv)
    result = scan_portability(args.root.resolve())
    print("portability-validator:")
    print(f"- files scanned: {result['files_scanned']}")
    print(f"- files with machine-specific paths: {result['path_hit_files']} (allowlisted files are counted)")
    print(f"- link findings: {result['link_findings']}")
    for problem in result["allowlist_problems"]:
        print(f"[FAIL] {problem}")
    for finding in result["findings"]:
        print(f"[FAIL] {finding}")
    if result["unreadable"]:
        return 2
    failed = bool(result["findings"] or result["allowlist_problems"])
    if not failed:
        print("PASS: no unlisted machine-specific paths; no links leave the repository or break")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
