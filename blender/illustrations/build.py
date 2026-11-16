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


def joint(name, x, y, mat, size=0.014, height=0.0072):
    """Cap where separate wires meet, a hair taller than both, so their overlap never shows."""
    return k.mesh_object(name, k.box_bm(size, size, height, z0=0.0), mat, None, (x, y, 0))


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


# ---------- audits ----------

def audit_scan(m):
    """Audit as inspection: the shop's catalogue under a lens, one cell framed violet — the
    finding that matters most."""
    shop = plate("shop", 1.3, 0.95, 0.06, m, (0, 0, 0), label="sklep", label_size=0.05)
    for i in range(8):
        gx, gy = i % 4, i // 4
        x, y = -0.42 + gx * 0.28, 0.17 - gy * 0.3
        block(f"cell_{i}", 0.22, 0.22, 0.015, m["detail"], shop.lift, (x, y, shop.top))
        block(f"cell_img_{i}", 0.14, 0.1, 0.012 + 0.006 * (i % 3), m["clay"], shop.lift, (x, y + 0.03, shop.top + 0.015))
    fx, fy = -0.42 + 2 * 0.28, 0.17 - 0.3
    k.mesh_object("finding", k.rect_frame_bm(0.25, 0.25, 0.014, 0.01, shop.top + 0.015), m["accent"], shop.lift, (fx, fy, 0))
    lens_z = 0.42
    k.mesh_object("lens_ring", k.ring_bm(0.21, 0.18, 0.03, z0=lens_z), m["clay"], None, (fx, fy, 0))
    k.mesh_object("lens_rim", k.ring_bm(0.185, 0.175, 0.032, z0=lens_z), m["line"], None, (fx, fy, 0))
    handle = k.mesh_object("lens_handle", k.box_bm(0.32, 0.045, 0.03, bevel=0.01, z0=lens_z), m["clay"], None, (fx + 0.34, fy - 0.2, 0))
    handle.rotation_euler.z = -0.52
    pillar("lens_drop", fx, fy, shop.top + 0.03, lens_z, m["line"], radius=0.003)


def audit_report(m):
    """What the client keeps: a short stack of report sheets; the top one is the roadmap with
    priorities, the first of them violet."""
    for i in range(3):
        block(f"sheet_{i}", 0.8, 1.05, 0.012, m["clay"], None, (0.06 * (2 - i), 0.05 * (2 - i), i * 0.018), bevel=0.003)
        k.mesh_object(f"sheet_frame_{i}", k.rect_frame_bm(0.8, 1.05, k.FRAME_W, 0.002, i * 0.018 + 0.012), m["line"], None, (0.06 * (2 - i), 0.05 * (2 - i), 0))
    top = 3 * 0.018
    block("rep_title", 0.42, 0.05, 0.008, m["line"], None, (-0.12, 0.42, top))
    for i in range(4):
        y = 0.24 - i * 0.15
        block(f"rep_check_{i}", 0.07, 0.07, 0.014 + 0.01 * (i == 0), m["accent" if i == 0 else "detail"], None, (-0.28, y, top), bevel=0.006)
        block(f"rep_line_{i}", 0.42 - 0.06 * i, 0.04, 0.006, m["detail"], None, (0.02 - 0.03 * i, y, top))
    for i, h in enumerate((0.05, 0.08, 0.12)):
        block(f"rep_bar_{i}", 0.08, 0.08, h, m["detail"], None, (-0.2 + i * 0.12, -0.38, top), bevel=0.004)
    k.text_object("rep_label", "roadmapa", 0.045, m["ink"], None, (-0.33, -0.48, top))


