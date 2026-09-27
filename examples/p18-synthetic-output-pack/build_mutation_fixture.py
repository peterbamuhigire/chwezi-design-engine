"""Build an isolated one-assumption sensitivity proof for the P18 fixture."""

from __future__ import annotations

import importlib.util
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parent
OUT = ROOT / "renders" / "final" / "mutation-proof"
SPEC = importlib.util.spec_from_file_location("p18_build_pack", ROOT / "build_pack.py")
assert SPEC and SPEC.loader
pack = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(pack)

OUT.mkdir(parents=True, exist_ok=True)
pack.DATA["available_liquidity"] = 100
pack.RESULTS = [(scenario, pack.simulate(scenario["lag"])) for scenario in pack.DATA["scenarios"]]
pack.OUT = {
    "chart": OUT / "cash-timing-gap.png",
    "mobile_chart": OUT / "cash-timing-gap-mobile.png",
    "mobile_preview": OUT / "cash-timing-gap-mobile-preview.png",
    "mobile_alt": OUT / "cash-timing-gap-mobile-alt.txt",
    "proposal": OUT / "synthetic-internal-proposal.docx",
    "report": OUT / "synthetic-cash-timing-report.docx",
    "workbook": OUT / "synthetic-cash-timing-model.xlsx",
    "deck": OUT / "synthetic-executive-briefing.pptx",
}
pack.make_chart()
pack.make_mobile_chart()
pack.make_report()
pack.make_proposal()
pack.make_workbook()
pack.make_deck()
(OUT / "source-data.json").write_text(json.dumps(pack.DATA, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
assert [result["gap"] for _, result in pack.RESULTS] == [0, 0, 20]
print(json.dumps({key: str(path) for key, path in pack.OUT.items()}, indent=2))
