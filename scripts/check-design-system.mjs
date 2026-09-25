#!/usr/bin/env node
// Guards the Medusa-inspired design system (design_handoff_medusa_redesign/):
// a single violet accent and no dark/filled sections. Fails when legacy
// lime-accent or dark-section styling is reintroduced under src/.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SRC = join(ROOT, 'src');

const RULES = [
    { name: 'lime accent', re: /#caff04|202\s*,\s*255\s*,\s*4|--lime\b|--lime-ink\b/i },
    { name: 'removed token', re: /var\(--(accent2|glow|bg-dark-2)\)/ },
    { name: 'dark background', re: /background(-color)?\s*:\s*['"]?(#000(000)?|#080808|#0a0a0a|black)\b|\bbg-black\b|\bbg-\[#000(000)?\]/i },
    // Modal backdrops may dim the page; they are overlays, not sections.
    { name: 'dark translucent background', re: /background(-color)?\s*:\s*['"]?rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0?\.[5-9]/i, allow: /backdrop|overlay/i },
    { name: 'legacy display font', re: /var\(--font-space\)/ },
    // A px root size overrides the user's browser text-size setting.
    { name: 'fixed root font size', re: /^\s*html\s*\{[^}]*font-size:\s*\d+(\.\d+)?px/ },
    // Tracking must scale with fluid type: px letter-spacing next to a clamp() size is wrong at one end.
    { name: 'px tracking on fluid type', re: /font-?[sS]ize:\s*['"]?clamp\(.*letter-?[sS]pacing:\s*['"]?-?\d+(\.\d+)?px|letter-?[sS]pacing:\s*['"]?-?\d+(\.\d+)?px.*font-?[sS]ize:\s*['"]?clamp\(/ },
];

function walk(dir) {
    return readdirSync(dir).flatMap((name) => {
        const path = join(dir, name);
        if (statSync(path).isDirectory()) return walk(path);
        return /\.(tsx?|css)$/.test(name) ? [path] : [];
    });
}

export function findViolations(source, file = '<input>') {
    const found = [];
    source.split('\n').forEach((line, i) => {
        for (const rule of RULES) {
            if (rule.re.test(line) && !rule.allow?.test(line)) {
                found.push(`${file}:${i + 1} [${rule.name}] ${line.trim().slice(0, 120)}`);
            }
        }
    });
    return found;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
    const violations = walk(SRC).flatMap((file) => findViolations(readFileSync(file, 'utf8'), relative(ROOT, file)));
    if (violations.length) {
        console.error(`Design system check failed (${violations.length}):\n${violations.join('\n')}`);
        process.exit(1);
    }
    console.log('Design system check passed.');
}