def site_audit(m):
    """A website taken apart by the audit: speed, content, SEO and the form checked layer by
    layer; the broken step on the way to the enquiry is violet."""
    page = plate("site", 1.0, 1.25, 0.05, m, (0, 0, 0), label="strona", label_size=0.05)
    t = page.top
    rows = [("szybkość", 0.42), ("treść", 0.17), ("seo", -0.08), ("formularz", -0.33)]
    for i, (label, y) in enumerate(rows):
        block(f"sa_row_{i}", 0.84, 0.2, 0.02, m["detail"], page.lift, (0, y, t))
        k.text_object(f"sa_label_{i}", label, 0.04, m["ink"], page.lift, (-0.38, y - 0.07, t + 0.02))
        block(f"sa_meter_{i}", 0.3, 0.04, 0.008, m["line"], page.lift, (0.2, y + 0.03, t + 0.02))
        fill = (0.26, 0.22, 0.12, 0.06)[i]
        block(f"sa_fill_{i}", fill, 0.045, 0.014, m["accent" if i == 3 else "clay"], page.lift, (0.05 + fill / 2, y + 0.03, t + 0.02))
    k.mesh_object("sa_flag", k.rect_frame_bm(0.86, 0.22, 0.012, 0.01, t + 0.02), m["accent"], page.lift, (0, -0.33, 0))


def audit_days(m):
    """The audit's working days as tiles that build up; the report on the last day is violet."""
    for i in range(7):
        x = -0.9 + i * 0.3
        h = 0.04 + i * 0.03
        p = plate(f"day_{i}", 0.26, 0.26, h, m, (x, 0, 0), label=f"{i + 1}", label_size=0.05, inset=0.014)
        if i == 6:
            block("day_report", 0.14, 0.17, 0.02, m["accent"], p.lift, (0.02, 0.02, p.top), bevel=0.004)
        else:
            block(f"day_{i}_card", 0.12, 0.08, 0.008, m["detail"], p.lift, (0.03, 0.04, p.top))


def ads_tree(m):
    """A Google Ads account as a tree: account, campaigns, ad groups. The audit follows one
    branch where the budget leaks — drawn violet."""
    acc = plate("account", 0.5, 0.36, 0.08, m, (-0.85, 0, 0), label="konto", label_size=0.045)
    for i, y in enumerate((0.55, 0.0, -0.55)):
        c = plate(f"campaign_{i}", 0.38, 0.26, 0.05, m, (-0.1, y, 0), label=f"kampania {i + 1}", label_size=0.03, inset=0.014)
        block(f"campaign_{i}_bar", 0.18, 0.04, 0.01, m["detail"], c.lift, (0.05, 0.04, c.top))
        hot = i == 1
        wire(f"w_acc_{i}", [(-0.45, y), (-0.29, y)], m["accent" if hot else "line"], 0.0)
        wire(f"w_c_{i}", [(0.09, y), (0.25, y)], m["accent" if hot else "line"], 0.0)
        wire(f"w_c_bus_{i}", [(0.25, y + 0.13), (0.25, y - 0.13)], m["line"], 0.0)
        for j, dy in enumerate((0.13, -0.13)):
            g = plate(f"group_{i}_{j}", 0.24, 0.18, 0.035, m, (0.5, y + dy, 0), inset=0.012)
            block(f"group_{i}_{j}_dot", 0.06, 0.06, 0.012 + 0.012 * (hot and j == 0), m["accent" if hot and j == 0 else "detail"], g.lift, (0, 0, g.top), bevel=0.004)
            wire(f"w_g_{i}_{j}", [(0.25, y + dy), (0.38, y + dy)], m["accent" if hot and j == 0 else "line"], 0.0)
            joint(f"j_g_{i}_{j}", 0.25, y + dy, m["accent" if hot and j == 0 else "line"])
        joint(f"j_acc_{i}", -0.45, y, m["accent" if hot else "line"])
        joint(f"j_c_{i}", 0.25, y, m["accent" if hot else "line"])
    wire("w_acc_trunk", [(-0.6, 0), (-0.45, 0)], m["accent"], 0.0)
    wire("w_acc_bus", [(-0.45, 0.55), (-0.45, -0.55)], m["line"], 0.0)


