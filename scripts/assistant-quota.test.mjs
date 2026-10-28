import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
    DEFAULT_LIMITS, limitsFromEnv, quotaKeys, decideQuota, createMemoryStore, checkQuota, recordAiAnswer,
} from '../src/lib/assistant-quota.ts';

const limits = { aiPerHour: 2, aiPerDay: 3, aiGlobalPerDay: 5, requestsPerHour: 4 };
const at = (iso) => new Date(iso);

test('limitsFromEnv reads positive integers and falls back to defaults', () => {
    assert.deepEqual(limitsFromEnv({}), DEFAULT_LIMITS);
    const l = limitsFromEnv({ ASSISTANT_AI_PER_HOUR: '9', ASSISTANT_AI_PER_DAY: '-1', ASSISTANT_AI_GLOBAL_PER_DAY: 'abc', ASSISTANT_REQUESTS_PER_HOUR: '2.5' });
    assert.equal(l.aiPerHour, 9);
    assert.equal(l.aiPerDay, DEFAULT_LIMITS.aiPerDay);
    assert.equal(l.aiGlobalPerDay, DEFAULT_LIMITS.aiGlobalPerDay);
    assert.equal(l.requestsPerHour, DEFAULT_LIMITS.requestsPerHour);
});

test('quotaKeys bucket by UTC hour and day', () => {
    const k = quotaKeys('abc', at('2026-10-28T13:45:00Z'));
    assert.equal(k.requestsHour, 'v/abc/req/2026102813');
    assert.equal(k.aiHour, 'v/abc/ai/2026102813');
    assert.equal(k.aiDay, 'v/abc/ai/20261028');
    assert.equal(k.aiGlobalDay, 'global/ai/20261028');
});

test('decideQuota: ai within limits, catalogue over any AI limit, block on floods', () => {
    const base = { requestsHour: 1, aiHour: 0, aiDay: 0, aiGlobalDay: 0 };
    assert.equal(decideQuota(base, limits), 'ai');
    assert.equal(decideQuota({ ...base, aiHour: 2 }, limits), 'catalogue');
    assert.equal(decideQuota({ ...base, aiDay: 3 }, limits), 'catalogue');
    assert.equal(decideQuota({ ...base, aiGlobalDay: 5 }, limits), 'catalogue');
    assert.equal(decideQuota({ ...base, requestsHour: 4 }, limits), 'ai');
    assert.equal(decideQuota({ ...base, requestsHour: 5 }, limits), 'block');
});

test('checkQuota + recordAiAnswer: a visitor moves from ai to catalogue to block', async () => {
    const store = createMemoryStore();
    const now = at('2026-10-28T10:00:00Z');
    const seen = [];
    for (let i = 0; i < 6; i++) {
        const { decision, keys } = await checkQuota(store, 'v1', limits, now);
        seen.push(decision);
        if (decision === 'ai') await recordAiAnswer(store, keys);
    }
    assert.deepEqual(seen, ['ai', 'ai', 'catalogue', 'catalogue', 'block', 'block']);
});

test('failed AI calls do not consume quota, and the next hour resets the hourly limit', async () => {
    const store = createMemoryStore();
    const h1 = at('2026-10-28T10:00:00Z');
    for (let i = 0; i < 3; i++) assert.equal((await checkQuota(store, 'v2', limits, h1)).decision, 'ai');
    const h2 = at('2026-10-28T11:00:00Z');
    let r = await checkQuota(store, 'v2', limits, h2);
    await recordAiAnswer(store, r.keys);
    r = await checkQuota(store, 'v2', limits, h2);
    await recordAiAnswer(store, r.keys);
    assert.equal((await checkQuota(store, 'v2', limits, h2)).decision, 'catalogue');
});

test('the site-wide daily limit applies across visitors', async () => {
    const store = createMemoryStore();
    const now = at('2026-10-28T10:00:00Z');
    for (let v = 0; v < 5; v++) {
        const { decision, keys } = await checkQuota(store, `visitor-${v}`, limits, now);
        assert.equal(decision, 'ai');
        await recordAiAnswer(store, keys);
    }
    assert.equal((await checkQuota(store, 'visitor-new', limits, now)).decision, 'catalogue');
});
