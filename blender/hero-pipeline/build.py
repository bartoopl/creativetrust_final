"""
Hero "pipeline" scene for creativetrust.pl, built entirely from code.

Five modules (the five delivery steps shown in the hero panel) on a rail, with
a violet progress token. Style follows the site's design system: light, matte
"clay", hairline edges, a single violet accent.

Run headless (Blender 5.2+):
    blender -b --factory-startup --python blender/hero-pipeline/build.py -- \
        [--save out.blend] [--export out.glb] [--preview DIR] [--frames assemble:0,45,93 ...]

Rest pose (what the site shows when no clip plays) is the assembled scene with
the token on module 01. Clips, exported as separate glTF animations:
    assemble          modules settle onto the rail (intro, played on load)
    scroll_progress   token travels 01 → 05 (driven by scroll)
    hover_<module>    module lifts and its frame turns violet
    idle_token        token breathes subtly (loop)
"""

import argparse
import math
import os
import sys

import bmesh
import bpy
from mathutils import Euler, Vector

HERE = os.path.dirname(os.path.abspath(__file__))
FONT = os.path.join(HERE, "fonts", "JetBrainsMono-Medium.ttf")
FPS = 30

# ---------- design tokens (sRGB hex from the site's globals.css) ----------
PALETTE = {
    "clay": "#f6f6f7",       # module bodies — slightly off-white so they read on a white page
    "detail": "#e9ebee",     # raised details on module tops
    "line": "#d1d5db",       # hairline frames, rail
    "ink": "#9ca3af",        # step numbers (--muted-2)
    "accent": "#6c63ff",     # the single accent (--accent)
}

MODULES = [
    # name, step label
    ("module_goal", "01"),
    ("module_research", "02"),
    ("module_prototype", "03"),
    ("module_deploy", "04"),
    ("module_optimize", "05"),
]

SIZE = 0.36          # module footprint (m)
HEIGHT = 0.08        # module body height
SPACING = 0.5        # distance between module centres along X
RAIL_Y = -0.29       # rail runs in front of the modules
FRAME_W = 0.008      # hairline frame width on module tops


# ---------- helpers ----------

def srgb_to_linear(c):
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def hex_rgba(hex_color):
    h = hex_color.lstrip("#")
    return tuple(srgb_to_linear(int(h[i:i + 2], 16) / 255) for i in (0, 2, 4)) + (1.0,)


def material(name, hex_color, roughness=0.72):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = hex_rgba(hex_color)
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = 0.0
    mat.diffuse_color = hex_rgba(hex_color)  # viewport colour matches
    return mat


def mesh_object(name, bm, mat, parent=None, location=(0, 0, 0)):
    mesh = bpy.data.meshes.new(name)
    bm.to_mesh(mesh)
    bm.free()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.scene.collection.objects.link(obj)
    obj.data.materials.append(mat)
    obj.location = location
    if parent:
        obj.parent = parent
    return obj


def box_bm(sx, sy, sz, bevel=0.0, z0=0.0):
    """Box with its base at z0, centred in XY; optional bevel on all edges."""
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    for v in bm.verts:
        v.co.x *= sx
        v.co.y *= sy
        v.co.z = v.co.z * sz + sz / 2 + z0
    if bevel > 0:
        bmesh.ops.bevel(bm, geom=list(bm.edges), offset=bevel, segments=2, affect="EDGES", profile=0.5)
    return bm


def ring_bm(outer, inner, height, z0=0.0, segments=48):
    """Flat annulus extruded to `height`."""
    bm = bmesh.new()
    outer_verts, inner_verts = [], []
    for i in range(segments):
        a = 2 * math.pi * i / segments
        outer_verts.append(bm.verts.new((outer * math.cos(a), outer * math.sin(a), z0)))
        inner_verts.append(bm.verts.new((inner * math.cos(a), inner * math.sin(a), z0)))
    for i in range(segments):
        j = (i + 1) % segments
        bm.faces.new((outer_verts[i], outer_verts[j], inner_verts[j], inner_verts[i]))
    faces = list(bm.faces)
    ext = bmesh.ops.extrude_face_region(bm, geom=faces)
    bmesh.ops.translate(bm, vec=(0, 0, height), verts=[g for g in ext["geom"] if isinstance(g, bmesh.types.BMVert)])
    bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
    return bm


