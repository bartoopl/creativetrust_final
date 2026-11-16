#!/usr/bin/env node
// Renders the static isometric illustrations (blender/illustrations/build.py), trims the
// transparent margin, writes public/illustrations/<id>.webp and their sizes to
// src/lib/illustrations.json (read by src/components/ui/Illustration.tsx).
// Usage: node scripts/build-illustrations.mjs [id ...]   (no ids: all of them)
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';

const BLENDER = process.env.BLENDER ?? '/Applications/Blender.app/Contents/MacOS/Blender';
const OUT_DIR = 'public/illustrations';
const MANIFEST = 'src/lib/illustrations.json';
const MAX_WIDTH = 1200; // shown at most ~600 CSS px wide, so 2× for retina
const PAD = 24;

const only = process.argv.slice(2);
const tmp = mkdtempSync(join(tmpdir(), 'ct-illustrations-'));
try {
    execFileSync(BLENDER, ['-b', '--factory-startup', '--python', 'blender/illustrations/build.py', '--', '--out', tmp,
        ...(only.length ? ['--only', ...only] : [])], { stdio: 'inherit' });

    const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : {};
    for (const file of readdirSync(tmp).filter((f) => f.endsWith('.png')).sort()) {
        const id = file.replace(/\.png$/, '');
        const trimmed = await sharp(join(tmp, file)).trim({ threshold: 1 }).toBuffer();
        const out = join(OUT_DIR, `${id}.webp`);
        const { width, height, size } = await sharp(trimmed)
            .extend({ top: PAD, bottom: PAD, left: PAD, right: PAD, background: { r: 0, g: 0, b: 0, alpha: 0 } })
            .resize({ width: MAX_WIDTH, withoutEnlargement: true })
            .webp({ quality: 82, alphaQuality: 90, effort: 6 })
            .toFile(out);
        manifest[id] = { width, height };
        console.log(`${out} ${width}×${height} ${(size / 1024).toFixed(0)} KB`);
    }
    const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
    writeFileSync(MANIFEST, `${JSON.stringify(sorted, null, 4)}\n`);
} finally {
    rmSync(tmp, { recursive: true, force: true });
}
