/**
 * One-way import of the Sanity dataset into Payload. Safe to re-run: every
 * document and file remembers its Sanity id (`sanityId` / `sanityAssetId`) and
 * is updated in place instead of duplicated, so it can run once for a dry
 * rehearsal and again right before the DNS switch.
 *
 *   npm run payload -- run scripts/import-from-sanity.ts            import + verify
 *   npm run payload -- run scripts/import-from-sanity.ts --verify   verify only
 *
 * Env: DATABASE_URL, PAYLOAD_SECRET, MEDIA_DIR (as for the app). SANITY_TOKEN is
 * only needed once the Sanity dataset is made private.
 *
 * Verification converts every stored rich-text field back to Portable Text and
 * compares it with the Sanity original (text, marks, links, headings, lists,
 * images), and checks slugs and simple fields. Any difference fails the run.
 */
import config from '@payload-config';
import { getPayload, type Payload } from 'payload';
import { lexicalToPortableText, plainTextToPortableText, portableTextToLexical, type LexicalState } from '../src/lib/richtext/lexical';
import { portableTextToPlainText, type PortableTextBlock } from '../src/lib/markdown/portable-text';
import { detectTechnologies } from '../src/payload/technology-detection';

process.env.PAYLOAD_SKIP_REVALIDATE = '1';

const PROJECT = '8mtbrwl1';
const DATASET = 'production';
const API = `https://${PROJECT}.api.sanity.io/v2023-05-03/data/query/${DATASET}`;
const VERIFY_ONLY = process.argv.includes('--verify');

type SanityDoc = Record<string, any> & { _id: string; _type: string; _updatedAt: string; _createdAt: string };

async function groq<T>(query: string): Promise<T> {
    const url = `${API}?query=${encodeURIComponent(query)}`;
    const headers: Record<string, string> = {};
    if (process.env.SANITY_TOKEN) headers.Authorization = `Bearer ${process.env.SANITY_TOKEN}`;
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`Sanity ${response.status}: ${await response.text()}`);
    return ((await response.json()) as { result: T }).result;
}

const published = (type: string) => `*[_type == "${type}" && !(_id in path("drafts.**"))] | order(_createdAt asc)`;

// ------------------------------------------------------------------ media

interface SanityAsset {
    _id: string;
    url: string;
    originalFilename?: string;
    mimeType?: string;
}

interface ImageUse {
    alt?: string;
    caption?: string;
    hotspot?: { x?: number; y?: number };
}

class MediaImporter {
    private ids = new Map<string, number | string>();
    private assets = new Map<string, SanityAsset>();
    created = 0;
    reused = 0;

    constructor(private payload: Payload) {}

    async load() {
        const assets = await groq<SanityAsset[]>('*[_type in ["sanity.imageAsset", "sanity.fileAsset"]]{ _id, url, originalFilename, mimeType }');
        for (const asset of assets) this.assets.set(asset._id, asset);
        const existing = await this.payload.find({ collection: 'media', limit: 0, depth: 0, select: { sanityAssetId: true } });
        for (const doc of existing.docs) if (doc.sanityAssetId) this.ids.set(String(doc.sanityAssetId), doc.id);
    }

    idFor(ref: string | undefined): number | string | null {
        return ref ? (this.ids.get(ref) ?? null) : null;
    }

