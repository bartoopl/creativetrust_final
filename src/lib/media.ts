/**
 * Image URLs for media stored in Payload. Uploads are saved with resized WebP
 * variants (src/payload/collections/Media.ts); this picks the smallest one that
 * covers the requested width, so pages never ship the original file.
 *
 * `urlFor(image).width(800).url()` keeps the call shape of the Sanity image
 * builder the pages were written against. Import-free and client-safe.
 */

export const SITE_ORIGIN = 'https://www.creativetrust.pl';

export interface MediaSize {
    url?: string | null;
    width?: number | null;
    height?: number | null;
}

export interface MediaAsset {
    url?: string | null;
    width?: number | null;
    height?: number | null;
    alt?: string | null;
    caption?: string | null;
    sizes?: Record<string, MediaSize | undefined> | null;
    [key: string]: unknown;
}

/** An image as pages receive it: `{ asset, alt, caption }`, or the media document itself. */
export interface ImageSource {
    asset?: MediaAsset | null;
    alt?: string | null;
    caption?: string | null;
    [key: string]: unknown;
}

const WIDTH_VARIANTS = ['thumbnail', 'card', 'large', 'xlarge'] as const;

function assetOf(value: unknown): MediaAsset | null {
    if (!value || typeof value !== 'object') return null;
    const source = value as ImageSource;
    if (source.asset && typeof source.asset === 'object') return source.asset as MediaAsset;
    return typeof source.url === 'string' ? (source as MediaAsset) : null;
}

/** Root-relative media paths become absolute: OG tags, schema.org and Markdown need full URLs. */
export function absoluteMediaUrl(url: string, origin = SITE_ORIGIN): string {
    return url.startsWith('/') ? `${origin}${url}` : url;
}

/**
 * URL of the best stored variant. With width and height close to 1200×630 the
 * cropped social-card variant is used; otherwise the smallest variant at least
 * `width` wide, falling back to the original (small uploads have no larger variants).
 * `source` is an image as pages receive it (`{ asset }`) or a media document.
 */
export function imageVariantUrl(source: unknown, width?: number, height?: number): string | null {
    const asset = assetOf(source);
    if (!asset?.url) return null;
    const sizes = asset.sizes ?? {};

    if (width && height && Math.abs(width / height - 1200 / 630) < 0.05 && sizes.og?.url) {
        return absoluteMediaUrl(sizes.og.url);
    }

    const wanted = width ?? 1920;
    const candidates = WIDTH_VARIANTS.map((name) => sizes[name])
        .filter((size): size is MediaSize & { url: string; width: number } => Boolean(size?.url && size.width))
        .sort((a, b) => a.width - b.width);
    const variant = candidates.find((size) => size.width >= wanted);
    // No variant is wide enough: the original is the largest there is.
    return absoluteMediaUrl(variant?.url ?? asset.url);
}

export interface ImageUrlBuilder {
    width(width: number): ImageUrlBuilder;
    height(height: number): ImageUrlBuilder;
    fit(mode: string): ImageUrlBuilder;
    auto(mode: string): ImageUrlBuilder;
    url(): string;
}

export function urlFor(source: unknown): ImageUrlBuilder {
    let width: number | undefined;
    let height: number | undefined;
    const builder: ImageUrlBuilder = {
        width(value) {
            width = value;
            return builder;
        },
        height(value) {
            height = value;
            return builder;
        },
        // Variants are pre-rendered as WebP and never upscaled, so these are no-ops.
        fit: () => builder,
        auto: () => builder,
        url: () => imageVariantUrl(source, width, height) ?? '',
    };
    return builder;
}
