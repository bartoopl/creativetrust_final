/**
 * Blog authors as recognisable entities (E-E-A-T, LLM attribution). Sanity
 * stores only a display name ("Bartosz"); the full name and job title are kept
 * here, keyed by the author's slug, and merged with the Sanity document.
 * Import-free so `node --test` can load it.
 */

export interface AuthorProfile {
    fullName: string;
    jobTitle: string;
}

export const authorProfiles: Record<string, AuthorProfile> = {
    bartosz: { fullName: 'Bartosz Łyśniewski', jobTitle: 'CEO CreativeTrust' },
};

export interface SanityAuthor {
    name?: string | null;
    role?: string | null;
    slug?: { current?: string | null } | string | null;
    socialLinks?: { linkedin?: string | null; twitter?: string | null; instagram?: string | null } | null;
}

export interface ResolvedAuthor {
    slug?: string;
    name: string;
    jobTitle?: string;
    sameAs: string[];
}

export function resolveAuthor(author: SanityAuthor | null | undefined): ResolvedAuthor | null {
    const name = author?.name?.trim();
    if (!author || !name) return null;
    const slug = (typeof author.slug === 'string' ? author.slug : author.slug?.current) || undefined;
    const profile = slug ? authorProfiles[slug] : undefined;
    const links = author.socialLinks ?? {};
    return {
        slug,
        name: profile?.fullName ?? name,
        jobTitle: profile?.jobTitle ?? (author.role?.trim() || undefined),
        sameAs: [links.linkedin, links.twitter, links.instagram].filter((url): url is string => Boolean(url?.trim())),
    };
}
