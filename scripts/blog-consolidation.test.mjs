import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { RETIRED_BLOG_POSTS } from '../src/lib/retired-links.ts';

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');

/** Every non-binary file under the given directories, as repo-relative paths. */
function sourceFiles(...directories) {
    const files = [];
    for (const directory of directories) {
        for (const relative of readdirSync(new URL(directory, root), { recursive: true })) {
            const path = `${directory}/${relative}`;
            if (!statSync(new URL(path, root)).isFile()) continue;
            if (/\.(png|jpe?g|webp|avif|gif|ico|glb|gltf|bin|hdr|mp4|webm|woff2?|ttf|otf|pdf)$/i.test(path)) continue;
            files.push(path);
        }
    }
    return files;
}

test('consolidated posts answer 301 (not 308) on the HTML and Markdown twin', () => {
    const config = read('next.config.ts');
    const block = config.match(/\/\/ Retired posts[\s\S]*?\n {12}\]\),/);
    assert.ok(block, 'next.config.ts still generates the retired-post redirects');
    assert.match(block[0], /statusCode: 301/, '301, so the history transfers');
    assert.doesNotMatch(block[0], /permanent: true/, 'permanent: true would emit 308');
    assert.match(block[0], /retiredBlogPosts/, 'the redirects read retired-blog-posts.json');
    assert.match(block[0], /`\/blog\/\$\{slug\}\.md`/, 'the Markdown twin redirects too');
});

test('no source-authored link points at a consolidated URL', () => {
    // Post bodies come from the CMS and are rewritten by rewriteRetiredHref; in the
    // repository nothing may link to a URL that now redirects.
    const offenders = [];
    for (const file of sourceFiles('src', 'content', 'public')) {
        if (file.endsWith('payload-types.ts')) continue;
        const text = read(file);
        for (const source of Object.keys(RETIRED_BLOG_POSTS)) {
            if (text.includes(source)) offenders.push(`${file}: ${source}`);
        }
    }
    assert.deepEqual(offenders, []);
});

test('the blog index and every listing read through the retired filter', () => {
    const cms = read('src/lib/cms.ts');
    assert.match(cms, /RETIRED_BLOG_POSTS/, 'cms.ts knows the consolidated slugs');
    assert.match(cms, /\.filter\(\(doc\) => !\(`\/blog\/\$\{doc\.slug\}` in RETIRED_BLOG_POSTS\)\)/, 'readBlogPosts drops them');
});
