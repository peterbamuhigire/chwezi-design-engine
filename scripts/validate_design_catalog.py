"""Validate the independent offline design catalog contract.

M10-10 additions: font doctrine lint (T01), palette contrast with printed ratios (T03), lifecycle
checks and stale-record warnings with ``--as-of`` (T04). Exit 1 on any failure; warnings never
fail the run.
"""

from __future__ import annotations

import argparse
from datetime import date
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from engine.design_engine.catalog import Catalog


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("catalog", type=Path)
    parser.add_argument("--as-of", dest="as_of", default=None, help="Date (YYYY-MM-DD) for stale-record warnings; default today.")
    parser.add_argument("--quiet-contrast", action="store_true", help="Do not print each computed contrast ratio.")
    args = parser.parse_args()
    try:
        as_of = date.fromisoformat(args.as_of) if args.as_of else date.today()
    except ValueError:
        print(f"FAIL: --as-of must be YYYY-MM-DD, got {args.as_of!r}")
        return 1
    try:
        catalog = Catalog.from_file(args.catalog)
    except ValueError as exc:
        print(f"FAIL: {exc}")
        return 1
    records = catalog.records
    typography = [r for r in records if r["domain"] == "typography" and "heading" in r["content"]]
    palettes = [r for r in records if r["domain"] == "color" and "tokens" in r["content"]]
    wcag = [r for r in records if r["domain"] == "ux" and "sc" in r["content"]]
    print("design-catalog-validator:")
    print(f"- source: {catalog.source}")
    print(f"- revision: {catalog.revision}")
    print(f"- calibration: {catalog.calibration_version}")
    print(f"- font doctrine: {catalog.doctrine.source}")
    print(f"- records: {len(records)} (typography pairings {len(typography)}, palettes {len(palettes)}, WCAG A/AA {len(wcag)})")
    print(f"- stack guidance: {len(catalog.stack_guidance)}")
    if not args.quiet_contrast:
        for row in catalog.contrast_report:
            print(f"  contrast {row['record']} [{row['theme']}] {row['pair']} = {row['ratio']:.2f}:1 (min {row['minimum']}:1) PASS")
    for warning in catalog.warnings:
        print(warning)
    stale = catalog.stale_records(as_of)
    for record_id, due in stale:
        print(f"WARN stale: {record_id} recheck_due {due.isoformat()}")
    print(f"- stale as of {as_of.isoformat()}: {len(stale)}")
    print("PASS: schema, domain coverage, stack coverage, evidence, font doctrine lint, contrast and lifecycle checks passed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
