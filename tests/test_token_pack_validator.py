"""Tests for the generic profile, value-shape check and contrast-claim check of
scripts/validate_token_example.py (unittest style; runs without pytest)."""

import copy
import json
import tempfile
import unittest
from pathlib import Path

from scripts.validate_token_example import validate

ROOT = Path(__file__).resolve().parents[1]
PACK = ROOT / "tests" / "fixtures" / "token-packs" / "lakeside-table-pack.json"


def run(data: dict, profile: str = "generic", shapes: bool = True, claims: bool = True) -> list[str]:
    path = Path(tempfile.mkdtemp(prefix="token-pack-test-")) / "pack.json"
    path.write_text(json.dumps(data), encoding="utf-8")
    return validate(path, profile, shapes, claims)


def pack() -> dict:
    return json.loads(PACK.read_text(encoding="utf-8"))


class PractitionerPackTests(unittest.TestCase):
    def test_a_real_practitioner_pack_passes_every_check_in_the_generic_profile(self):
        self.assertEqual(validate(PACK, "generic", True, True), [])

    def test_the_canonical_profile_still_demands_the_example_only_roles(self):
        findings = validate(PACK, "canonical-example")
        self.assertEqual(len(findings), 3)
        self.assertTrue(all("missing required semantic token" in f for f in findings))

    def test_size_is_a_primitive_root_not_an_unreferenced_component(self):
        self.assertFalse(any("size.target-min" in f for f in validate(PACK, "generic")))

    def test_checks_are_opt_in_so_legacy_files_still_get_structural_checks(self):
        data = pack()
        data["color"]["brand"]["600"]["$value"] = "oklch(0.52 0.09 200)"
        self.assertEqual(run(data, shapes=False, claims=False), [])


class ValueShapeTests(unittest.TestCase):
    def findings_for(self, mutate) -> list[str]:
        data = pack()
        mutate(data)
        return run(data, claims=False)

    def test_css_string_colour_is_rejected(self):
        found = self.findings_for(lambda d: d["color"]["brand"]["600"].update({"$value": "oklch(0.52 0.09 200)"}))
        self.assertEqual(len(found), 1)
        self.assertIn("color.brand.600: colour must be an object", found[0])

    def test_colour_object_missing_components_is_rejected(self):
        found = self.findings_for(lambda d: d["color"]["brand"]["600"].update({"$value": {"colorSpace": "oklch"}}))
        self.assertTrue(any("needs components" in f for f in found))

    def test_css_string_dimension_and_unknown_unit_are_rejected(self):
        found = self.findings_for(lambda d: d["space"]["400"].update({"$value": "16px"}))
        self.assertTrue(any("space.400: dimension must be an object" in f for f in found))
        found = self.findings_for(lambda d: d["space"]["400"].update({"$value": {"value": 1, "unit": "em"}}))
        self.assertTrue(any("space.400: dimension must be an object" in f for f in found))

    def test_font_family_stack_string_is_rejected_and_array_is_accepted(self):
        def stack(d):
            d["font"] = {"family": {"body": {"$type": "fontFamily", "$value": "Public Sans, Georgia, serif"}}}
        self.assertTrue(any("font.family.body: fontFamily" in f for f in self.findings_for(stack)))

        def array(d):
            d["font"] = {"family": {"body": {"$type": "fontFamily", "$value": ["Public Sans", "Georgia", "serif"]}}}
        self.assertEqual(self.findings_for(array), [])

    def test_font_weight_quoted_number_is_rejected_number_and_alias_are_accepted(self):
        def weights(value):
            return lambda d: d.update({"font": {"weight": {"w": {"$type": "fontWeight", "$value": value}}}})
        self.assertTrue(any("font.weight.w" in f for f in self.findings_for(weights("400"))))
        self.assertTrue(any("font.weight.w" in f for f in self.findings_for(weights("Bold"))))
        self.assertEqual(self.findings_for(weights(400)), [])
        self.assertEqual(self.findings_for(weights("semi-bold")), [])

    def test_duration_and_cubic_bezier_shapes(self):
        def motion(duration, curve):
            return lambda d: d.update({"duration": {"quick": {"$type": "duration", "$value": duration}}, "easing": {"standard": {"$type": "cubicBezier", "$value": curve}}})
        self.assertEqual(self.findings_for(motion({"value": 150, "unit": "ms"}, [0.2, 0, 0, 1])), [])
        self.assertTrue(any("duration.quick" in f for f in self.findings_for(motion("150ms", [0.2, 0, 0, 1]))))
        self.assertTrue(any("easing.standard" in f for f in self.findings_for(motion({"value": 150, "unit": "ms"}, [0.2, 0, 1.4, 1]))))

    def test_group_level_type_is_inherited(self):
        def group(d):
            d["space"]["extra"] = {"$type": "dimension", "tight": {"$value": "2px"}}
        self.assertTrue(any("space.extra.tight: dimension" in f for f in self.findings_for(group)))

    def test_hex_fallback_must_match_its_components_when_in_gamut(self):
        found = self.findings_for(lambda d: d["color"]["brand"]["50"]["$value"].update({"hex": "#000000"}))
        self.assertEqual(len(found), 1)
        self.assertIn("does not match its OKLCH components", found[0])

    def test_out_of_gamut_colour_is_not_held_to_a_computed_hex(self):
        # brand.600 sits outside sRGB; a browser maps it with its own algorithm, so the author's hex stands.
        found = self.findings_for(lambda d: d["color"]["brand"]["600"]["$value"].update({"hex": "#007a7f"}))
        self.assertEqual(found, [])

    def test_aliases_are_not_shape_checked(self):
        self.assertEqual(self.findings_for(lambda d: None), [])


