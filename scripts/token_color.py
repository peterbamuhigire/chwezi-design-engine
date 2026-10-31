"""Colour helpers for the token validator: OKLCH and sRGB to hex, hex round trip.

Standard library only. Contrast maths lives in `engine.design_engine.catalog.contrast_ratio`
so the engine has one WCAG implementation; this module only turns token colour values into
the `#rrggbb` form that function takes.

OKLCH to linear sRGB follows Bjorn Ottosson's published OKLab matrices. An out-of-gamut
colour is brought into sRGB by reducing chroma at constant lightness and hue. Browsers use
their own CSS gamut-mapping algorithm, so for an out-of-gamut colour the hex here can differ
from the one a browser draws; a token that matters should carry its own `hex`.
"""

from __future__ import annotations

import math
import re

HEX_RE = re.compile(r"^#[0-9a-fA-F]{6}$")


def _oklch_to_linear(lightness: float, chroma: float, hue: float) -> tuple[float, float, float]:
    h = math.radians(hue)
    a, b = chroma * math.cos(h), chroma * math.sin(h)
    l_ = lightness + 0.3963377774 * a + 0.2158037573 * b
    m_ = lightness - 0.1055613458 * a - 0.0638541728 * b
    s_ = lightness - 0.0894841775 * a - 1.2914855480 * b
    l, m, s = l_ ** 3, m_ ** 3, s_ ** 3
    return (
        4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
        -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
        -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
    )


def _in_gamut(rgb: tuple[float, float, float], eps: float = 1e-6) -> bool:
    return all(-eps <= c <= 1 + eps for c in rgb)


def _encode(channel: float) -> float:
    c = min(1.0, max(0.0, channel))
    return 12.92 * c if c <= 0.0031308 else 1.055 * c ** (1 / 2.4) - 0.055


def oklch_in_gamut(lightness: float, chroma: float, hue: float) -> bool:
    return _in_gamut(_oklch_to_linear(lightness, chroma, hue))


def oklch_to_hex(lightness: float, chroma: float, hue: float) -> str:
    rgb = _oklch_to_linear(lightness, chroma, hue)
    if not _in_gamut(rgb):
        low, high = 0.0, chroma
        for _ in range(40):
            mid = (low + high) / 2
            if _in_gamut(_oklch_to_linear(lightness, mid, hue)):
                low = mid
            else:
                high = mid
        rgb = _oklch_to_linear(lightness, low, hue)
    return "#%02x%02x%02x" % tuple(round(_encode(c) * 255) for c in rgb)


def srgb_to_hex(red: float, green: float, blue: float) -> str:
    return "#%02x%02x%02x" % tuple(round(min(1.0, max(0.0, c)) * 255) for c in (red, green, blue))


def hex_channels(value: str) -> tuple[int, int, int]:
    return int(value[1:3], 16), int(value[3:5], 16), int(value[5:7], 16)


def max_channel_difference(first: str, second: str) -> int:
    return max(abs(a - b) for a, b in zip(hex_channels(first), hex_channels(second)))
