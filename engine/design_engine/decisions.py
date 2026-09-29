"""Constraint-checked design-system assembly and portable output formats."""

from __future__ import annotations

import json
from typing import Any

from .catalog import Catalog, STACKS


class DecisionError(ValueError):
    """Raised when a design brief is incomplete, contradictory, or unsafe."""


# Visitor modes (M10-10-T10; doctrine/references/visitor-modes.md). Chosen per surface, not per
# project. Idea adapted from Impeccable (pbakaus/impeccable, Apache-2.0, commit 114ea1d).
MODES = ("persuade", "operate", "read", "experience")
LEGACY_MODE_ALIASES = {"app": "operate", "marketing": "persuade"}


def normalise_mode(value: Any) -> tuple[str, str | None]:
    """Return ``(mode, alias_from)``; legacy ``app``/``marketing`` map to ``operate``/``persuade``."""
    if not isinstance(value, str):
        raise DecisionError(f"mode must be one of {', '.join(MODES)}")
    key = value.strip().casefold()
    if key in MODES:
        return key, None
    if key in LEGACY_MODE_ALIASES:
        return LEGACY_MODE_ALIASES[key], key
    raise DecisionError(f"mode must be one of {', '.join(MODES)} (legacy: app, marketing)")


def normalise_decision_mode(decision: dict[str, Any]) -> dict[str, Any]:
    """Read-time normalisation for persisted decisions; the stored file is never rewritten."""
    brief = decision.get("brief") if isinstance(decision, dict) else None
    if isinstance(brief, dict) and "mode" in brief and brief.get("mode") is not None:
        mode, alias = normalise_mode(brief["mode"])
        if alias or mode != brief["mode"]:
            decision = {**decision, "brief": {**brief, "mode": mode, **({"mode_alias_from": alias} if alias else {})}}
    return decision


ALLOWED_BRIEF_KEYS = {
    "name",
    "audience",
    "job",
    "outcome",
    "mode",
    "stack",
    "brand",
    "must_have",
    "must_not",
    "density",
    "motion",
    "variance",
}


def _require_text(brief: dict[str, Any], key: str) -> str:
    value = brief.get(key)
    if not isinstance(value, str) or not value.strip():
        raise DecisionError(f"brief field is required: {key}")
    return value.strip()


def _dial(value: Any, name: str) -> int:
    if isinstance(value, bool) or not isinstance(value, int) or not 1 <= value <= 10:
        raise DecisionError(f"{name} must be an integer from 1 to 10")
    return value


def _terms(values: Any, key: str) -> list[str]:
    if values is None:
        return []
    if not isinstance(values, list) or not all(isinstance(item, str) and item.strip() for item in values):
        raise DecisionError(f"{key} must be a list of non-empty strings")
    return [item.strip() for item in values]


def _best(catalog: Catalog, query: str, domain: str, stack: str | None) -> dict[str, Any] | None:
    """Top calibrated result, or None when the catalogue abstains (recorded, never fabricated)."""
    result = catalog.search(query, domain=domain, stack=stack, limit=3)
    return result["results"][0] if result["results"] else None


