/**
 * The Google title of a portfolio case study (2026-11-14): `seoTitle` when an
 * editor set one, otherwise the previous formula, byte for byte, so the 61
 * existing projects keep the title they have today. No imports: `node --test`
 * loads it directly.
 */
export type PortfolioTitleFields = {
    seoTitle?: string | null;
    title?: string | null;
    client?: string | null;
};

const clean = (value?: string | null) => value?.replace(/\s+/g, ' ').trim() || '';

/** The part before `| Portfolio`; the layout appends the brand. */
export function portfolioPageTitle(project: PortfolioTitleFields): string {
    const seoTitle = clean(project.seoTitle);
    if (seoTitle) return seoTitle;
    const name = clean(project.title);
    const client = clean(project.client);
    return client && client.toLowerCase() !== name.toLowerCase() ? `${name} — realizacja dla ${client}` : `${name} — realizacja`;
}