class ContrastClaimTests(unittest.TestCase):
    def findings_for(self, mutate) -> list[str]:
        data = pack()
        mutate(data)
        return run(data, shapes=False)

    def test_a_wrong_light_claim_is_reported_with_the_computed_value(self):
        found = self.findings_for(lambda d: d["semantic"]["color"]["text"]["muted"].update({"$description": "vs surface.default = 9.9:1 PASS AAA"}))
        self.assertEqual(len(found), 1)
        self.assertIn("semantic.color.text.muted: claims 9.9:1", found[0])
        self.assertIn("computed 7.", found[0])

    def test_a_dark_overlay_claim_is_measured_in_the_dark_theme(self):
        def mutate(d):
            d["_themes"]["dark"]["semantic"]["color"]["text"]["default"]["$description"] = "vs surface.default = 17.0:1 PASS AAA"
        found = self.findings_for(mutate)
        self.assertEqual(len(found), 1)
        self.assertTrue(found[0].startswith("dark:"), found[0])

    def test_unresolvable_background_name_is_reported(self):
        found = self.findings_for(lambda d: d["semantic"]["color"]["text"]["muted"].update({"$description": "vs no.such.token = 7.1:1"}))
        self.assertTrue(any("cannot resolve `no.such.token`" in f for f in found))

    def test_aaa_label_with_a_lower_ratio_is_reported(self):
        found = self.findings_for(lambda d: d["semantic"]["color"]["border"]["focus"].update({"$description": "vs surface.default = 5.1:1 PASS AAA"}))
        self.assertEqual(len(found), 1)
        self.assertIn("labelled AAA", found[0])

    def test_claims_within_rounding_pass(self):
        # 17.0 is the one-decimal rendering of the computed ratio; the fixture passes unchanged.
        self.assertEqual(self.findings_for(lambda d: None), [])

    def test_colour_without_a_hex_fallback_is_computed_from_its_components(self):
        def mutate(d):
            d["color"]["neutral"]["900"]["$value"].pop("hex")
        self.assertEqual(self.findings_for(mutate), [])

    def test_unsupported_colour_space_without_hex_cannot_be_measured(self):
        def mutate(d):
            d["color"]["neutral"]["900"]["$value"] = {"colorSpace": "display-p3", "components": [0.1, 0.1, 0.1]}
        found = self.findings_for(mutate)
        self.assertTrue(any("cannot be measured" in f for f in found), found)


class StructuralTests(unittest.TestCase):
    def test_unresolved_alias_and_cycle_still_fail_in_generic_profile(self):
        data = pack()
        data["space"]["500"] = {"$type": "dimension", "$value": "{space.nope}"}
        data["space"]["a"] = {"$type": "dimension", "$value": "{space.b}"}
        data["space"]["b"] = {"$type": "dimension", "$value": "{space.a}"}
        found = run(data, shapes=False, claims=False)
        self.assertTrue(any("unresolved reference space.nope" in f for f in found))
        self.assertTrue(any("alias cycle" in f for f in found))

    def test_component_bypassing_the_semantic_tier_still_fails(self):
        data = copy.deepcopy(pack())
        data["table"]["radius"]["$value"] = "{radius.200}"
        self.assertTrue(any("must reference the semantic tier" in f for f in run(data, shapes=False, claims=False)))


if __name__ == "__main__":
    unittest.main()