def build_design_system(brief: dict[str, Any], catalog: Catalog) -> dict[str, Any]:
    if not isinstance(brief, dict):
        raise DecisionError("brief must be an object")
    unknown = set(brief).difference(ALLOWED_BRIEF_KEYS)
    if unknown:
        raise DecisionError(f"unknown brief keys: {sorted(unknown)}")
    name = _require_text(brief, "name")
    audience = _require_text(brief, "audience")
    job = _require_text(brief, "job")
    outcome = _require_text(brief, "outcome")
    mode, mode_alias_from = normalise_mode(brief.get("mode", "operate"))
    stack = brief.get("stack")
    if stack is not None and stack not in STACKS:
        raise DecisionError(f"unsupported stack: {stack}")
    if stack is not None:
        catalog.search("component", stack=stack, limit=1)
    must_have = _terms(brief.get("must_have"), "must_have")
    must_not = _terms(brief.get("must_not"), "must_not")
    if set(item.casefold() for item in must_have).intersection(item.casefold() for item in must_not):
        raise DecisionError("brief contains contradictory must_have and must_not constraints")
    dials = {
        "density": _dial(brief.get("density", 5), "density"),
        "motion": _dial(brief.get("motion", 4), "motion"),
        "variance": _dial(brief.get("variance", 4), "variance"),
    }
    style = _best(catalog, f"{job} {outcome} {mode}", "style", stack)
    typography = _best(catalog, f"{audience} readability localization", "typography", stack)
    color = _best(catalog, f"{job} state contrast theme", "color", stack)
    ux = _best(catalog, f"{job} error recovery focus", "ux", stack)
    chart = _best(catalog, f"{job} capacity comparison decision", "chart", stack)
    product = _best(catalog, f"{job} {outcome}", "product", stack)
    decisions = {
        "product": product,
        "style": style,
        "typography": typography,
        "color": color,
        "ux": ux,
        "chart": chart,
    }
    abstained = sorted(key for key, value in decisions.items() if value is None)
    for item in must_not:
        if any(item.casefold() in json.dumps(value, ensure_ascii=False).casefold() for value in decisions.values() if value is not None):
            raise DecisionError(f"catalog decision conflicts with must_not constraint: {item}")
    brief_out: dict[str, Any] = {
        "name": name,
        "audience": audience,
        "job": job,
        "outcome": outcome,
        "mode": mode,
        "stack": stack,
        "brand": brief.get("brand"),
        "must_have": must_have,
        "must_not": must_not,
    }
    if mode_alias_from:
        brief_out["mode_alias_from"] = mode_alias_from
    return {
        "schema_version": "1.0",
        "catalog_revision": catalog.revision,
        "decision_id": f"{name.casefold().replace(' ', '-')}-design-system",
        "brief": brief_out,
        "dials": dials,
        "decisions": decisions,
        "abstained_domains": abstained,
        "alternatives": {
            "style": [style["record_id"]] if style else [],
            "interaction": [ux["record_id"]] if ux else [],
        },
        "evidence_contract": {
            "required": [
                "state-and-content-matrix",
                "token-to-render-trace",
                "responsive-and-keyboard-check",
                "independent-review",
            ],
            "status": "NOT_ASSESSED",
        },
        "provenance": {
            "catalog_source": str(catalog.source) if catalog.source else "in-memory",
            "catalog_revision": catalog.revision,
            "calibration_version": catalog.calibration_version,
            "method": "deterministic BM25 retrieval with calibrated abstention plus typed constraint checks",
        },
    }


def format_decision(decision: dict[str, Any], output: str = "json") -> str:
    if output == "json":
        return json.dumps(decision, ensure_ascii=False, indent=2, sort_keys=True)
    if output not in {"markdown", "text"}:
        raise DecisionError("output must be json, markdown, or text")
    brief = decision["brief"]
    lines = [
        f"Design system: {brief['name']}",
        f"Mode: {brief['mode']}{' (from legacy ' + brief['mode_alias_from'] + ')' if brief.get('mode_alias_from') else ''} | Stack: {brief.get('stack') or 'unspecified'}",
        f"Audience: {brief['audience']}",
        f"Job: {brief['job']}",
        f"Outcome: {brief['outcome']}",
        "",
        "Dials:",
        *(f"- {key}: {value}/10" for key, value in decision["dials"].items()),
        "",
        "Decisions:",
    ]
    for key, value in decision["decisions"].items():
        if value is None:
            lines.append(f"- {key}: ABSTAINED (no record met the calibrated floor; do not persist without an accepted abstention)")
        else:
            lines.append(f"- {key}: {value['title']} [{value['record_id']}]")
    lines.extend(
        [
            "",
            "Evidence status: NOT_ASSESSED until the required render, interaction, review, and trace records exist.",
        ]
    )
    return "\n".join(lines)
