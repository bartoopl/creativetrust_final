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
    'audyt-konta-google-ads-checklista': {
        // Keep the number in sync with the bullets of the checklist section (enforced by a test).
        title: 'Audyt Google Ads: checklista 30 punktów krok po kroku (2026) | CreativeTrust',
        description:
            'Darmowa checklista audytu konta Google Ads: konwersje i tracking, struktura kampanii, wyszukiwane hasła, budżet i landing page. Sprawdź, gdzie ucieka budżet.',
        links: [],
        heading: 'Audyt Google Ads: checklista, która pokazuje, gdzie ucieka budżet',
        sections: [
            {
                replace: 'Jak podejść do tematu krok po kroku?',
                blocks: [
                    { h2: 'Checklista audytu Google Ads: 30 punktów w 5 obszarach' },
                    {
                        p: 'Przejdź obszary w tej kolejności: najpierw dane, potem struktura, a dopiero na końcu skalowanie. Jeśli tracking jest błędny, każda kolejna rekomendacja opiera się na złych liczbach. Przy każdym punkcie zanotuj stan – OK, do poprawy albo krytyczne – żeby na końcu ułożyć priorytety według wpływu na wynik.',
                    },
                    { h3: 'Audyt konwersji i trackingu' },
                    {
                        p: 'To fundament audytu: sprawdzasz, czy algorytm Google Ads uczy się na zdarzeniach, które mają wartość dla biznesu.',
                    },
                    { bullet: 'konwersje primary to tylko zdarzenia biznesowe (lead, zakup), a mikrokonwersje są ustawione jako secondary' },
                    { bullet: 'żadna konwersja nie jest liczona podwójnie, np. przez tag Google Ads i import z GA4 tego samego zdarzenia' },
                    { bullet: 'tag działa na wszystkich formularzach i stronach podziękowania, także po ostatnich zmianach w GTM' },
                    { bullet: 'Consent Mode v2 jest wdrożony, a konwersje rozszerzone są włączone' },
                    { bullet: 'wartości konwersji odpowiadają realnej wartości zamówienia lub leada' },
                    { bullet: 'liczba konwersji w Google Ads, GA4 i CRM różni się w zakresie, który umiesz wyjaśnić' },
                    { h3: 'Struktura konta i kampanii' },
                    { p: 'Struktura powinna odzwierciedlać intencje klientów i marże, a nie historię konta.' },
                    { bullet: 'kampanie są podzielone według intencji: brand, produkty lub usługi, konkurencja, remarketing' },
                    { bullet: 'ruch brandowy jest oddzielony od pozyskiwania nowych klientów, także w Performance Max' },
                    { bullet: 'grupy reklam mają spójne tematycznie słowa kluczowe zamiast kilkudziesięciu luźnych fraz' },
                    { bullet: 'kierowanie na lokalizację obejmuje osoby przebywające w danym obszarze, a nie tylko nim zainteresowane' },
                    { bullet: 'kampanie w sieci wyszukiwania nie mają włączonej sieci reklamowej bez świadomej decyzji' },
                    { bullet: 'kampanie nie konkurują ze sobą o te same zapytania' },
                    { h3: 'Słowa kluczowe i wyszukiwane hasła' },
                    {
                        p: 'Raport wyszukiwanych haseł pokazuje, za co naprawdę płacisz. Często są to zupełnie inne zapytania niż słowa kluczowe na koncie.',
                    },
                    { bullet: 'wyszukiwane hasła z ostatnich 30–90 dni są przejrzane pod kątem przypadkowych zapytań' },
                    { bullet: 'listy wykluczających słów kluczowych są aktualne i przypisane do właściwych kampanii' },
                    { bullet: 'dopasowanie przybliżone działa tylko tam, gdzie są inteligentne stawki i poprawne konwersje' },
                    { bullet: 'frazy informacyjne, rekrutacyjne i „za darmo” nie zabierają budżetu frazom zakupowym' },
                    { bullet: 'słowa bez wyświetleń lub z niskim wynikiem jakości mają decyzję: poprawić, przenieść albo usunąć' },
                    { bullet: 'zapytania, które konwertują, mają własne słowa kluczowe i dopasowaną reklamę' },
                    { h3: 'Budżet i stawki' },
                    {
                        p: 'W tym obszarze widać, gdzie ucieka budżet: które kampanie są ograniczone, a które wydają pieniądze bez wyniku.',
                    },
                    { bullet: 'budżet jest rozłożony według rentowności kampanii, a nie po równo' },
                    { bullet: 'kampanie z dobrym wynikiem nie tracą wyświetleń z powodu budżetu' },
                    { bullet: 'strategia ustalania stawek pasuje do liczby konwersji – docelowy CPA lub ROAS potrzebuje stabilnych danych' },
                    { bullet: 'cele CPA i ROAS wynikają z marży i wartości klienta, a nie są ustawione „na oko”' },
                    { bullet: 'harmonogram reklam i wykluczenia urządzeń wynikają z danych o konwersjach, a nie z przyzwyczajeń' },
                    { bullet: 'duże zmiany budżetów i celów nie przerywają co kilka dni okresu nauki strategii' },
                    { h3: 'Reklamy i landing page' },
                    { p: 'Nawet dobrze kierowany ruch nie skonwertuje, jeśli reklama obiecuje co innego niż strona docelowa.' },
                    { bullet: 'każda grupa reklam ma elastyczną reklamę w wyszukiwarce ze skutecznością co najmniej „Dobra”' },
                    { bullet: 'nagłówki zawierają frazę z zapytania i konkretną korzyść zamiast ogólników' },
                    { bullet: 'komponenty – linki do podstron, objaśnienia, rozszerzenia informacji – są uzupełnione i aktualne' },
                    { bullet: 'landing page odpowiada obietnicy reklamy i intencji zapytania' },
                    { bullet: 'strona szybko ładuje się na telefonie i przechodzi Core Web Vitals' },
                    { bullet: 'formularz działa na telefonie, nie ma zbędnych pól, a jego wysłanie rejestruje konwersję' },
                ],
            },
            {
                beforeHeading: 'Polecane kolejne kroki',
                blocks: [
                    { h2: 'Ile trwa i ile kosztuje audyt Google Ads?' },
                    {
                        p: 'Czas i cena audytu zależą od wielkości konta: liczby kampanii, typów konwersji i tego, czy w grę wchodzą Performance Max, Merchant Center i remarketing. Przegląd kilku kampanii w sieci wyszukiwania to inna praca niż audyt rozbudowanego e-commerce, dlatego wycena powinna wynikać z zakresu, a nie ze stałego cennika. Najwięcej czasu zajmuje zwykle weryfikacja trackingu, bo wymaga porównania danych z Google Ads, GA4 i CRM.',
                    },
                    {
                        p: [
                            'Co wpływa na cenę i kiedy audyt się zwraca, opisujemy w artykule ',
                            { text: 'ile kosztuje audyt Google Ads', href: '/blog/ile-kosztuje-audyt-google-ads' },
                            '.',
                        ],
                    },
                ],
            },
        ],
    },
    'ile-kosztuje-audyt-google-ads': {
        links: [],
        sections: [
            {
                beforeHeading: 'Ile może kosztować audyt',
                blocks: [
                    {
                        p: [
                            'Wszystkie te obszary punkt po punkcie rozpisuje nasza ',
                            { text: 'checklista audytu Google Ads', href: '/blog/audyt-konta-google-ads-checklista' },
                            ': 30 rzeczy do sprawdzenia, zanim zlecisz audyt albo zrobisz go samodzielnie.',
                        ],
                    },
                ],
            },
        ],
    },
    'google-ads-dla-b2b-jak-zbierac-leady': {
        links: [],
        sections: [
            {
                beforeHeading: 'Jak mierzyć efekt?',
                blocks: [
                    {
                        p: [
                            'Gdy kampania B2B już działa, ale leady nie przechodzą do sprzedaży, nie zwiększaj budżetu na ślepo. Najpierw zrób ',
                            { text: 'audyt konta Google Ads', href: '/blog/audyt-konta-google-ads-checklista' },
                            ': sprawdź konwersje, wyszukiwane hasła i wykluczenia.',
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
