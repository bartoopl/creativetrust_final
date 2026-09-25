/**
 * Gesture math for drag/swipe interactions, after Apple's "Designing Fluid
 * Interfaces" (WWDC 2018): project momentum to pick a target, resist softly
 * past boundaries, and hand the release velocity to the settling spring.
 */

/** Distance (px) a flick travels before stopping, using scroll-view exponential deceleration. */
export function project(velocity: number, decelerationRate = 0.998): number {
    return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

/** Progressive resistance past a boundary: the further past, the less the element follows. */
export function rubberband(overshoot: number, dimension: number, constant = 0.55): number {
    if (dimension <= 0) return 0;
    return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}

/**
 * Horizontal drag offset with rubber-banding when there is no image to reveal
 * on that side (dragging right on the first, left on the last).
 */
export function resistEdges(offset: number, index: number, count: number, width: number): number {
    const atStart = index <= 0 && offset > 0;
    const atEnd = index >= count - 1 && offset < 0;
    return atStart || atEnd ? rubberband(offset, width) : offset;
}

export interface SwipeInput {
    /** Horizontal drag offset at release, px (negative = dragged left). */
    offset: number;
    /** Horizontal release velocity, px/s. */
    velocity: number;
    /** Width of one page, px. */
    width: number;
    index: number;
    count: number;
}

/**
 * Choose the page to settle on from where the gesture is going, not where it
 * was released: a short fast flick advances, a long slow drag that is let go
 * short of halfway returns.
 */
export function pickSwipeTarget({ offset, velocity, width, index, count }: SwipeInput): number {
    const projected = offset + project(velocity);
    if (projected < -width / 2 && index < count - 1) return index + 1;
    if (projected > width / 2 && index > 0) return index - 1;
    return index;
}

/** A downward drag dismisses when its projected end passes a quarter of the viewport height. */
export function shouldDismiss(offsetY: number, velocityY: number, height: number): boolean {
    return offsetY > 0 && offsetY + project(velocityY) > height / 4;
}

/** Release velocity from recent pointer samples (the last ~100 ms), px/s. */
export class VelocityTracker {
    private samples: { t: number; x: number; y: number }[] = [];
    private readonly windowMs: number;

    // No parameter properties: this module must stay loadable by Node's type stripping (node --test).
    constructor(windowMs = 100) {
        this.windowMs = windowMs;
    }

    add(t: number, x: number, y: number): void {
        this.samples.push({ t, x, y });
        while (this.samples.length > 2 && t - this.samples[0].t > this.windowMs) this.samples.shift();
    }

    reset(): void {
        this.samples = [];
    }

    velocity(): { x: number; y: number } {
        const first = this.samples[0];
        const last = this.samples[this.samples.length - 1];
        if (!first || !last || last.t === first.t) return { x: 0, y: 0 };
        const dt = (last.t - first.t) / 1000;
        return { x: (last.x - first.x) / dt, y: (last.y - first.y) / dt };
    }
}
