/**
 * Code-side SEO overrides for knowledge-base entries, the counterpart of
 * blog-seo.ts. While a slug is listed here its fields below win over Sanity,
 * so edits to them in the Studio do not reach the site; delete the slug to
 * hand the entry back to the CMS. `title` stays in Sanity on purpose: the A–Z
 * list, breadcrumbs and DefinedTerm keep the short name, `headline` is the H1.
 */

type Inline = string | { text: string; href?: string; strong?: boolean };

type Block = {
    _type: 'block';
    _key: string;
    style: string;
    listItem?: 'bullet' | 'number';
    level?: number;
    markDefs: Array<{ _key: string; _type: 'link'; href: string }>;
    children: Array<{ _type: 'span'; _key: string; text: string; marks: string[] }>;
};

type Draft = { style: string; listItem?: 'bullet' | 'number'; parts: Inline[] };

type KnowledgeBaseOverride = {
    headline: string;
    shortDescription?: string;
    seoDescription?: string;
    content: Block[];
};

const h2 = (text: string): Draft => ({ style: 'h2', parts: [text] });
const h3 = (text: string): Draft => ({ style: 'h3', parts: [text] });
const p = (...parts: Inline[]): Draft => ({ style: 'normal', parts });
const bullet = (...parts: Inline[]): Draft => ({ style: 'normal', listItem: 'bullet', parts });
const numbered = (...parts: Inline[]): Draft => ({ style: 'normal', listItem: 'number', parts });

/** Portable Text needs stable keys; position in the entry is enough for static content. */
function portableText(drafts: Draft[]): Block[] {
    return drafts.map(({ style, listItem, parts }, index) => {
        const markDefs: Block['markDefs'] = [];
        const children = parts.map((part, spanIndex) => {
            const inline = typeof part === 'string' ? { text: part } : part;
            const marks: string[] = inline.strong ? ['strong'] : [];
            if (inline.href) {
                const key = `l${index}-${spanIndex}`;
                markDefs.push({ _key: key, _type: 'link', href: inline.href });
                marks.push(key);
            }
            return { _type: 'span' as const, _key: `s${index}-${spanIndex}`, text: inline.text, marks };
        });
        return { _type: 'block', _key: `b${index}`, style, ...(listItem ? { listItem, level: 1 } : {}), markDefs, children };
    });
}

