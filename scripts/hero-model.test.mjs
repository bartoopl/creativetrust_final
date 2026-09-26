// Contract between the Blender build (blender/hero-pipeline/build.py) and the site's scene
// (src/components/hero/HeroPipelineScene.tsx): names, clips, camera framing and budget.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';

const GLB = new URL('../public/models/hero-pipeline.glb', import.meta.url);
const bytes = readFileSync(GLB);
const jsonLength = bytes.readUInt32LE(12);
const gltf = JSON.parse(bytes.subarray(20, 20 + jsonLength).toString('utf8'));
const nodeNames = new Set(gltf.nodes.map((n) => n.name));
const MODULES = ['module_goal', 'module_research', 'module_prototype', 'module_deploy', 'module_optimize'];

test('is a glTF 2.0 binary', () => {
    assert.equal(bytes.toString('ascii', 0, 4), 'glTF');
    assert.equal(bytes.readUInt32LE(4), 2);
});

test('has every node the site looks up by name', () => {
    for (const name of [...MODULES, 'token_progress', 'rail', 'ground_shadow', 'hero_camera']) {
        assert.ok(nodeNames.has(name), `missing node ${name}`);
    }
    for (const m of MODULES) assert.ok(nodeNames.has(`${m}_accent`), `missing ${m}_accent`);
});

test('ships the clips the site plays', () => {
    const clips = new Set(gltf.animations.map((a) => a.name));
    for (const name of ['assemble', 'scroll_progress', 'idle_token', ...MODULES.map((m) => `hover_${m}`)]) {
        assert.ok(clips.has(name), `missing clip ${name}`);
    }
});

test('camera frames a 6:5 view, matching the poster and the canvas aspect ratio', () => {
    const { orthographic } = gltf.cameras.find((c) => c.name === 'hero_camera');
    assert.ok(Math.abs(orthographic.xmag / orthographic.ymag - 6 / 5) < 1e-3, `xmag/ymag = ${orthographic.xmag / orthographic.ymag}`);
});

test('uses only the design-system palette', () => {
    const toHex = (linear) => {
        const s = linear <= 0.0031308 ? linear * 12.92 : 1.055 * linear ** (1 / 2.4) - 0.055;
        return Math.round(s * 255).toString(16).padStart(2, '0');
    };
    const colours = gltf.materials
        .map((m) => m.pbrMetallicRoughness?.baseColorFactor)
        .filter(Boolean)
        .map(([r, g, b]) => `#${toHex(r)}${toHex(g)}${toHex(b)}`);
    const allowed = new Set(['#f6f6f7', '#e9ebee', '#d1d5db', '#9ca3af', '#6c63ff', '#111827', '#ffffff']);
    for (const c of colours) assert.ok(allowed.has(c), `unexpected colour ${c}`);
    assert.ok(colours.includes('#6c63ff'), 'accent present');
});

test('stays within the web budget', () => {
    const kb = statSync(GLB).size / 1024;
    const gzKb = gzipSync(bytes).length / 1024;
    assert.ok(kb < 1500, `${kb.toFixed(0)} KB raw`);
    assert.ok(gzKb < 400, `${gzKb.toFixed(0)} KB gzipped`);
});
