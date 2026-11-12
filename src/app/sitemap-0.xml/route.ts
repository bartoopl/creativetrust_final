import { getSitemapDocs } from '@/lib/cms';
import { sitemapEntries, urlsetXml } from '@/lib/sitemap';
import retiredBlogPosts from '../../../retired-blog-posts.json';

// Rendered on request (the build has no database) and cached for an hour;
// saving content in the admin revalidates it straight away.
export const revalidate = 3600;

export async function GET() {
    const docs = await getSitemapDocs();
    return new Response(urlsetXml(sitemapEntries(docs, retiredBlogPosts)), {
        headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    });
}
