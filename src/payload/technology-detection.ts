/**
 * Technologies a project description names ("Technologia: WordPress / WooCommerce",
 * "wdrożona w technologii Next.js"), used once by the Sanity import to fill the
 * new Technologies field. Only unambiguous product names: every match in the
 * current content is a "built on" statement. Pure, import-free.
 */

export interface KnownTechnology {
    title: string;
    slug: string;
    group: 'ecommerce' | 'cms' | 'frontend' | 'backend' | 'marketing' | 'analytics' | 'other';
    website: string;
    pattern: RegExp;
}

export const KNOWN_TECHNOLOGIES: KnownTechnology[] = [
    { title: 'WordPress', slug: 'wordpress', group: 'cms', website: 'https://wordpress.org', pattern: /\bwordpress/i },
    { title: 'WooCommerce', slug: 'woocommerce', group: 'ecommerce', website: 'https://woocommerce.com', pattern: /\bwoocommerce/i },
    { title: 'Next.js', slug: 'next-js', group: 'frontend', website: 'https://nextjs.org', pattern: /\bnext\.?js\b/i },
    { title: 'Elementor', slug: 'elementor', group: 'cms', website: 'https://elementor.com', pattern: /\belementor/i },
    { title: 'Shopify', slug: 'shopify', group: 'ecommerce', website: 'https://www.shopify.com', pattern: /\bshopify/i },
    { title: 'PrestaShop', slug: 'prestashop', group: 'ecommerce', website: 'https://prestashop.com', pattern: /\bprestashop/i },
    { title: 'SALESmanago', slug: 'salesmanago', group: 'marketing', website: 'https://www.salesmanago.com', pattern: /\bsales\s?manago/i },
];

export function detectTechnologies(...texts: Array<string | null | undefined>): KnownTechnology[] {
    const text = texts.filter(Boolean).join('\n');
    return KNOWN_TECHNOLOGIES.filter((technology) => technology.pattern.test(text));
}