    /** Payload media id for a Sanity image/file value; uploads the file the first time. */
    async import(value: { asset?: { _ref?: string } } | null | undefined, use: ImageUse = {}): Promise<number | string | null> {
        const ref = value?.asset?._ref;
        if (!ref) return null;
        const known = this.ids.get(ref);
        if (known != null) {
            this.reused += 1;
            if (!VERIFY_ONLY && (use.alt || use.caption)) {
                // Fill alt/caption the first time a use provides them.
                const doc = await this.payload.findByID({ collection: 'media', id: known, depth: 0 });
                const patch: Record<string, string> = {};
                if (use.alt && !doc.alt) patch.alt = use.alt;
                if (use.caption && !doc.caption) patch.caption = use.caption;
                if (Object.keys(patch).length) await this.payload.update({ collection: 'media', id: known, data: patch, depth: 0 });
            }
            return known;
        }
        if (VERIFY_ONLY) return null;
        const asset = this.assets.get(ref);
        if (!asset) {
            console.warn(`  ! missing asset ${ref}`);
            return null;
        }
        const response = await fetch(asset.url);
        if (!response.ok) throw new Error(`Download ${asset.url}: ${response.status}`);
        const data = Buffer.from(await response.arrayBuffer());
        const name = asset.originalFilename || asset.url.split('/').pop()!;
        const doc = await this.payload.create({
            collection: 'media',
            data: {
                sanityAssetId: ref,
                ...(use.alt ? { alt: use.alt } : {}),
                ...(use.caption ? { caption: use.caption } : {}),
                ...(typeof use.hotspot?.x === 'number' ? { focalX: Math.round(use.hotspot.x * 100), focalY: Math.round((use.hotspot.y ?? 0.5) * 100) } : {}),
            },
            file: { data, mimetype: asset.mimeType || response.headers.get('content-type') || 'application/octet-stream', name, size: data.length },
            depth: 0,
        });
        this.ids.set(ref, doc.id);
        this.created += 1;
        return doc.id;
    }

    /** Uploads every image inside a Portable Text field before it is converted. */
    async importBlocks(blocks: PortableTextBlock[] | string | null | undefined) {
        if (!Array.isArray(blocks)) return;
        for (const block of blocks) {
            if (block._type === 'image') await this.import(block as any, { alt: block.alt as string, caption: block.caption as string, hotspot: block.hotspot as any });
        }
    }
}

// ------------------------------------------------------------------ upsert

type Collection = 'authors' | 'blog-categories' | 'service-categories' | 'posts' | 'knowledge-base' | 'portfolio-projects';

async function upsert(payload: Payload, collection: Collection, sanityId: string, data: Record<string, unknown>, drafts: boolean) {
    const existing = await payload.find({ collection, where: { sanityId: { equals: sanityId } }, limit: 1, depth: 0, draft: false });
    const body = { ...data, sanityId, ...(drafts ? { _status: 'published' } : {}) };
    if (existing.docs[0]) {
        return payload.update({ collection, id: existing.docs[0].id, data: body as any, depth: 0, draft: false });
    }
    return payload.create({ collection, data: body as any, depth: 0, draft: false });
}

/** Keeps Sanity's dates: sitemap lastmod and schema.org dateModified must not jump to the import day. */
async function keepDates(payload: Payload, table: string, id: number | string, doc: SanityDoc) {
    const db = payload.db as unknown as { pool: { query: (sql: string, params: unknown[]) => Promise<unknown> } };
    await db.pool.query(`update "${table}" set created_at = $1, updated_at = $2 where id = $3`, [doc._createdAt, doc._updatedAt, id]);
}

const refId = (map: Map<string, number | string>, ref: { _ref?: string } | null | undefined) => (ref?._ref ? (map.get(ref._ref) ?? null) : null);
const refIds = (map: Map<string, number | string>, refs: Array<{ _ref?: string }> | null | undefined) =>
    (refs ?? []).map((ref) => refId(map, ref)).filter((id): id is number | string => id != null);

// ------------------------------------------------------------------ verification

interface NormalSpan {
    text: string;
    marks: string;
}

/** Portable Text reduced to what renders: block kind, text runs with decorators and link targets, images. */
function normalize(blocks: PortableTextBlock[] | string | null | undefined, mediaId: (ref?: string) => unknown): unknown[] {
    const list = typeof blocks === 'string' ? plainTextToPortableText(blocks) : (blocks ?? []);
    return list
        .map((block) => {
            if (block._type === 'image') {
                const asset = block.asset as { _ref?: string; id?: unknown } | undefined;
                const id = asset?._ref ? mediaId(asset._ref) : asset?.id;
                return id == null ? null : { image: String(id) };
            }
            if (block._type !== 'block') return { unsupported: block._type };
            const defs = new Map((block.markDefs ?? []).map((def) => [def._key, def]));
            const spans: NormalSpan[] = [];
            for (const child of block.children ?? []) {
                if (child._type !== 'span') continue;
                const marks = ((child as { marks?: string[] }).marks ?? [])
                    .map((mark) => {
                        const def = defs.get(mark);
                        if (def) return def._type === 'link' && def.href ? `link:${def.href}${def.blank ? ':blank' : ''}` : '';
                        return ['strong', 'em', 'underline', 'code', 'strike-through'].includes(mark) ? mark : '';
                    })
                    .filter(Boolean)
                    .sort()
                    .join('|');
                // Line breaks are compared unformatted: which side of a "\n" carries a
                // mark does not change the output.
                for (const [index, part] of String((child as { text?: string }).text ?? '').split('\n').entries()) {
                    for (const [text, runMarks] of [...(index ? [['\n', '']] : []), [part, marks]] as [string, string][]) {
                        const last = spans[spans.length - 1];
                        if (!text) continue;
                        if (last && last.marks === runMarks) last.text += text;
                        else spans.push({ text, marks: runMarks });
                    }
                }
            }
            const style = block.style ?? 'normal';
            return {
                style: style === 'h1' ? 'h2' : /^h[56]$/.test(style) ? 'h4' : block.listItem ? 'normal' : style,
                list: block.listItem ? `${block.listItem}:${block.level ?? 1}` : '',
                spans,
            };
        })
        .filter(Boolean);
}

