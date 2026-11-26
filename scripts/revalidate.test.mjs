import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { revalidateSite, CMS_CACHE_TAG } from '../src/payload/revalidate.ts';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const read = (path) => readFileSync(join(ROOT, path), 'utf8');

/** Collects what the hook asked Next.js to expire. */
const recorder = (calls) => async () => ({
    revalidateTag: (tag, profile) => calls.push(['tag', tag, profile]),
    revalidatePath: (path, type) => calls.push(['path', path, type]),
});

const withEnv = async (values, run) => {
    const saved = Object.fromEntries(Object.keys(values).map((key) => [key, process.env[key]]));
    for (const [key, value] of Object.entries(values)) {
        if (value === undefined) delete process.env[key];
        else process.env[key] = value;
    }
    try {
        return await run();
    } finally {
        for (const [key, value] of Object.entries(saved)) {
            if (value === undefined) delete process.env[key];
            else process.env[key] = value;
        }
    }
};

const captureErrors = async (run) => {
    const logged = [];
    const original = console.error;
    console.error = (...args) => logged.push(args.map((value) => (value instanceof Error ? value.message : String(value))).join(' '));
    try {
        const result = await run();
        return { result, logged };
    } finally {
        console.error = original;
    }
};

test('a save expires the cms tag immediately and every page with it', async () => {
    const calls = [];
    const ok = await revalidateSite({ load: recorder(calls) });

    assert.equal(ok, true);
    assert.deepEqual(calls, [
        ['tag', CMS_CACHE_TAG, { expire: 0 }],
        ['path', '/', 'layout'],
    ]);
});

test('PAYLOAD_SKIP_REVALIDATE keeps scripts off the cache entirely', async () => {
    let loaded = false;
    const ok = await withEnv({ PAYLOAD_SKIP_REVALIDATE: '1' }, () =>
        revalidateSite({
            load: async () => {
                loaded = true;
                throw new Error('should not be loaded');
            },
        }),
    );

    assert.equal(ok, true);
    assert.equal(loaded, false);
});

test('a write outside a Next request retries through /api/revalidate', async () => {
    const requests = [];
    const server = createServer((request, response) => {
        requests.push({ method: request.method, url: request.url, secret: request.headers['x-revalidate-secret'] });
        response.writeHead(200, { 'content-type': 'application/json' });
        response.end('{"revalidated":true}');
    });
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    const { port } = server.address();

    try {
        const { result, logged } = await withEnv(
            { PAYLOAD_SECRET: 'test-secret', REVALIDATE_URL: `http://127.0.0.1:${port}` },
            () =>
                captureErrors(() =>
                    revalidateSite({
                        // What Next.js throws outside a request: no static generation store.
                        load: async () => {
                            throw new Error('Invariant: static generation store missing in revalidateTag(cms)');
                        },
                    }),
                ),
        );

        assert.equal(result, true, 'the HTTP fallback is what makes the save visible');
        assert.deepEqual(requests, [{ method: 'POST', url: '/api/revalidate', secret: 'test-secret' }]);
        assert.match(logged.join('\n'), /static generation store missing/);
    } finally {
        await new Promise((resolve) => server.close(resolve));
    }
});

test('without a secret the failure is reported, not swallowed', async () => {
    const { result, logged } = await withEnv({ PAYLOAD_SECRET: undefined, REVALIDATE_URL: undefined }, () =>
        captureErrors(() =>
            revalidateSite({
                load: async () => {
                    throw new Error('Invariant: static generation store missing');
                },
            }),
        ),
    );

    assert.equal(result, false);
    assert.match(logged.join('\n'), /PAYLOAD_SECRET/);
});

test('the endpoint itself never calls itself', async () => {
    const calls = [];
    const ok = await revalidateSite({ load: recorder(calls), httpFallback: false });

    assert.equal(ok, true);
    assert.equal(calls.length, 2);
});

test('the data cache cannot keep a saved post invisible for an hour', () => {
    const cms = read('src/lib/cms.ts');

    assert.match(cms, /export const CMS_CACHE_SECONDS = (\d+);/);
    const seconds = Number(cms.match(/CMS_CACHE_SECONDS = (\d+);/)[1]);
    assert.ok(seconds > 0 && seconds <= 60, `CMS_CACHE_SECONDS is ${seconds}, the acceptance criterion is a minute`);
    assert.match(cms, /unstable_cache\(read, \['cms', key\], \{ tags: \[CMS_CACHE_TAG\], revalidate: CMS_CACHE_SECONDS \}\)/);
});

test('every content collection still wires the revalidation hooks', () => {
    // `users` is an auth collection; nothing on the site caches its reads.
    const unwatched = new Set(['users']);

    for (const path of ['src/payload/collections/content.ts', 'src/payload/collections/taxonomies.ts']) {
        const source = read(path);
        assert.match(source, /import \{ revalidateHooks \} from '\.\.\/revalidate';/, `${path} imports the hooks`);

        const blocks = source.split(/(?=^\s{4}slug: ')/m).slice(1);
        assert.ok(blocks.length > 0, `${path} declares collections`);
        for (const block of blocks) {
            const slug = block.match(/^\s{4}slug: '([^']+)'/)[1];
            if (unwatched.has(slug)) continue;
            assert.match(block, /hooks: revalidateHooks,/, `${path}: ${slug} must expire the cache on save`);
        }
    }
    assert.match(read('src/payload/collections/Media.ts'), /\.\.\.revalidateHooks,/);
});

test('the hook logs a failure instead of swallowing it', () => {
    const source = read('src/payload/revalidate.ts');

    assert.doesNotMatch(source, /catch\s*(\([^)]*\))?\s*\{\s*\}/, 'no empty catch');
    assert.match(source, /console\.error\('\[cms\] revalidateTag\/revalidatePath failed/);
    assert.match(source, /revalidateTag\(CMS_CACHE_TAG, \{ expire: 0 \}\)/);
});
