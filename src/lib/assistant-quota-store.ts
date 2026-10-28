import { createHash } from 'node:crypto';
import { getStore } from '@netlify/blobs';
import { createMemoryStore, type CounterStore } from './assistant-quota';

const memory = createMemoryStore();
let persistent: CounterStore | null | undefined;

/**
 * Netlify Blobs when running on Netlify (counters survive cold starts and are shared between function
 * instances), in-memory otherwise. Increments are read-then-write, not atomic — fine for coarse limits.
 */
function blobsStore(): CounterStore | null {
    if (persistent !== undefined) return persistent;
    try {
        const store = getStore({ name: 'offer-assistant-quota', consistency: 'strong' });
        const read = async (key: string) => Number(await store.get(key)) || 0;
        persistent = {
            get: read,
            async increment(key) {
                const next = (await read(key)) + 1;
                await store.set(key, String(next));
                return next;
            },
        };
    } catch {
        // No Netlify Blobs context (local dev, other hosting).
        persistent = null;
    }
    return persistent;
}

/** Persistent store with a per-call fallback to memory, so a Blobs outage never takes the form down. */
export function quotaStore(): CounterStore {
    const blobs = blobsStore();
    if (!blobs) return memory;
    return {
        get: (key) => blobs.get(key).catch(() => memory.get(key)),
        increment: (key) => blobs.increment(key).catch(() => memory.increment(key)),
    };
}

/** Visitor id: salted hash of the IP — counters never store a raw address. */
export function visitorId(ip: string): string {
    const salt = process.env.ASSISTANT_QUOTA_SALT || 'creativetrust-offer-assistant';
    return createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 24);
}
