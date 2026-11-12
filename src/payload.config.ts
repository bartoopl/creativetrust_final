import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { KnowledgeBase, PortfolioProjects, Posts } from './payload/collections/content';
import { Media } from './payload/collections/Media';
import { editorFeatures } from './payload/editor';
import { payloadMcp } from './payload/mcp';
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
    editor: lexicalEditor({ features: editorFeatures }),
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
    db: postgresAdapter({
        pool: { connectionString: process.env.DATABASE_URL || '' },
        // Schema changes ship as migrations (src/migrations) and run on server start.
        push: false,
        prodMigrations: migrations,
    }),
    sharp,
    plugins: [payloadMcp],
    telemetry: false,
});
