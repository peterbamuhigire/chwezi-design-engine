"""Validate declared cross-engine handoffs against a sibling-engine workspace.

Each declared route names a repository (for example `chwezi-dev-engine`) and a path inside it.
The repository is found, in order, through:

1. `--map NAME=PATH` (repeatable), for checkouts whose folder name differs from the repository name;
2. `--workspace-map FILE`, or the `CHWEZI_WORKSPACE_MAP` environment variable naming such a file: a
   JSON object of repository name to checkout path (relative paths resolve from the file's folder);
3. `--workspace-root DIR` (repeatable), a folder holding checkouts named like their repositories
   (default: the folder that holds this checkout).

A repository that cannot be found is `NOT ASSESSED` and fails the run; it is never a pass.
"""

from __future__ import annotations

import argparse
import json
import os
from pathlib import Path

import yaml


def load_workspace_map(path: Path) -> dict[str, Path]:
    """Read a JSON object of repository name to checkout path. Raises ValueError on a bad file."""
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise ValueError(f"cannot read workspace map {path}: {exc}") from exc
    if isinstance(data, dict) and isinstance(data.get("map"), dict):
        data = data["map"]
    if not isinstance(data, dict) or not all(isinstance(k, str) and isinstance(v, str) and v for k, v in data.items()):
        raise ValueError(f"workspace map {path} must be a JSON object of repository name to path")
    return {name: (path.parent / value).resolve() if not Path(value).is_absolute() else Path(value) for name, value in data.items()}


def resolve_repository(name: str, workspace_roots: list[Path], mapping: dict[str, Path]) -> tuple[Path | None, str]:
    """Return (directory or None, how it was looked for)."""
    if name in mapping:
        target = mapping[name]
        return (target if target.is_dir() else None), f"mapped to {target.name}"
    for base in workspace_roots:
        if (base / name).is_dir():
            return base / name, "workspace root"
    return None, "not mapped and not found beside the workspace roots"


def validate_cross_engine_routes(root: Path, workspace_root: Path | list[Path], mapping: dict[str, Path] | None = None) -> list[str]:
    roots = list(workspace_root) if isinstance(workspace_root, (list, tuple)) else [workspace_root]
    mapping = mapping or {}
    findings: list[str] = []
    fixture_path = root / "tests" / "cross-engine-route-fixtures.yml"
    try:
        fixtures = yaml.safe_load(fixture_path.read_text(encoding="utf-8")) or []
    except (OSError, yaml.YAMLError) as exc:
        return [f"cannot read cross-engine route fixtures: {exc}"]
    if not isinstance(fixtures, list):
        return ["cross-engine route fixtures must be a list"]

    for index, fixture in enumerate(fixtures):
        if not isinstance(fixture, dict):
            findings.append(f"cross-engine route fixture {index} must be an object")
            continue
        label = str(fixture.get("id", index))
        source_value = str(fixture.get("source", ""))
        reference = str(fixture.get("reference", ""))
        repository = str(fixture.get("target_repository", ""))
        target_value = str(fixture.get("target", ""))
        source = root / source_value
        if not source.is_file():
            findings.append(f"cross-engine route {label} source not found: {source_value}")
        elif reference not in source.read_text(encoding="utf-8"):
            findings.append(f"cross-engine route {label} reference absent from source: {reference}")

        target_repository, how = resolve_repository(repository, roots, mapping)
        if target_repository is None:
            findings.append(
                f"cross-engine route {label} NOT ASSESSED: target repository not found: {repository} ({how})"
            )
            continue
        target = target_repository / target_value
        if not target.is_file():
            findings.append(f"cross-engine route {label} target not found: {repository}/{target_value}")

    return findings


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument(
        "--workspace-root",
        type=Path,
        action="append",
        help="directory containing sibling checkouts named like their repositories (repeatable)",
    )
    parser.add_argument("--map", action="append", default=[], metavar="NAME=PATH", help="checkout path for one repository (repeatable)")
    parser.add_argument("--workspace-map", type=Path, help="JSON file of repository name to checkout path")
    args = parser.parse_args(argv)

    mapping: dict[str, Path] = {}
    try:
        map_file = args.workspace_map or (Path(os.environ["CHWEZI_WORKSPACE_MAP"]) if os.environ.get("CHWEZI_WORKSPACE_MAP") else None)
        if map_file:
            mapping.update(load_workspace_map(map_file.resolve()))
        for item in args.map:
            name, sep, value = item.partition("=")
            if not sep or not name.strip() or not value.strip():
                raise ValueError(f"--map expects NAME=PATH, got {item!r}")
            mapping[name.strip()] = Path(value.strip()).resolve()
    except ValueError as exc:
        print(f"cross-engine-route-validator: {exc}")
        return 2
    roots = [p.resolve() for p in (args.workspace_root or [Path(__file__).resolve().parents[2]])]
    findings = validate_cross_engine_routes(args.root.resolve(), roots, mapping)
    print("cross-engine-route-validator:")
    print(f"- workspace roots: {', '.join(str(r) for r in roots)}")
    print(f"- mapped repositories: {', '.join(sorted(mapping)) if mapping else 'none'}")
    print(f"- findings: {len(findings)}")
    for finding in findings:
        print(f"[FAIL] {finding}")
    if not findings:
        print("PASS: all declared cross-engine handoffs resolve in the inspected workspace")
    return 1 if findings else 0


if __name__ == "__main__":
    raise SystemExit(main())
