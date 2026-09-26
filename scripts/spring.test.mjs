import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createSpring, stepSpring, isSettled } from '../src/lib/spring.ts';

const run = (spring, seconds, response, damping, fps = 60) => {
    let max = -Infinity;
    for (let t = 0; t < seconds; t += 1 / fps) {
        stepSpring(spring, 1 / fps, response, damping);
        max = Math.max(max, spring.value);
    }
    return max;
};

test('critically damped spring reaches the target without overshoot', () => {
    const s = createSpring(0);
    s.target = 1;
    const max = run(s, 2, 0.35, 1);
    assert.ok(max <= 1 + 1e-6, `overshot to ${max}`);
    assert.ok(isSettled(s, 1e-3));
});

test('response controls speed', () => {
    const fast = createSpring(0);
    const slow = createSpring(0);
    fast.target = slow.target = 1;
    run(fast, 0.2, 0.2, 1);
    run(slow, 0.2, 0.6, 1);
    assert.ok(fast.value > slow.value);
});

test('under-damped spring overshoots', () => {
    const s = createSpring(0);
    s.target = 1;
    assert.ok(run(s, 2, 0.4, 0.6) > 1.02);
});

test('re-targeting mid-flight keeps value and velocity (no jump)', () => {
    const s = createSpring(0);
    s.target = 1;
    run(s, 0.1, 0.35, 1);
    const { value, velocity } = s;
    assert.ok(velocity > 0);
    s.target = 0; // reverse
    stepSpring(s, 1 / 60, 0.35, 1);
    assert.ok(Math.abs(s.value - value) < 0.05, 'continues from where it was');
    assert.ok(s.velocity < velocity, 'decelerates instead of snapping');
});

test('a long frame gap is clamped and stays stable', () => {
    const s = createSpring(0);
    s.target = 1;
    stepSpring(s, 5, 0.35, 1);
    assert.ok(Number.isFinite(s.value) && s.value <= 1.000001);
});
