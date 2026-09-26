// Contract between the Blender builds (blender/<id>/build.py, shared rules in blender/lib/ct3d.py)
// and the site (src/lib/scenes3d.ts, src/components/scene3d): names, clips, framing, palette, budget.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { scenes } from '../src/lib/scenes3d.ts';

const PALETTE = new Set(['#f6f6f7', '#e9ebee', '#d1d5db', '#9ca3af', '#6c63ff', '#111827', '#ffffff']);

function readGlb(path) {
    const bytes = readFileSync(path);
    assert.equal(bytes.toString('ascii', 0, 4), 'glTF', `${path} is not a GLB`);
    return { bytes, gltf: JSON.parse(bytes.subarray(20, 20 + bytes.readUInt32LE(12)).toString('utf8')) };
}

const toHex = (linear) => {
    const s = linear <= 0.0031308 ? linear * 12.92 : 1.055 * linear ** (1 / 2.4) - 0.055;
    return Math.round(s * 255).toString(16).padStart(2, '0');
};

for (const scene of Object.values(scenes)) {
    const url = new URL(`../public${scene.model}`, import.meta.url);
    const { bytes, gltf } = readGlb(url);
    const nodes = new Set(gltf.nodes.map((n) => n.name));
    const clips = new Set(gltf.animations.map((a) => a.name));

    test(`${scene.id}: model and poster exist`, () => {
        assert.ok(existsSync(new URL(`../public${scene.poster}`, import.meta.url)), 'poster missing');
        assert.ok(existsSync(new URL(`../blender/${scene.id}/build.py`, import.meta.url)), 'build script missing');
    });

    test(`${scene.id}: every target has the plate hierarchy and a hover clip`, () => {
        for (const { node } of scene.targets) {
            for (const name of [node, `${node}_slide`, `${node}_lift`, `${node}_accent`]) assert.ok(nodes.has(name), `missing node ${name}`);
            assert.ok(clips.has(`hover_${node}`), `missing clip hover_${node}`);
        }
    });

    test(`${scene.id}: ships the intro, scroll and idle clips`, () => {
        for (const name of [scene.intro, scene.scroll, ...scene.idle]) assert.ok(clips.has(name), `missing clip ${name}`);
    });

    test(`${scene.id}: hover clips only move *_lift / *_accent nodes (no conflict with intro or scroll)`, () => {
        for (const anim of gltf.animations.filter((a) => a.name.startsWith('hover_'))) {
            for (const ch of anim.channels) {
                const name = gltf.nodes[ch.target.node].name;
                assert.match(name, /_(lift|accent)$/, `${anim.name} animates ${name}`);
            }
        }
    });

    test(`${scene.id}: has the baked ground shadow and a 6:5 orthographic camera`, () => {
        assert.ok(nodes.has('ground_shadow'));
        const cam = gltf.cameras[0];
        assert.equal(cam.type, 'orthographic');
        assert.ok(Math.abs(cam.orthographic.xmag / cam.orthographic.ymag - 6 / 5) < 1e-3);
    });

    test(`${scene.id}: uses only the design-system palette`, () => {
        const colours = gltf.materials
            .map((m) => m.pbrMetallicRoughness?.baseColorFactor)
            .filter(Boolean)
            .map(([r, g, b]) => `#${toHex(r)}${toHex(g)}${toHex(b)}`);
        for (const c of colours) assert.ok(PALETTE.has(c), `unexpected colour ${c}`);
        assert.ok(colours.includes('#6c63ff'), 'accent present');
    });

    test(`${scene.id}: stays within the web budget`, () => {
        assert.ok(bytes.length / 1024 < 1500, `${(bytes.length / 1024).toFixed(0)} KB raw`);
        assert.ok(gzipSync(bytes).length / 1024 < 400, 'gzipped size over 400 KB');
    });
}
