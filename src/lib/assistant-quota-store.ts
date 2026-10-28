import { createHash } from 'node:crypto';
import { createMemoryStore, type CounterStore } from './assistant-quota';

/**
 * In-memory counters, per server instance. Netlify Blobs was tried and every read/write hung from the
 * Next.js functions on this site (deploy previews #7, both strong and eventual consistency), so limits
 * hold per warm instance: enough to stop a single prankster hammering the form. The hard cost ceiling
 * is the spend limit on the Anthropic workspace that owns ANTHROPIC_API_KEY.
 */
const memory = createMemoryStore();

export function quotaStore(): CounterStore {
    return memory;
}

/** Visitor id: salted hash of the IP — counters never store a raw address. */
export function visitorId(ip: string): string {
    const salt = process.env.ASSISTANT_QUOTA_SALT || 'creativetrust-offer-assistant';
    return createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 24);
}