def square_frame_bm(size, width, height, z0):
    """Square outline (picture frame) lying on the module top."""
    bm = bmesh.new()
    half, inner = size / 2, size / 2 - width
    outer_pts = [(-half, -half), (half, -half), (half, half), (-half, half)]
    inner_pts = [(-inner, -inner), (inner, -inner), (inner, inner), (-inner, inner)]
    o = [bm.verts.new((x, y, z0)) for x, y in outer_pts]
    n = [bm.verts.new((x, y, z0)) for x, y in inner_pts]
    for i in range(4):
        j = (i + 1) % 4
        bm.faces.new((o[i], o[j], n[j], n[i]))
    ext = bmesh.ops.extrude_face_region(bm, geom=list(bm.faces))
    bmesh.ops.translate(bm, vec=(0, 0, height), verts=[g for g in ext["geom"] if isinstance(g, bmesh.types.BMVert)])
    bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
    return bm


def cylinder_bm(radius, depth, segments=24, z0=0.0):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=segments, radius1=radius, radius2=radius, depth=depth)
    bmesh.ops.translate(bm, vec=(0, 0, depth / 2 + z0), verts=bm.verts)
    return bm


def text_object(name, body, size, mat, parent, location):
    curve = bpy.data.curves.new(name, "FONT")
    curve.body = body
    curve.size = size
    curve.extrude = 0.0015
    curve.align_x = "LEFT"
    curve.align_y = "BOTTOM"
    if os.path.exists(FONT):
        curve.font = bpy.data.fonts.load(FONT, check_existing=True)
    obj = bpy.data.objects.new(name, curve)
    bpy.context.scene.collection.objects.link(obj)
    obj.data.materials.append(mat)
    obj.parent = parent
    obj.location = location
    # Convert to mesh so glTF exports it.
    bpy.context.view_layer.objects.active = obj
    for o in bpy.context.view_layer.objects:
        o.select_set(False)
    obj.select_set(True)
    bpy.ops.object.convert(target="MESH")
    return bpy.context.view_layer.objects.active


def smooth(obj):
    for poly in obj.data.polygons:
        poly.use_smooth = True
    mod = obj.modifiers.new("smooth_by_angle", "WEIGHTED_NORMAL")
    mod.keep_sharp = True


# ---------- scene ----------

def reset_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.render.fps = FPS
    scene.unit_settings.system = "METRIC"
    return scene