def ads_funnel(m):
    """From spend to sales: rings narrowing from clicks to conversions, the conversion token
    violet at the bottom — what the audit checks the budget against."""
    for i, (r, z) in enumerate(((0.62, 0.5), (0.48, 0.38), (0.35, 0.26), (0.23, 0.14))):
        ring = k.mesh_object(f"funnel_{i}", k.ring_bm(r, r - 0.05, 0.035, z0=z), m["clay"], None, (0, 0, 0))
        rim = k.mesh_object(f"funnel_rim_{i}", k.ring_bm(r - 0.045, r - 0.05, 0.037, z0=z), m["line"], None, (0, 0, 0))
        ring.visible_shadow = rim.visible_shadow = False
    base = plate("conversions", 0.5, 0.5, 0.05, m, (0, 0, 0), label="konwersje", label_size=0.04)
    k.smooth(k.mesh_object("conversion", k.cylinder_bm(0.08, 0.04, z0=base.top), m["accent"], base.lift))
    for i in range(5):
        a = i * 1.25
        dot = k.smooth(k.mesh_object(f"click_{i}", k.cylinder_bm(0.035, 0.02, z0=0.6 + 0.03 * (i % 2)), m["detail"], None, (0.4 * math.cos(a), 0.4 * math.sin(a), 0)))
        dot.visible_shadow = False


# ---------- e-commerce, automation, headless ----------

def shop_storefront(m):
    """A storefront built from numbers: product grid, cart and checkout; the buy button is the
    one violet element."""
    s = plate("store", 1.4, 0.95, 0.06, m, (0, 0, 0), label="sklep", label_size=0.05)
    t = s.top
    block("st_nav", 1.2, 0.05, 0.006, m["line"], s.lift, (0, 0.38, t))
    for i in range(6):
        gx, gy = i % 3, i // 3
        x, y = -0.42 + gx * 0.26, 0.17 - gy * 0.3
        block(f"st_card_{i}", 0.22, 0.26, 0.012, m["detail"], s.lift, (x, y, t))
        block(f"st_img_{i}", 0.16, 0.13, 0.02 + 0.01 * (i % 2), m["clay"], s.lift, (x, y + 0.04, t + 0.012), bevel=0.004)
        block(f"st_price_{i}", 0.08, 0.025, 0.004, m["line"], s.lift, (x - 0.04, y - 0.09, t + 0.012))
    block("st_cart", 0.34, 0.6, 0.02, m["detail"], s.lift, (0.46, 0.02, t), bevel=0.004)
    for i in range(3):
        block(f"st_cart_item_{i}", 0.24, 0.08, 0.01, m["clay"], s.lift, (0.46, 0.2 - i * 0.11, t + 0.02))
    block("st_buy", 0.24, 0.08, 0.025, m["accent"], s.lift, (0.46, -0.18, t + 0.02), bevel=0.008)


def ma_cart_recovery(m):
    """Abandoned cart, then an automated email, then the order: the email in violet closes the
    loop."""
    cart = plate("cart", 0.5, 0.42, 0.06, m, (-0.7, 0.2, 0), label="koszyk", label_size=0.04)
    for i in range(2):
        block(f"cart_item_{i}", 0.3, 0.08, 0.012, m["detail"], cart.lift, (0.05, 0.08 - i * 0.12, cart.top))
    mail = plate("email", 0.42, 0.3, 0.05, m, (0.05, -0.35, 0), label="e-mail", label_size=0.035, inset=0.016)
    k.mesh_object("email_flap", k.polygon_bm([(-0.13, 0.08), (0.13, 0.08), (0, -0.02)], 0.012, z0=mail.top), m["accent"], mail.lift, (0.03, 0.0, 0))
    order = plate("order", 0.5, 0.42, 0.06, m, (0.75, 0.2, 0), label="zamówienie", label_size=0.035)
    block("order_check", 0.12, 0.12, 0.025, m["detail"], order.lift, (0.06, 0.06, order.top), bevel=0.008)
    wire("w_cart_mail", [(-0.7, -0.01), (-0.7, -0.35), (-0.16, -0.35)], m["line"], 0.0)
    wire("w_mail_order", [(0.26, -0.35), (0.75, -0.35), (0.75, -0.01)], m["accent"], 0.0)
    k.text_object("delay", "po 2 h", 0.04, m["ink"], None, (-0.62, -0.3, 0.008))


