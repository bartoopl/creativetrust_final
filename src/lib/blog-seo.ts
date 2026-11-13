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
type AuthoredBlock = { h2: string } | { h3: string } | { p: RichText } | { bullet: RichText } | { number: RichText };

type SectionFix = {
    /** Replaces this Sanity heading and everything up to the next heading of the same or higher rank. */
    replace?: string;
    /** Inserts the blocks right before the heading with this Sanity text. */
    beforeHeading?: string;
    blocks: AuthoredBlock[];
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
    /**
     * Applied to the Sanity content, matched on its current heading text: once an editor
     * renames the heading, the fix stops applying. An insert whose link already exists
     * in Sanity is skipped, so it never doubles.
     */
    sections?: SectionFix[];
    /** Replaces the whole Sanity body; `headings`, `sections`, `paragraphs` and `faq` are then ignored. */
    body?: AuthoredBlock[];
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
    'google-ads-dla-b2b-jak-zbierac-leady': {
        title: 'Google Ads dla B2B: jak pozyskać leady sprzedażowe? Poradnik 2026 | CreativeTrust',
        description:
            'Kampanie Google Ads dla firm B2B krok po kroku: dobór słów kluczowych, formularze, CRM i kwalifikacja leadów. Sprawdź, jak obniżyć koszt pozyskania klienta.',
        links: [],
        // WEW-15: link back to the checklist.
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
    // WEW-19: contextual links from the e-commerce posts to the three core service pages.
    // One link per post, placed in the section that actually talks about it; `applySection`
    // skips a post that already links the same page, so nothing doubles.
    'dlaczego-klienci-porzucaja-koszyki-i-jak-temu-zapobiec': {
        links: [],
        sections: [
            {
                beforeHeading: 'Jakie strategie marketingowe pomagają zminimalizować porzucanie koszyków?',
                blocks: [
                    {
                        p: [
                            'Jeśli koszyk wciąż się rozsypuje, a nie wiesz, na którym kroku, sprawdź to na danych: ',
                            { text: 'audyt e-commerce', href: '/uslugi/audyt-e-commerce' },
                            ' pokazuje miejsca, w których klienci odpadają, w 5-7 dni roboczych.',
                        ],
                    },
                ],
            },
        ],
    },
    'jak-uniknac-porzucania-koszykow-podczas-platnosci-online-6-sposobow-poprawiajacych-konwersje': {
        links: [],
        sections: [
            {
                beforeHeading: 'Personalizacja procesu zakupowego',
                blocks: [
                    {
                        p: [
                            'Gdy po tych zmianach konwersja nadal spada, ',
                            { text: 'audyt e-commerce', href: '/uslugi/audyt-e-commerce' },
                            ' pokazuje, na którym kroku płatności klienci rezygnują i ile to kosztuje.',
                        ],
                    },
                ],
            },
        ],
    },
    'co-zrobic-kiedy-twoj-sklep-internetowy-nie-sprzedaje-6-praktycznych-porad-od-creative-trust': {
        links: [],
        sections: [
            {
                beforeHeading: '2. Poprawa jakości zdjęć produktów',
                blocks: [
                    {
                        p: [
                            'Jeśli po tych sprawdzeniach nadal nie wiesz, gdzie sklep traci zamówienia, ',
                            { text: 'audyt e-commerce', href: '/uslugi/audyt-e-commerce' },
                            ' odpowiada na to w 5-7 dni roboczych, za stałą kwotę znaną z góry.',
                        ],
                    },
                ],
            },
        ],
    },
    'google-ads-dla-sklepu-internetowego-od-czego-zaczac': {
        links: [],
        sections: [
            {
                beforeHeading: 'Podsumowanie',
                blocks: [
                    {
                        p: [
                            'Zanim zwiększysz budżet, sprawdź, czy sklep nie traci zamówień na ścieżce zakupowej: ',
                            { text: 'audyt e-commerce', href: '/uslugi/audyt-e-commerce' },
                            ' pokazuje to na danych, nie na wrażeniach.',
                        ],
                    },
                ],
            },
        ],
    },
    'e-commerce-na-wordpressie-dlaczego-warto-rozwazyc-woocommerce': {
        links: [],
        sections: [
            {
                beforeHeading: 'Dlaczego WooCommerce to tak dobry wybór?',
                blocks: [
                    {
                        p: [
                            'Gdy WooCommerce zaczyna ograniczać rozwój sklepu, prowadzimy ',
                            { text: 'wdrożenie i rozwój e-commerce', href: '/uslugi/e-commerce' },
                            ' na architekturze, która znosi te ograniczenia.',
                        ],
                    },
                ],
            },
        ],
    },
    'jak-stworzyc-skuteczny-sklep-internetowy-6-czynnikow-ktore-musisz-wziac-pod-uwage': {
        links: [],
        sections: [
            {
                beforeHeading: 'Podsumowanie',
                blocks: [
                    {
                        p: [
                            'Technologia i integracje z tej listy to nasza codzienna praca: zobacz, jak wygląda ',
                            { text: 'budowa i rozwój sklepu', href: '/uslugi/e-commerce' },
                            '.',
                        ],
                    },
                ],
            },
        ],
    },
    'wzrost-czy-marza-ecommerce': {
        links: [],
        sections: [
            {
                beforeHeading: 'Trzy pytania przed każdą decyzją o budżecie',
                blocks: [
                    {
                        p: [
                            'Jeśli brakuje osoby, która pilnuje tych liczb na bieżąco, ',
                            { text: 'zarządzanie e-commerce', href: '/uslugi/zarzadzanie-e-commerce' },
                            ' obejmuje marżę, kanały i decyzje budżetowe.',
                        ],
                    },
                ],
            },
        ],
    },
    '7-najwazniejszych-metryk-email-marketingowych-dla-e-commerce': {
        links: [],
        sections: [
            {
                beforeHeading: 'Podsumowanie',
                blocks: [
                    {
                        p: [
                            'Metryki e-maila nabierają sensu dopiero razem z marżą i kosztem pozyskania zamówienia; taki obraz sklepu prowadzimy w ramach ',
                            { text: 'zarządzania e-commerce', href: '/uslugi/zarzadzanie-e-commerce' },
                            '.',
                        ],
                    },
                ],
            },
        ],
    },
    // WEW-20: one contextual link per website-related post to /uslugi/strony-www.
    // Posts about shops or unrelated topics stay untouched.
    'jak-stworzyc-skuteczna-strone-internetowa-dla-twojego-biznesu': {
        links: [],
        sections: [
            {
                beforeHeading: '2. Projektowanie UX/UI – Klucz do Sukcesu',
                blocks: [
                    {
                        p: [
                            'Etapy z tego tekstu pokrywa nasza usługa: ',
                            { text: 'strony internetowe dla firm', href: '/uslugi/strony-www' },
                            ' od briefu, przez UX, po wdrożenie i SEO.',
                        ],
                    },
                ],
            },
        ],
    },
    'strona-glowna-ktora-generuje-klikniecia-to-mozliwe-poznaj-7-praktycznych-rad': {
        links: [],
        sections: [
            {
                beforeHeading: '3. Wyróżniaj elementy strony.',
                blocks: [
                    {
                        p: [
                            'Stronę główną zawsze projektujemy razem z całą witryną, żeby nawigacja i treść trzymały jeden plan: tak wyglądają nasze ',
                            { text: 'strony internetowe dla firm', href: '/uslugi/strony-www' },
                            '.',
                        ],
                    },
                ],
            },
        ],
    },
    '10-najczesciej-popelnianych-bledow-podczas-tworzenia-strony-internetowej': {
        links: [],
        sections: [
            {
                beforeHeading: 'Ukryte ceny oraz opłaty.',
                blocks: [
                    {
                        p: [
                            'Większość z tych błędów wynika ze struktury i decyzji projektowych, a nie z technologii; tak budujemy ',
                            { text: 'strony internetowe dla firm', href: '/uslugi/strony-www' },
                            ', żeby ich nie powtarzać.',
                        ],
                    },
                ],
            },
        ],
    },
    'optymalne-strategie-pozycjonowania-stron-internetowych-jak-wyroznic-sie-w-sieci': {
        links: [],
        sections: [
            {
                beforeHeading: 'Wnioski: Dlaczego Pozycjonowanie Jest Kluczowe?',
                blocks: [
                    {
                        p: [
                            'Pozycjonowanie zaczyna się od strony technicznej: ',
                            { text: 'strony internetowe dla firm', href: '/uslugi/strony-www' },
                            ' oddajemy z semantyczną strukturą, danymi i szybkością gotową pod SEO.',
                        ],
                    },
                ],
            },
        ],
    },
    'kompleksowa-usluga-budowy-strony-www-klucz-do-sukcesu-twojej-firmy': {
        links: [],
        sections: [
            {
                beforeHeading: 'Korzyść 1: Profesjonalizm i Doświadczenie',
                blocks: [
                    {
                        p: [
                            'Cały ten zakres prowadzimy jako jedną usługę: ',
                            { text: 'strony internetowe dla firm', href: '/uslugi/strony-www' },
                            ' od briefu do startu i rozwoju.',
                        ],
                    },
                ],
            },
        ],
    },
    'dlaczego-oparcie-strony-internetowej-o-page-builder-to-nie-taki-zly-pomysl': {
        links: [],
        sections: [
            {
                beforeHeading: 'Koszty utworzenia',
                blocks: [
                    {
                        p: [
                            'Page builder nie zwalnia z myślenia o wydajności i strukturze: nasze ',
                            { text: 'strony internetowe dla firm', href: '/uslugi/strony-www' },
                            ' projektujemy tak, żeby były szybkie i łatwe w edycji.',
                        ],
                    },
                ],
            },
        ],
    },
    'kiedy-mega-menu-jest-fajne-a-kiedy-nie': {
        links: [],
        sections: [
            {
                beforeHeading: 'Kiedy nie używać mega menu.',
                blocks: [
                    {
                        p: [
                            'Nawigację projektujemy razem z architekturą treści, więc mega menu nie żyje własnym życiem: zobacz nasze ',
                            { text: 'strony internetowe dla firm', href: '/uslugi/strony-www' },
                            '.',
                        ],
                    },
                ],
            },
        ],
    },
    'jaka-powinna-byc-i-ile-kosztuje-strona-internetowa': {
        links: [],
        sections: [
            {
                beforeHeading: 'Zoptymalizowana pod kątem SEO',
                blocks: [
                    {
                        p: [
                            'Tak zbudowane strony projektujemy i wdrażamy jako ',
                            { text: 'strony internetowe dla firm', href: '/uslugi/strony-www' },
                            '.',
                        ],
                    },
                ],
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
        const [style, value] = Object.entries(authored)[0] as ['h2' | 'h3' | 'p' | 'bullet' | 'number', RichText];
        const parts = typeof value === 'string' ? [value] : value;
        const markDefs: Array<{ _type: string; _key: string; href: string }> = [];
        const children = parts.map((part, partIndex) => {
            const spanKey = `${key}-${partIndex}`;
            if (typeof part === 'string') return { _type: 'span', _key: spanKey, text: part, marks: [] };
            markDefs.push({ _type: 'link', _key: `${spanKey}-link`, href: part.href });
            return { _type: 'span', _key: spanKey, text: part.text, marks: [`${spanKey}-link`] };
        });
        const list = style === 'bullet' || style === 'number' ? { listItem: style, level: 1 } : {};

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

    const { title, description, heading, headings = [], sections = [], paragraphs = [], faq, body } = config;
    const fixed = post.content
        ? sections.reduce((content, fix, index) => applySection(content, fix, `seo-${index}`), post.content)
        : post.content;
    const withFaq = fixed && faq ? insertFaq(fixed, faq) : fixed;

    return {
        ...post,
        title: heading ?? post.title,
        seoTitle: title ?? post.seoTitle,
        seoDescription: description ?? post.seoDescription,
        content: body ? toPortableText(body, 'seo') : withFaq?.map((block) => fixParagraph(fixHeading(block, headings), paragraphs)),
    };
}
