import { mcpPlugin } from '@payloadcms/plugin-mcp';
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical';
import type { PayloadRequest } from 'payload';
import { z } from 'zod';
import { editorFeatures } from './editor';

/**
 * MCP server for AI agents at POST /api/mcp.
 *
 * Auth: an API key created in the admin under MCP → API Keys, sent as
 * `Authorization: Bearer <key>`. A key acts as the user who created it, and each
 * key has its own checkboxes for which of the tools below it may call.
 *
 * Nothing here can delete content.
 */

/** The rich text field each Markdown-writable collection stores its body in. */
const richTextFieldByCollection = {
    posts: 'content',
    'knowledge-base': 'content',
    'portfolio-projects': 'description',
} as const;

type MarkdownCollection = keyof typeof richTextFieldByCollection;

const publicPathByCollection: Record<MarkdownCollection, string> = {
    posts: '/blog/',
    'knowledge-base': '/baza-wiedzy/',
    'portfolio-projects': '/portfolio/',
};

const text = (value: string) => ({ content: [{ type: 'text' as const, text: value }] });

async function saveMarkdownContent(args: Record<string, unknown>, req: PayloadRequest) {
    const collection = args.collection as MarkdownCollection;
    const id = args.id as number | string | undefined;
    const markdown = args.markdown as string;
    const publish = Boolean(args.publish);
    const richTextField = richTextFieldByCollection[collection];

    // The body and the status come from the dedicated arguments, never from `fields`.
    const { [richTextField]: _body, _status: _ignoredStatus, id: _ignoredId, ...fields } =
        (args.fields as Record<string, unknown> | undefined) ?? {};

    const editorConfig = await editorConfigFactory.fromFeatures({
        config: req.payload.config,
        features: editorFeatures,
    });
    const body = convertMarkdownToLexical({ editorConfig, markdown });

    const data = { ...fields, [richTextField]: body, _status: publish ? 'published' : 'draft' };
    const common = {
        collection,
        data: data as never,
        draft: !publish,
        overrideAccess: false,
        req,
        user: req.user,
        depth: 0,
    } as const;

    try {
        const doc = id ? await req.payload.update({ ...common, id }) : await req.payload.create(common);
        const { slug, _status } = doc as { slug?: string; _status?: string };
        const url = slug ? `${process.env.NEXT_PUBLIC_SITE_URL || ''}${publicPathByCollection[collection]}${slug}` : null;
        return text(
            JSON.stringify(
                { ok: true, action: id ? 'updated' : 'created', collection, id: doc.id, slug, status: _status, url },
                null,
                2,
            ),
        );
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        const details = (error as { data?: unknown })?.data;
        return text(`Error saving ${collection}: ${message}${details ? `\n${JSON.stringify(details)}` : ''}`);
    }
}

const readOnly = { find: true, create: false, update: false, delete: false };
const writable = { find: true, create: true, update: true, delete: false };

export const payloadMcp = mcpPlugin({
    collections: {
        posts: {
            description:
                'Blog posts at /blog/<slug>. Required: title, slug, publishedAt, author (authors id). To write the body in Markdown use the saveMarkdownContent tool instead of passing Lexical JSON in `content`.',
            enabled: writable,
        },
        'knowledge-base': {
            description:
                'Knowledge base (glossary) entries at /baza-wiedzy/<slug>. Required: title, slug, letter (a–z, first letter of the title), publishedAt, shortDescription. Write the body with saveMarkdownContent.',
            enabled: writable,
        },
        'portfolio-projects': {
            description:
                'Portfolio case studies at /portfolio/<slug>. Required: title, slug, client, categories (service-categories ids), mainImage (media id), scopeOfWork (list of strings), description (rich text — use saveMarkdownContent).',
            enabled: writable,
        },
        authors: { description: 'Blog authors. Look up the author id for a post.', enabled: readOnly },
        'blog-categories': { description: 'Blog categories. Look up category ids for a post.', enabled: readOnly },
        'service-categories': { description: 'Service categories used by portfolio projects.', enabled: readOnly },
        technologies: { description: 'Technologies used by portfolio projects.', enabled: readOnly },
        media: {
            description: 'Uploaded images and files. Find an existing image id for mainImage. Uploading is not available over MCP.',
            enabled: readOnly,
        },
    },
    mcp: {
        serverOptions: {
            serverInfo: { name: 'CreativeTrust CMS', version: '1.0.0' },
            instructions: [
                'CMS of creativetrust.pl (Payload). Content is in Polish unless asked otherwise.',
                'To write or edit an article, use saveMarkdownContent: it converts Markdown to the rich text format and saves the document.',
                'Supported Markdown: paragraphs, ## / ### / #### headings (no #), bold, italic, inline code, links, bullet and numbered lists, blockquotes.',
                'Look up ids first with the find tools (authors, blog-categories, service-categories, media).',
                'By default documents are saved as drafts (publish: false) so an editor can review them in the admin; set publish: true only when asked to publish.',
                'Nothing can be deleted through this server.',
            ].join('\n'),
        },
        tools: [
            {
                name: 'saveMarkdownContent',
                description:
                    'Create or update a blog post, knowledge base entry or portfolio project with its body written in Markdown. Saves a draft unless publish is true. Returns id, slug, status and public URL.',
                parameters: {
                    collection: z.enum(['posts', 'knowledge-base', 'portfolio-projects']).describe('Where to save'),
                    id: z
                        .union([z.number(), z.string()])
                        .optional()
                        .describe('Existing document id to update. Omit to create a new document.'),
                    markdown: z.string().min(1).describe('The body in Markdown (h2–h4 headings, no h1 — the title is separate).'),
                    fields: z
                        .record(z.string(), z.unknown())
                        .optional()
                        .describe(
                            'Other fields, e.g. for posts: {"title","slug","publishedAt","author":<id>,"categories":[<id>],"excerpt","seoTitle","seoDescription","mainImage":<media id>}. When updating, only the fields to change.',
                        ),
                    publish: z
                        .boolean()
                        .optional()
                        .default(false)
                        .describe('true publishes on the live site immediately; false (default) saves a draft for review.'),
                },
                handler: (args, req) => saveMarkdownContent(args, req),
            },
        ],
    },
});
