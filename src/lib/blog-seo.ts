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

type InlineLink = {
    /** The paragraph goes right before the heading with this Sanity text. */
    beforeHeading: string;
    href: string;
    before: string;
    anchor: string;
    after: string;
};

type ParagraphFix = {
    /** Paragraph text as stored in Sanity. Once an editor changes it, the fix stops applying. */
    from: string;
    to: string;
};

export type FaqItem = {
    question: string;
    answer: string;
};

type FaqSection = {
    heading: string;
    /** The section goes right before the heading with this Sanity text, or at the end when it is gone. */
    beforeHeading?: string;
    items: FaqItem[];
};

type BlogSeoConfig = {
    /** Rendered as is, without the site-wide `| CreativeTrust` suffix. */
    title?: string;
    description?: string;
    links: SeoLink[];
    /** H1, when it differs from the Sanity title. */
    heading?: string;
    headings?: HeadingFix[];
    inlineLink?: InlineLink;
    paragraphs?: ParagraphFix[];
    /** Rendered as H2 + H3 questions and emitted as FAQPage JSON-LD. */
    faq?: FaqSection;
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
        inlineLink: {
            beforeHeading: 'Krok 4: Optymalizacja SEO – Bądź Widoczny w Wyszukiwarkach',
            href: '/uslugi/strony-www',
            before: 'Chcesz przejść ten etap z zespołem? Zobacz, jak wygląda nasze ',
            anchor: 'projektowanie stron www',
            after: '.',
        },
    },
    'google-ads-dla-b2b-jak-zbierac-leady': {
        title: 'Google Ads dla B2B: jak pozyskać leady sprzedażowe? Poradnik 2026 | CreativeTrust',
        description:
            'Kampanie Google Ads dla firm B2B krok po kroku: dobór słów kluczowych, formularze, CRM i kwalifikacja leadów. Sprawdź, jak obniżyć koszt pozyskania klienta.',
        links: [],
        paragraphs: [
            {
                from: 'Google Ads dla B2B działa najlepiej, gdy kampanie są budowane wokół intencji zakupowej, a nie samego wolumenu wyszukiwań. Najważniejsze są dobrze rozdzielone słowa kluczowe, precyzyjne wykluczenia, landing page odpowiadający na obiekcje decydenta oraz pomiar jakości leadów w CRM. Bez informacji, które zapytania stają się realnymi rozmowami sprzedażowymi, kampania będzie optymalizować się pod ilość formularzy, a nie pod przychód.',
                to: 'Google Ads dla usług B2B działa najlepiej, gdy kampanie są budowane wokół intencji zakupowej, a nie samego wolumenu wyszukiwań. Dotyczy to także kampanii, które wiele firm wciąż nazywa AdWords B2B: zmieniła się nazwa narzędzia, nie zasady. Najważniejsze są dobrze rozdzielone słowa kluczowe, precyzyjne wykluczenia, landing page odpowiadający na obiekcje decydenta oraz pomiar jakości leadów w CRM. Bez informacji, które zapytania stają się realnymi rozmowami sprzedażowymi, kampania będzie optymalizować się pod ilość formularzy, a nie pod przychód.',
            },
        ],
        faq: {
            heading: 'FAQ: Google Ads w B2B',
            beforeHeading: 'Polecane kolejne kroki',
            items: [
                {
                    question: 'Ile kosztuje Google Ads dla B2B?',
                    answer: 'Na koszt składają się budżet mediowy, czyli opłaty za kliknięcia, oraz obsługa kampanii. Stawki za kliknięcie w B2B bywają wyższe niż w e-commerce, bo fraz zakupowych jest mniej, a klient jest wart więcej. Dlatego budżet warto planować od kosztu kwalifikowanej rozmowy handlowej i wartości klienta, a nie od ceny kliknięcia.',
                },
                {
                    question: 'Czy Google Ads działa w B2B?',
                    answer: 'Tak, jeśli Twoi klienci szukają rozwiązania w Google. Kampania w B2B musi jednak celować w frazy zakupowe, wykluczać zapytania edukacyjne i rekrutacyjne, kierować ruch na dedykowany landing page i oceniać wynik po jakości leadów w CRM, a nie po liczbie formularzy.',
                },
                {
                    question: 'Czym Google Ads różni się od AdWords?',
                    answer: 'To ta sama usługa: w 2018 roku Google AdWords zmieniło nazwę na Google Ads. Porady o AdWords B2B nadal dotyczą tych samych kampanii w wyszukiwarce, choć panel i automatyczne strategie stawek od tego czasu mocno się zmieniły.',
                },
                {
                    question: 'Jak mierzyć skuteczność Google Ads w B2B?',
                    answer: 'Liczba leadów to za mało. Mierz koszt kwalifikowanego leada, odsetek leadów, które przechodzą w spotkanie, i pipeline przypisany do kampanii. Oznaczaj jakość leadów w CRM i importuj wartościowe konwersje z powrotem do Google Ads, żeby kampania uczyła się na sprzedaży, a nie na formularzach.',
                },
            ],
        },
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

function linkParagraph({ href, before, anchor, after }: InlineLink): PortableBlock {
    const span = (key: string, text: string, marks: string[] = []) => ({ _type: 'span', _key: key, text, marks });

    return {
        _type: 'block',
        _key: 'seo-inline-link',
        style: 'normal',
        markDefs: [{ _type: 'link', _key: 'seo-inline-link-mark', href }],
        children: [span('seo-inline-link-0', before), span('seo-inline-link-1', anchor, ['seo-inline-link-mark']), span('seo-inline-link-2', after)],
    };
}

function insertInlineLink(content: PortableBlock[], link: InlineLink): PortableBlock[] {
    const alreadyLinked = content.some((block) => block.markDefs?.some(({ href }) => href === link.href));
    const index = content.findIndex((block) => isHeading(block) && blockText(block) === link.beforeHeading);
    if (alreadyLinked || index < 0) return content;

    return [...content.slice(0, index), linkParagraph(link), ...content.slice(index)];
}

function fixParagraph(block: PortableBlock, fixes: ParagraphFix[]): PortableBlock {
    const plain = block._type === 'block' && !isHeading(block) && block.children?.length === 1;
    const fix = plain ? fixes.find(({ from }) => from === blockText(block)) : undefined;
    if (!fix) return block;

    const [first] = block.children ?? [];
    return { ...block, children: [{ ...first, text: fix.to, marks: [] }] };
}

function faqBlocks({ heading, items }: FaqSection): PortableBlock[] {
    const block = (key: string, style: string, text: string): PortableBlock => ({
        _type: 'block',
        _key: key,
        style,
        markDefs: [],
        children: [{ _type: 'span', _key: `${key}-span`, text, marks: [] }],
    });

    return [
        block('seo-faq', 'h2', heading),
        ...items.flatMap(({ question, answer }, index) => [
            block(`seo-faq-${index}-q`, 'h3', question),
            block(`seo-faq-${index}-a`, 'normal', answer),
        ]),
    ];
}

function insertFaq(content: PortableBlock[], faq: FaqSection): PortableBlock[] {
    if (content.some((block) => isHeading(block) && blockText(block) === faq.heading)) return content;

    const index = content.findIndex((block) => isHeading(block) && blockText(block) === faq.beforeHeading);
    const at = index < 0 ? content.length : index;
    return [...content.slice(0, at), ...faqBlocks(faq), ...content.slice(at)];
}

/** Overlays the `blog-seo.ts` fixes on a post fetched from Sanity. */
export function applyBlogPostFixes<T extends BlogPostFields>(slug: string, post: T): T {
    const config = blogSeoConfig[slug];
    if (!post || !config) return post;

    const { title, description, heading, headings = [], paragraphs = [], inlineLink, faq } = config;
    const linked = post.content && inlineLink ? insertInlineLink(post.content, inlineLink) : post.content;
    const withFaq = linked && faq ? insertFaq(linked, faq) : linked;

    return {
        ...post,
        title: heading ?? post.title,
        seoTitle: title ?? post.seoTitle,
        seoDescription: description ?? post.seoDescription,
        content: withFaq?.map((block) => fixParagraph(fixHeading(block, headings), paragraphs)),
    };
}
