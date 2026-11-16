"""
Static isometric illustrations for service pages: same toolkit, palette and camera as the
interactive scenes (../lib/ct3d.py), rendered once to a transparent still instead of a GLB.

Each illustration is a function below; ILLUSTRATIONS maps its id to (build, camera target,
ortho scale). The site shows public/illustrations/<id>.webp through
src/components/ui/Illustration.tsx.

    blender -b --factory-startup --python blender/illustrations/build.py -- --out DIR [--only id ...]
Build:  npm run illustrations   (renders, converts to WebP)
"""

import argparse
import math
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "lib"))

import bpy  # noqa: E402

import ct3d as k  # noqa: E402

RES = (1500, 1000)  # 3:2 — sits beside body copy


def plate(name, sx, sy, h, mats, loc, parent=None, label=None, label_size=0.045, inset=0.02):
    return k.framed_plate(name, sx, sy, h, mats, location=loc, parent=parent, label=label, label_size=label_size, inset=inset)


def block(name, sx, sy, h, mat, parent, loc, bevel=0.004):
    return k.mesh_object(name, k.box_bm(sx, sy, h, bevel=bevel, z0=0), mat, parent, loc)


def wire(name, points, mat, z, width=0.012, height=0.006, parent=None):
    """Orthogonal wire as one bar per segment with a slightly taller joint on every bend, so
    overlapping corners never share a face (coplanar overlaps render as dark specks)."""
    for i, seg in enumerate(zip(points, points[1:])):
        k.mesh_object(f"{name}_{i}", k.wire_bm(list(seg), width=width, height=height, z=z), mat, parent)
    for i, (x, y) in enumerate(points[1:-1]):
        k.mesh_object(f"{name}_joint_{i}", k.box_bm(width * 1.15, width * 1.15, height + 0.0012, z0=z), mat, parent, (x, y, 0))


def pillar(name, x, y, z0, z1, mat, radius=0.006):
    obj = k.mesh_object(name, k.cylinder_bm(radius, 1.0, segments=10), mat, None, (x, y, z0))
    obj.scale.z = z1 - z0
    return obj


# ---------- /uslugi/strony-www ----------

def www_compare(m):
    """A business card next to a page that sells: the card is one block and an address; the
    page answers questions in order and ends in the form with the one violet button."""
    card = plate("card", 0.7, 0.95, 0.04, m, (-0.5, 0.15, 0), label="wizytówka", label_size=0.04)
    block("card_logo", 0.18, 0.18, 0.02, m["detail"], card.lift, (0, 0.2, card.top))
    block("card_line_0", 0.4, 0.03, 0.005, m["line"], card.lift, (0, -0.02, card.top))
    block("card_line_1", 0.28, 0.03, 0.005, m["line"], card.lift, (0, -0.1, card.top))

    page = plate("page", 0.8, 1.3, 0.06, m, (0.55, -0.05, 0), label="strona pod biznes", label_size=0.04)
    t, lift = page.top, page.lift
    for i, (y, d, h) in enumerate([(0.45, 0.2, 0.04), (0.2, 0.18, 0.03), (-0.02, 0.18, 0.025)]):
        block(f"page_sec_{i}", 0.66, d, h, m["detail"], lift, (0, y, t))
        block(f"page_sec_line_{i}", 0.34, 0.025, 0.004, m["line"], lift, (-0.12, y + d / 2 - 0.04, t + h))
    cols = 3
    for i in range(cols):
        block(f"page_card_{i}", 0.19, 0.12, 0.03 + 0.01 * i, m["clay"], lift, (-0.22 + i * 0.22, 0.17, t + 0.03))
    block("page_form", 0.66, 0.3, 0.025, m["clay"], lift, (0, -0.37, t))
    k.mesh_object("page_form_frame", k.rect_frame_bm(0.66, 0.3, k.FRAME_W, 0.003, t + 0.025), m["line"], lift, (0, -0.37, 0))
    for i in range(2):
        block(f"page_form_field_{i}", 0.4, 0.045, 0.006, m["detail"], lift, (-0.08, -0.31 - i * 0.065, t + 0.025))
    block("page_form_submit", 0.16, 0.07, 0.022, m["accent"], lift, (0.2, -0.42, t + 0.025), bevel=0.008)