const overrides: Record<string, KnowledgeBaseOverride> = {
    'sales-manago': {
        headline: 'SALESmanago – co to jest i jak działa platforma marketing automation',
        shortDescription:
            'SALESmanago to platforma marketing automation dla firm, które chcą efektywnie zarządzać relacjami z klientami i personalizować marketing.',
        content: portableText([
            h2('Co to jest SALESmanago'),
            p(
                'SALESmanago to jedna z najbardziej zaawansowanych platform do automatyzacji marketingu, skierowana do firm, które chcą efektywnie zarządzać relacjami z klientami oraz personalizować swoje działania marketingowe. Platforma łączy różnorodne funkcje w jednym systemie, wspierając sprzedaż, marketing i obsługę klienta.',
            ),
            p('Działa w chmurze i zbiera dane o kontaktach w jednym miejscu, a na ich podstawie uruchamia automatyczne działania. W praktyce obejmuje to:'),
            bullet({ text: 'Segmentację kontaktów', strong: true }, ' – precyzyjne grupowanie klientów na podstawie ich zachowań, preferencji czy danych demograficznych.'),
            bullet({ text: 'Personalizację w czasie rzeczywistym', strong: true }, ' – dostosowanie treści na stronie, w e-mailach czy reklamach w oparciu o historię użytkownika.'),
            bullet({ text: 'Automatyzację kampanii e-mailowych', strong: true }, ' – spersonalizowane kampanie dopasowane do cyklu życia klienta.'),
            bullet({ text: 'Zarządzanie leadami', strong: true }, ' – identyfikację potencjalnych klientów i ich ocenę (lead scoring).'),
            bullet({ text: 'Analitykę i raportowanie', strong: true }, ' – szczegółowe raporty z kampanii i analizę ich efektywności.'),

            h2('Najważniejsze funkcje'),
            h3('Customer Data Platform (CDP)'),
            p('SALESmanago integruje dane klientów z różnych kanałów, tworząc pełny obraz ich zachowań i preferencji. Centralizacja danych wspiera efektywność działań marketingowych.'),
            h3('Marketing automation'),
            p('Platforma pozwala tworzyć wieloetapowe scenariusze marketingowe, takie jak kampanie lead nurturing, przypomnienia o porzuconym koszyku czy rekomendacje produktów.'),
            h3('E-mail i SMS marketing'),
            p('Kampanie e-mailowe i SMS-owe mogą być w pełni zautomatyzowane i personalizowane, co zwiększa zaangażowanie odbiorców.'),
            h3('Integracja z e-commerce'),
            p('SALESmanago wspiera integrację z popularnymi platformami e-commerce, co umożliwia m.in. analizę zachowań zakupowych i rekomendacje produktów w czasie rzeczywistym.'),
            h3('Analityka predykcyjna'),
            p('Dzięki sztucznej inteligencji platforma przewiduje zachowania klientów, pomagając marketerom podejmować bardziej świadome decyzje.'),
            h3('Przykłady zastosowania'),
            bullet({ text: 'E-commerce:', strong: true }, ' automatyczne przypomnienia o porzuconych koszykach i rekomendacje produktów.'),
            bullet({ text: 'Branża B2B:', strong: true }, ' lead scoring i kampanie nurturingowe zwiększające skuteczność zespołu sprzedażowego.'),
            bullet({ text: 'Eventy i konferencje:', strong: true }, ' zarządzanie bazą kontaktów i automatyczne przypomnienia o wydarzeniach.'),

            h2('Ile kosztuje SALESmanago'),
            p('Na koszt korzystania z SALESmanago składają się dwie części: licencja na platformę oraz praca nad wdrożeniem i rozwojem automatyzacji. Aktualną cenę licencji dla swojej firmy najlepiej potwierdzić w indywidualnej ofercie.'),
            p('Żeby wycena była miarodajna, warto przygotować wcześniej:'),
            bullet('wielkość bazy kontaktów i tempo jej wzrostu,'),
            bullet('kanały, w których chcesz komunikować się z klientami,'),
            bullet('systemy do zintegrowania, np. sklep internetowy lub CRM,'),
            bullet('listę scenariuszy, które mają działać od pierwszego dnia.'),
            p('Koszt wdrożenia zależy przede wszystkim od zakresu: liczby integracji, segmentów i scenariuszy oraz stanu danych, z których platforma ma korzystać.'),

            h2('SALESmanago a inne platformy marketing automation'),
            p('Platformy marketing automation różnią się nie tyle listą funkcji, ile tym, jak dobrze pasują do danych i procesów konkretnej firmy. Mocną stroną SALESmanago jest połączenie w jednym systemie danych o klientach (CDP), automatyzacji, personalizacji i analityki predykcyjnej.'),
            p('Porównując SALESmanago z innymi narzędziami, sprawdź przede wszystkim:'),
            bullet({ text: 'Dane', strong: true }, ' – czy platforma połączy informacje ze strony, sklepu i CRM w jeden profil klienta.'),
            bullet({ text: 'Integracje', strong: true }, ' – czy współpracuje z systemami, których już używasz.'),
            bullet({ text: 'Kanały', strong: true }, ' – czy obsłuży wszystkie miejsca kontaktu z klientem, nie tylko e-mail.'),
            bullet({ text: 'Skalę', strong: true }, ' – czy poradzi sobie z rosnącą bazą kontaktów i liczbą scenariuszy.'),
            bullet({ text: 'Zespół', strong: true }, ' – kto będzie tworzyć i rozwijać automatyzacje po wdrożeniu.'),

            h2('Wdrożenie SALESmanago z agencją'),
            p(
                'Samo konto w platformie nie daje efektów – wynik zależy od danych, segmentów i scenariuszy. CreativeTrust jest partnerem SALESmanago od 2024 roku i prowadzi ',
                { text: 'wdrożenia SALESmanago', href: '/uslugi/wdrozenie-salesmanago' },
                ' od audytu po rozwój automatyzacji:',
            ),
            numbered({ text: 'Audyt i architektura', strong: true }, ' – dane, źródła leadów, integracje i miejsce, w którym automatyzacja da największy zwrot.'),
            numbered({ text: 'Konfiguracja', strong: true }, ' – konto, tracking, segmenty, zdarzenia i podstawowe reguły scoringowe.'),
            numbered({ text: 'Scenariusze i lejki', strong: true }, ' – welcome flow, lead nurturing i odzyskiwanie kontaktu.'),
            numbered({ text: 'Pomiar i rozwój', strong: true }, ' – raportowanie, testy i optymalizacja.'),
            p('Szerszy zakres, w tym integracje CRM i AI w kampaniach, opisujemy na stronie usługi ', { text: 'marketing automation dla firm', href: '/uslugi/marketing-automation' }, '.'),
        ]),
    },
    cps: {
        headline: 'CPS (Cost Per Sale) – co to jest i jak obliczyć',
        seoDescription:
            'CPS (Cost Per Sale) to koszt jednej sprzedaży. CPS = koszt kampanii / liczba sprzedaży. Zobacz przykład obliczenia i porównanie z CPA i ROAS.',
        content: portableText([
            h2('Co to jest CPS'),
            p('CPS (ang. Cost Per Sale) to koszt uzyskania jednej sprzedaży, a zarazem model rozliczeń w marketingu internetowym, w którym reklamodawca płaci tylko za sprzedaż zrealizowaną dzięki kampanii. W przeciwieństwie do modelu CPC płatność następuje dopiero po wygenerowaniu rzeczywistego przychodu.'),
            p('CPS opiera się na efektywności – jeśli reklama nie przyniesie sprzedaży, reklamodawca nie ponosi kosztu. Ten model jest często stosowany w:'),
            bullet('programach afiliacyjnych,'),
            bullet('marketingu partnerskim,'),
            bullet('działaniach performance marketingowych.'),

            h2('Wzór i przykład obliczenia'),
            p({ text: 'CPS = koszt kampanii / liczba sprzedaży', strong: true }),
            p('Jeśli wydasz 1000 zł i uzyskasz 50 sprzedaży, Twój CPS wynosi 20 zł (1000 zł / 50 = 20 zł).'),

            h2('CPS a CPA i ROAS'),
            p(
                'CPS jest węższy niż ',
                { text: 'CPA', href: '/baza-wiedzy/cpa' },
                ': CPA liczy koszt dowolnej konwersji, np. zakupu, zapisu do newslettera lub wypełnienia formularza, a CPS wyłącznie sprzedaży. Jeśli jedyną mierzoną konwersją jest zakup, oba wskaźniki dają ten sam wynik.',
            ),
            p('ROAS odpowiada na inne pytanie: pokazuje relację przychodu do kosztu reklamy. Gdy kampania za 1000 zł przyniesie 50 sprzedaży o średniej wartości 100 zł, przychód wyniesie 5000 zł, CPS – 20 zł, a ROAS – 5 (500%).'),
            p(
                'Żaden z tych wskaźników nie pokazuje jeszcze zysku, bo nie uwzględnia marży. Więcej o tym w artykule ',
                { text: 'ROAS, CAC i LTV: które metryki naprawdę pokazują opłacalność marketingu', href: '/blog/roas-cac-ltv-w-performance-marketingu' },
                '.',
            ),

            h2('Kiedy stosować model CPS'),
            p('CPS najlepiej sprawdza się w e-commerce i wszędzie tam, gdzie sprzedaż można precyzyjnie przypisać do źródła. To dobry model dla marek, które chcą maksymalnie kontrolować ROI i płacić tylko za faktyczne wyniki sprzedażowe.'),
            h3('Zalety modelu CPS'),
            bullet('Płacisz tylko za efekty – realne transakcje.'),
            bullet('Niskie ryzyko finansowe po stronie reklamodawcy.'),
            bullet('Motywacja dla partnerów i wydawców do generowania konwersji.'),
            h3('Wady i ograniczenia'),
            bullet('Trudniejszy dostęp do wydawców – CPS jest bardziej wymagający niż CPC czy CPM.'),
            bullet('Potrzebna jest precyzyjna analityka i tracking sprzedaży.'),
            bullet('Nie każda branża się nadaje – najlepiej sprawdza się w e-commerce.'),
            h3('Jak optymalizować kampanie CPS'),
            numbered('Dobrze dobierz partnerów afiliacyjnych.'),
            numbered('Zadbaj o atrakcyjną ofertę i wysoki współczynnik konwersji.'),
            numbered('Mierz i analizuj dokładnie ścieżki zakupowe.'),
            numbered('Ustal realistyczny, ale motywujący poziom prowizji.'),
        ]),
    },
};

/** Lays the slug's override over the Sanity document; a missing entry stays missing. */
export function applyKnowledgeBaseSeo<T extends object>(slug: string, entry: T | null): (T & Partial<KnowledgeBaseOverride>) | null {
    const override = Object.hasOwn(overrides, slug) ? overrides[slug] : undefined;
    return entry && override ? { ...entry, ...override } : entry;
}
