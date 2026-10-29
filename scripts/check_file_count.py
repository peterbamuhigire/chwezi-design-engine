#!/usr/bin/env python3
"""Enforce the documented 5,000-file ceiling on a checkout or package tree."""

from __future__ import annotations

import argparse
import os
from pathlib import Path

LIMIT = 5000
PACKAGE_EXCLUDES = {".git", ".cache", "cache", "__pycache__", "node_modules", ".venv", "venv"}


def count_entries(root: Path, mode: str) -> int:
    """Count files and symlinks; never follow directory symlinks."""
    count = 0
    def fail_on_walk_error(error: OSError) -> None:
        # os.walk otherwise suppresses traversal errors and reports a partial
        # count that can incorrectly pass the release ceiling.
        raise error

    for current, dirs, files in os.walk(root, followlinks=False, onerror=fail_on_walk_error):
        current_path = Path(current)
        if mode == "package":
            dirs[:] = [name for name in dirs if name not in PACKAGE_EXCLUDES]
        count += len(files)
        count += sum(1 for name in dirs if (current_path / name).is_symlink())
        # os.walk places directory symlinks in dirs; count them but don't descend.
        dirs[:] = [name for name in dirs if not (current_path / name).is_symlink()]
    return count


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("root", nargs="?", default=".")
    parser.add_argument("--mode", choices=("checkout", "package"), default="checkout")
    parser.add_argument("--limit", type=int, default=LIMIT)
    args = parser.parse_args()
    root = Path(args.root).resolve()
    if not root.is_dir():
        parser.error(f"not a directory: {root}")
    try:
        count = count_entries(root, args.mode)
    except OSError as exc:
        print(f"FAIL: cannot count all entries: {exc}")
        return 2
    print(f"{args.mode}: {count} entries (limit {args.limit})")
    if count > args.limit:
        print(f"FAIL: {args.mode} exceeds the {args.limit}-entry limit")
        return 1
    print("PASS")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
