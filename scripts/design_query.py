"""Thin CLI over the offline design engine (M10-10-T07).

Subcommands
  search <query> [--domain D] [--stack S] [--strict] [--limit N] [--include-deprecated]
      Print the calibrated search result as JSON. With --strict, exit 2 when the catalogue abstains.
  design-system --brief <json-or-path> [--format json|markdown|both]
      Build a design-system decision from a brief (wraps build_design_system).
  persist --project ID [--page ID] --decision <path> [--root DIR] [--accept-abstention "<who>: <reason>"] [--overwrite]
      Save a decision (or a page override) through persistence.py. Refuses unverified output: a
      decision with any abstained domain is not written unless --accept-abstention names who
      accepted it and why.

Query contract (paraphrased; idea adapted from UI UX Pro Max, MIT,
https://github.com/nextlevelbuilder/ui-ux-pro-max-skill, commit 09170ee): one dominant intent per
query, 2-5 meaningful terms, retry once with a synonym when the engine abstains, and never persist
unverified output.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from engine.design_engine.catalog import DOMAINS, STACKS, Catalog, CatalogError, NoResultsError, default_catalog_path
from engine.design_engine.decisions import DecisionError, build_design_system, format_decision
from engine.design_engine.persistence import PersistenceError, save_page_override, save_project

DEFAULT_ROOT = Path(".chwezi-design")


def _emit(payload: object) -> None:
    print(json.dumps(payload, ensure_ascii=False, indent=2))


def _load_json_arg(value: str) -> dict:
    candidate = Path(value)
    text = candidate.read_text(encoding="utf-8") if candidate.is_file() else value
    data = json.loads(text)
    if not isinstance(data, dict):
        raise ValueError("expected a JSON object")
    return data


def cmd_search(args: argparse.Namespace, catalog: Catalog) -> int:
    try:
        result = catalog.search(
            args.query,
            domain=args.domain,
            stack=args.stack,
            limit=args.limit,
            strict=args.strict,
            include_deprecated=args.include_deprecated,
        )
    except NoResultsError as exc:
        _emit({"abstained": True, "error": str(exc), "calibration_version": catalog.calibration_version, "query": args.query})
        return 2
    _emit(result)
    return 0


def cmd_design_system(args: argparse.Namespace, catalog: Catalog) -> int:
    decision = build_design_system(_load_json_arg(args.brief), catalog)
    if args.format in {"json", "both"}:
        print(format_decision(decision, "json"))
    if args.format in {"markdown", "both"}:
        print(format_decision(decision, "markdown"))
    return 0


def cmd_persist(args: argparse.Namespace) -> int:
    decision = _load_json_arg(args.decision)
    abstained = list(decision.get("abstained_domains", []))
    abstained += [key for key, value in (decision.get("decisions") or {}).items() if value is None and key not in abstained]
    if abstained:
        acceptance = (args.accept_abstention or "").strip()
        who, _, reason = acceptance.partition(":")
        if not who.strip() or not reason.strip():
            _emit({"written": False, "refused": "unverified output", "abstained_domains": abstained,
                   "hint": 'pass --accept-abstention "<who>: <reason>" to record an accepted abstention'})
            return 3
        decision = {**decision, "accepted_abstention": {"by": who.strip(), "reason": reason.strip(), "domains": abstained}}
    if args.page:
        path = save_page_override(args.root, args.project, args.page, decision, overwrite=args.overwrite)
    else:
        path = save_project(args.root, args.project, decision, overwrite=args.overwrite)
    _emit({"written": True, "path": str(path)})
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--catalog", type=Path, default=default_catalog_path())
    sub = parser.add_subparsers(dest="command", required=True)
    search = sub.add_parser("search", help="calibrated catalogue search")
    search.add_argument("query")
    search.add_argument("--domain", choices=[*DOMAINS, "all"])
    search.add_argument("--stack", choices=STACKS)
    search.add_argument("--strict", action="store_true")
    search.add_argument("--limit", type=int, default=5)
    search.add_argument("--include-deprecated", action="store_true")
    design = sub.add_parser("design-system", help="build a decision from a brief")
    design.add_argument("--brief", required=True, help="JSON object or path to a JSON file")
    design.add_argument("--format", choices=["json", "markdown", "both"], default="both")
    persist = sub.add_parser("persist", help="save a decision without overwriting or persisting unverified output")
    persist.add_argument("--project", required=True)
    persist.add_argument("--page")
    persist.add_argument("--decision", required=True, help="decision JSON object or path")
    persist.add_argument("--root", type=Path, default=DEFAULT_ROOT)
    persist.add_argument("--accept-abstention", dest="accept_abstention")
    persist.add_argument("--overwrite", action="store_true")
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    try:
        if args.command == "persist":
            return cmd_persist(args)
        catalog = Catalog.from_file(args.catalog)
        if args.command == "search":
            return cmd_search(args, catalog)
        return cmd_design_system(args, catalog)
    except (CatalogError, DecisionError, PersistenceError, ValueError) as exc:
        _emit({"error": str(exc)})
        return 1


if __name__ == "__main__":
    sys.exit(main())