def www_path(m):
    """Flat page with its sections; a violet path runs through them and ends at the form —
    every section leads to the enquiry."""
    page = plate("page", 0.95, 1.5, 0.05, m, (0, 0, 0), label="strona", label_size=0.05)
    t, lift = page.top, page.lift
    rows = [(0.55, 0.16, 0.035), (0.3, 0.22, 0.02), (0.02, 0.22, 0.02), (-0.27, 0.22, 0.02)]
    for i, (y, depth, h) in enumerate(rows):
        block(f"page_section_{i}", 0.78, depth, h, m["detail"], lift, (0, y, t))
        block(f"page_section_line_{i}", 0.4, 0.025, 0.004, m["line"], lift, (-0.15, y + depth / 2 - 0.045, t + h))
    form = block("page_form", 0.62, 0.26, 0.03, m["clay"], lift, (0, -0.56, t), bevel=0.006)
    k.mesh_object("page_form_frame", k.rect_frame_bm(0.62, 0.26, k.FRAME_W, 0.003, t + 0.03), m["line"], lift, (0, -0.56, 0))
    for i in range(2):
        block(f"page_form_field_{i}", 0.4, 0.04, 0.006, m["detail"], lift, (-0.07, -0.5 - i * 0.06, t + 0.03))
    block("page_form_submit", 0.14, 0.06, 0.02, m["accent"], lift, (0.2, -0.6, t + 0.03), bevel=0.008)
    path = [(0.33, 0.55), (0.33, 0.3), (-0.3, 0.3), (-0.3, 0.02), (0.3, 0.02), (0.3, -0.27), (-0.2, -0.27), (-0.2, -0.43), (0.2, -0.43), (0.2, -0.56)]
    wire("path", path, m["accent"], t + 0.035, width=0.014, height=0.008, parent=lift)
    k.smooth(k.mesh_object("path_start", k.cylinder_bm(0.03, 0.012, z0=t + 0.035), m["accent"], lift, (0.33, 0.55, 0)))


def www_headless(m):
    """Headless CMS: the content panel on the left feeds the website and the phone through one
    API; the live connection to the site is violet."""
    cms = plate("cms", 0.6, 0.85, 0.06, m, (-0.55, 0.05, 0), label="cms", label_size=0.05)
    for i in range(5):
        y = 0.27 - i * 0.12
        block(f"cms_row_{i}", 0.4, 0.07, 0.01 + 0.006 * (i == 1), m["detail"], cms.lift, (0.03, y, cms.top))
        block(f"cms_row_tag_{i}", 0.06, 0.03, 0.004, m["accent" if i == 1 else "line"], cms.lift, (-0.2, y, cms.top + 0.01))

    api = plate("api", 0.22, 0.22, 0.09, m, (0.12, 0.05, 0), label="api", label_size=0.04, inset=0.016)
    k.smooth(k.mesh_object("api_core", k.cylinder_bm(0.05, 0.02, z0=api.top), m["line"], api.lift, (0, 0, 0)))

    site = plate("site", 0.66, 0.5, 0.05, m, (0.82, 0.3, 0), label="www", label_size=0.045)
    block("site_bar", 0.56, 0.035, 0.005, m["line"], site.lift, (0, 0.18, site.top))
    block("site_hero", 0.56, 0.14, 0.012, m["detail"], site.lift, (0, 0.06, site.top))
    for i in range(3):
        block(f"site_card_{i}", 0.16, 0.12, 0.01, m["detail"], site.lift, (-0.19 + i * 0.19, -0.11, site.top))

    phone = plate("phone", 0.24, 0.4, 0.05, m, (0.72, -0.38, 0), label="app", label_size=0.035, inset=0.016)
    block("phone_screen", 0.15, 0.26, 0.006, m["detail"], phone.lift, (0.01, 0.02, phone.top))

    z = 0.0
    wire("wire_cms_api", [(-0.25, 0.05), (0.01, 0.05)], m["line"], z)
    wire("wire_api_site", [(0.23, 0.12), (0.4, 0.12), (0.4, 0.3), (0.49, 0.3)], m["accent"], z)
    wire("wire_api_phone", [(0.12, -0.06), (0.12, -0.38), (0.6, -0.38)], m["line"], z)


# ---------- /uslugi/zarzadzanie-e-commerce ----------

def ecm_hub(m):
    """One team in the middle, everyone else connected to it: the people, the agencies, the IT
    house, the suppliers and the data all report into a single plan."""
    core = plate("core", 0.46, 0.46, 0.1, m, (0, 0, 0), label="plan", label_size=0.05)
    k.mesh_object("core_ring", k.ring_bm(0.13, 0.11, 0.012, z0=core.top), m["accent"], core.lift)
    k.smooth(k.mesh_object("core_dot", k.cylinder_bm(0.05, 0.03, z0=core.top), m["detail"], core.lift))

    nodes = [("zespol", "zespół", -1, 0.62), ("it", "it", -1, 0.0), ("dostawcy", "dostawcy", -1, -0.62),
             ("agencje", "agencje", 1, 0.62), ("dane", "dane", 1, 0.0), ("sklep", "sklep", 1, -0.62)]
    for name, label, side, y in nodes:
        x = side * 1.0
        p = plate(f"node_{name}", 0.36, 0.28, 0.05, m, (x, y, 0), label=label, label_size=0.035, inset=0.016)
        for j in range(2):
            block(f"node_{name}_detail_{j}", 0.12 - j * 0.03, 0.05, 0.012 + 0.012 * j, m["detail"], p.lift, (0.05 + j * 0.02, 0.05 - j * 0.07, p.top))
        wire(f"wire_{name}", [(x - side * 0.18, y), (side * 0.5, y)], m["line"], 0.0)
    for side in (-1, 1):
        wire(f"bus_{side}", [(side * 0.5, 0.62), (side * 0.5, -0.62)], m["line"], 0.0)
        wire(f"bus_core_{side}", [(side * 0.5, 0.0), (side * 0.23, 0.0)], m["accent"], 0.0)
        for y in (0.62, 0.0, -0.62):  # where separate wires meet: a joint, so no coplanar overlap shows
            k.mesh_object(f"bus_joint_{side}_{y}", k.box_bm(0.014, 0.014, 0.0072, z0=0.0), m["accent" if y == 0.0 else "line"], None, (side * 0.5, y, 0))


