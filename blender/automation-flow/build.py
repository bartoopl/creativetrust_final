"""
/uslugi/marketing-automation hero: an automation as a flow graph.

Six nodes — the automations listed on the page (behavioral triggers, lead scoring, email
nurturing, AI content, real-time personalization, CRM sync) — wired with orthogonal hairline
edges. A violet data packet travels trigger → score → email → personalization → CRM as the
visitor scrolls; hovering a node lifts it.

Clips: assemble (intro), scroll_flow (0 → 120), hover_<node>, idle_packet.
Build:  npm run model:automation
"""

import math
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "lib"))

from mathutils import Vector  # noqa: E402

import ct3d as k  # noqa: E402

SIZE, HEIGHT = 0.32, 0.06
NODES = {
    # name: (x, y, label)
    "node_trigger": (-1.1, 0.0, "trigger"),
    "node_score": (-0.55, 0.0, "score"),
    "node_email": (0.0, 0.32, "email"),
    "node_content": (0.0, -0.32, "ai"),
    "node_personalize": (0.55, 0.0, "personal"),
    "node_crm": (1.1, 0.0, "crm"),
}
BRANCH_X, MERGE_X = -0.27, 0.27  # where edges split and merge
H = SIZE / 2
EDGES = [
    [(-1.1 + H, 0), (-0.55 - H, 0)],
    [(-0.55 + H, 0), (BRANCH_X, 0), (BRANCH_X, 0.32), (0 - H, 0.32)],
    [(BRANCH_X, 0), (BRANCH_X, -0.32), (0 - H, -0.32)],
    [(0 + H, 0.32), (MERGE_X, 0.32), (MERGE_X, 0), (0.55 - H, 0)],
    [(0 + H, -0.32), (MERGE_X, -0.32), (MERGE_X, 0)],
    [(0.55 + H, 0), (1.1 - H, 0)],
]
# The packet's route (node centres and edge corners), and which waypoints are nodes (it lingers there).
ROUTE = [(-1.1, 0), (-0.55, 0), (BRANCH_X, 0), (BRANCH_X, 0.32), (0.0, 0.32), (MERGE_X, 0.32), (MERGE_X, 0), (0.55, 0), (1.1, 0)]
STOPS = {0, 1, 4, 7, 8}
PACKET_Z = HEIGHT + 0.03


def glyph(name, p, mats):
    top, lift = p.top, p.lift
    at = (0.02, 0.02, 0)
    if name == "node_trigger":  # lightning bolt
        bolt = [(-0.02, 0.08), (0.04, 0.08), (0.01, 0.015), (0.045, 0.015), (-0.03, -0.08), (-0.005, -0.01), (-0.04, -0.01)]
        k.mesh_object(f"{name}_glyph", k.polygon_bm(bolt, 0.016, z0=top), mats["detail"], lift, at)
    elif name == "node_score":  # gauge
        k.mesh_object(f"{name}_dial", k.ring_bm(0.07, 0.058, 0.012, z0=top), mats["detail"], lift, at)
        needle = k.mesh_object(f"{name}_needle", k.box_bm(0.07, 0.01, 0.008, z0=top), mats["line"], lift, (0.02 + 0.022, 0.02 + 0.022, 0))
        needle.rotation_euler.z = math.radians(45)
    elif name == "node_email":  # envelope
        k.mesh_object(f"{name}_envelope", k.box_bm(0.15, 0.1, 0.014, bevel=0.003, z0=top), mats["detail"], lift, at)
        flap = [(-0.07, 0.045), (0.07, 0.045), (0.0, -0.005)]
        k.mesh_object(f"{name}_flap", k.polygon_bm(flap, 0.004, z0=top + 0.014), mats["line"], lift, at)
    elif name == "node_content":  # AI sparkle
        star = []
        for i in range(8):
            r = 0.075 if i % 2 == 0 else 0.022
            a = math.pi / 2 + i * math.pi / 4
            star.append((r * math.cos(a), r * math.sin(a)))
        k.mesh_object(f"{name}_spark", k.polygon_bm(star, 0.016, z0=top), mats["detail"], lift, at)
        small = [(0.03 * math.cos(math.pi / 2 + i * math.pi / 4) * (1 if i % 2 == 0 else 0.3),
                  0.03 * math.sin(math.pi / 2 + i * math.pi / 4) * (1 if i % 2 == 0 else 0.3)) for i in range(8)]
        k.mesh_object(f"{name}_spark_small", k.polygon_bm(small, 0.012, z0=top), mats["detail"], lift, (0.1, 0.1, 0))
    elif name == "node_personalize":  # person
        k.smooth(k.mesh_object(f"{name}_head", k.cylinder_bm(0.024, 0.03, z0=top), mats["detail"], lift, (0.02, 0.05, 0)))
        k.mesh_object(f"{name}_body", k.box_bm(0.1, 0.05, 0.016, bevel=0.012, z0=top), mats["detail"], lift, (0.02, -0.02, 0))
    elif name == "node_crm":  # database
        for i in range(3):
            k.smooth(k.mesh_object(f"{name}_disc_{i}", k.cylinder_bm(0.06, 0.02, z0=top + i * 0.027), mats["detail"], lift, at))


