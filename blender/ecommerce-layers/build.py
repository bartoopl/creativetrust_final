"""
/uslugi/e-commerce hero: headless commerce as a stack that comes apart.

At rest the storefront, API and commerce core sit in one compact stack (a monolith). Scrolling
decouples it: the storefront lifts off, the API layer rises with its wires, and further
channels (web, app, marketplace) slide out of the API — one backend, many heads. The active
data path is the only violet element besides hover.

Clips: assemble (intro), scroll_explode (0 → 120), hover_<layer|channel>.
Build:  npm run model:ecommerce
"""

import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "lib"))

from mathutils import Vector  # noqa: E402

import ct3d as k  # noqa: E402

# Stack (z-up). Heights and rest-pose z of each layer's base.
COMMERCE = dict(size=(1.3, 0.95), h=0.07, z=0.0)
API = dict(size=(1.1, 0.75), h=0.04, z=0.10)
STORE = dict(size=(1.0, 0.72), h=0.055, z=0.17)
API_RISE, STORE_RISE = 0.34, 0.84   # exploded offsets
PORTS_X = (-0.33, -0.11, 0.11, 0.33)
PORTS_Y = -0.27  # near the front edge, so the wires stay visible under the plates above
ACTIVE_PORT = 2
CHANNELS = [("channel_web", "web", -0.28), ("channel_app", "app", 0.0), ("channel_marketplace", "market", 0.28)]
CHANNEL_X, CHANNEL_SIZE = 1.05, (0.3, 0.22)
EXPLODE_END = 60


def commerce_details(p, mats):
    top, lift = p.top, p.lift
    for i in range(6):  # products: a small catalogue grid
        gx, gy = i % 3, i // 3
        k.mesh_object(f"layer_commerce_product_{i}", k.box_bm(0.09, 0.09, 0.03 + 0.012 * (i % 3), bevel=0.004, z0=top), mats["detail"], lift,
                      (-0.4 + gx * 0.12, 0.18 - gy * 0.12, 0))
    k.mesh_object("layer_commerce_cart", k.box_bm(0.16, 0.12, 0.05, bevel=0.006, z0=top), mats["detail"], lift, (0.12, 0.12, 0))
    k.mesh_object("layer_commerce_cart_item", k.box_bm(0.07, 0.05, 0.02, bevel=0.003, z0=top + 0.05), mats["clay"], lift, (0.12, 0.12, 0))
    for i in range(3):  # orders: a stack of slips
        k.mesh_object(f"layer_commerce_order_{i}", k.box_bm(0.15, 0.1, 0.012, bevel=0.003, z0=top + i * 0.017), mats["detail"], lift, (0.4, 0.12, 0))


def api_details(p, mats):
    for i, x in enumerate(PORTS_X):
        k.smooth(k.mesh_object(f"layer_api_port_{i}", k.cylinder_bm(0.03, 0.014, z0=p.top), mats["accent" if i == ACTIVE_PORT else "line"], p.lift, (x, PORTS_Y, 0)))
    k.mesh_object("layer_api_bus", k.box_bm(0.8, 0.02, 0.006, z0=p.top), mats["line"], p.lift, (0, 0.12, 0))


def store_details(p, mats):
    top, lift = p.top, p.lift
    k.mesh_object("layer_storefront_header", k.box_bm(0.74, 0.05, 0.006, z0=top), mats["line"], lift, (0.02, 0.25, 0))
    k.mesh_object("layer_storefront_hero", k.box_bm(0.74, 0.17, 0.012, bevel=0.003, z0=top), mats["detail"], lift, (0.02, 0.11, 0))
    for i in range(3):
        x = -0.23 + i * 0.25
        k.mesh_object(f"layer_storefront_card_{i}", k.box_bm(0.2, 0.2, 0.01, bevel=0.003, z0=top), mats["detail"], lift, (x, -0.13, 0))
        k.mesh_object(f"layer_storefront_card_img_{i}", k.box_bm(0.13, 0.1, 0.008, z0=top + 0.01), mats["clay"], lift, (x, -0.105, 0))
        k.mesh_object(f"layer_storefront_card_price_{i}", k.box_bm(0.08, 0.02, 0.004, z0=top + 0.01), mats["line"], lift, (x - 0.025, -0.195, 0))


def channel_details(name, p, mats):
    top, lift = p.top, p.lift
    if name == "channel_web":
        k.mesh_object(f"{name}_bar", k.box_bm(0.2, 0.025, 0.005, z0=top), mats["line"], lift, (0.01, 0.055, 0))
        k.mesh_object(f"{name}_window", k.box_bm(0.2, 0.08, 0.01, bevel=0.002, z0=top), mats["detail"], lift, (0.01, -0.01, 0))
    elif name == "channel_app":
        k.mesh_object(f"{name}_phone", k.rect_frame_bm(0.08, 0.15, 0.012, 0.012, top), mats["detail"], lift, (0.03, 0.0, 0))
        k.mesh_object(f"{name}_screen", k.box_bm(0.05, 0.1, 0.004, z0=top), mats["line"], lift, (0.03, 0.005, 0))
    elif name == "channel_marketplace":
        for i in range(4):
            gx, gy = i % 2, i // 2
            k.mesh_object(f"{name}_tile_{i}", k.box_bm(0.055, 0.055, 0.018 + 0.008 * i, bevel=0.003, z0=top), mats["detail"], lift,
                          (-0.01 + gx * 0.07, 0.035 - gy * 0.07, 0))


def unit_wire(name, mats, active, parent, location, axis="z", radius=0.006):
    """Wire of length 1 along +axis from its origin; its length is its scale on that axis."""
    bm = k.cylinder_bm(radius, 1.0, segments=10)
    if axis == "x":
        for v in bm.verts:
            v.co.x, v.co.z = v.co.z, v.co.x
    obj = k.mesh_object(name, bm, mats["accent" if active else "line"], parent, location)
    return obj


