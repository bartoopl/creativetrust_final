/**
 * Domain-level redirects (WEW-17), applied by next.config.ts. Was netlify.toml
 * before the move to our own server. Plain data so `node --test` can load it.
 */
export const CANONICAL_ORIGIN = 'https://www.creativetrust.pl';

/**
 * Bare domain → https://www in one 301, path and query kept. http → https happens
 * before the app (Cloudflare "Always Use HTTPS"), so http://creativetrust.pl is
 * two hops at most and never loops: the target is always another host.
 */
export const apexRedirect = {
    source: '/:path*',
    has: [{ type: 'host' as const, value: 'creativetrust.pl' }],
    destination: `${CANONICAL_ORIGIN}/:path*`,
    statusCode: 301 as const,
};