def build_module(name, label, index, mats):
    x = (index - 2) * SPACING
    body = mesh_object(name, box_bm(SIZE, SIZE, HEIGHT, bevel=0.01), mats["clay"], location=(x, 0, 0))
    smooth(body)
    top = HEIGHT

    frame = mesh_object(f"{name}_frame", square_frame_bm(SIZE - 0.02, FRAME_W, 0.003, top), mats["line"], parent=body)
    # Accent frame hides inside the body at rest; hover_<module> raises it just above the grey frame.
    accent = mesh_object(f"{name}_accent", square_frame_bm(SIZE - 0.02, FRAME_W, 0.003, top), mats["accent"], parent=body)
    accent.location.z = -0.006

    text_object(f"{name}_label", label, 0.05, mats["ink"], body, (-SIZE / 2 + 0.036, -SIZE / 2 + 0.034, top))

    # Step-specific detail on the top face.
    if name == "module_goal":
        for i, (r_out, r_in) in enumerate([(0.11, 0.095), (0.07, 0.055)]):
            mesh_object(f"{name}_ring_{i}", ring_bm(r_out, r_in, 0.012 + 0.006 * i, z0=top), mats["detail"], parent=body, location=(0.02, 0.02, 0))
        dot = mesh_object(f"{name}_dot", cylinder_bm(0.022, 0.028, z0=top), mats["line"], parent=body, location=(0.02, 0.02, 0))
        smooth(dot)
    elif name == "module_research":
        heights = [0.02, 0.035, 0.015, 0.05, 0.03, 0.06, 0.025, 0.04, 0.045, 0.02, 0.07, 0.03, 0.015, 0.04, 0.03, 0.055]
        for i, h in enumerate(heights):
            gx, gy = i % 4, i // 4
            mesh_object(f"{name}_cell_{i:02d}", box_bm(0.04, 0.04, h, bevel=0.003, z0=top), mats["detail"], parent=body,
                        location=(0.02 + (gx - 1.5) * 0.058, 0.02 + (gy - 1.5) * 0.058, 0))
    elif name == "module_prototype":
        mesh_object(f"{name}_screen", box_bm(0.25, 0.2, 0.012, bevel=0.003, z0=top), mats["detail"], parent=body, location=(0.02, 0.025, 0))
        s = top + 0.012
        mesh_object(f"{name}_ui_bar", box_bm(0.21, 0.03, 0.004, z0=s), mats["line"], parent=body, location=(0.02, 0.09, 0))
        mesh_object(f"{name}_ui_card_a", box_bm(0.095, 0.1, 0.004, z0=s), mats["clay"], parent=body, location=(-0.035, 0.0, 0))
        mesh_object(f"{name}_ui_card_b", box_bm(0.095, 0.1, 0.004, z0=s), mats["clay"], parent=body, location=(0.075, 0.0, 0))
    elif name == "module_deploy":
        z = top
        for i, (w, label_) in enumerate([(0.26, "data"), (0.22, "api"), (0.18, "front")]):
            gap = 0.018 if i else 0.0
            z += gap
            mesh_object(f"{name}_layer_{label_}", box_bm(w, w, 0.014, bevel=0.003, z0=z), mats["detail"], parent=body, location=(0.02, 0.02, 0))
            if i:
                for cx in (-1, 1):
                    for cy in (-1, 1):
                        mesh_object(f"{name}_post_{i}{cx}{cy}", cylinder_bm(0.004, gap, segments=8, z0=z - gap), mats["line"], parent=body,
                                    location=(0.02 + cx * (w / 2 - 0.02), 0.02 + cy * (w / 2 - 0.02), 0))
            z += 0.014
    elif name == "module_optimize":
        for i, h in enumerate([0.035, 0.06, 0.09, 0.13]):
            mesh_object(f"{name}_bar_{i}", box_bm(0.042, 0.042, h, bevel=0.004, z0=top), mats["detail"], parent=body,
                        location=(-0.06 + i * 0.058, 0.03, 0))
    return body


def build_scene():
    scene = reset_scene()
    mats = {k: material(f"ct_{k}", v, roughness=0.5 if k == "accent" else 0.72) for k, v in PALETTE.items()}

    modules = [build_module(name, label, i, mats) for i, (name, label) in enumerate(MODULES)]

    span = SPACING * 4 + SIZE
    rail = mesh_object("rail", box_bm(span, 0.018, 0.01, bevel=0.003), mats["line"], location=(0, RAIL_Y, 0))
    for i, m in enumerate(modules):
        mesh_object(f"rail_stub_{i}", box_bm(0.012, abs(RAIL_Y) - SIZE / 2, 0.006), mats["line"], parent=rail,
                    location=(m.location.x, (abs(RAIL_Y) - SIZE / 2) / 2 + 0.009, 0))

    token_bm = bmesh.new()
    bmesh.ops.create_uvsphere(token_bm, u_segments=24, v_segments=12, radius=1.0)
    for v in token_bm.verts:  # capsule-ish: stretch a sphere along X
        v.co.x *= 0.05
        v.co.y *= 0.022
        v.co.z = v.co.z * 0.022 + 0.022 + 0.01
    token = mesh_object("token_progress", token_bm, mats["accent"], location=(modules[0].location.x, RAIL_Y, 0))
    smooth(token)

    return scene, modules, rail, token, mats