def ecm_dashboard(m):
    """One operating dashboard: four KPI tiles and a chart of the quarter. Margin after returns
    is the violet bar — the number the rest is checked against."""
    board = plate("dashboard", 1.5, 1.0, 0.06, m, (0, 0, 0), label="dashboard", label_size=0.05)
    t, lift = board.top, board.lift
    for i in range(4):
        x = -0.52 + i * 0.35
        tile = block(f"kpi_{i}", 0.3, 0.2, 0.02, m["detail"], lift, (x, 0.32, t))
        block(f"kpi_{i}_value", 0.14, 0.05, 0.012, m["accent" if i == 3 else "line"], lift, (x - 0.05, 0.3, t + 0.02))
        block(f"kpi_{i}_label", 0.1, 0.025, 0.004, m["line"], lift, (x - 0.07, 0.38, t + 0.02))
    block("chart_panel", 1.32, 0.56, 0.012, m["detail"], lift, (0, -0.15, t))
    heights = [0.08, 0.11, 0.1, 0.14, 0.16, 0.15, 0.19, 0.22]
    for i, h in enumerate(heights):
        x = -0.5 + i * 0.143
        block(f"bar_{i}", 0.07, 0.07, h, m["clay"], lift, (x, -0.12, t + 0.012), bevel=0.004)
        block(f"bar_margin_{i}", 0.07, 0.07, h * 0.45, m["accent" if i == len(heights) - 1 else "line"], lift, (x, -0.26, t + 0.012), bevel=0.004)
    block("chart_axis", 1.2, 0.012, 0.004, m["line"], lift, (0, -0.37, t + 0.012))


def ecm_roadmap(m):
    """The four steps of the cooperation as rising plates: audit, plan, running the shop,
    reviews — with the violet token on the step where results get checked."""
    steps = [("audyt", 0.05), ("plan", 0.11), ("prowadzenie", 0.17), ("przegląd", 0.23)]
    for i, (label, h) in enumerate(steps):
        x, y = -0.75 + i * 0.5, 0.3 - i * 0.2
        p = plate(f"step_{i}", 0.42, 0.42, h, m, (x, y, 0), label=f"0{i + 1} {label}", label_size=0.034, inset=0.016)
        block(f"step_{i}_card", 0.22, 0.14, 0.012, m["detail"], p.lift, (0.04, 0.06, p.top))
        block(f"step_{i}_line", 0.16, 0.025, 0.004, m["line"], p.lift, (0.01, -0.05, p.top))
        if i < len(steps) - 1:
            wire(f"link_{i}", [(x + 0.21, y), (x + 0.25, y), (x + 0.25, y - 0.2), (x + 0.29, y - 0.2)], m["line"], 0.0)
    last_x, last_y, last_h = -0.75 + 3 * 0.5, 0.3 - 3 * 0.2, steps[-1][1]
    k.mesh_object("token", k.capsule_bm(0.16, 0.035, z0=last_h + 0.012), m["accent"], None, (last_x + 0.06, last_y + 0.07, 0))


ILLUSTRATIONS = {
    "www-compare": (www_compare, (0.05, 0.05, 0.05), 2.35),
    "www-path": (www_path, (0.0, 0.0, 0.05), 2.1),
    "www-headless": (www_headless, (0.17, 0.0, 0.06), 2.45),
    "ecm-hub": (ecm_hub, (0.0, 0.0, 0.05), 2.95),
    "ecm-dashboard": (ecm_dashboard, (0.0, 0.0, 0.1), 2.25),
    "ecm-roadmap": (ecm_roadmap, (0.0, -0.05, 0.1), 2.2),
}


def render(name, out_dir):
    build, target, ortho = ILLUSTRATIONS[name]
    scene = k.reset_scene()
    mats = k.palette_materials()
    k.setup_camera_and_light(scene, f"{name}_camera", target, ortho, key=(-1.2, -0.8, 4.2))
    scene.render.resolution_x, scene.render.resolution_y = RES
    build(mats)
    scene.cycles.samples = 96
    path = os.path.join(os.path.abspath(out_dir), f"{name}.png")
    k.render_preview(scene, path)
    print(f"REPORT rendered {path}")


if __name__ == "__main__":
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", required=True)
    parser.add_argument("--only", nargs="*")
    args = parser.parse_args(argv)
    os.makedirs(args.out, exist_ok=True)
    for name in args.only or ILLUSTRATIONS:
        render(name, args.out)
