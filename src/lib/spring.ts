/**
 * Frame-stepped spring in Apple's terms (damping ratio + response, WWDC "Designing Fluid
 * Interfaces"): re-targeting keeps the current value and velocity, so motion driven by
 * scroll, hover or the pointer stays continuous and interruptible. Plain module, no imports.
 */
export interface Spring {
    value: number;
    velocity: number;
    target: number;
}

export function createSpring(value = 0): Spring {
    return { value, velocity: 0, target: value };
}

/**
 * Advance by `dt` seconds. `response` ≈ how quickly it gets there (s); `damping` 1 = critically
 * damped (no overshoot), < 1 bounces. Large frame gaps are sub-stepped for stability.
 */
export function stepSpring(spring: Spring, dt: number, response = 0.35, damping = 1): Spring {
    const stiffness = (2 * Math.PI / response) ** 2;
    const friction = (4 * Math.PI * damping) / response;
    let remaining = Math.min(dt, 0.1);
    while (remaining > 0) {
        const h = Math.min(remaining, 1 / 120);
        const force = stiffness * (spring.target - spring.value) - friction * spring.velocity;
        spring.velocity += force * h;
        spring.value += spring.velocity * h;
        remaining -= h;
    }
    return spring;
}

export function isSettled(spring: Spring, epsilon = 1e-4): boolean {
    return Math.abs(spring.target - spring.value) < epsilon && Math.abs(spring.velocity) < epsilon;
}