# ---------- animation ----------

def _fcurves(action):
    """All F-curves of a (layered, Blender 4.4+) action."""
    for layer in action.layers:
        for strip in layer.strips:
            for bag in strip.channelbags:
                yield from bag.fcurves


def add_clip(obj, clip, keys, easing="EASE_OUT", interpolation="QUART"):
    """
    Keyframe `obj` into its own action and push it onto an NLA track named `clip`.
    `keys` is a list of (frame, {"location"|"rotation_euler"|"scale": value}). The object's
    current transform is its rest pose and is restored afterwards. Tracks named alike across
    objects export as one glTF animation (export_animation_mode="NLA_TRACKS").
    """
    rest = {"location": obj.location.copy(), "rotation_euler": obj.rotation_euler.copy(), "scale": obj.scale.copy()}
    ad = obj.animation_data or obj.animation_data_create()
    action = bpy.data.actions.new(f"{clip}__{obj.name}")
    ad.action = action
    for frame, props in keys:
        for path, value in props.items():
            setattr(obj, path, value)
            obj.keyframe_insert(path, frame=frame)
    for fc in _fcurves(action):
        for kp in fc.keyframe_points:
            kp.interpolation = interpolation
            kp.easing = easing
    slot = ad.action_slot
    ad.action = None
    for path, value in rest.items():
        setattr(obj, path, value)
    track = ad.nla_tracks.new()
    track.name = clip
    strip = track.strips.new(clip, int(keys[0][0]), action)
    if slot is not None and hasattr(strip, "action_slot"):
        strip.action_slot = slot
    track.mute = True  # the .blend opens in rest pose; previews/export solo tracks explicitly
    return track


def build_animations(modules, rail, token):
    rest_loc = lambda o, dx=0, dy=0, dz=0: o.location + Vector((dx, dy, dz))

    # assemble (0–96): modules drop in from scattered, floating poses one after another.
    # Small offsets keep every piece inside the frame on frame 0 (they float above their slot).
    scatter = [(-0.06, 0.06, 0.30, 10, -8, 12), (0.04, 0.08, 0.38, -9, 6, -10), (0.07, 0.03, 0.34, 7, 9, 8),
               (-0.03, 0.09, 0.42, -10, -5, -12), (0.06, 0.05, 0.36, 8, 8, 10)]
    for i, (m, (dx, dy, dz, rx, ry, rz)) in enumerate(zip(modules, scatter)):
        start, end = i * 12, i * 12 + 48
        away = {"location": rest_loc(m, dx, dy, dz),
                "rotation_euler": Euler((math.radians(rx), math.radians(ry), math.radians(rz))),
                "scale": Vector((0.88, 0.88, 0.88))}
        home = {"location": m.location.copy(), "rotation_euler": m.rotation_euler.copy(), "scale": Vector((1, 1, 1))}
        keys = [(0, away)] + ([(start, away)] if start else []) + [(end, home)]
        add_clip(m, "assemble", keys)
    add_clip(rail, "assemble", [(0, {"scale": Vector((0.001, 1, 1))}), (40, {"scale": Vector((1, 1, 1))})])
    add_clip(token, "assemble", [(0, {"scale": Vector((0.001, 0.001, 0.001))}), (84, {"scale": Vector((0.001, 0.001, 0.001))}),
                                 (96, {"scale": Vector((1, 1, 1))})])

    # scroll_progress (0–120): the token glides from 01 to 05, easing into each stop.
    keys = [(i * 30, {"location": Vector((m.location.x, token.location.y, token.location.z))}) for i, m in enumerate(modules)]
    add_clip(token, "scroll_progress", keys, easing="EASE_IN_OUT", interpolation="SINE")

    # hover_<module> (0–12): lift, and the violet frame rises over the grey one.
    for m in modules:
        accent = bpy.data.objects[f"{m.name}_accent"]
        add_clip(m, f"hover_{m.name}", [(0, {"location": m.location.copy()}), (12, {"location": rest_loc(m, dz=0.04)})])
        add_clip(accent, f"hover_{m.name}", [(0, {"location": accent.location.copy()}),
                                              (12, {"location": Vector((0, 0, 0.0008))})])

    # idle_token (0–60, loop): barely-there breathing.
    add_clip(token, "idle_token", [(0, {"scale": Vector((1, 1, 1))}), (30, {"scale": Vector((1.06, 1.06, 1.06))}),
                                   (60, {"scale": Vector((1, 1, 1))})], easing="EASE_IN_OUT", interpolation="SINE")


