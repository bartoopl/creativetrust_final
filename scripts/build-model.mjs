#!/usr/bin/env node
// Rebuilds a 3D scene from blender/<id>/build.py: GLB + poster (WebP) into public/models,
// and the .blend next to the script. Usage: node scripts/build-model.mjs <id>|--all
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const BLENDER = process.env.BLENDER ?? '/Applications/Blender.app/Contents/MacOS/Blender';
const arg = process.argv[2];
const ids = arg === '--all'
    ? readdirSync('blender').filter((d) => existsSync(join('blender', d, 'build.py')))
    : [arg];
if (!arg || ids.some((id) => !existsSync(join('blender', id, 'build.py')))) {
    console.error('usage: node scripts/build-model.mjs <scene-id>|--all');
    process.exit(1);
}
for (const id of ids) {
    const poster = join('blender', id, '.poster.png');
    execFileSync(BLENDER, ['-b', '--factory-startup', '--python', join('blender', id, 'build.py'), '--',
        '--export', `public/models/${id}.glb`, '--poster', poster, '--save', join('blender', id, `${id}.blend`)], { stdio: 'inherit' });
    execFileSync('cwebp', ['-quiet', '-q', '82', '-alpha_q', '90', poster, '-o', `public/models/${id}-poster.webp`]);
    rmSync(poster);
    rmSync(join('blender', id, `${id}.blend1`), { force: true });
}
