'use strict';
/**
 * Serves uploaded audio and video straight from MEDIA_DIR, ahead of Next.js.
 *
 * Loaded with `node -r ./serve-media.cjs server.js` (Dockerfile). Next.js 16
 * drops Content-Length from route handler responses, so Payload's
 * /api/media/file/<name> goes out chunked. Cloudflare then caches the file
 * without a length and answers every Range request with the whole file as a
 * 200: Safari will not play .m4a/.mp4 at all and no browser can seek.
 * Here those files are sent with Content-Length and real 206 responses, which
 * Cloudflare caches and slices like any static file. Everything else goes to
 * Next.js untouched.
 *
 * Media are readable by anyone (src/payload/collections/Media.ts), so
 * skipping Payload's access check changes nothing.
 */
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const PREFIX = '/api/media/file/';
const TYPES = {
    mp3: 'audio/mpeg',
    m4a: 'audio/mp4',
    aac: 'audio/aac',
    wav: 'audio/wav',
    ogg: 'audio/ogg',
    oga: 'audio/ogg',
    mp4: 'video/mp4',
    webm: 'video/webm',
};
// Same as the /api/media/file rule in next.config.ts.
const CACHE_CONTROL = 'public, max-age=86400, s-maxage=2592000, stale-while-revalidate=86400';

/** Parses a single-range `bytes=` header. null: send the whole file; 'invalid': 416. */
function parseRange(header, size) {
    if (!header) return null;
    const match = /^bytes=(\d*)-(\d*)$/.exec(String(header).trim());
    if (!match || (match[1] === '' && match[2] === '')) return null; // multi-range or junk
    let start;
    let end;
    if (match[1] === '') {
        const suffix = Number(match[2]);
        if (suffix === 0) return 'invalid';
        start = Math.max(size - suffix, 0);
        end = size - 1;
    } else {
        start = Number(match[1]);
        end = match[2] === '' ? size - 1 : Math.min(Number(match[2]), size - 1);
    }
    if (start >= size || start > end) return 'invalid';
    return { start, end };
}

/** The file in MEDIA_DIR this request asks for, or null when it is not an audio/video upload. */
function mediaFileFor(req) {
    if (req.method !== 'GET' && req.method !== 'HEAD') return null;
    const pathname = (req.url || '').split('?')[0];
    if (!pathname.startsWith(PREFIX)) return null;
    let name;
    try {
        name = decodeURIComponent(pathname.slice(PREFIX.length));
    } catch {
        return null;
    }
    if (!name || name !== path.basename(name) || name.startsWith('.')) return null;
    const type = TYPES[path.extname(name).slice(1).toLowerCase()];
    if (!type) return null;
    return { file: path.join(path.resolve(process.env.MEDIA_DIR || 'media'), name), type };
}

/** Answers the request and returns true, or returns false to hand it to Next.js. */
function serveMedia(req, res) {
    const target = mediaFileFor(req);
    if (!target) return false;
    let stat;
    try {
        stat = fs.statSync(target.file);
    } catch {
        return false; // Payload answers missing files
    }
    if (!stat.isFile()) return false;

    const etag = `W/"${stat.size.toString(16)}-${Math.floor(stat.mtimeMs).toString(16)}"`;
    res.setHeader('Content-Type', target.type);
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Cache-Control', CACHE_CONTROL);
    res.setHeader('ETag', etag);
    res.setHeader('Last-Modified', stat.mtime.toUTCString());
    res.setHeader('X-Content-Type-Options', 'nosniff');

    if (req.headers['if-none-match'] === etag) {
        res.statusCode = 304;
        res.end();
        return true;
    }

    const ifRange = req.headers['if-range'];
    const range = ifRange && ifRange !== etag ? null : parseRange(req.headers.range, stat.size);
    if (range === 'invalid') {
        res.statusCode = 416;
        res.setHeader('Content-Range', `bytes */${stat.size}`);
        res.end();
        return true;
    }
    const { start, end } = range || { start: 0, end: stat.size - 1 };
    res.statusCode = range ? 206 : 200;
    if (range) res.setHeader('Content-Range', `bytes ${start}-${end}/${stat.size}`);
    res.setHeader('Content-Length', String(stat.size === 0 ? 0 : end - start + 1));
    if (req.method === 'HEAD' || stat.size === 0) {
        res.end();
        return true;
    }
    const stream = fs.createReadStream(target.file, { start, end });
    stream.on('error', () => res.destroy());
    res.on('close', () => stream.destroy());
    stream.pipe(res);
    return true;
}

// Next.js standalone starts with http.createServer(requestListener); put the
// media handler in front of that listener.
const originalCreateServer = http.createServer;
http.createServer = function createServer(...args) {
    const index = args.findIndex((arg) => typeof arg === 'function');
    if (index !== -1) {
        const next = args[index];
        args[index] = function mediaFirst(req, res) {
            if (!serveMedia(req, res)) return next.call(this, req, res);
        };
    }
    return originalCreateServer.apply(this, args);
};

module.exports = { parseRange, serveMedia };
