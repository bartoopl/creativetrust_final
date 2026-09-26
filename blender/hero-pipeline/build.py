"""
Homepage hero: five modules (the delivery steps in the hero panel) on a rail with a violet
progress token. See blender/lib/ct3d.py for the shared contract.

Clips: assemble (intro), scroll_progress (token 01 → 05), hover_<module>, idle_token.
Build:  npm run model:hero
"""

import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "lib"))

from mathutils import Vector  # noqa: E402

import ct3d as k  # noqa: E402

MODULES = [
    ("module_goal", "01"),
    ("module_research", "02"),
    ("module_prototype", "03"),
    ("module_deploy", "04"),
    ("module_optimize", "05"),
]
SIZE, HEIGHT, SPACING, RAIL_Y = 0.36, 0.08, 0.5, -0.29


def details(name, plate, mats):
    """Step-specific detail on the module's top face."""
    top, lift = plate.top, plate.lift
    if name == "module_goal":
        for i, (r_out, r_in) in enumerate([(0.11, 0.095), (0.07, 0.055)]):
            k.mesh_object(f"{name}_ring_{i}", k.ring_bm(r_out, r_in, 0.012 + 0.006 * i, z0=top), mats["detail"], lift, (0.02, 0.02, 0))
        k.smooth(k.mesh_object(f"{name}_dot", k.cylinder_bm(0.022, 0.028, z0=top), mats["line"], lift, (0.02, 0.02, 0)))
    elif name == "module_research":
        heights = [0.02, 0.035, 0.015, 0.05, 0.03, 0.06, 0.025, 0.04, 0.045, 0.02, 0.07, 0.03, 0.015, 0.04, 0.03, 0.055]
        for i, h in enumerate(heights):
            gx, gy = i % 4, i // 4
            k.mesh_object(f"{name}_cell_{i:02d}", k.box_bm(0.04, 0.04, h, bevel=0.003, z0=top), mats["detail"], lift,
                          (0.02 + (gx - 1.5) * 0.058, 0.02 + (gy - 1.5) * 0.058, 0))
    elif name == "module_prototype":
        k.mesh_object(f"{name}_screen", k.box_bm(0.25, 0.2, 0.012, bevel=0.003, z0=top), mats["detail"], lift, (0.02, 0.025, 0))
        s = top + 0.012
        k.mesh_object(f"{name}_ui_bar", k.box_bm(0.21, 0.03, 0.004, z0=s), mats["line"], lift, (0.02, 0.09, 0))
        k.mesh_object(f"{name}_ui_card_a", k.box_bm(0.095, 0.1, 0.004, z0=s), mats["clay"], lift, (-0.035, 0.0, 0))
        k.mesh_object(f"{name}_ui_card_b", k.box_bm(0.095, 0.1, 0.004, z0=s), mats["clay"], lift, (0.075, 0.0, 0))
    elif name == "module_deploy":
        z = top
        for i, (w, part) in enumerate([(0.26, "data"), (0.22, "api"), (0.18, "front")]):
            gap = 0.018 if i else 0.0
            z += gap
            k.mesh_object(f"{name}_layer_{part}", k.box_bm(w, w, 0.014, bevel=0.003, z0=z), mats["detail"], lift, (0.02, 0.02, 0))
            if i:
                for cx in (-1, 1):
                    for cy in (-1, 1):
                        k.mesh_object(f"{name}_post_{i}{cx}{cy}", k.cylinder_bm(0.004, gap, segments=8, z0=z - gap), mats["line"], lift,
                                      (0.02 + cx * (w / 2 - 0.02), 0.02 + cy * (w / 2 - 0.02), 0))
            z += 0.014
    elif name == "module_optimize":
        for i, h in enumerate([0.035, 0.06, 0.09, 0.13]):
            k.mesh_object(f"{name}_bar_{i}", k.box_bm(0.042, 0.042, h, bevel=0.004, z0=top), mats["detail"], lift, (-0.06 + i * 0.058, 0.03, 0))


def build(kit):
    mats = kit.mats
    plates = []
    for i, (name, label) in enumerate(MODULES):
        plate = k.framed_plate(name, SIZE, SIZE, HEIGHT, mats, location=((i - 2) * SPACING, 0, 0), label=label)
        details(name, plate, mats)
        plates.append(plate)

    span = SPACING * 4 + SIZE
    rail = k.mesh_object("rail", k.box_bm(span, 0.018, 0.01, bevel=0.003), mats["line"], location=(0, RAIL_Y, 0))
    for i, p in enumerate(plates):
        k.mesh_object(f"rail_stub_{i}", k.box_bm(0.012, abs(RAIL_Y) - SIZE / 2, 0.006), mats["line"], rail,
                      (p.root.location.x, (abs(RAIL_Y) - SIZE / 2) / 2 + 0.009, 0))
    token = k.smooth(k.mesh_object("token_progress", k.capsule_bm(0.1, 0.022, z0=0.01), mats["accent"],
                                   location=(plates[0].root.location.x, RAIL_Y, 0)))

    # assemble (0–96): modules settle one after another; small offsets keep them in frame.
    scatter = [((-0.06, 0.06, 0.30), (10, -8, 12)), ((0.04, 0.08, 0.38), (-9, 6, -10)), ((0.07, 0.03, 0.34), (7, 9, 8)),
               ((-0.03, 0.09, 0.42), (-10, -5, -12)), ((0.06, 0.05, 0.36), (8, 8, 10))]
    for i, (p, (offset, rot)) in enumerate(zip(plates, scatter)):
        k.add_drop_in(p.root, "assemble", start=i * 12, offset=offset, rot_deg=rot)
    k.add_clip(rail, "assemble", [(0, {"scale": Vector((0.001, 1, 1))}), (40, {"scale": Vector((1, 1, 1))})])
    tiny = Vector((0.001, 0.001, 0.001))
    k.add_clip(token, "assemble", [(0, {"scale": tiny}), (84, {"scale": tiny}), (96, {"scale": Vector((1, 1, 1))})])

    # scroll_progress (0–120): token glides 01 → 05, easing into each stop.
    keys = [(i * 30, {"location": Vector((p.root.location.x, token.location.y, token.location.z))}) for i, p in enumerate(plates)]
    k.add_clip(token, "scroll_progress", keys, easing="EASE_IN_OUT", interpolation="SINE")

    for p in plates:
        k.add_hover_clip(p)

    # idle_token (0–60, loop): barely-there breathing.
    k.add_clip(token, "idle_token", [(0, {"scale": Vector((1, 1, 1))}), (30, {"scale": Vector((1.06, 1.06, 1.06))}),
                                     (60, {"scale": Vector((1, 1, 1))})], easing="EASE_IN_OUT", interpolation="SINE")


if __name__ == "__main__":
    k.run(build, camera="hero_camera", target=(0.0, -0.08, 0.05), ortho_scale=2.2,
          shadow_center=(0.12, -0.12), shadow_size=(SPACING * 4 + SIZE + 0.9, 1.3))
