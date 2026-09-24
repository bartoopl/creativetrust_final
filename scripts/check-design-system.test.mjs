import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findViolations } from './check-design-system.mjs';

test('flags the removed lime accent', () => {
    assert.equal(findViolations("color: '#CAFF04'").length, 1);
    assert.equal(findViolations("border: '1px solid rgba(202,255,4,0.25)'").length, 1);
    assert.equal(findViolations("background: 'var(--lime)'").length, 1);
});

test('flags dark section backgrounds', () => {
    assert.equal(findViolations("style={{ background: '#000' }}").length, 1);
    assert.equal(findViolations('<div className="bg-black p-4">').length, 1);
    assert.equal(findViolations("background: 'rgba(0,0,0,0.8)'").length, 1);
});

test('backdrop allowance does not hide other dark backgrounds', () => {
    assert.equal(findViolations("style={{ backdropFilter: 'blur(8px)', background: '#000' }}").length, 1);
});

test('flags removed tokens and legacy display font', () => {
    assert.equal(findViolations("color: 'var(--accent2)'").length, 1);
    assert.equal(findViolations("fontFamily: 'var(--font-space), sans-serif'").length, 1);
});

test('allows the design system and modal backdrops', () => {
    assert.deepEqual(findViolations("background: 'var(--accent)', color: '#fff'"), []);
    assert.deepEqual(findViolations("border: '1px solid var(--line)'"), []);
    assert.deepEqual(findViolations("className=\"backdrop\" style={{ background: 'rgba(0,0,0,0.6)' }}"), []);
    assert.deepEqual(findViolations("color: '#000000'"), []);
});
