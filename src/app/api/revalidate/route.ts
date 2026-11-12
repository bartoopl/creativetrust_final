import { timingSafeEqual } from 'node:crypto';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import { CMS_CACHE_TAG } from '@/payload/revalidate';

/**
 * Expires every cached CMS read and page. Saving in /admin does this on its own;
 * this is for writes that bypass the app — the Sanity import, a database restore.
 *
 *   curl -X POST -H "x-revalidate-secret: $PAYLOAD_SECRET" https://www.creativetrust.pl/api/revalidate
 */
export async function POST(request: Request) {
    const secret = process.env.PAYLOAD_SECRET ?? '';
    const given = request.headers.get('x-revalidate-secret') ?? '';
    const ok = secret.length > 0 && given.length === secret.length && timingSafeEqual(Buffer.from(given), Buffer.from(secret));
    if (!ok) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    revalidateTag(CMS_CACHE_TAG, { expire: 0 });
    revalidatePath('/', 'layout');
    return NextResponse.json({ revalidated: true });
}
