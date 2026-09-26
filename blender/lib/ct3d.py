"""
Shared toolkit for creativetrust.pl 3D scenes, built headless in Blender 5.2+.

Every scene follows the same contract with the site (src/components/scene3d):
- Style: design-system palette, matte "clay", hairline frames, one violet accent.
- Hierarchy of an interactive piece ("plate"):
      <name>            root   — animated by the intro clip ("assemble")
      <name>_slide      child  — animated by scroll clips ("scroll_*")
      <name>_lift       child  — animated by hover clips ("hover_<name>")
      <name>_accent     violet frame under _lift, raised by the hover clip
  so the clips never animate the same property and can all run at once.
- Rest pose (no clip playing) is the assembled, un-scrolled scene.
- Camera: orthographic, true isometric, 6:5 frame (exported; the site uses it as-is).
- Ground shadow: baked to an alpha texture on "ground_shadow" (no runtime shadows).

A scene script defines build(kit) and calls run(build, ...).
"""

import argparse
import math
import os
import sys
from dataclasses import dataclass

import bmesh
import bpy
from mathutils import Euler, Vector

HERE = os.path.dirname(os.path.abspath(__file__))
FONT = os.path.join(HERE, "fonts", "JetBrainsMono-Medium.ttf")
FPS = 30
FRAME_W = 0.008  # hairline frame width

# Design tokens (sRGB) from src/app/globals.css.
PALETTE = {
    "clay": "#f6f6f7",    # bodies — slightly off-white so they read on a white page
    "detail": "#e9ebee",  # raised details
    "line": "#d1d5db",    # hairline frames, rails, wires
    "ink": "#9ca3af",     # labels (--muted-2)
    "accent": "#6c63ff",  # the single accent (--accent)
}


# ---------- materials & geometry ----------

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
    mat.diffuse_color = hex_rgba(hex_color)
    return mat


def palette_materials():
    return {k: material(f"ct_{k}", v, roughness=0.5 if k == "accent" else 0.72) for k, v in PALETTE.items()}


def link(obj, parent=None, location=(0, 0, 0)):
    bpy.context.scene.collection.objects.link(obj)
    obj.location = location
    if parent:
        obj.parent = parent
    return obj


def empty(name, parent=None, location=(0, 0, 0)):
    obj = bpy.data.objects.new(name, None)
    obj.empty_display_size = 0.05
    return link(obj, parent, location)


def mesh_object(name, bm, mat, parent=None, location=(0, 0, 0)):
    mesh = bpy.data.meshes.new(name)
    bm.to_mesh(mesh)
    bm.free()
    obj = bpy.data.objects.new(name, mesh)
    obj.data.materials.append(mat)
    return link(obj, parent, location)


def box_bm(sx, sy, sz, bevel=0.0, z0=0.0, segments=None):
    """Box with its base at z0, centred in XY; optional bevel on all edges (2 segments on big
    pieces, 1 on small details where a second segment is invisible but doubles the vertices)."""
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    for v in bm.verts:
        v.co.x *= sx
        v.co.y *= sy
        v.co.z = v.co.z * sz + sz / 2 + z0
    if bevel > 0:
        if segments is None:
            segments = 2 if max(sx, sy) >= 0.2 else 1
        bmesh.ops.bevel(bm, geom=list(bm.edges), offset=bevel, segments=segments, affect="EDGES", profile=0.5)
    return bm


def _extrude_up(bm, height):
    ext = bmesh.ops.extrude_face_region(bm, geom=list(bm.faces))
    bmesh.ops.translate(bm, vec=(0, 0, height), verts=[g for g in ext["geom"] if isinstance(g, bmesh.types.BMVert)])
    bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
    return bm


def ring_bm(outer, inner, height, z0=0.0, segments=48):
    """Flat annulus extruded to `height`."""
    bm = bmesh.new()
    o = [bm.verts.new((outer * math.cos(2 * math.pi * i / segments), outer * math.sin(2 * math.pi * i / segments), z0)) for i in range(segments)]
    n = [bm.verts.new((inner * math.cos(2 * math.pi * i / segments), inner * math.sin(2 * math.pi * i / segments), z0)) for i in range(segments)]
    for i in range(segments):
        j = (i + 1) % segments
        bm.faces.new((o[i], o[j], n[j], n[i]))
    return _extrude_up(bm, height)


