# vendored-from: chwezi-engine-agents@48af46b sha256:1829b5880310685e7ed8dd66673c6b1b01df7bfeb6cb8b7118e81f5ef3d9dd93
"""Shared ranked-retrieval metrics and a small BM25 scorer for Chwezi engines (UX-09, M10-10-T08).

Standard library only. One file, copied (vendored) into each engine that needs it, because the
engines are independent repositories with no submodules or shared packages.

Scope and relationship to other portfolio code
----------------------------------------------
- ``scripts/lexical_routing.py`` (M10-03-T01) is the portfolio skill-routing index (TF-IDF over
  SKILL.md descriptions). It ranks skills; it computes no retrieval metrics. This module does not
  duplicate it: it supplies the *measurement* functions (P@k, MRR, nDCG, abstention, typo
  recovery) that neither the routing index nor ``evals/`` pass/fail contracts provide, plus a
  field-boosted BM25 scorer for small curated corpora inside one engine runtime (the design
  catalogue first; SRS controls search, UX-10, and finance lookups, UX-13, later).
- Tokenisation is the caller's job. Every function takes already-tokenised input so each engine
  keeps its own synonym and spelling rules.

Metric conventions
------------------
- ``ranked`` is a list of document IDs, best first. ``relevant`` is a set of IDs, or a mapping of
  ID -> graded judgement (2 = ideal, 1 = acceptable, 0 or absent = not relevant).
- ``precision_at_k`` divides by ``k`` (not by the number returned), so a short list is penalised.
- ``dcg_at_k`` uses exponential gain ``(2**grade - 1) / log2(rank + 1)`` with ranks counted from 1.
- ``ndcg_at_k`` returns 0.0 when no relevant item exists (the ideal DCG is 0).
- Aggregates are plain means over cases; an empty case list returns 0.0.

BM25
----
``BM25`` implements the Okapi BM25 ranking function (Robertson and Zaragoza, "The Probabilistic
Relevance Framework: BM25 and Beyond", Foundations and Trends in Information Retrieval 3(4), 2009)
with per-field boosts applied to term frequency and document length (a simplified BM25F). The
defaults ``k1 = 1.5, b = 0.75`` and the calibration idea are adapted from UI UX Pro Max
(nextlevelbuilder/ui-ux-pro-max-skill, MIT, https://github.com/nextlevelbuilder/ui-ux-pro-max-skill,
commit 09170ee); paraphrased and re-implemented, no code copied.

Vendoring rule
--------------
An engine copies this file byte for byte and prepends exactly one line:

    # vendored-from: chwezi-engine-agents@<commit-sha> sha256:<sha256 of this canonical file>

The rest of the copy must be unmodified, so ``sha256(copy without its first line)`` equals the
header hash. The M10-02 drift checker (and each engine's own tests) hash-compare the copies
against the canonical file. Change the canonical file here first, then re-vendor.
"""

from __future__ import annotations

import math
from collections import Counter
from typing import Iterable, Mapping, Sequence, Union

Relevance = Union[Mapping[str, float], Iterable[str]]

__all__ = [
    "BM25",
    "abstention_rate",
    "dcg_at_k",
    "mean",
    "mrr_at_k",
    "ndcg_at_k",
    "precision_at_k",
    "reciprocal_rank",
    "typo_recovery_at_k",
]


def _grades(relevant: Relevance) -> dict[str, float]:
    if isinstance(relevant, Mapping):
        return {str(key): float(value) for key, value in relevant.items() if float(value) > 0}
    return {str(key): 1.0 for key in relevant}


def _check_k(k: int) -> None:
    if not isinstance(k, int) or isinstance(k, bool) or k < 1:
        raise ValueError("k must be a positive integer")


def mean(values: Sequence[float]) -> float:
    """Arithmetic mean; 0.0 for an empty sequence."""
    return float(sum(values)) / len(values) if values else 0.0


def precision_at_k(ranked: Sequence[str], relevant: Relevance, k: int) -> float:
    """Share of the top ``k`` positions holding a relevant ID (denominator is ``k``)."""
    _check_k(k)
    grades = _grades(relevant)
    return sum(1 for item in list(ranked)[:k] if item in grades) / k


