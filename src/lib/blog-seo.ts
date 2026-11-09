export type SeoLink = {
    href: string;
    title: string;
    description: string;
};

type HeadingFix = {
    /** Heading text as stored in Sanity. Once an editor changes it, the fix stops applying. */
    from: string;
    to: string;
    style?: 'h2' | 'h3' | 'h4';
};

/** Text with optional links: `['Zobacz ', { text: 'cennik', href: '/cennik' }, '.']`. */
type RichText = string | Array<string | { text: string; href: string }>;

/** Content authored in code, turned into Portable Text by `toPortableText`. */
type AuthoredBlock = { h2: string } | { h3: string } | { p: RichText } | { bullet: RichText };

type SectionFix = {
    /** Replaces this Sanity heading and everything up to the next heading of the same or higher rank. */
    replace?: string;
    /** Inserts the blocks right before the heading with this Sanity text. */
    beforeHeading?: string;
    blocks: AuthoredBlock[];
};

type BlogSeoConfig = {
    /** Rendered as is, without the site-wide `| CreativeTrust` suffix. */
    title?: string;
    description?: string;
    links: SeoLink[];
    /** H1, when it differs from the Sanity title. */
    heading?: string;
    headings?: HeadingFix[];
    /**
     * Applied to the Sanity content, matched on its current heading text: once an editor
     * renames the heading, the fix stops applying. An insert whose link already exists
     * in Sanity is skipped, so it never doubles.
     */
    sections?: SectionFix[];
};

type PortableBlock = {
    _type: string;
    _key?: string;
    style?: string;
    children?: Array<{ _key?: string; text?: string; [key: string]: unknown }>;
    markDefs?: Array<{ href?: string; [key: string]: unknown }>;
    [key: string]: unknown;
};

type BlogPostFields = {
    title?: string;
    seoTitle?: string | null;
    seoDescription?: string | null;
    content?: PortableBlock[] | null;
};

const blogSeoConfig: Record<string, BlogSeoConfig> = {
    'tworzenie-stron-internetowych-przewodnik-od-a-do-z-dla-kreatywnych-przedsiebiorcow': {
        title: 'Tworzenie stron internetowych krok po kroku: przewodnik 2026',
        description:
            'Jak stworzyć stronę internetową: od celu, przez wybór WordPressa lub Reacta, UX i SEO, po testy i wdrożenie. 6 kroków dla firm. Sprawdź przewodnik.',
        links: [],
        heading: 'Tworzenie stron internetowych: przewodnik od A do Z dla kreatywnych przedsiębiorców',
        headings: [
            {
                from: 'Dlaczego Profesjonalna Strona Internetowa Jest Kluczowa dla Twojego Biznesu?',
                to: 'Dlaczego profesjonalna strona internetowa jest kluczowa dla Twojego biznesu?',
            },
            {
                from: 'Krok 1: Planowanie i Strategia Twojej Strony Internetowej',
                to: 'Krok 1: Cel, grupa docelowa i zakres strony',
                style: 'h2',
            },
            {
                from: 'Krok 2: Wybór Technologii: React, WordPress, Elementor – Poznaj Ich Moc!',
                to: 'Krok 2: Wybór technologii – WordPress czy React',
                style: 'h2',
            },
            {
                from: 'React: Dynamiczne i Interaktywne Aplikacje Webowe',
                to: 'React: dynamiczne i interaktywne aplikacje webowe',
                style: 'h3',
            },
            {
                from: 'WordPress: Potęga Prostoty i Elastyczności',
                to: 'WordPress: potęga prostoty i elastyczności',
                style: 'h3',
            },
            {
                from: 'Elementor: Wizualny Kreator Stron dla WordPressa',
                to: 'Elementor: wizualny kreator stron dla WordPressa',
                style: 'h3',
            },
            {
                from: 'Krok 3: Projektowanie i UX – Strona Przyjazna Użytkownikowi',
                to: 'Krok 3: Projektowanie i UX – strona przyjazna użytkownikowi',
            },
            {
                from: 'Krok 4: Optymalizacja SEO – Bądź Widoczny w Wyszukiwarkach',
                to: 'Krok 4: Optymalizacja SEO – bądź widoczny w wyszukiwarkach',
            },
            {
                from: 'Krok 5: Integracja z Chatbotami AI – Nowoczesna Obsługa Klienta',
                to: 'Krok 5: Integracja z chatbotami AI – nowoczesna obsługa klienta',
            },
            {
                from: 'Krok 6: Testowanie i Wdrożenie – Uruchomienie Twojej Nowej Strony',
                to: 'Krok 6: Testowanie i wdrożenie – uruchomienie Twojej nowej strony',
            },
        ],
        sections: [
            {
                beforeHeading: 'Krok 4: Optymalizacja SEO – Bądź Widoczny w Wyszukiwarkach',
                blocks: [
                    {
                        p: [
                            'Chcesz przejść ten etap z zespołem? Zobacz, jak wygląda nasze ',
                            { text: 'projektowanie stron www', href: '/uslugi/strony-www' },
                            '.',
                        ],
                    },
                ],
            },
        ],
    },
    'ile-kosztuje-strona-internetowa-dla-firmy': {
        links: [
            {
                href: '/uslugi/tworzenie-stron-www-cennik',
                title: 'Cennik tworzenia stron WWW',
                description: 'Porównaj zakresy i wybierz model strony dopasowany do planowanego rozwoju firmy.',
            },
            {
                href: '/uslugi/strony-www',
                title: 'Tworzenie stron WWW',
                description: 'Zobacz, jak łączymy strategię, treści, design i wdrożenie strony firmowej.',
            },
        ],
    },
    'wdrozenie-marketing-automation-krok-po-kroku': {
        links: [
            {
                href: '/uslugi/marketing-automation',
                title: 'Marketing automation dla firm',
                description: 'Zobacz zakres: dane, integracje CRM, lead nurturing i pomiar wyniku.',
            },
            {
                href: '/uslugi/wdrozenie-salesmanago',
                title: 'Wdrożenie SALESmanago',
                description: 'Przejdź od scenariusza do działających segmentów i automatyzacji.',
            },
        ],
    },
    'migracja-sklepu-bez-utraty-seo': {
        links: [
            {
                href: '/uslugi/migracja-woocommerce-do-headless',
                title: 'Migracja WooCommerce do headless',
                description: 'Zaplanuj zmianę architektury z zachowaniem sprzedaży, SEO i danych.',
            },
            {
                href: '/uslugi/e-commerce',
                title: 'E-commerce i rozwój sklepu',
                description: 'Poznaj możliwości rozwoju sklepu poza samą migracją platformy.',
            },
        ],
    },
};