REST = {}


def remember_rest(scene):
    for obj in scene.objects:
        REST[obj.name] = (obj.location.copy(), obj.rotation_euler.copy(), obj.scale.copy())


def restore_rest(scene):
    """Muted NLA tracks leave objects wherever they were last evaluated; put everything back."""
    for obj in scene.objects:
        if obj.name in REST:
            obj.location, obj.rotation_euler, obj.scale = (v.copy() for v in REST[obj.name])


def solo_clip(scene, clip):
    restore_rest(scene)
    for obj in scene.objects:
        if obj.animation_data:
            for track in obj.animation_data.nla_tracks:
                track.mute = track.name != clip


def clip_report(scene):
    clips = {}
    for obj in scene.objects:
        if obj.animation_data:
            for track in obj.animation_data.nla_tracks:
                for strip in track.strips:
                    c = clips.setdefault(track.name, {"objects": 0, "start": strip.frame_start, "end": strip.frame_end})
                    c["objects"] += 1
                    c["start"], c["end"] = min(c["start"], strip.frame_start), max(c["end"], strip.frame_end)
    for name, c in sorted(clips.items()):
        print(f"REPORT clip {name}: frames {c['start']:.0f}–{c['end']:.0f}, {c['objects']} objects")


# ---------- camera, light, preview ----------

def setup_camera_and_light(scene):
    cam_data = bpy.data.cameras.new("hero_camera")
    cam_data.type = "ORTHO"
    cam_data.ortho_scale = 2.2
    cam = bpy.data.objects.new("hero_camera", cam_data)
    scene.collection.objects.link(cam)
    # True isometric (azimuth 45°, elevation 35.26°): the row of modules runs corner to corner,
    # which fills the squarish hero column better than a flat horizontal row.
    target = Vector((0.0, -0.08, 0.05))
    az, el, dist = math.radians(45), math.radians(35.264), 6.0  # camera in front-right, looking down
    cam.location = target + Vector((math.cos(el) * math.sin(az), -math.cos(el) * math.cos(az), math.sin(el))) * dist
    cam.rotation_euler = (target - cam.location).to_track_quat("-Z", "Y").to_euler()
    scene.camera = cam
    # The frame's aspect is part of the camera: glTF derives ymag from it, and the site's canvas
    # and poster use the same 6:5 ratio. Set it here so exports never depend on a prior render.
    scene.render.resolution_x = 1200
    scene.render.resolution_y = 1000

    key = bpy.data.lights.new("key", "AREA")
    key.energy = 90
    key.size = 2.5
    key_obj = bpy.data.objects.new("key", key)
    key_obj.location = (-1.2, -0.8, 3.6)
    key_obj.rotation_euler = (Vector((0, 0, 0)) - key_obj.location).to_track_quat("-Z", "Y").to_euler()
    scene.collection.objects.link(key_obj)

    fill = bpy.data.lights.new("fill", "AREA")
    fill.energy = 25
    fill.size = 4.0
    fill_obj = bpy.data.objects.new("fill", fill)
    fill_obj.location = (2.8, -2.6, 1.6)
    fill_obj.rotation_euler = (Vector((0, 0, 0)) - fill_obj.location).to_track_quat("-Z", "Y").to_euler()
    scene.collection.objects.link(fill_obj)

    world = bpy.data.worlds.new("world")
    world.use_nodes = True
    world.node_tree.nodes["Background"].inputs["Color"].default_value = (1, 1, 1, 1)
    world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.35
    scene.world = world

    catcher = mesh_object("shadow_catcher", box_bm(8, 8, 0.001, z0=-0.001), material("ct_catcher", "#ffffff"))
    catcher.is_shadow_catcher = True
    return cam, catcher


