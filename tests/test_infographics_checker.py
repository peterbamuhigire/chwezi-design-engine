"""Tests for the Chwezi Infographics Standard checker (standard library only)."""
from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "skills/00-cross-cutting-ops-qa-a11y/chwezi-infographics-standard/scripts/check_infographic.py"
spec = importlib.util.spec_from_file_location("check_infographic", SCRIPT)
ci = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ci)


def flow(nodes, edges):
    return {"kind": "flow", "nodes": nodes, "edges": edges}


def test_clean_flow_with_decision_and_exception_passes():
    d = flow(
        [{"id": "S1", "label": "Receive order", "type": "start", "number": 1},
         {"id": "S2", "label": "Check stock", "type": "decision", "number": 2},
         {"id": "S3", "label": "Reorder stock", "type": "exception", "number": 3},
         {"id": "S4", "label": "Pack goods", "number": 4},
         {"id": "S5", "label": "Deliver", "type": "end", "number": 5}],
        [{"from": "S1", "to": "S2"}, {"from": "S2", "to": "S4", "label": "in stock"},
         {"from": "S2", "to": "S3", "label": "out of stock"}, {"from": "S3", "to": "S4"},
         {"from": "S4", "to": "S5"}])
    assert ci.check_graph(d) == []
    text = ci.describe(d)
    assert text.splitlines()[0].startswith("1. Receive order")
    assert "(if out of stock)" in text


def test_duplicate_orphan_and_misnumbered_steps_fail():
    d = flow(
        [{"id": "S1", "label": "1. Mix concrete", "type": "start", "number": 1},
         {"id": "S2", "label": "Pour", "number": 3},
         {"id": "S3", "label": "Mix concrete", "number": 2},
         {"id": "S4", "label": "Cure", "type": "end", "number": 4},
         {"id": "S5", "label": "Inspect"}],
        [{"from": "S1", "to": "S2"}, {"from": "S2", "to": "S3"}, {"from": "S3", "to": "S4"}])
    fails = " | ".join(ci.check_graph(d))
    assert "possible duplicate stage: S1 and S3" in fails
    assert "orphan node S5" in fails
    assert "disagree with the process order" in fails


def test_unlabelled_decision_and_hidden_loop_fail():
    d = flow(
        [{"id": "A", "label": "Start", "type": "start"}, {"id": "B", "label": "Approve?", "type": "decision"},
         {"id": "C", "label": "Revise"}, {"id": "D", "label": "Publish", "type": "end"}],
        [{"from": "A", "to": "B"}, {"from": "B", "to": "C"}, {"from": "B", "to": "D", "label": "yes"},
         {"from": "C", "to": "B"}])
    fails = " | ".join(ci.check_graph(d))
    assert "decision B needs two or more labelled exits" in fails
    assert "loop" in fails


def test_cycle_and_tree_rules():
    cyc = {"kind": "cycle", "nodes": [{"id": "P", "label": "Plan", "type": "start"}, {"id": "D", "label": "Do"},
                                      {"id": "C", "label": "Check"}, {"id": "A", "label": "Act"}],
           "edges": [{"from": "P", "to": "D"}, {"from": "D", "to": "C"}, {"from": "C", "to": "A"},
                     {"from": "A", "to": "P"}]}
    assert ci.check_graph(cyc) == []
    chain = dict(cyc, edges=cyc["edges"][:3])
    assert ci.check_graph(chain)
    tree = {"kind": "tree", "nodes": [{"id": "MD", "label": "Director"}, {"id": "F", "label": "Finance"},
                                      {"id": "O", "label": "Operations"}, {"id": "X", "label": "Stores"}],
            "edges": [{"from": "MD", "to": "F"}, {"from": "MD", "to": "O"}, {"from": "O", "to": "X"},
                      {"from": "F", "to": "X"}]}
    assert any("2 parents" in f for f in ci.check_graph(tree))


def test_calculations_match_the_reference_tables():
    assert round(ci.min_type_pt(1.0), 1) == 23.6
    assert round(ci.min_type_pt(3.0), 1) == 70.7
    assert round(ci.required_ppi(0.3)) == 291
    assert round(ci.required_ppi(1.0)) == 87
    assert round(ci.effective_ppi(2000, 426), 1) == 119.2
    assert ci.canvas_text_px(16, 1080, 360) == 48
    assert round(ci.lie_factor(3_200_000, 3_400_000, 0.2, 0.4), 2) == 16.0
    assert round(ci.lie_factor(25, 50, 1, 4), 2) == 3.0
    assert ci.largest_remainder([41.4, 33.3, 25.3]) == [42, 33, 25]
    assert sum(ci.largest_remainder([1, 1, 1])) == 100
    assert round(ci.contrast("#000000", "#FFFFFF"), 1) == 21.0
    assert round(ci.ring_radius(5, 40, 8), 1) == 40.8
    assert ci.timeline_errors([0, 10, 20], [0, 50, 100]) == [0.0, 0.0]
    assert round(ci.release_score({"accuracy": 1, "clarity": 0.9, "typography": 0.8, "hierarchy": 0.9,
                                   "accessibility": 0.8, "technical": 0.9, "brand": 1}), 1) == 90.5