def rect_frame_bm(sx, sy, width, height, z0):
    """Rectangular outline (picture frame) lying on a top face."""
    bm = bmesh.new()
    hx, hy = sx / 2, sy / 2
    o = [bm.verts.new((x, y, z0)) for x, y in [(-hx, -hy), (hx, -hy), (hx, hy), (-hx, hy)]]
    n = [bm.verts.new((x, y, z0)) for x, y in [(-hx + width, -hy + width), (hx - width, -hy + width), (hx - width, hy - width), (-hx + width, hy - width)]]
    for i in range(4):
        j = (i + 1) % 4
        bm.faces.new((o[i], o[j], n[j], n[i]))
    return _extrude_up(bm, height)


def polygon_bm(points, height, z0=0.0):
    """Extruded 2D polygon (glyphs: bolt, star, envelope flap…). Points counter-clockwise."""
    bm = bmesh.new()
    verts = [bm.verts.new((x, y, z0)) for x, y in points]
    bm.faces.new(verts)
    return _extrude_up(bm, height)


def cylinder_bm(radius, depth, segments=24, z0=0.0):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=segments, radius1=radius, radius2=radius, depth=depth)
    bmesh.ops.translate(bm, vec=(0, 0, depth / 2 + z0), verts=bm.verts)
    return bm


def capsule_bm(length, radius, z0=0.0):
    """Sphere stretched along X — the violet "token"/"packet" shape."""
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=24, v_segments=12, radius=1.0)
    for v in bm.verts:
        v.co.x *= length / 2
        v.co.y *= radius
        v.co.z = v.co.z * radius + radius + z0
    return bm


def text_object(name, body, size, mat, parent, location):
    curve = bpy.data.curves.new(name, "FONT")
    curve.body = body
    curve.size = size
    curve.extrude = 0.0015
    curve.resolution_u = 3  # small type: 3 steps per curve segment is plenty and keeps the GLB light
    curve.align_x = "LEFT"
    curve.align_y = "BOTTOM"
    if os.path.exists(FONT):
        curve.font = bpy.data.fonts.load(FONT, check_existing=True)
    obj = bpy.data.objects.new(name, curve)
    obj.data.materials.append(mat)
    link(obj, parent, location)
    bpy.context.view_layer.objects.active = obj
    for o in bpy.context.view_layer.objects:
        o.select_set(False)
    obj.select_set(True)
    bpy.ops.object.convert(target="MESH")  # glTF exports meshes, not text curves
    return bpy.context.view_layer.objects.active


def smooth(obj):
    for poly in obj.data.polygons:
        poly.use_smooth = True
    mod = obj.modifiers.new("weighted_normals", "WEIGHTED_NORMAL")
    mod.keep_sharp = True
    return obj


@dataclass
class Plate:
    root: bpy.types.Object
    slide: bpy.types.Object
    lift: bpy.types.Object
    body: bpy.types.Object
    accent: bpy.types.Object
    top: float


def framed_plate(name, sx, sy, height, mats, location=(0, 0, 0), parent=None, bevel=0.01, inset=0.02, label=None, label_size=0.05):
    """
    Interactive piece: a bevelled body with a grey hairline frame on top, a hidden violet
    frame for hover, and an optional mono label in the front-left corner. Put details on
    `plate.lift` so they rise with hover.
    """
    root = empty(name, parent, location)
    slide = empty(f"{name}_slide", root)
    lift = empty(f"{name}_lift", slide)
    body = smooth(mesh_object(f"{name}_body", box_bm(sx, sy, height, bevel=bevel), mats["clay"], parent=lift))
    mesh_object(f"{name}_frame", rect_frame_bm(sx - inset, sy - inset, FRAME_W, 0.003, height), mats["line"], parent=lift)
    accent = mesh_object(f"{name}_accent", rect_frame_bm(sx - inset, sy - inset, FRAME_W, 0.003, height), mats["accent"], parent=lift)
    accent.location.z = -0.006  # hidden inside the body until hover raises it
    if label:
        text_object(f"{name}_label", label, label_size, mats["ink"], lift, (-sx / 2 + inset + 0.016, -sy / 2 + inset + 0.014, height))
    return Plate(root, slide, lift, body, accent, height)


