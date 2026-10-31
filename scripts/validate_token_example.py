#!/usr/bin/env python3
"""Fail-closed checks for a three-tier design-token file.

Always checked: every `{alias}` resolves, no alias cycle, no type mismatch across an alias,
and components resolve through the semantic tier. Two profiles:

- `canonical-example` (default): also requires the roles the shipped example defines
  (`semantic.color.action.danger.*`, `semantic.radius.control.sm`). It guards that file.
- `generic`: only the structural checks, for a practitioner's own token pack.

Two further checks run by default; `--skip-value-shapes` and `--skip-contrast-claims` switch
them off for a legacy pack that still uses CSS strings:

- value shapes: literal `color`, `dimension`, `duration`, `fontFamily`, `fontWeight`
  and `cubicBezier` values use the shapes of the Design Tokens Format Module 2025.10 and its
  Color Module (Final Community Group Reports of 28 October 2025, not W3C Standards). A CSS
  string such as `oklch(0.6 0.16 255)` or `16px` is not defined there. An OKLCH colour with a
  `hex` fallback must have a hex that matches its components when the colour is in gamut.
- contrast claims: every claim of the form `vs <token> = N:1` in a `$description` is
  recomputed from the token values (WCAG relative luminance, via the engine catalogue helper)
  and must agree to within 0.05. Theme overlays under `_themes.<name>` are resolved over the
  base tokens.

This is a structural and arithmetic guard, not a claim of full DTCG conformance, and it does not
test a Style Dictionary or Figma import.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(Path(__file__).resolve().parent))

import token_color  # noqa: E402

REFERENCE = re.compile(r"^\{([^{}]+)\}$")
PRIMITIVE_ROOTS = {"color", "space", "font", "radius", "elevation", "duration", "easing", "size"}
RESERVED_ROOTS = {"$description", "_themes", "semantic"} | PRIMITIVE_ROOTS
CLAIM = re.compile(r"vs\s+([A-Za-z0-9_.\-]+?)(?:\(dark\))?\s*=\s*([0-9]+(?:\.[0-9]+)?):1", re.I)
FONT_WEIGHT_ALIASES = {
    "thin", "hairline", "extra-light", "ultra-light", "light", "normal", "regular", "book", "medium",
    "semi-bold", "demi-bold", "bold", "extra-bold", "ultra-bold", "black", "heavy", "extra-black", "ultra-black",
}
CLAIM_TOLERANCE = 0.05
HEX_TOLERANCE = 2


def _walk(node: object, path: tuple[str, ...] = (), group_type: str | None = None):
    """Yield (dotted path, record, effective type). A `$type` on a group is inherited."""
    if not isinstance(node, dict):
        return
    group_type = node.get("$type") if isinstance(node.get("$type"), str) and "$value" not in node else group_type
    if "$value" in node:
        yield ".".join(path), node, node.get("$type") or group_type
    for key, value in node.items():
        if not key.startswith("$"):
            yield from _walk(value, path + (key,), group_type)


def _is_number(value: object) -> bool:
    return isinstance(value, (int, float)) and not isinstance(value, bool)


def _shape_problem(kind: str | None, value: object) -> str | None:
    """Return a description of why a literal value is not in the 2025.10 shape, or None."""
    if kind == "color":
        if not isinstance(value, dict):
            return f"colour must be an object with colorSpace and components, found {type(value).__name__}"
        if not isinstance(value.get("colorSpace"), str):
            return "colour object needs a string colorSpace"
        comps = value.get("components")
        if not (isinstance(comps, list) and len(comps) == 3 and all(_is_number(c) or c == "none" for c in comps)):
            return "colour object needs components: three numbers (or the keyword none)"
        if "alpha" in value and not (_is_number(value["alpha"]) and 0 <= value["alpha"] <= 1):
            return "colour alpha must be a number from 0 to 1"
        if "hex" in value and not token_color.HEX_RE.match(str(value["hex"])):
            return "colour hex must be six-digit #rrggbb"
    elif kind == "dimension":
        if not (isinstance(value, dict) and _is_number(value.get("value")) and value.get("unit") in ("px", "rem")):
            return "dimension must be an object {value: number, unit: px or rem}"
    elif kind == "duration":
        if not (isinstance(value, dict) and _is_number(value.get("value")) and value.get("unit") in ("ms", "s")):
            return "duration must be an object {value: number, unit: ms or s}"
    elif kind == "fontFamily":
        ok = isinstance(value, str) and "," not in value
        ok = ok or (isinstance(value, list) and value and all(isinstance(v, str) and v and "," not in v for v in value))
        if not ok:
            return "fontFamily must be one font name or an array of single font names (not a comma-separated stack)"
    elif kind == "fontWeight":
        ok = (_is_number(value) and 1 <= value <= 1000) or (isinstance(value, str) and value in FONT_WEIGHT_ALIASES)
        if not ok:
            return "fontWeight must be a number from 1 to 1000 or a defined alias (a quoted number is invalid)"
    elif kind == "cubicBezier":
        if not (isinstance(value, list) and len(value) == 4 and all(_is_number(v) for v in value) and 0 <= value[0] <= 1 and 0 <= value[2] <= 1):
            return "cubicBezier must be an array of four numbers with x values from 0 to 1"
    return None


def _check_value_shapes(typed: dict[str, tuple[dict, str | None]]) -> list[str]:
    findings: list[str] = []
    for token_path, (record, kind) in typed.items():
        value = record.get("$value")
        if isinstance(value, str) and REFERENCE.fullmatch(value):
            continue
        problem = _shape_problem(kind, value)
        if problem:
            findings.append(f"{token_path}: {problem}")
        elif kind == "color" and isinstance(value, dict):
            findings.extend(_hex_consistency(token_path, value))
    return findings


def _hex_consistency(token_path: str, value: dict) -> list[str]:
    if value.get("colorSpace") != "oklch" or "hex" not in value:
        return []
    lightness, chroma, hue = (c if _is_number(c) else 0 for c in value["components"])
    if not token_color.oklch_in_gamut(lightness, chroma, hue):
        return []
    computed = token_color.oklch_to_hex(lightness, chroma, hue)
    if token_color.max_channel_difference(computed, value["hex"]) > HEX_TOLERANCE:
        return [f"{token_path}: hex {value['hex']} does not match its OKLCH components (computed {computed})"]
    return []


def _colour_hex(value: object) -> tuple[str | None, str | None]:
    """Return (hex, reason it could not be computed)."""
    if isinstance(value, dict):
        if token_color.HEX_RE.match(str(value.get("hex", ""))):
            return str(value["hex"]).lower(), None
        space, comps = value.get("colorSpace"), value.get("components")
        if isinstance(comps, list) and len(comps) == 3 and all(_is_number(c) for c in comps):
            if space == "oklch":
                return token_color.oklch_to_hex(*comps), None
            if space == "srgb":
                return token_color.srgb_to_hex(*comps), None
        return None, f"colorSpace {space} has no hex fallback to measure"
    if isinstance(value, str):
        if token_color.HEX_RE.match(value):
            return value.lower(), None
        match = re.fullmatch(r"oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)", value.strip())
        if match:
            return token_color.oklch_to_hex(*(float(g) for g in match.groups())), None
    return None, "value is not a colour this check can read"


def _resolve(path: str, base: dict[str, dict], overlay: dict[str, dict], trail: tuple[str, ...] = ()):
    record = overlay.get(path) or base.get(path)
    if record is None:
        raise KeyError(path)
    value = record.get("$value")
    match = REFERENCE.fullmatch(value) if isinstance(value, str) else None
    if match:
        if path in trail:
            raise KeyError(f"alias cycle at {path}")
        return _resolve(match.group(1), base, overlay, trail + (path,))
    return value


def _find_token(name: str, candidates: set[str]) -> str | None:
    for guess in (f"semantic.color.{name}", name):
        if guess in candidates:
            return guess
    hits = sorted(c for c in candidates if c == name or c.endswith("." + name))
    return hits[0] if len(hits) == 1 else None


def _check_contrast_claims(base_typed: dict, overlays: dict[str, dict]) -> list[str]:
    if str(ROOT) not in sys.path:
        sys.path.insert(0, str(ROOT))
    from engine.design_engine.catalog import contrast_ratio

    findings: list[str] = []
    base = {p: r for p, (r, _k) in base_typed.items()}
    colour_paths = {p for p, (_r, kind) in base_typed.items() if kind == "color"}
    contexts: list[tuple[str, dict[str, dict], dict[str, dict]]] = [("base", base, {})]
    contexts += [(name, base, ov) for name, ov in overlays.items()]
    for label, source, overlay in contexts:
        claimed_records = overlay if overlay else source
        for token_path, record in claimed_records.items():
            description = record.get("$description")
            match = CLAIM.search(description) if isinstance(description, str) else None
            if not match:
                continue
            where = f"{label}:{token_path}" if label != "base" else token_path
            other = _find_token(match.group(1), colour_paths)
            if other is None:
                findings.append(f"{where}: cannot resolve `{match.group(1)}` to one colour token for the contrast claim")
                continue
            try:
                fg, fg_why = _colour_hex(_resolve(token_path, source, overlay))
                bg, bg_why = _colour_hex(_resolve(other, source, overlay))
            except KeyError as exc:
                findings.append(f"{where}: contrast claim cannot be resolved ({exc.args[0]})")
                continue
            if fg is None or bg is None:
                findings.append(f"{where}: contrast claim cannot be measured ({fg_why or bg_why})")
                continue
            claimed = float(match.group(2))
            actual = contrast_ratio(fg, bg)
            if abs(actual - claimed) > CLAIM_TOLERANCE + 1e-9:
                findings.append(f"{where}: claims {claimed:g}:1 against {other}; computed {actual:.2f}:1 ({fg} on {bg})")
                continue
            text = description.upper()
            if "PASS AAA" in text and actual < 7:
                findings.append(f"{where}: labelled AAA but {actual:.2f}:1 is below 7:1")
            elif re.search(r"PASS AA\b", text) and actual < 4.5 and "UI" not in text:
                findings.append(f"{where}: labelled AA but {actual:.2f}:1 is below 4.5:1")
    return findings


def validate(path: Path, profile: str = "canonical-example", check_value_shapes: bool = True,
             check_contrast_claims: bool = True) -> list[str]:
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        return [f"cannot read token source: {exc}"]
    if not isinstance(data, dict):
        return ["token source must be an object"]

    typed = {p: (r, k) for p, r, k in _walk(data)}
    tokens = {p: r for p, (r, _k) in typed.items()}
    findings: list[str] = []
    for token_path, record in tokens.items():
        value = record.get("$value")
        if not isinstance(value, str):
            continue
        match = REFERENCE.fullmatch(value)
        if not match:
            continue
        target = match.group(1)
        if target not in tokens:
            findings.append(f"{token_path}: unresolved reference {target}")
        elif typed[token_path][1] and typed[target][1] and typed[token_path][1] != typed[target][1]:
            findings.append(f"{token_path}: type {typed[token_path][1]} differs from {target} type {typed[target][1]}")

    graph: dict[str, str] = {}
    for token_path, record in tokens.items():
        value = record.get("$value")
        if isinstance(value, str):
            match = REFERENCE.fullmatch(value)
            if match and match.group(1) in tokens:
                graph[token_path] = match.group(1)

    def visit(node: str, trail: list[str]) -> None:
        if node in trail:
            findings.append("alias cycle: " + " -> ".join(trail[trail.index(node):] + [node]))
            return
        target = graph.get(node)
        if target:
            visit(target, trail + [node])

    for token_path in graph:
        visit(token_path, [])

    component_tokens = {
        token_path: record
        for token_path, record in tokens.items()
        if token_path.split(".", 1)[0] not in RESERVED_ROOTS
    }
    for token_path, record in component_tokens.items():
        value = record.get("$value")
        if not isinstance(value, str):
            findings.append(f"{token_path}: component token must reference semantic token")
            continue
        match = REFERENCE.fullmatch(value)
        if not match or not match.group(1).startswith("semantic."):
            findings.append(f"{token_path}: component token must reference the semantic tier")

    if profile == "canonical-example":
        if "button.primary.radius" in tokens:
            value = tokens["button.primary.radius"].get("$value")
            if value != "{semantic.radius.control.sm}":
                findings.append("button.primary.radius: expected semantic radius alias")
        required = {
            "semantic.color.action.danger.bg",
            "semantic.color.action.danger.fg",
            "semantic.radius.control.sm",
        }
        for token_path in sorted(required - tokens.keys()):
            findings.append(f"missing required semantic token: {token_path}")

    if check_value_shapes:
        findings.extend(_check_value_shapes(typed))
    if check_contrast_claims:
        base_typed = {p: v for p, v in typed.items() if not p.startswith("_themes.")}
        overlays: dict[str, dict] = {}
        themes = data.get("_themes")
        if isinstance(themes, dict):
            for name, node in themes.items():
                if isinstance(node, dict):
                    overlays[name] = {p: r for p, r, _k in _walk(node)}
        findings.extend(_check_contrast_claims(base_typed, overlays))
    return findings


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("token_source", type=Path)
    parser.add_argument("--profile", choices=("canonical-example", "generic"), default="canonical-example")
    parser.add_argument("--skip-value-shapes", action="store_true", help="do not require the 2025.10 object shapes (legacy packs)")
    parser.add_argument("--skip-contrast-claims", action="store_true", help="do not recompute 'vs X = N:1' claims")
    args = parser.parse_args(argv)
    check_shapes, check_claims = not args.skip_value_shapes, not args.skip_contrast_claims
    findings = validate(args.token_source.resolve(), args.profile, check_shapes, check_claims)
    print("token-example-validator:")
    print(f"- source: {args.token_source}")
    print(f"- profile: {args.profile}; value shapes: {'checked' if check_shapes else 'skipped'}; contrast claims: {'checked' if check_claims else 'skipped'}")
    print(f"- findings: {len(findings)}")
    for finding in findings:
        print(f"[FAIL] {finding}")
    if not findings:
        print("PASS: aliases, tiers, roles and cycles" + (", value shapes" if check_shapes else "") + (", contrast claims" if check_claims else "") + " passed")
    return 1 if findings else 0


if __name__ == "__main__":
    raise SystemExit(main())