export function getBlogSeoConfig(slug: string): BlogSeoConfig | undefined {
    return blogSeoConfig[slug];
}

const blockText = (block: PortableBlock) => block.children?.map((child) => child.text ?? '').join('') ?? '';

const isHeading = (block: PortableBlock) => block._type === 'block' && /^h[1-6]$/.test(block.style ?? '');

function fixHeading(block: PortableBlock, fixes: HeadingFix[]): PortableBlock {
    const fix = isHeading(block) ? fixes.find(({ from }) => from === blockText(block)) : undefined;
    if (!fix) return block;

    const [first] = block.children ?? [];
    return { ...block, style: fix.style ?? block.style, children: [{ ...first, text: fix.to, marks: [] }] };
}

const headingRank = (block: PortableBlock) => Number(block.style?.slice(1));

function toPortableText(blocks: AuthoredBlock[], keyPrefix: string): PortableBlock[] {
    return blocks.map((authored, index) => {
        const key = `${keyPrefix}-${index}`;
        const [style, value] = Object.entries(authored)[0] as ['h2' | 'h3' | 'p' | 'bullet', RichText];
        const parts = typeof value === 'string' ? [value] : value;
        const markDefs: Array<{ _type: string; _key: string; href: string }> = [];
        const children = parts.map((part, partIndex) => {
            const spanKey = `${key}-${partIndex}`;
            if (typeof part === 'string') return { _type: 'span', _key: spanKey, text: part, marks: [] };
            markDefs.push({ _type: 'link', _key: `${spanKey}-link`, href: part.href });
            return { _type: 'span', _key: spanKey, text: part.text, marks: [`${spanKey}-link`] };
        });
        const list = style === 'bullet' ? { listItem: 'bullet', level: 1 } : {};

        return { _type: 'block', _key: key, style: style === 'h2' || style === 'h3' ? style : 'normal', ...list, markDefs, children };
    });
}

const linkedHrefs = (blocks: PortableBlock[]) => new Set(blocks.flatMap((block) => block.markDefs?.map(({ href }) => href) ?? []));

function applySection(content: PortableBlock[], fix: SectionFix, keyPrefix: string): PortableBlock[] {
    const anchorText = fix.replace ?? fix.beforeHeading;
    const start = content.findIndex((block) => isHeading(block) && blockText(block) === anchorText);
    if (start < 0) return content;

    const blocks = toPortableText(fix.blocks, keyPrefix);
    if (fix.replace) {
        const rank = headingRank(content[start]);
        const next = content.findIndex((block, index) => index > start && isHeading(block) && headingRank(block) <= rank);
        return [...content.slice(0, start), ...blocks, ...content.slice(next < 0 ? content.length : next)];
    }

    const existing = linkedHrefs(content);
    if ([...linkedHrefs(blocks)].some((href) => existing.has(href))) return content;
    return [...content.slice(0, start), ...blocks, ...content.slice(start)];
}

/** Overlays the `blog-seo.ts` fixes on a post fetched from Sanity. */
export function applyBlogPostFixes<T extends BlogPostFields>(slug: string, post: T): T {
    const config = blogSeoConfig[slug];
    if (!post || !config) return post;

    const { title, description, heading, headings = [], sections = [] } = config;
    const fixed = post.content
        ? sections.reduce((content, fix, index) => applySection(content, fix, `seo-${index}`), post.content)
        : post.content;

    return {
        ...post,
        title: heading ?? post.title,
        seoTitle: title ?? post.seoTitle,
        seoDescription: description ?? post.seoDescription,
        content: fixed?.map((block) => fixHeading(block, headings)),
    };
}
