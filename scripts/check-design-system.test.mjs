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

test('flags a px root font size but allows a percentage', () => {
    assert.equal(findViolations('html { scroll-behavior: smooth; font-size: 14px; }').length, 1);
    assert.deepEqual(findViolations('html { scroll-behavior: smooth; font-size: 87.5%; }'), []);
    assert.deepEqual(findViolations('.ct-body { font-size: 14px; }'), []);
});

test('flags px tracking on fluid type only', () => {
    assert.equal(findViolations("fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '-1.2px'").length, 1);
    assert.equal(findViolations('font-size: clamp(38px, 5vw, 60px); font-weight: 600; letter-spacing: -1.6px;').length, 1);
    assert.deepEqual(findViolations("fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '-0.03em'"), []);
    assert.deepEqual(findViolations("fontSize: 20, letterSpacing: '-0.5px', padding: 'clamp(16px, 4vw, 72px)'"), []);
});