// ------------------------------------------------------------------ main

async function main() {
    const payload = await getPayload({ config });
    const media = new MediaImporter(payload);
    await media.load();
    const problems: string[] = [];

    const [serviceCategories, blogCategories, authors, posts, knowledgeBase, projects] = await Promise.all([
        groq<SanityDoc[]>(published('serviceCategory')),
        groq<SanityDoc[]>(published('blogCategory')),
        groq<SanityDoc[]>(published('author')),
        groq<SanityDoc[]>(published('blogPost')),
        groq<SanityDoc[]>(published('knowledgeBase')),
        groq<SanityDoc[]>(published('portfolioProject')),
    ]);
    console.log(
        `Sanity: ${posts.length} posts, ${projects.length} projects, ${knowledgeBase.length} knowledge-base entries, ` +
            `${authors.length} authors, ${blogCategories.length} blog categories, ${serviceCategories.length} service categories`,
    );

    const ids = new Map<string, number | string>();
    const toLexical = (blocks: PortableTextBlock[] | string | null | undefined) =>
        portableTextToLexical(blocks, { resolveImage: (block) => media.idFor((block.asset as { _ref?: string } | undefined)?._ref) });

    async function importAll(
        label: string,
        collection: Collection,
        table: string,
        docs: SanityDoc[],
        drafts: boolean,
        build: (doc: SanityDoc) => Promise<Record<string, unknown>>,
    ) {
        if (VERIFY_ONLY) {
            const existing = await payload.find({ collection, limit: 0, depth: 0, draft: false, select: { sanityId: true } });
            for (const doc of existing.docs) if (doc.sanityId) ids.set(String(doc.sanityId), doc.id);
            return;
        }
        for (const doc of docs) {
            try {
                const saved = await upsert(payload, collection, doc._id, await build(doc), drafts);
                ids.set(doc._id, saved.id);
                await keepDates(payload, table, saved.id, doc);
            } catch (error) {
                problems.push(`${label} ${doc.slug?.current ?? doc._id}: ${(error as Error).message}`);
            }
        }
        console.log(`  ${label}: ${docs.length}`);
    }

    console.log(VERIFY_ONLY ? 'Verifying only.' : 'Importing…');

    await importAll('service categories', 'service-categories', 'service_categories', serviceCategories, false, async (doc) => ({
        title: doc.title,
        slug: doc.slug?.current,
        description: doc.description ?? null,
    }));

    await importAll('blog categories', 'blog-categories', 'blog_categories', blogCategories, false, async (doc) => ({
        title: doc.title,
        slug: doc.slug?.current,
        description: doc.description ?? null,
        color: doc.color ?? null,
    }));

    await importAll('authors', 'authors', 'authors', authors, false, async (doc) => ({
        name: doc.name,
        slug: doc.slug?.current,
        role: doc.role ?? null,
        image: await media.import(doc.image),
        bio: toLexical(doc.bio),
        socialLinks: {
            linkedin: doc.socialLinks?.linkedin ?? null,
            twitter: doc.socialLinks?.twitter ?? null,
            instagram: doc.socialLinks?.instagram ?? null,
        },
    }));

    await importAll('posts', 'posts', 'posts', posts, true, async (doc) => {
        await media.importBlocks(doc.content);
        return {
            title: doc.title,
            slug: doc.slug?.current,
            publishedAt: doc.publishedAt,
            author: refId(ids, doc.author),
            categories: refIds(ids, doc.categories),
            featured: Boolean(doc.featured),
            mainImage: await media.import(doc.mainImage, { alt: doc.mainImage?.alt, hotspot: doc.mainImage?.hotspot }),
            audioFile: await media.import(doc.audioFile),
            excerpt: doc.excerpt ?? null,
            content: toLexical(doc.content),
            estimatedReadingTime: doc.estimatedReadingTime ?? null,
            seoTitle: doc.seoTitle ?? null,
            seoDescription: doc.seoDescription ?? null,
        };
    });

    await importAll('knowledge base', 'knowledge-base', 'knowledge_base', knowledgeBase, true, async (doc) => {
        await media.importBlocks(doc.content);
        return {
            title: doc.title,
            slug: doc.slug?.current,
            letter: doc.letter,
            publishedAt: doc.publishedAt,
            shortDescription: doc.shortDescription,
            content: toLexical(doc.content),
            tags: doc.tags ?? [],
            seoTitle: doc.seoTitle ?? null,
            seoDescription: doc.seoDescription ?? null,
        };
    });

    await importAll('portfolio', 'portfolio-projects', 'portfolio_projects', projects, true, async (doc) => {
        await media.importBlocks(doc.description);
        const gallery: Array<number | string> = [];
        for (const image of doc.galleryImages ?? []) {
            // Sanity kept gallery entries with no uploaded file; they never rendered.
            const id = await media.import(image, { alt: image.alt, caption: image.caption, hotspot: image.hotspot });
            if (id != null) gallery.push(id);
        }
        return {
            title: doc.title,
            slug: doc.slug?.current,
            publishedAt: doc.publishedAt ?? null,
            client: doc.client,
            categories: refIds(ids, doc.categories),
            projectUrl: doc.projectUrl ?? null,
            mainImage: await media.import(doc.mainImage, { alt: doc.mainImage?.alt, hotspot: doc.mainImage?.hotspot }),
            galleryImages: gallery,
            scopeOfWork: doc.scopeOfWork ?? [],
            description: toLexical(doc.description),
        };
    });

    if (!VERIFY_ONLY) console.log(`  media: ${media.created} uploaded, ${media.reused} reused`);

    // Technologies named in the descriptions ("Technologia: WordPress / WooCommerce").
    // Added to whatever editors attached already, never removed.
    if (!VERIFY_ONLY) {
        const technologyIds = new Map<string, number | string>();
        let attached = 0;
        for (const project of projects) {
            const found = detectTechnologies(
                typeof project.description === 'string' ? project.description : portableTextToPlainText(project.description, 100_000),
                ...(project.scopeOfWork ?? []),
            );
            const id = ids.get(project._id);
            if (!found.length || id == null) continue;
            const wanted: Array<number | string> = [];
            for (const technology of found) {
                if (!technologyIds.has(technology.slug)) {
                    const existing = await payload.find({ collection: 'technologies', where: { slug: { equals: technology.slug } }, limit: 1, depth: 0 });
                    const doc =
                        existing.docs[0] ??
                        (await payload.create({
                            collection: 'technologies',
                            data: { title: technology.title, slug: technology.slug, group: technology.group, website: technology.website },
                            depth: 0,
                        }));
                    technologyIds.set(technology.slug, doc.id);
                }
                wanted.push(technologyIds.get(technology.slug)!);
            }
            const stored = (await payload.findByID({ collection: 'portfolio-projects', id, depth: 0, draft: false })) as { technologies?: Array<number | string> | null };
            const current = stored.technologies ?? [];
            const merged = [...new Set([...current, ...wanted])];
            if (merged.length === current.length) continue;
            await payload.update({ collection: 'portfolio-projects', id, data: { technologies: merged } as any, depth: 0, draft: false });
            await keepDates(payload, 'portfolio_projects', id, project);
            attached += 1;
        }
        console.log(`  technologies: ${technologyIds.size} found, ${attached} project(s) updated`);
    }

    // ---------------------------------------------------------- verify
    console.log('Verifying…');
    const mediaId = (ref?: string) => media.idFor(ref);
    const asPortableText = (value: unknown) => lexicalToPortableText(value as LexicalState);
    let checked = 0;

    async function verify(collection: Collection, docs: SanityDoc[], richFields: Record<string, string>, fields: string[]) {
        for (const doc of docs) {
            const id = ids.get(doc._id);
            const label = `${collection}/${doc.slug?.current ?? doc._id}`;
            if (id == null) {
                problems.push(`${label}: not imported`);
                continue;
            }
            const stored = (await payload.findByID({ collection, id, depth: 1, draft: false })) as Record<string, any>;
            if (stored.slug !== doc.slug?.current) problems.push(`${label}: slug ${stored.slug}`);
            if ('_status' in stored && stored._status !== 'published') problems.push(`${label}: not published`);
            for (const field of fields) {
                // Missing, null, false-y defaults and [] are the same "empty".
                const empty = (value: unknown) => value == null || value === '' || (Array.isArray(value) && value.length === 0);
                const want = doc[field];
                const got = stored[field];
                if (empty(want) && (empty(got) || got === false)) continue;
                if (typeof want === 'string' && /^\d{4}-\d\d-\d\dT/.test(want) && Date.parse(want) === Date.parse(got)) continue;
                if (JSON.stringify(want) !== JSON.stringify(got)) {
                    problems.push(`${label}: ${field} ${JSON.stringify(want)?.slice(0, 80)} ≠ ${JSON.stringify(got)?.slice(0, 80)}`);
                }
            }
            for (const [sanityField, payloadField] of Object.entries(richFields)) {
                const want = JSON.stringify(normalize(doc[sanityField], mediaId));
                const got = JSON.stringify(normalize(asPortableText(stored[payloadField]), mediaId));
                if (want !== got) {
                    const a = normalize(doc[sanityField], mediaId);
                    const b = normalize(asPortableText(stored[payloadField]), mediaId);
                    const at = a.findIndex((block, index) => JSON.stringify(block) !== JSON.stringify(b[index]));
                    problems.push(`${label}: ${sanityField} differs at block ${at}: ${JSON.stringify(a[at])?.slice(0, 200)} ≠ ${JSON.stringify(b[at])?.slice(0, 200)}`);
                }
            }
            if (Date.parse(stored.updatedAt) !== Date.parse(doc._updatedAt)) problems.push(`${label}: updatedAt ${stored.updatedAt} ≠ ${doc._updatedAt}`);
            checked += 1;
        }
    }

    await verify('posts', posts, { content: 'content' }, ['title', 'publishedAt', 'excerpt', 'featured', 'estimatedReadingTime', 'seoTitle', 'seoDescription']);
    await verify('knowledge-base', knowledgeBase, { content: 'content' }, ['title', 'letter', 'publishedAt', 'shortDescription', 'tags', 'seoTitle', 'seoDescription']);
    await verify('portfolio-projects', projects, { description: 'description' }, ['title', 'client', 'publishedAt', 'projectUrl', 'scopeOfWork']);
    await verify('authors', authors, { bio: 'bio' }, ['name', 'role']);
    await verify('blog-categories', blogCategories, {}, ['title', 'description', 'color']);
    await verify('service-categories', serviceCategories, {}, ['title', 'description']);

    // Images that rendered in Sanity must have a file in Payload.
    for (const project of projects) {
        const id = ids.get(project._id);
        if (id == null) continue;
        const stored = (await payload.findByID({ collection: 'portfolio-projects', id, depth: 0, draft: false })) as Record<string, any>;
        const want = (project.galleryImages ?? []).filter((image: any) => image?.asset?._ref).length;
        if ((stored.galleryImages ?? []).length !== want) problems.push(`portfolio/${project.slug?.current}: gallery ${stored.galleryImages?.length} ≠ ${want}`);
        if (project.mainImage?.asset?._ref && !stored.mainImage) problems.push(`portfolio/${project.slug?.current}: main image missing`);
    }

    console.log(`Checked ${checked} documents.`);
    if (problems.length) {
        console.error(`\n${problems.length} problem(s):\n- ${problems.join('\n- ')}`);
        process.exit(1);
    }
    console.log('All content matches Sanity.');
    process.exit(0);
}

await main();