def ma_crm_sync(m):
    """CRM, shop and the automation platform kept in sync: one customer record, the same in all
    three; the live sync is violet."""
    crm = plate("crm", 0.5, 0.5, 0.06, m, (-0.75, 0.0, 0), label="crm", label_size=0.045)
    for i in range(3):
        k.smooth(k.mesh_object(f"crm_disc_{i}", k.cylinder_bm(0.12, 0.025, z0=crm.top + i * 0.03), m["detail" if i < 2 else "clay"], crm.lift, (0.02, 0.03, 0)))
    shop = plate("shop", 0.5, 0.4, 0.05, m, (0.2, 0.5, 0), label="sklep", label_size=0.04)
    for i in range(3):
        block(f"shop_item_{i}", 0.1, 0.1, 0.02 + 0.01 * i, m["detail"], shop.lift, (-0.08 + i * 0.13, 0.05, shop.top), bevel=0.004)
    auto = plate("automation", 0.5, 0.4, 0.05, m, (0.2, -0.45, 0), label="automatyzacje", label_size=0.032)
    for i in range(3):
        block(f"auto_step_{i}", 0.09, 0.07, 0.015, m["accent" if i == 1 else "detail"], auto.lift, (-0.1 + i * 0.12, 0.05, auto.top), bevel=0.004)
    profile = plate("profile", 0.22, 0.22, 0.09, m, (0.85, 0.0, 0), label="klient", label_size=0.03, inset=0.014)
    k.smooth(k.mesh_object("profile_head", k.cylinder_bm(0.04, 0.03, z0=profile.top), m["detail"], profile.lift, (0, 0.02, 0)))
    wire("w_crm_shop", [(-0.5, 0.1), (-0.25, 0.1), (-0.25, 0.5), (-0.05, 0.5)], m["accent"], 0.0)
    wire("w_crm_auto", [(-0.5, -0.1), (-0.25, -0.1), (-0.25, -0.45), (-0.05, -0.45)], m["accent"], 0.0)
    wire("w_shop_prof", [(0.45, 0.5), (0.85, 0.5), (0.85, 0.11)], m["line"], 0.0)
    wire("w_auto_prof", [(0.45, -0.45), (0.85, -0.45), (0.85, -0.11)], m["line"], 0.0)


def woo_hybrid(m):
    """Migrating in stages: one WooCommerce backend still serves the old theme while the new
    headless storefront (violet frame) takes over page by page."""
    back = plate("woo", 0.7, 0.6, 0.08, m, (-0.55, 0, 0), label="woocommerce", label_size=0.04)
    for i in range(3):
        k.smooth(k.mesh_object(f"woo_db_{i}", k.cylinder_bm(0.1, 0.025, z0=back.top + i * 0.03), m["detail"], back.lift, (0.05, 0.05, 0)))
    old = plate("theme", 0.55, 0.4, 0.04, m, (0.45, 0.45, 0), label="stary motyw", label_size=0.032)
    block("theme_block", 0.4, 0.2, 0.01, m["detail"], old.lift, (0, 0.02, old.top))
    new = plate("front", 0.6, 0.45, 0.06, m, (0.5, -0.38, 0), label="headless", label_size=0.036)
    k.mesh_object("front_frame", k.rect_frame_bm(0.6, 0.45, 0.014, 0.008, new.top), m["accent"], new.lift)
    for i in range(3):
        block(f"front_card_{i}", 0.14, 0.18, 0.015 + 0.008 * i, m["detail"], new.lift, (-0.17 + i * 0.17, 0.0, new.top), bevel=0.004)
    wire("w_old", [(-0.2, 0.15), (0.0, 0.15), (0.0, 0.45), (0.17, 0.45)], m["line"], 0.0)
    wire("w_new", [(-0.2, -0.15), (0.0, -0.15), (0.0, -0.38), (0.2, -0.38)], m["accent"], 0.0)


