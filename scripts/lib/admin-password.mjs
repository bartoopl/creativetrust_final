// Input checks for scripts/set-admin-password.ts, kept free of Payload so they can be unit-tested.

export const MIN_PASSWORD_LENGTH = 12;

/** Lower-cased, trimmed e-mail, or '' when none was given (the script then lists the accounts). */
export function normalizeEmail(value) {
    return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

/**
 * Reads ADMIN_EMAIL and ADMIN_PASSWORD. Returns { mode: 'list' } without an e-mail,
 * otherwise { mode: 'reset', email, password }; throws with a readable message on bad input.
 */
export function parseResetRequest(env) {
    const email = normalizeEmail(env.ADMIN_EMAIL);
    if (!email) return { mode: 'list' };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error(`ADMIN_EMAIL is not an e-mail address: ${email}`);
    const password = env.ADMIN_PASSWORD ?? '';
    if (password.length < MIN_PASSWORD_LENGTH) {
        throw new Error(`ADMIN_PASSWORD must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
    }
    return { mode: 'reset', email, password };
}