def build(kit):
    mats = kit.mats
    commerce = k.framed_plate("layer_commerce", *COMMERCE["size"], COMMERCE["h"], mats, location=(0, 0, COMMERCE["z"]), label="commerce", label_size=0.06)
    api = k.framed_plate("layer_api", *API["size"], API["h"], mats, location=(0, 0, API["z"]), label="api", label_size=0.06)
    store = k.framed_plate("layer_storefront", *STORE["size"], STORE["h"], mats, location=(0, 0, STORE["z"]), label="storefront", label_size=0.055)
    commerce_details(commerce, mats)
    api_details(api, mats)
    store_details(store, mats)

    # Wires between layers: short in the stack, stretched when it comes apart. Lower wires ride with the
    # commerce layer, upper wires with the API layer; each wire's length is its Z scale.
    gap = API["z"] - (COMMERCE["z"] + COMMERCE["h"])  # 0.03, same for both gaps
    low, up = [], []
    for i, x in enumerate(PORTS_X):
        w = unit_wire(f"wire_low_{i}", mats, i == ACTIVE_PORT, commerce.slide, (x, PORTS_Y, COMMERCE["h"]))
        w.scale.z = gap
        low.append(w)
        w = unit_wire(f"wire_up_{i}", mats, i == ACTIVE_PORT, api.slide, (x, PORTS_Y, API["h"]))
        w.scale.z = gap
        up.append(w)

    # Channels beside the API (at its exploded height), hidden inside it at rest.
    channels, channel_wires = [], []
    channel_z = API["z"] + API_RISE
    for name, label, y in CHANNELS:
        p = k.framed_plate(name, *CHANNEL_SIZE, 0.04, mats, location=(CHANNEL_X, y, channel_z), label=label, label_size=0.036, inset=0.016)
        channel_details(name, p, mats)
        p.slide.location = Vector((0, 0, 0))
        channels.append(p)
        w = unit_wire(f"wire_{name}", mats, False, api.slide, (API["size"][0] / 2, y, API["h"] / 2), axis="x", radius=0.005)
        w.scale.x = 0.001
        channel_wires.append(w)
    # Channels float beside the API: in a diagram their ground shadows would read as stray blobs.
    for p in channels:
        for obj in [p.root, *p.root.children_recursive]:
            obj.visible_shadow = False
    for w in channel_wires:
        w.visible_shadow = False
    for p in channels:  # rest: tucked into the API, invisible
        p.slide.location = Vector((-(CHANNEL_X - 0.2), 0, -API_RISE))
        p.slide.scale = Vector((0.001, 0.001, 0.001))

    # assemble (0–84): commerce, API, storefront settle in turn (in their stacked rest pose).
    for i, (p, offset, rot) in enumerate([(commerce, (0.0, 0.05, 0.35), (6, -4, 5)), (api, (0.05, -0.04, 0.45), (-5, 5, -6)),
                                          (store, (-0.04, 0.06, 0.55), (5, 4, 7))]):
        k.add_drop_in(p.root, "assemble", start=i * 14, offset=offset, rot_deg=rot, duration=50)

    # scroll_explode (0–120): layers come apart together (same easing, so wires always meet the
    # plates), then the channels slide out of the API one by one.
    ease = dict(easing="EASE_IN_OUT", interpolation="SINE")
    k.add_clip(api.slide, "scroll_explode", [(0, {"location": Vector((0, 0, 0))}), (EXPLODE_END, {"location": Vector((0, 0, API_RISE))})], **ease)
    k.add_clip(store.slide, "scroll_explode", [(0, {"location": Vector((0, 0, 0))}), (EXPLODE_END, {"location": Vector((0, 0, STORE_RISE))})], **ease)
    for w in low:
        k.add_clip(w, "scroll_explode", [(0, {"scale": Vector((1, 1, gap))}), (EXPLODE_END, {"scale": Vector((1, 1, gap + API_RISE))})], **ease)
    for w in up:
        k.add_clip(w, "scroll_explode", [(0, {"scale": Vector((1, 1, gap))}), (EXPLODE_END, {"scale": Vector((1, 1, gap + STORE_RISE - API_RISE))})], **ease)
    wire_len = CHANNEL_X - CHANNEL_SIZE[0] / 2 - API["size"][0] / 2
    for i, (p, w) in enumerate(zip(channels, channel_wires)):
        start, end = EXPLODE_END + i * 10, EXPLODE_END + 30 + i * 10
        hidden = {"location": p.slide.location.copy(), "scale": p.slide.scale.copy()}
        shown = {"location": Vector((0, 0, 0)), "scale": Vector((1, 1, 1))}
        k.add_clip(p.slide, "scroll_explode", [(0, hidden), (start, hidden), (end, shown)], easing="EASE_OUT", interpolation="QUART")
        k.add_clip(w, "scroll_explode", [(0, {"scale": Vector((0.001, 1, 1))}), (start, {"scale": Vector((0.001, 1, 1))}),
                                         (end, {"scale": Vector((wire_len, 1, 1))})], easing="EASE_OUT", interpolation="QUART")

    for p in (commerce, api, store):
        k.add_hover_clip(p, rise=0.02)  # small: the wires don't follow the lift
    for p in channels:
        k.add_hover_clip(p, rise=0.04)


if __name__ == "__main__":
    k.run(build, camera="ecommerce_camera", target=(0.25, 0.0, 0.42), ortho_scale=2.75,
          shadow_center=(0.3, 0.0), shadow_size=(2.6, 1.6), showcase=("scroll_explode", 120))