def migration_move(m):
    """Migration as a move: the old monolithic shop on the left, the new stack on the right,
    data carried across in violet crates."""
    old = plate("old", 0.6, 0.6, 0.18, m, (-0.75, 0.1, 0), label="przed", label_size=0.04)
    block("old_lump", 0.4, 0.4, 0.06, m["detail"], old.lift, (0.03, 0.03, old.top), bevel=0.01)
    for i, (h, z) in enumerate(((0.05, 0.0), (0.05, 0.1), (0.05, 0.2))):
        p = plate(f"new_{i}", 0.6 - i * 0.08, 0.6 - i * 0.08, h, m, (0.7, -0.1, z), label=("dane", "api", "front")[i], label_size=0.035, inset=0.016)
    for i in range(3):
        block(f"crate_{i}", 0.1, 0.1, 0.08, m["accent" if i == 1 else "clay"], None, (-0.25 + i * 0.22, -0.05 + i * 0.03, 0), bevel=0.008)
    wire("w_move", [(-0.45, -0.25), (0.4, -0.25)], m["line"], 0.0)


def seo_redirects(m):
    """Keeping search visibility: every old URL points to its new address (301); the page that
    earns the traffic is wired violet."""
    for i in range(4):
        y = 0.6 - i * 0.4
        o = plate(f"old_url_{i}", 0.5, 0.18, 0.035, m, (-0.6, y, 0), label="/stary-adres", label_size=0.03, inset=0.012)
        n = plate(f"new_url_{i}", 0.5, 0.18, 0.05, m, (0.6, y - 0.08, 0), label="/nowy-adres", label_size=0.03, inset=0.012)
        hot = i == 1
        wire(f"w301_{i}", [(-0.35, y), (0.0, y), (0.0, y - 0.08), (0.35, y - 0.08)], m["accent" if hot else "line"], 0.0)
        block(f"tag301_{i}", 0.12, 0.07, 0.02, m["accent" if hot else "detail"], None, (0.0, y - 0.04, 0.0), bevel=0.006)
    k.text_object("t301", "301", 0.06, m["ink"], None, (-0.08, -0.85, 0.0))


# ---------- landing pages, pricing, CRM, social ----------

def lp_ad_to_page(m):
    """The ad and its landing page say the same thing: headline matches headline, one offer,
    one violet button."""
    ad = plate("ad", 0.55, 0.32, 0.05, m, (-0.7, 0.35, 0), label="reklama", label_size=0.036)
    block("ad_head", 0.36, 0.05, 0.012, m["accent"], ad.lift, (0.02, 0.05, ad.top))
    block("ad_line", 0.3, 0.03, 0.006, m["line"], ad.lift, (-0.01, -0.04, ad.top))
    lp = plate("landing", 0.75, 1.1, 0.06, m, (0.45, -0.05, 0), label="landing page", label_size=0.036)
    block("lp_head", 0.5, 0.06, 0.014, m["accent"], lp.lift, (-0.04, 0.38, lp.top))
    block("lp_lead", 0.44, 0.03, 0.006, m["line"], lp.lift, (-0.07, 0.29, lp.top))
    block("lp_visual", 0.56, 0.26, 0.03, m["detail"], lp.lift, (0, 0.06, lp.top), bevel=0.006)
    for i in range(3):
        block(f"lp_proof_{i}", 0.16, 0.1, 0.012, m["detail"], lp.lift, (-0.19 + i * 0.19, -0.18, lp.top))
    block("lp_cta", 0.26, 0.08, 0.026, m["accent"], lp.lift, (0, -0.38, lp.top), bevel=0.008)
    wire("w_ad_lp", [(-0.42, 0.35), (-0.2, 0.35), (-0.2, 0.33), (0.075, 0.33)], m["line"], 0.0)


