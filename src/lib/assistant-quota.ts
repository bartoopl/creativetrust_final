/**
 * Usage limits for the homepage offer assistant. Pure logic (no Next, no Netlify), so `node --test`
 * loads it directly; the counter store lives in `assistant-quota-store.ts`.
 *
 * Three tiers, so pranksters cost nothing and real visitors are never stonewalled:
 * - within the AI limits → Claude answers;
 * - over a per-visitor or the site-wide daily AI limit → the free catalogue answer instead;
 * - flooding (too many requests of any kind from one visitor) → 429.
 */

export interface QuotaLimits {
    /** Claude answers per visitor per hour. */
    aiPerHour: number;
    /** Claude answers per visitor per day. */
    aiPerDay: number;
    /** Claude answers for the whole site per day — the cost ceiling. */
    aiGlobalPerDay: number;
    /** Requests of any kind per visitor per hour before answering 429. */
    requestsPerHour: number;
}

export const DEFAULT_LIMITS: QuotaLimits = { aiPerHour: 5, aiPerDay: 15, aiGlobalPerDay: 300, requestsPerHour: 30 };

const positiveInt = (raw: string | undefined, fallback: number) => {
    const n = Number(raw);
    return Number.isInteger(n) && n > 0 ? n : fallback;
};

/** Limits from env (`ASSISTANT_AI_PER_HOUR`, `ASSISTANT_AI_PER_DAY`, `ASSISTANT_AI_GLOBAL_PER_DAY`, `ASSISTANT_REQUESTS_PER_HOUR`). */
export function limitsFromEnv(env: Record<string, string | undefined>): QuotaLimits {
    return {
        aiPerHour: positiveInt(env.ASSISTANT_AI_PER_HOUR, DEFAULT_LIMITS.aiPerHour),
        aiPerDay: positiveInt(env.ASSISTANT_AI_PER_DAY, DEFAULT_LIMITS.aiPerDay),
        aiGlobalPerDay: positiveInt(env.ASSISTANT_AI_GLOBAL_PER_DAY, DEFAULT_LIMITS.aiGlobalPerDay),
        requestsPerHour: positiveInt(env.ASSISTANT_REQUESTS_PER_HOUR, DEFAULT_LIMITS.requestsPerHour),
    };
}

/** Counter keys bucketed by UTC hour/day, so old buckets simply stop being read. */
export function quotaKeys(visitor: string, now: Date) {
    const iso = now.toISOString();
    const day = iso.slice(0, 10).replace(/-/g, '');
    const hour = `${day}${iso.slice(11, 13)}`;
    return {
        requestsHour: `v/${visitor}/req/${hour}`,
        aiHour: `v/${visitor}/ai/${hour}`,
        aiDay: `v/${visitor}/ai/${day}`,
        aiGlobalDay: `global/ai/${day}`,
    };
}

export type QuotaDecision = 'ai' | 'catalogue' | 'block';

export interface QuotaCounts {
    /** Requests from this visitor this hour, including the current one. */
    requestsHour: number;
    aiHour: number;
    aiDay: number;
    aiGlobalDay: number;
}

export function decideQuota(counts: QuotaCounts, limits: QuotaLimits): QuotaDecision {
    if (counts.requestsHour > limits.requestsPerHour) return 'block';
    if (counts.aiHour >= limits.aiPerHour || counts.aiDay >= limits.aiPerDay || counts.aiGlobalDay >= limits.aiGlobalPerDay) {
        return 'catalogue';
    }
    return 'ai';
}

/** Counter storage: `get` reads, `increment` adds one and returns the new value. */
export interface CounterStore {
    get(key: string): Promise<number>;
    increment(key: string): Promise<number>;
}

/** In-process store: local dev, and the fallback when the persistent store is unreachable. */
export function createMemoryStore(maxKeys = 10_000): CounterStore {
    const counts = new Map<string, number>();
    return {
        async get(key) {
            return counts.get(key) ?? 0;
        },
        async increment(key) {
            if (counts.size >= maxKeys && !counts.has(key)) counts.clear();
            const next = (counts.get(key) ?? 0) + 1;
            counts.set(key, next);
            return next;
        },
    };
}

/**
 * Counts this request and decides how to answer it. When the answer goes to Claude, the AI counters
 * are bumped too (call `recordAiAnswer` after a successful call, so failures don't eat the quota).
 */
export async function checkQuota(store: CounterStore, visitor: string, limits: QuotaLimits, now = new Date()) {
    const keys = quotaKeys(visitor, now);
    const [requestsHour, aiHour, aiDay, aiGlobalDay] = await Promise.all([
        store.increment(keys.requestsHour),
        store.get(keys.aiHour),
        store.get(keys.aiDay),
        store.get(keys.aiGlobalDay),
    ]);
    return { decision: decideQuota({ requestsHour, aiHour, aiDay, aiGlobalDay }, limits), keys };
}

export async function recordAiAnswer(store: CounterStore, keys: ReturnType<typeof quotaKeys>) {
    await Promise.all([store.increment(keys.aiHour), store.increment(keys.aiDay), store.increment(keys.aiGlobalDay)]);
}
