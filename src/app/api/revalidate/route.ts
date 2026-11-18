import { timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { revalidateSite } from '@/payload/revalidate';

/**
 * Expires every cached CMS read and page. Saving in /admin does this on its own;
 * this is for writes that bypass the app — the Sanity import, a database
 * restore, and the Local-API path in src/payload/revalidate.ts, which cannot
 * call revalidateTag itself and asks for it here.
 *
 *   curl -X POST -H "x-revalidate-secret: $PAYLOAD_SECRET" https://www.creativetrust.pl/api/revalidate
 */
export async function POST(request: Request) {
    const secret = process.env.PAYLOAD_SECRET ?? '';
    const given = request.headers.get('x-revalidate-secret') ?? '';
    const ok = secret.length > 0 && given.length === secret.length && timingSafeEqual(Buffer.from(given), Buffer.from(secret));
    if (!ok) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    // No HTTP fallback here: this is the endpoint it would call.
    const revalidated = await revalidateSite({ httpFallback: false });
    return revalidated
        ? NextResponse.json({ revalidated: true })
        : NextResponse.json({ error: 'Revalidation failed, see the server log' }, { status: 500 });
}
