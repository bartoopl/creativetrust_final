import { test } from 'node:test';
import assert from 'node:assert/strict';
import { project, rubberband, resistEdges, pickSwipeTarget, shouldDismiss, VelocityTracker } from '../src/lib/gesture.ts';

const close = (actual, expected, eps = 1e-6) => assert.ok(Math.abs(actual - expected) < eps, `${actual} ≈ ${expected}`);

test('project matches the scroll-view deceleration formula', () => {
    close(project(1000), 499);
    close(project(-500), -249.5);
    close(project(0), 0);
    close(project(1000, 0.99), 99);
});

test('rubberband follows less the further past the edge', () => {
    const w = 400;
    const a = rubberband(50, w);
    const b = rubberband(200, w);
    assert.ok(a < 50 && b < 200);
    assert.ok(b / 200 < a / 50, 'resistance increases with overshoot');
    assert.ok(rubberband(1e9, w) < w, 'approaches but never exceeds the dimension');
    close(rubberband(-50, w), -a);
    assert.equal(rubberband(50, 0), 0);
});

test('resistEdges only resists where there is nothing to reveal', () => {
    assert.equal(resistEdges(-80, 0, 3, 400), -80, 'first image, dragging towards the next');
    assert.ok(resistEdges(80, 0, 3, 400) < 80, 'first image, dragging towards nothing');
    assert.ok(resistEdges(-80, 2, 3, 400) > -80, 'last image, dragging towards nothing');
    assert.equal(resistEdges(80, 1, 3, 400), 80);
});

test('a short fast flick advances; a slow drag short of halfway returns', () => {
    const base = { width: 400, index: 1, count: 3 };
    assert.equal(pickSwipeTarget({ ...base, offset: -40, velocity: -800 }), 2);
    assert.equal(pickSwipeTarget({ ...base, offset: 40, velocity: 800 }), 0);
    assert.equal(pickSwipeTarget({ ...base, offset: -150, velocity: 0 }), 1);
    assert.equal(pickSwipeTarget({ ...base, offset: -250, velocity: 0 }), 2);
});

test('velocity direction wins over release position', () => {
    // Dragged far left but flung back right: settle back on the current image.
    assert.equal(pickSwipeTarget({ width: 400, index: 1, count: 3, offset: -250, velocity: 600 }), 1);
});

test('no target past the ends', () => {
    assert.equal(pickSwipeTarget({ width: 400, index: 0, count: 3, offset: 300, velocity: 2000 }), 0);
    assert.equal(pickSwipeTarget({ width: 400, index: 2, count: 3, offset: -300, velocity: -2000 }), 2);
});

test('downward drag dismisses by projected distance, never upward', () => {
    assert.equal(shouldDismiss(60, 900, 800), true);
    assert.equal(shouldDismiss(60, 0, 800), false);
    assert.equal(shouldDismiss(220, 0, 800), true);
    assert.equal(shouldDismiss(-300, -2000, 800), false);
});

test('velocity tracker uses only the recent window', () => {
    const v = new VelocityTracker(100);
    v.add(0, 0, 0);
    v.add(500, 0, 0); // long pause, then a fast move
    v.add(550, 50, 10);
    v.add(600, 100, 20);
    const { x, y } = v.velocity();
    close(x, 1000);
    close(y, 200);
    v.reset();
    assert.deepEqual(v.velocity(), { x: 0, y: 0 });
});
