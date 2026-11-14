/**
 * Related service pages for a portfolio case study (2026-11-14).
 *
 * A case study used to link nothing: the category chips were plain text, so 61
 * projects passed no value to /uslugi. The map below turns the service category
 * slugs into at most two contextual links. Performance marketing is deliberately
 * absent: it is not part of the current core offer.
 *
 * Plain data and one pure function, no imports, so `node --test` can load it.
 */
export type PortfolioService = { href: string; label: string };

export const CATEGORY_SERVICES: Readonly<Record<string, PortfolioService>> = {
    'strony-www': { href: '/uslugi/strony-www', label: 'strony internetowe dla firm' },
    'e-commerce': { href: '/uslugi/e-commerce', label: 'e-commerce' },
};

/** Mapped services, in category order, without duplicates, at most two. */
export function servicesForCategories(categorySlugs: ReadonlyArray<string | null | undefined>): PortfolioService[] {
    const services: PortfolioService[] = [];
    for (const slug of categorySlugs) {
        if (!slug) continue;
        const service = CATEGORY_SERVICES[slug];
        if (!service) continue;
        if (services.some((item) => item.href === service.href)) continue;
        services.push(service);
        if (services.length === 2) break;
    }
    return services;
}