def route_frames(total=120):
    """Keyframe times proportional to distance, plus a short dwell at each node."""
    dists = [0.0]
    for (x0, y0), (x1, y1) in zip(ROUTE, ROUTE[1:]):
        dists.append(dists[-1] + math.hypot(x1 - x0, y1 - y0))
    dwell = 6
    moving = total - dwell * (len(STOPS) - 2)
    frames, extra = [], 0
    for i, d in enumerate(dists):
        frames.append(round(d / dists[-1] * moving) + extra)
        if i in STOPS and 0 < i < len(ROUTE) - 1:
            extra += dwell
            frames.append(frames[-1] + dwell)  # linger
    return frames


def build(kit):
    mats = kit.mats
    nodes = {}
    for name, (x, y, label) in NODES.items():
        p = k.framed_plate(name, SIZE, SIZE, HEIGHT, mats, location=(x, y, 0), label=label, label_size=0.04)
        glyph(name, p, mats)
        nodes[name] = p

    edges = k.mesh_object("edges", k.box_bm(0.001, 0.001, 0.001), mats["line"])  # parent for edge meshes
    for i, pts in enumerate(EDGES):
        k.mesh_object(f"edge_{i}", k.wire_bm(pts, width=0.012, height=0.006), mats["line"], edges)

    packet = k.smooth(k.mesh_object("packet", k.capsule_bm(0.06, 0.022, z0=0.0), mats["accent"], location=(ROUTE[0][0], ROUTE[0][1], PACKET_Z)))

    # assemble (0–86): nodes settle in flow order, edges rise, the packet appears last.
    for i, (name, p) in enumerate(nodes.items()):
        k.add_drop_in(p.root, "assemble", start=i * 8, offset=(0.02 * (-1) ** i, 0.04, 0.32 + 0.04 * (i % 3)), rot_deg=(8, -6, 9 * (-1) ** i), duration=44)
    k.add_clip(edges, "assemble", [(0, {"scale": Vector((1, 1, 0.001))}), (50, {"scale": Vector((1, 1, 0.001))}), (70, {"scale": Vector((1, 1, 1))})])
    tiny = Vector((0.001, 0.001, 0.001))
    k.add_clip(packet, "assemble", [(0, {"scale": tiny}), (72, {"scale": tiny}), (86, {"scale": Vector((1, 1, 1))})])

    # scroll_flow (0–120): the packet follows the route, easing into each node, turning at corners.
    frames = route_frames()
    keys, fi = [], 0
    for i, (x, y) in enumerate(ROUTE):
        loc = {"location": Vector((x, y, PACKET_Z))}
        keys.append((frames[fi], loc))
        fi += 1
        if i in STOPS and 0 < i < len(ROUTE) - 1:
            keys.append((frames[fi], loc))
            fi += 1
    k.add_clip(packet, "scroll_flow", keys, easing="EASE_IN_OUT", interpolation="SINE")

    for p in nodes.values():
        k.add_hover_clip(p)

    k.add_clip(packet, "idle_packet", [(0, {"scale": Vector((1, 1, 1))}), (30, {"scale": Vector((1.08, 1.08, 1.08))}),
                                       (60, {"scale": Vector((1, 1, 1))})], easing="EASE_IN_OUT", interpolation="SINE")


if __name__ == "__main__":
    k.run(build, camera="automation_camera", target=(0.0, -0.02, 0.05), ortho_scale=2.3,
          shadow_center=(0.08, -0.05), shadow_size=(3.0, 1.5))
