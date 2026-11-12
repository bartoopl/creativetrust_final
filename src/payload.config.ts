import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { postgresAdapter } from '@payloadcms/db-postgres';
import {
    BlockquoteFeature,
    BoldFeature,
    FixedToolbarFeature,
    HeadingFeature,
    InlineCodeFeature,
    InlineToolbarFeature,
    ItalicFeature,
    LinkFeature,
    OrderedListFeature,
    ParagraphFeature,
    UnderlineFeature,
    UnorderedListFeature,
    UploadFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { KnowledgeBase, PortfolioProjects, Posts } from './payload/collections/content';
import { Media } from './payload/collections/Media';
import { Authors, BlogCategories, ServiceCategories, Technologies, Users } from './payload/collections/taxonomies';
import { migrations } from './migrations';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
    serverURL: process.env.NEXT_PUBLIC_SITE_URL || '',
    admin: {
        user: Users.slug,
        importMap: { baseDir: path.resolve(dirname) },
        meta: { titleSuffix: ' — CreativeTrust CMS' },
    },
    collections: [Posts, KnowledgeBase, PortfolioProjects, Technologies, ServiceCategories, BlogCategories, Authors, Media, Users],
    // Only what the site renders (src/components/RichTextContent.tsx and the
    // Markdown twins); anything else would be saved but silently not shown.
    editor: lexicalEditor({
        features: () => [
            ParagraphFeature(),
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            BoldFeature(),
            ItalicFeature(),
            UnderlineFeature(),
            InlineCodeFeature(),
            LinkFeature({ enabledCollections: ['posts', 'knowledge-base', 'portfolio-projects'] }),
            UnorderedListFeature(),
            OrderedListFeature(),
            BlockquoteFeature(),
            UploadFeature({ collections: { media: { fields: [] } } }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
        ],
    }),
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
    db: postgresAdapter({
        pool: { connectionString: process.env.DATABASE_URL || '' },
        // Schema changes ship as migrations (src/migrations) and run on server start.
        push: false,
        prodMigrations: migrations,
    }),
    sharp,
    telemetry: false,
});
