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

/** Text with optional links: `['Zobacz ', { text: 'cennik', href: '/cennik' }, '.']`. */
type Rich = string | Array<string | { text: string; href: string }>;

/** A body written in code. `toPortableText` turns it into the blocks Sanity would send. */
type AuthoredBlock = { h2: string } | { h3: string } | { p: Rich } | { bullet: Rich } | { number: Rich };

type BlogSeoConfig = {
    /** Rendered as is, without the site-wide `| CreativeTrust` suffix. */
    title?: string;
    description?: string;
    links: SeoLink[];
    /** H1, when it differs from the Sanity title. */
    heading?: string;
    headings?: HeadingFix[];
    inlineLink?: InlineLink;
    /** Replaces the whole Sanity body; `headings` and `inlineLink` are then ignored. */
    body?: AuthoredBlock[];
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
    // WEW-18: the page for „co to jest ssl”. /baza-wiedzy/ssl is the short glossary entry and links here.
    'ssl-co-to-jest-i-czy-jest-potrzebne-4-powody-dla-ktorych-powinienes-go-wlaczyc': {
        title: 'Co to jest SSL? Jak działa certyfikat SSL i czy jest potrzebny | CreativeTrust',
        description:
            'SSL to certyfikat szyfrujący połączenie ze stroną (kłódka i https). Wyjaśniamy prosto, jak działa, jakie są rodzaje SSL i jak wpływa na SEO.',
        links: [],
        heading: 'Co to jest SSL i czy jest potrzebny? 4 powody, by go włączyć',
        body: [
            {
                p: 'SSL to certyfikat szyfrujący połączenie między przeglądarką a stroną internetową – dzięki niemu adres zaczyna się od https, a w pasku przeglądarki widać kłódkę.',
            },
            {
                p: [
                    'Szyfrowanie chroni hasła, dane z formularzy i płatności przed przechwyceniem, a certyfikat potwierdza, że łączysz się z prawdziwą stroną, a nie z podróbką. Poniżej wyjaśniamy prosto, jak działa SSL, jakie są rodzaje certyfikatów, jak SSL wpływa na SEO i dlaczego warto go włączyć. Krótką definicję znajdziesz też w słowniku: ',
                    { text: 'SSL w bazie wiedzy', href: '/baza-wiedzy/ssl' },
                    '.',
                ],
            },

            { h2: 'Co to jest SSL?' },
            {
                p: 'SSL (Secure Sockets Layer) to protokół kryptograficzny, który zabezpiecza transmisję danych między serwerem a klientem, na przykład przeglądarką internetową. Odpowiada za trzy rzeczy: poufność (nikt postronny nie odczyta danych), integralność (nikt nie zmieni ich po drodze) i autentyczność (łączysz się z właściwym serwerem).',
            },
            {
                p: 'Pierwotny protokół SSL od lat zastępuje jego następca, TLS (Transport Layer Security), a wszystkie wersje SSL są dziś uznane za niebezpieczne i wyłączone w przeglądarkach. Nazwa jednak została: „certyfikat SSL” to w praktyce certyfikat używany przez TLS. Na stronie widać go jako https:// na początku adresu.',
            },

            { h2: 'Jak działa SSL?' },
            {
                p: 'Gdy otwierasz stronę przez HTTPS, przeglądarka i serwer najpierw uzgadniają bezpieczne połączenie (tzw. SSL/TLS handshake):',
            },
            { number: 'Przeglądarka łączy się z serwerem i podaje, jakie metody szyfrowania obsługuje.' },
            { number: 'Serwer odsyła swój certyfikat SSL z kluczem publicznym.' },
            {
                number: 'Przeglądarka sprawdza, czy certyfikat jest ważny, wystawiony dla tej domeny i podpisany przez zaufany urząd certyfikacji (CA).',
            },
            { number: 'Obie strony ustalają wspólny klucz sesji, którym szyfrują dalszą komunikację.' },
            {
                p: 'Przy uzgadnianiu połączenia używana jest kryptografia asymetryczna, czyli para kluczy: publiczny, dostępny dla każdego, i prywatny, który nigdy nie opuszcza serwera. Same dane szyfrowane są już szybszym szyfrowaniem symetrycznym, kluczem sesji. Nawet jeśli ktoś przechwyci taki ruch, na przykład w publicznej sieci Wi-Fi, zobaczy tylko nieczytelny ciąg znaków.',
            },

            { h2: 'Rodzaje certyfikatów SSL (DV, OV, EV)' },
            {
                p: 'Certyfikaty wydają urzędy certyfikacji (Certificate Authority, CA). Każdy rodzaj szyfruje tak samo – różnią się tym, co CA sprawdza przed wydaniem certyfikatu:',
            },
            {
                bullet: 'DV (Domain Validation) – potwierdza tylko, że kontrolujesz domenę. Wydawany automatycznie w kilka minut, często za darmo (np. Let’s Encrypt). Wystarcza większości stron firmowych i blogów.',
            },
            {
                bullet: 'OV (Organization Validation) – urząd certyfikacji sprawdza też, że firma istnieje, a jej dane trafiają do certyfikatu. Dobry wybór, gdy chcesz pokazać, kto stoi za stroną.',
            },
            {
                bullet: 'EV (Extended Validation) – najdokładniejsza weryfikacja firmy. Przeglądarki już go nie wyróżniają w pasku adresu, więc jego przewaga nad OV jest dziś głównie formalna.',
            },
            {
                p: 'Niezależnie od poziomu weryfikacji certyfikat może obejmować jedną domenę, domenę ze wszystkimi subdomenami (wildcard, np. *.firma.pl) albo kilka różnych domen (multi-domain). Każdy ma ograniczony czas ważności i trzeba go odnawiać – najlepiej automatycznie.',
            },

            { h2: 'Czy SSL jest potrzebny? 4 powody, by go włączyć' },
            { p: 'Tak. SSL to dziś standard, a nie dodatek – także na stronach, które niczego nie sprzedają. Oto 4 powody:' },
            { h3: '1. Bezpieczeństwo danych' },
            {
                p: 'SSL szyfruje wszystko, co użytkownik wysyła na stronę: hasła, dane z formularza kontaktowego, dane do płatności. Bez niego te informacje płyną otwartym tekstem i można je podejrzeć albo podmienić po drodze.',
            },
            { h3: '2. Zaufanie użytkowników' },
            {
                p: 'HTTPS w adresie to sygnał, że dbasz o prywatność odwiedzających. Brak SSL działa odwrotnie: przeglądarki oznaczają takie strony jako „Niezabezpieczona”, a przy formularzach pokazują dodatkowe ostrzeżenia. Wielu użytkowników zamyka wtedy kartę.',
            },
            { h3: '3. Lepsza widoczność w Google' },
            { p: 'Od 2014 roku Google traktuje HTTPS jako jeden z sygnałów rankingowych. Szczegóły opisujemy niżej, w części „SSL a SEO”.' },
            { h3: '4. Zgodność z przepisami' },
            {
                p: 'Jeśli strona zbiera dane osobowe, choćby przez formularz kontaktowy, RODO wymaga ich odpowiedniego zabezpieczenia, a szyfrowanie transmisji jest tu podstawowym środkiem. Sklepy, które przyjmują płatności kartą, muszą dodatkowo spełnić wymagania standardu PCI DSS.',
            },
            {
                p: 'Pamiętaj jednak, że SSL chroni dane w drodze, a nie całą stronę. Aktualizacje, bezpieczny serwer, kopie zapasowe i ochrona przed atakami DDoS to osobne zadania.',
            },

            { h2: 'SSL a SEO' },
            {
                p: 'Google ogłosił HTTPS sygnałem rankingowym w 2014 roku. To sygnał lekki: sam certyfikat nie wypchnie strony na pierwsze miejsce, ale strona bez SSL traci na tle konkurencji, która go ma. Ważniejsze są skutki pośrednie:',
            },
            { bullet: 'ostrzeżenie „Niezabezpieczona” zwiększa liczbę porzuconych wizyt i obniża konwersję,' },
            {
                bullet: 'przeglądarki obsługują szybsze protokoły HTTP/2 i HTTP/3 tylko przez szyfrowane połączenie, a szybkość strony wpływa na Core Web Vitals,',
            },
            {
                bullet: 'przejście z HTTP na HTTPS wymaga przekierowań 301 i poprawy linków wewnętrznych – zrobione niestarannie obniża ruch z Google.',
            },
            {
                p: [
                    'Bezpieczeństwo, szybkość i SEO planujemy razem już na etapie projektu – zobacz, jak wygląda nasze ',
                    { text: 'tworzenie stron www', href: '/uslugi/strony-www' },
                    '.',
                ],
            },

            { h2: 'Jak włączyć SSL na stronie?' },
            {
                number: 'Sprawdź panel hostingu – większość firm hostingowych oferuje darmowy certyfikat Let’s Encrypt, który włącza się jednym kliknięciem i odnawia automatycznie.',
            },
            { number: 'Jeśli potrzebujesz certyfikatu OV lub EV, kup go u dostawcy i zainstaluj na serwerze.' },
            { number: 'Ustaw przekierowanie 301 z http:// na https://, żeby każda wersja adresu prowadziła do bezpiecznej strony.' },
            {
                number: 'Popraw zasoby wczytywane przez http (obrazy, skrypty), żeby uniknąć ostrzeżeń o treści mieszanej (mixed content).',
            },
            { number: 'Zaktualizuj adres strony w Google Search Console, Google Analytics i mapie witryny.' },

            { h2: 'FAQ' },
            { h3: 'Co oznacza skrót SSL?' },
            {
                p: 'Secure Sockets Layer, czyli warstwa bezpiecznych gniazd. To protokół szyfrujący połączenie w internecie. Dziś jego rolę pełni następca, TLS, ale nazwa SSL przyjęła się dla certyfikatów.',
            },
            { h3: 'Czy certyfikat SSL jest darmowy?' },
            {
                p: 'Może być. Certyfikaty DV wydaje bezpłatnie m.in. Let’s Encrypt, a większość hostingów instaluje je automatycznie. Płatne są zwykle certyfikaty OV i EV.',
            },
            { h3: 'Jak sprawdzić, czy strona ma SSL?' },
            {
                p: 'Spójrz na pasek adresu: adres zaczyna się od https://, a obok widać kłódkę lub ikonę ustawień połączenia. Po jej kliknięciu zobaczysz, dla jakiej domeny i przez kogo wystawiono certyfikat oraz do kiedy jest ważny.',
            },
            { h3: 'Co się stanie, gdy certyfikat SSL wygaśnie?' },
            {
                p: 'Przeglądarka wyświetli pełnoekranowe ostrzeżenie, że połączenie nie jest prywatne, i większość odwiedzających nie wejdzie na stronę. Dlatego warto włączyć automatyczne odnawianie i pilnować daty ważności.',
            },
            { h3: 'Czym różni się SSL od TLS?' },
            {
                p: 'TLS to nowsza, bezpieczniejsza wersja protokołu SSL. Wszystkie wersje SSL są dziś wyłączone w przeglądarkach, a połączenia HTTPS korzystają z TLS 1.2 lub 1.3. Potocznie wciąż jednak mówi się „certyfikat SSL”.',
            },

            { h2: 'Podsumowanie' },
            {
                p: 'SSL szyfruje połączenie ze stroną, potwierdza jej tożsamość i jest dziś standardem: chroni dane, buduje zaufanie, pomaga w SEO i ułatwia spełnienie wymogów RODO. Większości stron wystarczy darmowy certyfikat DV z automatycznym odnawianiem. To jednak tylko jeden z elementów bezpieczeństwa – obok aktualizacji, bezpiecznego serwera i kopii zapasowych.',
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

const styles = { h2: 'h2', h3: 'h3', p: 'normal', bullet: 'normal', number: 'normal' } as const;

/** Portable Text needs stable keys; the position in the body is enough for static content. */
function toPortableText(body: AuthoredBlock[]): PortableBlock[] {
    return body.map((authored, index) => {
        const [kind, value] = Object.entries(authored)[0] as [keyof typeof styles, Rich];
        const markDefs: Array<{ _type: 'link'; _key: string; href: string }> = [];
        const children = (typeof value === 'string' ? [value] : value).map((part, spanIndex) => {
            const key = `seo-${index}-${spanIndex}`;
            if (typeof part === 'string') return { _type: 'span', _key: key, text: part, marks: [] };
            markDefs.push({ _type: 'link', _key: `${key}-link`, href: part.href });
            return { _type: 'span', _key: key, text: part.text, marks: [`${key}-link`] };
        });
        const list = kind === 'bullet' || kind === 'number' ? { listItem: kind, level: 1 } : {};
        return { _type: 'block', _key: `seo-${index}`, style: styles[kind], ...list, markDefs, children };
    });
}

/** Overlays the `blog-seo.ts` fixes on a post fetched from Sanity. */
export function applyBlogPostFixes<T extends BlogPostFields>(slug: string, post: T): T {
    const config = blogSeoConfig[slug];
    if (!post || !config) return post;

    const { title, description, heading, headings = [], inlineLink, body } = config;
    const linked = post.content && inlineLink ? insertInlineLink(post.content, inlineLink) : post.content;

    return {
        ...post,
        title: heading ?? post.title,
        seoTitle: title ?? post.seoTitle,
        seoDescription: description ?? post.seoDescription,
        content: body ? toPortableText(body) : linked?.map((block) => fixHeading(block, headings)),
    };
}
