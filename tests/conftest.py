"""pytest configuration: make the sibling scripts importable.

`scripts/validate_engine.py` is a command-line script and imports its siblings
(`check_file_count`, `validate_portability`) as top-level modules. The tests import it as
`scripts.validate_engine`, so `scripts/` must also be on the import path, or collection fails
with ModuleNotFoundError before any test runs.
"""

import sys
from pathlib import Path

SCRIPTS = str(Path(__file__).resolve().parents[1] / "scripts")
if SCRIPTS not in sys.path:
    sys.path.insert(0, SCRIPTS)
