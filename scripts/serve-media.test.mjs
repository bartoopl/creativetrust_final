import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createRequire } from 'node:module';
import http from 'node:http';

const require = createRequire(import.meta.url);
const { parseRange } = require('./serve-media.cjs'); // also wraps http.createServer

const BYTES = Buffer.from('0123456789');
let dir;
let server;
let base;

before(async () => {
    dir = mkdtempSync(join(tmpdir(), 'media-'));
    writeFileSync(join(dir, 'odcinek 1.m4a'), BYTES);
    writeFileSync(join(dir, 'cover.webp'), BYTES);
    process.env.MEDIA_DIR = dir;
    server = http.createServer((req, res) => res.end('next'));
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    base = `http://127.0.0.1:${server.address().port}`;
});

after(() => {
    server.close();
    rmSync(dir, { recursive: true, force: true });
});

const get = (path, headers = {}) => fetch(base + path, { headers });

test('parseRange covers open, suffix, clamped and unsatisfiable ranges', () => {
    assert.deepEqual(parseRange('bytes=0-1', 10), { start: 0, end: 1 });
    assert.deepEqual(parseRange('bytes=4-', 10), { start: 4, end: 9 });
    assert.deepEqual(parseRange('bytes=-3', 10), { start: 7, end: 9 });
    assert.deepEqual(parseRange('bytes=8-99', 10), { start: 8, end: 9 });
    assert.equal(parseRange('bytes=10-', 10), 'invalid');
    assert.equal(parseRange('bytes=0-1,4-5', 10), null);
    assert.equal(parseRange(undefined, 10), null);
});

test('audio upload: whole file with Content-Length', async () => {
    const res = await get('/api/media/file/odcinek%201.m4a');
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('content-length'), '10');
    assert.equal(res.headers.get('content-type'), 'audio/mp4');
    assert.equal(res.headers.get('accept-ranges'), 'bytes');
    assert.equal(await res.text(), '0123456789');
});

test('audio upload: Range gets a 206 with Content-Range', async () => {
    const res = await get('/api/media/file/odcinek%201.m4a?v=1', { Range: 'bytes=2-4' });
    assert.equal(res.status, 206);
    assert.equal(res.headers.get('content-range'), 'bytes 2-4/10');
    assert.equal(res.headers.get('content-length'), '3');
    assert.equal(await res.text(), '234');
});

test('audio upload: unsatisfiable Range gets a 416', async () => {
    const res = await get('/api/media/file/odcinek%201.m4a', { Range: 'bytes=50-' });
    assert.equal(res.status, 416);
    assert.equal(res.headers.get('content-range'), 'bytes */10');
});

test('images, missing files, traversal and other routes go to Next.js', async () => {
    for (const path of [
        '/api/media/file/cover.webp',
        '/api/media/file/brak.mp3',
        '/api/media/file/..%2Fsecret.mp3',
        '/blog/wpis',
    ]) {
        assert.equal(await (await get(path)).text(), 'next', path);
    }
});
