import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';

/** Tag on every cached CMS read in src/lib/cms.ts. */
export const CMS_CACHE_TAG = 'cms';

/** The two Next.js functions we need; injected so the test can watch the calls. */
export interface CacheFunctions {
    revalidateTag: (tag: string, profile: string | { expire?: number }) => unknown;
    revalidatePath: (path: string, type?: 'layout' | 'page') => unknown;
}

export interface RevalidateOptions {
    /** Defaults to `next/cache`, loaded lazily so scripts never pull it in. */
    load?: () => Promise<CacheFunctions>;
    /**
     * When the in-process call cannot work, ask /api/revalidate over HTTP.
     * Off inside that endpoint itself, which would otherwise call itself.
     */
    httpFallback?: boolean;
}

/**
 * Expires cached CMS reads and the pages built from them as soon as content is
 * saved, instead of waiting for the data cache window.
 *
 * A save does not always happen inside a Next.js request: the admin panel and
 * the REST API have a request store, so `revalidateTag` works there, but a write
 * through the Local API (the MCP plugin, scripts) runs outside it and the call
 * throws. The old empty `catch` swallowed exactly that, so a lost invalidation
 * looked like "the hook does nothing" until the hour-long TTL ran out.
 *
 * Now a failure is logged and retried through /api/revalidate, which always
 * runs in a request. `src/lib/cms.ts` also keeps a one-minute TTL, so even a
 * failure on both paths cannot leave a page stale for an hour.
 */
export async function revalidateSite({ load = loadNextCache, httpFallback = true }: RevalidateOptions = {}): Promise<boolean> {
    if (process.env.PAYLOAD_SKIP_REVALIDATE === '1') return true;
    try {
        const { revalidateTag, revalidatePath } = await load();
        // `{ expire: 0 }` is the Next 16 signature for immediate expiration
        // (`revalidateTag(tag, profile)`); a bare call only logs a deprecation.
        revalidateTag(CMS_CACHE_TAG, { expire: 0 });
        revalidatePath('/', 'layout');
        return true;
    } catch (error) {
        console.error('[cms] revalidateTag/revalidatePath failed, the save did not reach the cache:', error);
        return httpFallback ? revalidateOverHttp() : false;
    }
}

function loadNextCache(): Promise<CacheFunctions> {
    return import('next/cache');
}

/**
 * The same invalidation, asked for over HTTP so it runs inside a Next.js
 * request. `PAYLOAD_SECRET` is the token /api/revalidate already checks.
 */
async function revalidateOverHttp(): Promise<boolean> {
    const secret = process.env.PAYLOAD_SECRET;
    if (!secret) {
        console.error('[cms] PAYLOAD_SECRET is missing, so /api/revalidate cannot be called');
        return false;
    }
    const base = process.env.REVALIDATE_URL ?? `http://127.0.0.1:${process.env.PORT ?? '3000'}`;
    try {
        const response = await fetch(`${base}/api/revalidate`, {
            method: 'POST',
            headers: { 'x-revalidate-secret': secret },
            cache: 'no-store',
        });
        if (!response.ok) {
            console.error(`[cms] /api/revalidate answered ${response.status}, the cache is still stale`);
            return false;
        }
        return true;
    } catch (error) {
        console.error(`[cms] ${base}/api/revalidate is unreachable, the cache is still stale:`, error);
        return false;
    }
}

export const revalidateAfterChange: CollectionAfterChangeHook = async ({ doc }) => {
    await revalidateSite();
    return doc;
};

export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ doc }) => {
    await revalidateSite();
    return doc;
};

export const revalidateHooks = {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
};