def bake_ground_shadow(scene, catcher, resolution=(1024, 512), strength=0.42):
    """
    Bake the soft shadow of the assembled scene onto a ground plane and store it as a black
    texture whose alpha is the shadow. The site shows this plane instead of computing shadows
    every frame (and fades it in with the intro). Hidden from Cycles previews, which use the
    shadow catcher instead.
    """
    import numpy as np

    width, depth = SPACING * 4 + SIZE + 0.9, 1.3
    bm = bmesh.new()
    bm.loops.layers.uv.new("UVMap")  # calc_uvs needs an existing UV layer
    bmesh.ops.create_grid(bm, x_segments=1, y_segments=1, size=0.5, calc_uvs=True)
    for v in bm.verts:
        v.co.x *= width
        v.co.y *= depth
    plane = mesh_object("ground_shadow", bm, material("ct_ground_shadow", "#111827"), location=(0.12, -0.12, 0.0005))

    image = bpy.data.images.new("ground_shadow_bake", *resolution, alpha=False, float_buffer=True)
    nodes = plane.active_material.node_tree.nodes
    tex = nodes.new("ShaderNodeTexImage")
    tex.image = image
    nodes.active = tex

    solo_clip(scene, None)
    scene.frame_set(0)
    catcher.hide_render = True
    scene.render.engine = "CYCLES"
    scene.cycles.samples = 96
    for obj in scene.objects:
        obj.select_set(obj == plane)
    bpy.context.view_layer.objects.active = plane
    bpy.ops.object.bake(type="SHADOW", margin=4)
    catcher.hide_render = False

    # Shadow bake: 1 = lit, 0 = shadowed → alpha. Black colour, soft falloff at the plane edges.
    lit = np.empty(resolution[0] * resolution[1] * 4, dtype=np.float32)
    image.pixels.foreach_get(lit)
    lit = lit.reshape(resolution[1], resolution[0], 4)[..., 0]
    alpha = np.clip((1.0 - lit) * strength, 0.0, 1.0)
    ys, xs = np.linspace(-1, 1, resolution[1]), np.linspace(-1, 1, resolution[0])
    edge = np.clip((1 - np.abs(ys))[:, None] * 6, 0, 1) * np.clip((1 - np.abs(xs))[None, :] * 12, 0, 1)
    rgba = np.zeros((resolution[1], resolution[0], 4), dtype=np.float32)
    rgba[..., 3] = alpha * edge
    out = bpy.data.images.new("ground_shadow", *resolution, alpha=True)
    out.pixels.foreach_set(rgba.ravel())
    out.file_format = "PNG"
    out.pack()

    # Simple material the exporter understands: texture colour + alpha, blended.
    mat = plane.active_material
    nodes = mat.node_tree.nodes
    for node in [n for n in nodes if n.type == "TEX_IMAGE"]:
        nodes.remove(node)
    bsdf = nodes.get("Principled BSDF")
    shadow_tex = nodes.new("ShaderNodeTexImage")
    shadow_tex.image = out
    mat.node_tree.links.new(shadow_tex.outputs["Color"], bsdf.inputs["Base Color"])
    mat.node_tree.links.new(shadow_tex.outputs["Alpha"], bsdf.inputs["Alpha"])
    if hasattr(mat, "surface_render_method"):
        mat.surface_render_method = "BLENDED"
    bpy.data.images.remove(image)

    plane.hide_render = True  # previews/poster use the shadow catcher
    print(f"REPORT baked ground_shadow {resolution[0]}×{resolution[1]}, max alpha {float(alpha.max()):.2f}")
    return plane


