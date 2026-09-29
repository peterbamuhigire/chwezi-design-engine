"""Non-destructive project-scoped persistence with path and overwrite guards."""

from __future__ import annotations

from copy import deepcopy
import json
from pathlib import Path
import re
import tempfile
from typing import Any

from .decisions import DecisionError, normalise_decision_mode


class PersistenceError(ValueError):
    """Raised when a project write would be unsafe or invalid."""


PROJECT_ID = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$")


def _project_dir(root: str | Path, project_id: str) -> Path:
    if not isinstance(project_id, str) or not PROJECT_ID.fullmatch(project_id):
        raise PersistenceError("project_id must be a safe identifier without path separators")
    base = Path(root).resolve()
    target = (base / project_id).resolve()
    if target.parent != base:
        raise PersistenceError("project path escaped the configured root")
    return target


def _write_json(path: Path, payload: dict[str, Any], overwrite: bool) -> None:
    if path.exists() and not overwrite:
        raise PersistenceError(f"refusing to overwrite existing file: {path}")
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, temp_name = tempfile.mkstemp(prefix=f".{path.stem}.", suffix=".tmp", dir=path.parent)
    try:
        with open(fd, "w", encoding="utf-8", newline="\n") as handle:
            json.dump(payload, handle, ensure_ascii=False, indent=2, sort_keys=True)
            handle.write("\n")
        Path(temp_name).replace(path)
    except Exception:
        Path(temp_name).unlink(missing_ok=True)
        raise


def save_project(root: str | Path, project_id: str, decision: dict[str, Any], *, overwrite: bool = False) -> Path:
    target = _project_dir(root, project_id) / "design-system.json"
    _write_json(target, decision, overwrite)
    return target


def save_page_override(
    root: str | Path,
    project_id: str,
    page_id: str,
    override: dict[str, Any],
    *,
    overwrite: bool = False,
) -> Path:
    page_dir = _project_dir(root, project_id) / "pages"
    if not isinstance(page_id, str) or not PROJECT_ID.fullmatch(page_id):
        raise PersistenceError("page_id must be a safe identifier without path separators")
    target = page_dir / f"{page_id}.json"
    _write_json(target, override, overwrite)
    return target


def load_project(root: str | Path, project_id: str) -> dict[str, Any]:
    target = _project_dir(root, project_id) / "design-system.json"
    if not target.is_file():
        raise PersistenceError(f"project master not found: {target}")
    stored = json.loads(target.read_text(encoding="utf-8"))
    # Legacy "app"/"marketing" modes are normalised at read time (M10-10-T10); the file is untouched.
    try:
        return normalise_decision_mode(stored)
    except DecisionError as exc:
        raise PersistenceError(f"stored project has an invalid mode: {exc}") from exc


def _deep_merge(base: dict[str, Any], override: dict[str, Any]) -> dict[str, Any]:
    merged = deepcopy(base)
    for key, value in override.items():
        if isinstance(value, dict) and isinstance(merged.get(key), dict):
            merged[key] = _deep_merge(merged[key], value)
        else:
            merged[key] = deepcopy(value)
    return merged


def resolve_project(root: str | Path, project_id: str, page_id: str | None = None) -> dict[str, Any]:
    master = load_project(root, project_id)
    if page_id is None:
        return master
    if not isinstance(page_id, str) or not PROJECT_ID.fullmatch(page_id):
        raise PersistenceError("page_id must be a safe identifier without path separators")
    override_path = _project_dir(root, project_id) / "pages" / f"{page_id}.json"
    if not override_path.is_file():
        return master
    return _deep_merge(master, json.loads(override_path.read_text(encoding="utf-8")))