def wire_bm(points, width=0.012, height=0.006, z=0.0):
    """Orthogonal wire along a polyline in XY (flat bar segments, overlapping at corners)."""
    bm = bmesh.new()
    for (x0, y0), (x1, y1) in zip(points, points[1:]):
        cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
        lx, ly = abs(x1 - x0) + width, abs(y1 - y0) + width
        seg = box_bm(lx, ly, height, z0=z)
        bmesh.ops.translate(seg, vec=(cx, cy, 0), verts=seg.verts)
        tmp = bpy.data.meshes.new("tmp")
        seg.to_mesh(tmp)
        seg.free()
        bm.from_mesh(tmp)
        bpy.data.meshes.remove(tmp)
    return bm


# ---------- animation ----------

def _fcurves(action):
    for layer in action.layers:
        for strip in layer.strips:
            for bag in strip.channelbags:
                yield from bag.fcurves


def add_clip(obj, clip, keys, easing="EASE_OUT", interpolation="QUART"):
    """
    Keyframe `obj` into its own action on an NLA track named `clip`. `keys` is a list of
    (frame, {"location"|"rotation_euler"|"scale": value}). The current transform is the rest
    pose and is restored afterwards. Same-named tracks export as one glTF animation.
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


def add_hover_clip(plate, rise=0.04):
    """hover_<name> (0–12): the piece lifts and its violet frame rises over the grey one."""
    name = plate.root.name
    add_clip(plate.lift, f"hover_{name}", [(0, {"location": Vector((0, 0, 0))}), (12, {"location": Vector((0, 0, rise))})])
    add_clip(plate.accent, f"hover_{name}", [(0, {"location": plate.accent.location.copy()}), (12, {"location": Vector((0, 0, 0.0008))})])


def add_drop_in(obj, clip, start, offset, rot_deg=(0, 0, 0), duration=48, scale=0.88):
    """Intro helper: `obj` floats at an offset from its rest pose, then settles (ease-out, no overshoot)."""
    away = {"location": obj.location + Vector(offset),
            "rotation_euler": Euler(tuple(math.radians(a) for a in rot_deg)),
            "scale": Vector((scale, scale, scale))}
    home = {"location": obj.location.copy(), "rotation_euler": obj.rotation_euler.copy(), "scale": Vector((1, 1, 1))}
    keys = [(0, away)] + ([(start, away)] if start else []) + [(start + duration, home)]
    add_clip(obj, clip, keys)


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


# ---------- camera, light, shadow, output ----------

def reset_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.render.fps = FPS
    scene.unit_settings.system = "METRIC"
    return scene


def setup_camera_and_light(scene, name, target, ortho_scale, key=(-1.2, -0.8, 3.6)):
    cam_data = bpy.data.cameras.new(name)
    cam_data.type = "ORTHO"
    cam_data.ortho_scale = ortho_scale
    cam = bpy.data.objects.new(name, cam_data)
    scene.collection.objects.link(cam)
    target = Vector(target)
    az, el, dist = math.radians(45), math.radians(35.264), 6.0  # true isometric, front-right, looking down
    cam.location = target + Vector((math.cos(el) * math.sin(az), -math.cos(el) * math.cos(az), math.sin(el))) * dist
    cam.rotation_euler = (target - cam.location).to_track_quat("-Z", "Y").to_euler()
    scene.camera = cam
    # glTF derives ymag from the render aspect; the site's canvas and poster are 6:5.
    scene.render.resolution_x = 1200
    scene.render.resolution_y = 1000

    for light_name, energy, size, loc in (("key", 90, 2.5, key), ("fill", 25, 4.0, (2.8, -2.6, 1.6))):
        data = bpy.data.lights.new(light_name, "AREA")
        data.energy = energy
        data.size = size
        obj = bpy.data.objects.new(light_name, data)
        obj.location = loc
        obj.rotation_euler = (Vector((0, 0, 0)) - obj.location).to_track_quat("-Z", "Y").to_euler()
        scene.collection.objects.link(obj)

    world = bpy.data.worlds.new("world")
    world.use_nodes = True
    world.node_tree.nodes["Background"].inputs["Color"].default_value = (1, 1, 1, 1)
    world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.35
    scene.world = world

    catcher = mesh_object("shadow_catcher", box_bm(8, 8, 0.001, z0=-0.001), material("ct_catcher", "#ffffff"))
    catcher.is_shadow_catcher = True
    return cam, catcher


def pose(scene, clip=None, frame=0):
    """Put the scene in the rest pose, or at `frame` of `clip`."""
    solo_clip(scene, clip)
    scene.frame_set(frame)


def bake_ground_shadow(scene, catcher, center, size, resolution=(1024, 512), strength=0.42, at=(None, 0)):
    """
    Bake the soft shadow of the rest pose onto a ground plane, stored as a black texture whose
    alpha is the shadow. The site shows it unlit instead of rendering shadows every frame.
    """
    import numpy as np

    bm = bmesh.new()
    bm.loops.layers.uv.new("UVMap")
    bmesh.ops.create_grid(bm, x_segments=1, y_segments=1, size=0.5, calc_uvs=True)
    for v in bm.verts:
        v.co.x *= size[0]
        v.co.y *= size[1]
    plane = mesh_object("ground_shadow", bm, material("ct_ground_shadow", "#111827"), location=(center[0], center[1], 0.0005))

    image = bpy.data.images.new("ground_shadow_bake", *resolution, alpha=False, float_buffer=True)
    nodes = plane.active_material.node_tree.nodes
    tex = nodes.new("ShaderNodeTexImage")
    tex.image = image
    nodes.active = tex

    pose(scene, *at)
    catcher.hide_render = True
    scene.render.engine = "CYCLES"
    scene.cycles.samples = 96
    for obj in scene.objects:
        obj.select_set(obj == plane)
    bpy.context.view_layer.objects.active = plane
    bpy.ops.object.bake(type="SHADOW", margin=4)
    catcher.hide_render = False

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
    scene.view_settings.view_transform = "Standard"  # keep hex colours faithful
    if frame is not None:
        scene.frame_set(frame)
    scene.render.filepath = path
    bpy.ops.render.render(write_still=True)


def export_glb(scene, path):
    solo_clip(scene, None)  # rest pose on every node; clips carry the motion
    scene.frame_set(0)
    for obj in scene.objects:
        obj.select_set(obj.type in {"MESH", "EMPTY", "CAMERA"} and obj.name != "shadow_catcher")
    os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
    bpy.ops.export_scene.gltf(
        filepath=os.path.abspath(path),
        export_format="GLB",
        use_selection=True,
        export_apply=True,
        export_yup=True,
        export_cameras=True,
        export_lights=False,
        export_animations=True,
        export_animation_mode="NLA_TRACKS",
        export_force_sampling=True,
        export_frame_step=1,
        export_optimize_animation_size=True,
        export_materials="EXPORT",
        export_image_format="AUTO",
        export_extras=False,
    )
    print(f"REPORT exported {path} ({os.path.getsize(path) / 1024:.0f} KB)")


@dataclass
class Kit:
    scene: bpy.types.Scene
    mats: dict


def run(build, *, camera, target, ortho_scale, shadow_center, shadow_size, showcase=(None, 0), key=(-1.2, -0.8, 3.6)):
    """
    CLI shared by all scenes:
        blender -b --factory-startup --python <scene>/build.py -- \
            [--preview DIR] [--frames clip:f,f ...] [--poster PNG] [--export GLB] [--save BLEND]
    `build(kit)` creates geometry and clips (leaving objects in the rest pose).
    `showcase` = (clip, frame): the pose used for the baked shadow and the poster — e.g. a
    fully scrolled state when that tells the story better than the rest pose.
    `key`: key light position; raise it for tall scenes so shadows stay short and light.
    """
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    parser = argparse.ArgumentParser()
    parser.add_argument("--save")
    parser.add_argument("--export")
    parser.add_argument("--preview")
    parser.add_argument("--poster")
    parser.add_argument("--frames", nargs="*", default=[])
    args = parser.parse_args(argv)

    scene = reset_scene()
    kit = Kit(scene, palette_materials())
    _, catcher = setup_camera_and_light(scene, camera, target, ortho_scale, key)
    remember_rest(scene)
    build(kit)
    remember_rest(scene)
    bake_ground_shadow(scene, catcher, shadow_center, shadow_size, at=showcase)
    restore_rest(scene)  # the bake may have posed the scene; the rest pose stays the one built
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
    if args.poster:
        pose(scene, *showcase)
        render_preview(scene, os.path.abspath(args.poster), frame=showcase[1])
    if args.export:
        export_glb(scene, args.export)
    if args.save:
        solo_clip(scene, None)
        bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath(args.save))

    tris = sum(len(p.vertices) - 2 for o in scene.objects if o.type == "MESH" and o.name != "shadow_catcher" for p in o.data.polygons)
    print(f"STATS objects={len([o for o in scene.objects if o.type == 'MESH'])} triangles≈{tris}")
