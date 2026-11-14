/**
 * Domain-level canonicalisation (WEW-17 + GSC 2026-11-14), applied by the proxy.
 *
 * Why not `redirects()` in next.config.ts: Next runs them after its own trailing
 * slash rule, and each rule can only rewrite the path it matched. A request that
 * needs three fixes at once (bare domain, trailing slash, legacy alias) therefore
 * used to take three hops. The proxy computes the final URL in one pass, so every
 * combination answers a single 301 straight to the canonical page.
 *
 * No relative imports, so `node --test` can load it as is.
 */

/** The only origin the site serves: https + `www`. */
export const CANONICAL_ORIGIN = 'https://www.creativetrust.pl';
export const CANONICAL_HOST = 'www.creativetrust.pl';
export const APEX_HOST = 'creativetrust.pl';

/**
 * Addresses Google still reports as 404 with no successor of their own. They are
 * not in the sitemap and nothing links them, so they only need to stop being
 * dead ends. `/home` is a common home-page guess, the client panel addresses are
 * WordPress-era, and branding has no page in the current offer.
 */
export const LEGACY_REDIRECTS: Readonly<Record<string, string>> = {
    '/home': '/',
    '/login-admin': '/kontakt',
    '/logowanie-klienta': '/kontakt',
    '/panel-klienta': '/kontakt',
    '/rejestracja-klienta': '/kontakt',
    '/uslugi/branding': '/uslugi',
};

/** `/a/b/` → `/a/b`, `/` stays `/`. */
function withoutTrailingSlash(pathname: string): string {
    const trimmed = pathname.replace(/\/+$/, '');
    return trimmed.startsWith('/') ? trimmed || '/' : `/${trimmed}`;
}

type AliasMap = Readonly<Record<string, string>>;

/**
 * The path the canonical URL must carry: no trailing slash and every known alias
 * (retired service page, old WordPress address, consolidated post, legacy 404)
 * already resolved. `aliases` is `RETIRED_PATHS` at call sites.
 */
export function canonicalPathFor(pathname: string, aliases: AliasMap = {}): { path: string; redirected: boolean } {
    const path = withoutTrailingSlash(pathname || '/');
    const target = aliases[path] ?? LEGACY_REDIRECTS[path] ?? path;
    return { path: target, redirected: path !== pathname || target !== path };
}

type CanonicalRequest = {
    pathname: string;
    /** `?a=1`, or an empty string. */
    search?: string;
    /** The `Host` header, port optional. */
    host?: string | null;
    /** The `X-Forwarded-Proto` header; empty when the app is not behind a proxy. */
    forwardedProto?: string | null;
    /** The protocol Next saw, used only for hosts that are not the live site. */
    protocol?: string | null;
    /** Retired paths and aliases to resolve in the same hop. */
    aliases?: AliasMap;
};

/**
 * The absolute canonical URL to redirect to, or null when the request is already
 * canonical. Never returns the requested URL itself, so it cannot loop.
 *
 * Only `creativetrust.pl` and `www.creativetrust.pl` are rewritten to the live
 * origin: a staging or local host keeps its own origin, so a trailing-slash test
 * there can never send the visitor to production.
 */
export function canonicalRedirectUrl({ pathname, search = '', host, forwardedProto, protocol, aliases = {} }: CanonicalRequest): string | null {
    const { path, redirected } = canonicalPathFor(pathname, aliases);
    const hostname = (host ?? '').split(':')[0].toLowerCase();
    const isSiteHost = hostname === APEX_HOST || hostname === CANONICAL_HOST;
    const needsWww = hostname === APEX_HOST;
    // Only an explicit proxy header counts: behind Docker the app sees plain http
    // even for an https request, so guessing from it would redirect forever.
    const forwardedHttp = (forwardedProto ?? '').split(',')[0].trim().toLowerCase() === 'http';
    const needsHttps = isSiteHost && forwardedHttp;
    if (!redirected && !needsWww && !needsHttps) return null;
    const origin = isSiteHost ? CANONICAL_ORIGIN : `${forwardedHttp ? 'http' : protocol || 'http'}://${host}`;
    return `${origin}${path}${search}`;
}