def lp_channels(m):
    """Search, social and display traffic land on one page with one offer; everything leads to
    the violet button."""
    srcs = [("search", 0.65), ("social", 0.0), ("display", -0.65)]
    for i, (label, y) in enumerate(srcs):
        p = plate(f"src_{label}", 0.4, 0.26, 0.045, m, (-0.85, y, 0), label=label, label_size=0.034, inset=0.014)
        block(f"src_{label}_bar", 0.2, 0.05, 0.01, m["detail"], p.lift, (0.05, 0.04, p.top))
        wire(f"w_{label}", [(-0.65, y), (-0.3, y)], m["line"], 0.0)
        joint(f"j_{label}", -0.3, y, m["line"])
    wire("w_bus", [(-0.3, 0.65), (-0.3, -0.65)], m["line"], 0.0)
    wire("w_trunk", [(-0.3, 0.0), (-0.05, 0.0)], m["accent"], 0.0)
    lp = plate("landing", 0.7, 0.95, 0.06, m, (0.35, 0, 0), label="jedna oferta", label_size=0.036)
    block("lp_head", 0.46, 0.06, 0.014, m["detail"], lp.lift, (-0.04, 0.3, lp.top))
    block("lp_visual", 0.5, 0.25, 0.03, m["detail"], lp.lift, (0, 0.04, lp.top), bevel=0.006)
    block("lp_cta", 0.26, 0.08, 0.028, m["accent"], lp.lift, (0, -0.3, lp.top), bevel=0.008)


def pricing_blocks(m):
    """The price is the scope: a company site assembled from modules of different weight —
    pages, CMS, SEO, integrations; the enquiry form is the violet one."""
    base = plate("scope", 1.3, 0.9, 0.05, m, (0, 0, 0), label="zakres", label_size=0.05)
    mods = [("strony", -0.36, 0.2, 0.36, 0.3, 0.06), ("cms", 0.12, 0.2, 0.36, 0.3, 0.1), ("seo", 0.45, 0.2, 0.22, 0.3, 0.04),
            ("integracje", -0.24, -0.18, 0.6, 0.3, 0.13), ("formularz", 0.33, -0.18, 0.46, 0.3, 0.08)]
    for name, x, y, sx, sy, h in mods:
        b = block(f"mod_{name}", sx - 0.04, sy - 0.04, h, m["accent" if name == "formularz" else "clay"], base.lift, (x, y, base.top), bevel=0.008)
        if name != "formularz":
            k.mesh_object(f"mod_{name}_frame", k.rect_frame_bm(sx - 0.06, sy - 0.06, k.FRAME_W, 0.002, base.top + h), m["line"], base.lift, (x, y, 0))
            k.text_object(f"mod_{name}_label", name, 0.032, m["ink"], base.lift, (x - sx / 2 + 0.04, y - sy / 2 + 0.035, base.top + h))


def price_tiers(m):
    """Three projects, three scopes: a landing page, a company site and a site with a CMS, each
    a size up; the middle one is the most common choice."""
    tiers = [("landing", 0.45, 0.5, 0.05), ("firma", 0.6, 0.7, 0.08), ("cms", 0.75, 0.9, 0.11)]
    x = -0.75
    for i, (label, sx, sy, h) in enumerate(tiers):
        p = plate(f"tier_{label}", sx, sy, h, m, (x + sx / 2, -0.05 + i * 0.05, 0), label=label, label_size=0.04)
        rows = 2 + i
        for r in range(rows):
            block(f"tier_{label}_row_{r}", sx - 0.16, 0.08, 0.012, m["detail"], p.lift, (0, sy / 2 - 0.14 - r * 0.12, p.top))
        if i == 1:
            k.mesh_object("tier_pick", k.rect_frame_bm(sx - 0.02, sy - 0.02, 0.012, 0.008, p.top), m["accent"], p.lift)
        x += sx + 0.12


def sm_profile(m):
    """SALESmanago's contact card in the middle, fed by what the customer does: visits, cart,
    email clicks; the segment that triggers the next message is violet."""
    card = plate("contact", 0.5, 0.6, 0.08, m, (0, 0, 0), label="kontakt", label_size=0.045)
    k.smooth(k.mesh_object("contact_head", k.cylinder_bm(0.07, 0.03, z0=card.top), m["detail"], card.lift, (0, 0.13, 0)))
    for i in range(3):
        block(f"contact_tag_{i}", 0.12, 0.05, 0.012, m["accent" if i == 2 else "line"], card.lift, (-0.13 + i * 0.13, -0.08, card.top))
    events = [("wizyta", -0.9, 0.5), ("koszyk", -0.9, -0.5), ("e-mail", 0.9, 0.5), ("zakup", 0.9, -0.5)]
    for name, x, y in events:
        p = plate(f"ev_{name}", 0.36, 0.24, 0.04, m, (x, y, 0), label=name, label_size=0.034, inset=0.014)
        block(f"ev_{name}_icon", 0.08, 0.08, 0.02, m["detail"], p.lift, (0.08, 0.03, p.top), bevel=0.006)
        sx = -0.25 if x < 0 else 0.25
        wire(f"w_{name}", [(x - 0.18 * (1 if x < 0 else -1) * -1, y), (x / 2, y), (x / 2, y * 0.3), (sx, y * 0.3)], m["line"], 0.0)


