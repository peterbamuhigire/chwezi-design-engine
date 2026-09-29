"""Relevance harness for the design catalogue runtime (M10-10-T05/T06).

A component-level oracle for one runtime, not a general evaluation corpus (phase value gate, P05).

Usage
  python -X utf8 tests/eval_catalog_relevance.py                  score both splits; gate held-out on floors
  python -X utf8 tests/eval_catalog_relevance.py --calibrate      fit floors on the CALIBRATION split only and
                                                                  write data/retrieval-calibration.json
  python -X utf8 tests/eval_catalog_relevance.py --refresh-baseline
                                                                  re-record fingerprints (and, on first run or with
                                                                  --reset-floors, floors = held-out minus 0.02)
  --json PATH                                                     also write the metrics report as JSON

Exit codes: 0 pass; 1 a held-out metric is below its floor; 2 fingerprint mismatch (a fingerprinted file
changed without --refresh-baseline); 3 vendored metrics module does not match its header hash.

Calibration discipline (phase T05): floors are fitted on the calibration split only, choosing the lowest
floors that keep calibration negative abstention >= 0.90 without dropping calibration P@1 more than 0.05
below its unfloored value. The held-out split is scored once per calibration version and reported, never
used for fitting. Harness, split and calibration ideas adapted from UI UX Pro Max
(nextlevelbuilder/ui-ux-pro-max-skill, MIT, https://github.com/nextlevelbuilder/ui-ux-pro-max-skill,
commit 09170ee); re-implemented, no cases or data copied.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import math
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from engine.design_engine import retrieval_metrics as rm  # noqa: E402  (vendored shared module, T08)
from engine.design_engine.catalog import DOMAINS, Catalog  # noqa: E402

CATALOG = ROOT / "data" / "design-catalog.json"
CALIBRATION = ROOT / "data" / "retrieval-calibration.json"
CASES = ROOT / "tests" / "fixtures" / "catalog-relevance" / "cases.json"
BASELINE = ROOT / "tests" / "fixtures" / "catalog-relevance" / "baseline.json"
VENDORED = ROOT / "engine" / "design_engine" / "retrieval_metrics.py"
FINGERPRINTED = {
    "data/design-catalog.json": CATALOG,
    "data/retrieval-calibration.json": CALIBRATION,
    "engine/design_engine/catalog.py": ROOT / "engine" / "design_engine" / "catalog.py",
    "tests/fixtures/catalog-relevance/cases.json": CASES,
}
CALIBRATION_VERSION = "2026-10-v1"
COVERAGE_MINIMUM = 0.34
NEG_ABSTENTION_TARGET = 0.90
MAX_P1_DROP = 0.05
METRICS = ("p_at_1", "mrr_at_3", "ndcg_at_3", "negative_abstention", "typo_recovery_at_3")


def sha256_text(path: Path) -> str:
    """SHA-256 of the file with CRLF normalised to LF (stable across Git autocrlf checkouts)."""
    return hashlib.sha256(path.read_bytes().replace(b"\r\n", b"\n")).hexdigest()


def check_vendored() -> tuple[bool, str]:
    raw = VENDORED.read_bytes().replace(b"\r\n", b"\n")
    header, _, body = raw.partition(b"\n")
    text = header.decode("utf-8")
    if not text.startswith("# vendored-from: chwezi-engine-agents@") or " sha256:" not in text:
        return False, "missing vendored-from header"
    expected = text.rsplit("sha256:", 1)[1].strip()
    actual = hashlib.sha256(body).hexdigest()
    return expected == actual, f"header {expected[:12]} actual {actual[:12]}"


def load_cases() -> list[dict]:
    return json.loads(CASES.read_text(encoding="utf-8"))["cases"]


def run_case(catalog: Catalog, case: dict, calibrated: bool) -> dict:
    result = catalog.search(case["query"], domain=case.get("domain"), limit=5, calibrated=calibrated)
    return {
        "ranked": [item["record_id"] for item in result["results"]],
        "abstained": result["abstained"],
        "top_score": result["results"][0]["score"] if result["results"] else 0.0,
        "top_domain": result["results"][0]["domain"] if result["results"] else result["route"]["domain"],
        "results": [(item["domain"], item["score"], item["coverage"]) for item in result["results"]],
    }


def metrics_for(runs: list[tuple[dict, dict]]) -> dict:
    ranked_cases = [(case, run) for case, run in runs if case["kind"] in {"positive", "typo"}]
    negatives = [(case, run) for case, run in runs if case["kind"] == "negative"]
    typos = [(case, run) for case, run in runs if case["kind"] == "typo"]
    return {
        "cases": len(runs),
        "p_at_1": round(rm.mean([rm.precision_at_k(run["ranked"], case["judgements"], 1) for case, run in ranked_cases]), 4),
        "mrr_at_3": round(rm.mrr_at_k([(run["ranked"], case["judgements"]) for case, run in ranked_cases], 3), 4),
        "ndcg_at_3": round(rm.mean([rm.ndcg_at_k(run["ranked"], case["judgements"], 3) for case, run in ranked_cases]), 4),
        "negative_abstention": round(rm.abstention_rate([run["abstained"] for _, run in negatives]), 4),
        "typo_recovery_at_3": round(rm.mean([rm.typo_recovery_at_k(run["ranked"], case["judgements"], 3) for case, run in typos]), 4),
    }


def evaluate(catalog: Catalog, split: str, calibrated: bool = True) -> tuple[dict, list[dict]]:
    runs = [(case, run_case(catalog, case, calibrated)) for case in load_cases() if case["split"] == split]
    detail = [{"id": case["id"], "kind": case["kind"], "query": case["query"], "top3": run["ranked"][:3], "abstained": run["abstained"]} for case, run in runs]
    return metrics_for(runs), detail


def calibrate() -> dict:
    """Fit per-domain floors on the calibration split only (held-out cases are never loaded here)."""
    catalog = Catalog.from_file(CATALOG, calibration_path=ROOT / "nonexistent-calibration.json")
    cases = [case for case in load_cases() if case["split"] == "calibration"]
    assert all(case.get("inspect_for_tuning", True) for case in cases)
    base_cal = {"calibration_version": CALIBRATION_VERSION, "coverage_minimum": COVERAGE_MINIMUM, "domain_floors": {}}

    def score(floors: dict) -> tuple[dict, list[tuple[dict, dict]]]:
        catalog.calibration = {**base_cal, "domain_floors": floors}
        runs = [(case, run_case(catalog, case, True)) for case in cases]
        return metrics_for(runs), runs

    catalog.calibration = {}
    unfloored = metrics_for([(case, run_case(catalog, case, False)) for case in cases])
    floors: dict[str, float] = {}
    current, runs = score(floors)
    steps = []
    while current["negative_abstention"] < NEG_ABSTENTION_TARGET:
        options = []
        for case, run in runs:
            if case["kind"] != "negative" or run["abstained"]:
                continue
            for domain in {d for d, _, _ in run["results"]}:
                top = max(s for d, s, _ in run["results"] if d == domain)
                trial = {**floors, domain: math.ceil((top + 0.001) * 1000) / 1000}
                metrics, _ = score(trial)
                if unfloored["p_at_1"] - metrics["p_at_1"] <= MAX_P1_DROP + 1e-9:
                    options.append((trial[domain], domain, case["id"]))
        if not options:
            break
        value, domain, case_id = min(options)
        floors[domain] = value
        steps.append({"domain": domain, "floor": value, "to_abstain": case_id})
        current, runs = score(floors)
    payload = {
        "$comment": "Per-domain BM25 floors and query-token coverage minimum for engine/design_engine/catalog.py. Fitted by tests/eval_catalog_relevance.py --calibrate on the calibration split ONLY; held-out cases are never inspected for tuning. Delete this file to fall back to unfloored BM25.",
        "calibration_version": CALIBRATION_VERSION,
        "method": "lowest per-domain floors keeping calibration negative abstention >= 0.90 with calibration P@1 drop <= 0.05; coverage minimum fixed at the phase default",
        "coverage_minimum": COVERAGE_MINIMUM,
        "domain_floors": {domain: floors.get(domain, 0.0) for domain in sorted(DOMAINS)},
        "fitting_steps": steps,
        "calibration_metrics": {"unfloored": unfloored, "floored": current},
    }
    CALIBRATION.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    return payload


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--calibrate", action="store_true")
    parser.add_argument("--refresh-baseline", action="store_true")
    parser.add_argument("--reset-floors", action="store_true")
    parser.add_argument("--json", type=Path)
    args = parser.parse_args()

    ok, detail = check_vendored()
    print(f"vendored retrieval_metrics.py hash check: {'PASS' if ok else 'FAIL'} ({detail})")
    if not ok:
        return 3
    if args.calibrate:
        payload = calibrate()
        print(f"calibrated {payload['calibration_version']}: floors {payload['domain_floors']} coverage_minimum {payload['coverage_minimum']}")
        print(f"calibration split unfloored {payload['calibration_metrics']['unfloored']}")
        print(f"calibration split floored   {payload['calibration_metrics']['floored']}")

    catalog = Catalog.from_file(CATALOG)
    report = {"calibration_version": catalog.calibration_version, "splits": {}}
    for split in ("calibration", "held_out"):
        metrics, cases = evaluate(catalog, split)
        report["splits"][split] = {"metrics": metrics, "cases": cases}
        print(f"{split}: " + " ".join(f"{name}={metrics[name]:.3f}" for name in METRICS) + f" (n={metrics['cases']})")

    fingerprints = {name: sha256_text(path) for name, path in FINGERPRINTED.items()}
    baseline = json.loads(BASELINE.read_text(encoding="utf-8")) if BASELINE.is_file() else None
    held = report["splits"]["held_out"]["metrics"]
    if args.refresh_baseline or baseline is None:
        if baseline is None or args.reset_floors:
            floors = {name: math.floor((held[name] - 0.02) * 100) / 100 for name in METRICS}
        else:
            floors = baseline["floors"]
        failing = [name for name in METRICS if held[name] < floors[name]]
        if failing:
            print(f"FAIL: refusing to refresh; held-out below floor for {failing}")
            return 1
        baseline = {
            "label": "provisional regression gate",
            "note": "Floors = first measured held-out values minus 0.02, rounded down. Not a quality target until a second reviewer re-judges the cases.",
            "calibration_version": catalog.calibration_version,
            "floors": floors,
            "held_out_at_baseline": held,
            "fingerprints_sha256_lf": fingerprints,
        }
        BASELINE.write_text(json.dumps(baseline, indent=2) + "\n", encoding="utf-8")
        print("baseline written (provisional regression gate)")
    report["baseline"] = baseline
    if args.json:
        args.json.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")

    changed = [name for name, digest in fingerprints.items() if baseline["fingerprints_sha256_lf"].get(name) != digest]
    if changed:
        print(f"FAIL: fingerprint mismatch for {changed}; re-run with --refresh-baseline after re-checking calibration")
        return 2
    failing = [f"{name} {held[name]:.3f} < {baseline['floors'][name]:.2f}" for name in METRICS if held[name] < baseline["floors"][name]]
    if failing:
        print("FAIL: held-out below floor: " + "; ".join(failing))
        return 1
    print("PASS: held-out metrics at or above floors (provisional regression gate); fingerprints match")
    return 0


if __name__ == "__main__":
    sys.exit(main())
