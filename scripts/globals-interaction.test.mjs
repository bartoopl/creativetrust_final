// Regression checks for the interaction/accessibility rules in globals.css.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/app/globals.css', import.meta.url), 'utf8');

test('interactive elements get a visible keyboard focus ring', () => {
    assert.match(css, /:where\(a, button[^)]*\):focus-visible\s*\{[^}]*outline:\s*2px solid var\(--accent\)/);
});

test('buttons respond on press', () => {
    assert.match(css, /\.ct-cta:active, \.ct-ghost:active\s*\{[^}]*transform:\s*scale\(\.97\)/);
});

test('reduced motion swaps travel for an opacity fade and stops the marquee', () => {
    const block = css.match(/@media \(prefers-reduced-motion: reduce\)\s*\{([\s\S]*?)\n\}/)?.[1] ?? '';
    assert.match(block, /scroll-behavior:\s*auto/);
    assert.match(block, /\.ct-marquee-track\s*\{\s*animation:\s*none/);
    assert.match(block, /\.ct-fade\s*\{\s*animation-name:\s*ctfadeonly/);
});

test('higher contrast strengthens hairlines', () => {
    assert.match(css, /@media \(prefers-contrast: more\)\s*\{[\s\S]*--line-strong:/);
});

test('no content is hidden behind an unused scroll-reveal hook', () => {
    assert.doesNotMatch(css, /\[data-reveal\]/);
});

test('header material blurs on a pseudo-element, not the header itself', () => {
    const header = css.match(/\.ct-header \{([^}]*)\}/)?.[1] ?? '';
    assert.doesNotMatch(header, /backdrop-filter/, 'backdrop-filter on .ct-header would trap fixed descendants');
    assert.match(css, /\.ct-header::before \{[^}]*backdrop-filter: saturate\(180%\) blur\(20px\)/);
    assert.match(css, /\.ct-header\[data-scrolled="true"\] \{ border-bottom-color: var\(--line\); \}/);
});

test('reduced transparency makes the header solid', () => {
    assert.match(css, /@media \(prefers-reduced-transparency: reduce\) \{\s*\.ct-header::before \{ background: #fff; [^}]*backdrop-filter: none; \}/);
});

test('FAQ disclosure animates height and drops the travel under reduced motion', () => {
    assert.match(css, /\.ct-disclosure \{[^}]*grid-template-rows: 0fr;[^}]*transition: grid-template-rows/);
    assert.match(css, /\.ct-disclosure\[data-open="true"\] \{ grid-template-rows: 1fr;/);
    const reduced = css.match(/@media \(prefers-reduced-motion: reduce\)\s*\{([\s\S]*?)\n\}/)?.[1] ?? '';
    assert.match(reduced, /\.ct-disclosure \{ transition: opacity/);
});

test('reduced transparency makes the lightbox backdrop solid', () => {
    assert.match(css, /@media \(prefers-reduced-transparency: reduce\) \{[^@]*\.ct-lightbox \{ background: var\(--panel\);[^}]*backdrop-filter: none; \}/);
});
