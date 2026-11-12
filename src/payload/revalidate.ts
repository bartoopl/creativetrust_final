import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';

/** Tag on every cached CMS read in src/lib/cms.ts. */
export const CMS_CACHE_TAG = 'cms';

/**
 * Expires cached CMS reads and pages as soon as content is saved in the admin instead of
 * waiting for the hourly ISR window. A post shows up on its own page, listings,
 * the homepage, the sitemap and the Markdown twins, so the whole site is
 * revalidated — cheap at this size. Outside a Next.js request (import script,
 * migrations) revalidatePath throws; that is ignored.
 */
async function revalidateSite() {
    if (process.env.PAYLOAD_SKIP_REVALIDATE === '1') return;
    try {
        const { revalidatePath, revalidateTag } = await import('next/cache');
        revalidateTag(CMS_CACHE_TAG, { expire: 0 });
        revalidatePath('/', 'layout');
    } catch {
        // Not inside a Next.js server context.
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
