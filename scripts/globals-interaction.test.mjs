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
