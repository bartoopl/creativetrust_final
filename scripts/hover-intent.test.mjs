import { test, beforeEach, afterEach, mock } from 'node:test';
import assert from 'node:assert/strict';
import { createHoverIntent } from '../src/lib/hover-intent.ts';

let changes;
let intent;

beforeEach(() => {
    mock.timers.enable({ apis: ['setTimeout'] });
    changes = [];
    intent = createHoverIntent({ onOpenChange: (open) => changes.push(open) });
});

afterEach(() => {
    intent.dispose();
    mock.timers.reset();
});

test('hover opens only after the open delay', () => {
    intent.enter();
    mock.timers.tick(79);
    assert.deepEqual(changes, []);
    mock.timers.tick(1);
    assert.deepEqual(changes, [true]);
});

test('a quick sweep across the trigger never opens the menu', () => {
    intent.enter();
    mock.timers.tick(40);
    intent.leave();
    mock.timers.tick(500);
    assert.deepEqual(changes, []);
});

test('crossing the gap to the panel within the grace period keeps it open', () => {
    intent.enter();
    mock.timers.tick(80);
    intent.leave();
    mock.timers.tick(100);
    intent.enter();
    mock.timers.tick(500);
    assert.deepEqual(changes, [true]);
    assert.equal(intent.isOpen, true);
});

test('leaving the whole region closes after the close delay', () => {
    intent.enter();
    mock.timers.tick(80);
    intent.leave();
    mock.timers.tick(149);
    assert.equal(intent.isOpen, true);
    mock.timers.tick(1);
    assert.deepEqual(changes, [true, false]);
});

test('clicking a hover-opened menu keeps it open instead of toggling it shut', () => {
    intent.enter();
    mock.timers.tick(80);
    intent.click();
    assert.equal(intent.isOpen, true);
    intent.leave();
    mock.timers.tick(500);
    assert.equal(intent.isOpen, true, 'pinned menu ignores pointer leave');
    intent.click();
    assert.deepEqual(changes, [true, false]);
});

test('click (keyboard or touch) toggles without waiting for a delay', () => {
    intent.click();
    assert.deepEqual(changes, [true]);
    intent.click();
    assert.deepEqual(changes, [true, false]);
});

test('explicit close cancels pending timers and unpins', () => {
    intent.click();
    intent.close();
    intent.enter();
    mock.timers.tick(80);
    intent.leave();
    mock.timers.tick(150);
    assert.deepEqual(changes, [true, false, true, false]);
});