def social_feed(m):
    """A phone with the brand's feed: posts in a planned rhythm, the one that brings orders
    marked violet."""
    phone = plate("phone", 0.6, 1.1, 0.07, m, (-0.25, 0, 0), label="feed", label_size=0.04)
    for i in range(3):
        y = 0.32 - i * 0.3
        block(f"post_{i}", 0.46, 0.24, 0.015, m["detail"], phone.lift, (0, y, phone.top))
        block(f"post_img_{i}", 0.18, 0.16, 0.02 + 0.01 * i, m["accent" if i == 1 else "clay"], phone.lift, (-0.1, y, phone.top + 0.015), bevel=0.006)
        block(f"post_line_{i}", 0.16, 0.03, 0.005, m["line"], phone.lift, (0.11, y + 0.03, phone.top + 0.015))
    cal = plate("calendar", 0.55, 0.5, 0.05, m, (0.55, 0.15, 0), label="plan", label_size=0.04)
    for i in range(12):
        gx, gy = i % 4, i // 4
        hot = i in (1, 6, 9)
        block(f"cal_{i}", 0.09, 0.09, 0.012 + 0.012 * hot, m["accent" if i == 6 else ("detail" if hot else "line")], cal.lift, (-0.17 + gx * 0.115, 0.1 - gy * 0.115, cal.top), bevel=0.004)


ILLUSTRATIONS = {
    "www-compare": (www_compare, (0.05, 0.05, 0.05), 2.35),
    "www-path": (www_path, (0.0, 0.0, 0.05), 2.1),
    "www-headless": (www_headless, (0.17, 0.0, 0.06), 2.45),
    "ecm-hub": (ecm_hub, (0.0, 0.0, 0.05), 2.95),
    "ecm-dashboard": (ecm_dashboard, (0.0, 0.0, 0.1), 2.25),
    "ecm-roadmap": (ecm_roadmap, (0.0, -0.05, 0.1), 2.2),
    "audit-scan": (audit_scan, (0.05, 0.0, 0.18), 2.15),
    "audit-report": (audit_report, (0.05, 0.05, 0.05), 1.95),
    "site-audit": (site_audit, (0.0, 0.0, 0.05), 2.0),
    "audit-days": (audit_days, (0.0, 0.0, 0.1), 2.0),
    "ads-tree": (ads_tree, (-0.15, 0.0, 0.05), 2.3),
    "ads-funnel": (ads_funnel, (0.0, 0.0, 0.3), 1.9),
    "shop-storefront": (shop_storefront, (0.0, 0.0, 0.05), 2.05),
    "ma-cart-recovery": (ma_cart_recovery, (0.0, -0.05, 0.05), 2.3),
    "ma-crm-sync": (ma_crm_sync, (0.05, 0.0, 0.05), 2.45),
    "woo-hybrid": (woo_hybrid, (0.0, 0.0, 0.05), 2.2),
    "migration-move": (migration_move, (0.0, 0.0, 0.1), 2.3),
    "seo-redirects": (seo_redirects, (0.0, 0.0, 0.03), 2.3),
    "lp-ad-to-page": (lp_ad_to_page, (0.0, 0.0, 0.05), 2.2),
    "lp-channels": (lp_channels, (-0.2, 0.0, 0.05), 2.3),
    "pricing-blocks": (pricing_blocks, (0.0, 0.0, 0.08), 2.0),
    "price-tiers": (price_tiers, (0.2, 0.05, 0.08), 2.4),
    "sm-profile": (sm_profile, (0.0, 0.0, 0.05), 2.5),
    "social-feed": (social_feed, (0.1, 0.0, 0.05), 2.1),
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