def reciprocal_rank(ranked: Sequence[str], relevant: Relevance, k: int | None = None) -> float:
    """1 / rank of the first relevant ID (ranks from 1), optionally cut at ``k``; else 0.0."""
    if k is not None:
        _check_k(k)
    grades = _grades(relevant)
    window = list(ranked) if k is None else list(ranked)[:k]
    for index, item in enumerate(window, start=1):
        if item in grades:
            return 1.0 / index
    return 0.0


def mrr_at_k(cases: Sequence[tuple[Sequence[str], Relevance]], k: int) -> float:
    """Mean reciprocal rank over ``(ranked, relevant)`` cases, each cut at ``k``."""
    return mean([reciprocal_rank(ranked, relevant, k) for ranked, relevant in cases])


def dcg_at_k(gains: Sequence[float], k: int) -> float:
    """Discounted cumulative gain of a gain list in rank order: sum (2^g - 1) / log2(rank + 1)."""
    _check_k(k)
    return sum((2.0 ** float(g) - 1.0) / math.log2(rank + 1) for rank, g in enumerate(list(gains)[:k], start=1))


def ndcg_at_k(ranked: Sequence[str], relevant: Relevance, k: int) -> float:
    """Normalised DCG at ``k`` against graded judgements; 0.0 when nothing is relevant."""
    _check_k(k)
    grades = _grades(relevant)
    ideal = dcg_at_k(sorted(grades.values(), reverse=True), k)
    if ideal == 0:
        return 0.0
    actual = dcg_at_k([grades.get(item, 0.0) for item in ranked], k)
    return actual / ideal


def abstention_rate(abstained: Sequence[bool]) -> float:
    """Share of cases that abstained (for negative cases, higher is better)."""
    return mean([1.0 if flag else 0.0 for flag in abstained])


def typo_recovery_at_k(ranked: Sequence[str], relevant: Relevance, k: int) -> float:
    """1.0 when any relevant ID appears in the top ``k`` for a misspelt query, else 0.0."""
    _check_k(k)
    grades = _grades(relevant)
    return 1.0 if any(item in grades for item in list(ranked)[:k]) else 0.0


class BM25:
    """Okapi BM25 over tokenised, multi-field documents with per-field boosts.

    ``documents`` is a sequence of mappings ``field -> list of tokens``. ``boosts`` maps field names
    to weights (missing fields weigh 1.0). Boosted term frequency is ``sum(boost_f * tf_f)`` and
    boosted length is ``sum(boost_f * len_f)``. IDF is ``ln(1 + (N - df + 0.5) / (df + 0.5))``, which
    is never negative.
    """

    def __init__(self, k1: float = 1.5, b: float = 0.75, boosts: Mapping[str, float] | None = None):
        if k1 < 0 or not 0 <= b <= 1:
            raise ValueError("k1 must be >= 0 and b must be in [0, 1]")
        self.k1 = float(k1)
        self.b = float(b)
        self.boosts = dict(boosts or {})
        self._tf: list[Counter] = []
        self._len: list[float] = []
        self._df: Counter = Counter()
        self.avgdl = 0.0
        self.n = 0

    def fit(self, documents: Sequence[Mapping[str, Sequence[str]]]) -> "BM25":
        self._tf, self._len, self._df = [], [], Counter()
        for document in documents:
            tf: Counter = Counter()
            length = 0.0
            for field, tokens in document.items():
                weight = float(self.boosts.get(field, 1.0))
                for token in tokens:
                    tf[token] += weight
                length += weight * len(tokens)
            self._tf.append(tf)
            self._len.append(length)
            self._df.update(tf.keys())
        self.n = len(self._tf)
        self.avgdl = (sum(self._len) / self.n) if self.n else 0.0
        return self

    def idf(self, token: str) -> float:
        df = self._df.get(token, 0)
        return math.log(1.0 + (self.n - df + 0.5) / (df + 0.5))

    def score(self, query: Sequence[str], index: int) -> float:
        """BM25 score of document ``index`` for the query tokens (duplicates count once)."""
        tf = self._tf[index]
        norm = 1.0 - self.b + self.b * (self._len[index] / self.avgdl if self.avgdl else 0.0)
        total = 0.0
        for token in dict.fromkeys(query):
            freq = tf.get(token, 0.0)
            if freq <= 0:
                continue
            total += self.idf(token) * (freq * (self.k1 + 1.0)) / (freq + self.k1 * norm)
        return total

    def scores(self, query: Sequence[str]) -> list[float]:
        return [self.score(query, index) for index in range(self.n)]