def render_preview(scene, path, frame=None):
    scene.render.engine = "CYCLES"
    scene.cycles.samples = 48
    scene.cycles.use_denoising = True
    scene.render.film_transparent = True
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"
    scene.view_settings.view_transform = "Standard"  # keep hex colours faithful (no Filmic/AgX shift)
    if frame is not None:
        scene.frame_set(frame)
    scene.render.filepath = path
    bpy.ops.render.render(write_still=True)


def export_glb(scene, path):
    solo_clip(scene, None)  # rest pose on every node; clips carry the motion
    scene.frame_set(0)
    for obj in scene.objects:
        obj.select_set(obj.type == "MESH" and obj.name != "shadow_catcher" or obj.type == "CAMERA")
    os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
    bpy.ops.export_scene.gltf(
        filepath=os.path.abspath(path),
        export_format="GLB",
        use_selection=True,
        export_apply=True,               # bake modifiers (bevel normals)
        export_yup=True,
        export_cameras=True,             # the site frames the scene with hero_camera
        export_lights=False,             # the site lights the scene itself
        export_animations=True,
        export_animation_mode="NLA_TRACKS",
        export_force_sampling=True,
        export_frame_step=1,
        export_optimize_animation_size=True,
        export_materials="EXPORT",
        export_image_format="AUTO",         # the baked ground shadow (PNG)
        export_extras=False,
    )
    print(f"REPORT exported {path} ({os.path.getsize(path) / 1024:.0f} KB)")


def main():
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    parser = argparse.ArgumentParser()
    parser.add_argument("--save")
    parser.add_argument("--export")
    parser.add_argument("--preview")
    parser.add_argument("--poster", help="render the rest pose (transparent PNG) for the site's poster image")
    parser.add_argument("--frames", nargs="*", default=[], help="clip:frame[,frame...] previews, e.g. assemble:0,48,96")
    args = parser.parse_args(argv)

    scene, modules, rail, token, mats = build_scene()
    remember_rest(scene)
    build_animations(modules, rail, token)
    cam, catcher = setup_camera_and_light(scene)
    remember_rest(scene)
    bake_ground_shadow(scene, catcher)
    remember_rest(scene)
    clip_report(scene)

    if args.preview:
        os.makedirs(args.preview, exist_ok=True)
        solo_clip(scene, None)
        render_preview(scene, os.path.join(args.preview, "rest.png"), frame=0)
        for spec in args.frames:
            clip, frames = spec.split(":")
            solo_clip(scene, clip)
            for f in frames.split(","):
                render_preview(scene, os.path.join(args.preview, f"{clip}_{int(f):03d}.png"), frame=int(f))
        solo_clip(scene, None)
    if args.poster:
        solo_clip(scene, None)
        render_preview(scene, os.path.abspath(args.poster), frame=0)
    if args.export:
        export_glb(scene, args.export)
    if args.save:
        solo_clip(scene, None)
        bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath(args.save))

    tris = sum(len(p.vertices) - 2 for o in scene.objects if o.type == "MESH" and o.name != "shadow_catcher" for p in o.data.polygons)
    print(f"STATS objects={len([o for o in scene.objects if o.type == 'MESH'])} triangles≈{tris}")


if __name__ == "__main__":
    main()
