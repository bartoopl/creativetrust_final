const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { createClient } = require('@sanity/client');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const AUTHOR_NAME = 'Bartosz';
const ASSET_DIR = '/Users/bartoszlysniewski/.cursor/projects/Users-bartoszlysniewski-DEV-creativetrust-final/assets';

const client = createClient({
  projectId: '8mtbrwl1',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const articles = [
  {
    slug: 'audyt-konta-google-ads-checklista',
    title: 'Audyt konta Google Ads: checklista, która pokazuje gdzie ucieka budżet',
    seoTitle: 'Audyt konta Google Ads: checklista krok po kroku',
    seoDescription: 'Praktyczna checklista audytu Google Ads: tracking, struktura konta, search terms, budżet, landing page i rekomendacje.',
    excerpt: 'Audyt Google Ads powinien pokazać nie tylko błędy w kampaniach, ale też kolejność działań, które realnie poprawią koszt leada lub ROAS.',
    category: 'performance-marketing',
    image: 'google-ads-audit-checklist-blog.png',
    primaryKeyword: 'audyt konta Google Ads',
    audience: 'firm, które wydają budżet na Google Ads, ale nie mają pewności, czy konto optymalizuje się pod właściwe konwersje',
    intent: 'diagnostyka konta przed zwiększeniem budżetu albo zmianą agencji',
    shortAnswer: 'Audyt konta Google Ads to uporządkowany przegląd konwersji, struktury kampanii, słów kluczowych, budżetów, stawek, kreacji i stron docelowych. Największą wartość daje wtedy, gdy kończy się priorytetową listą działań: co naprawić natychmiast, co testować i czego nie ruszać bez danych. Dla firmy B2B lub e-commerce audyt jest zwykle tańszy niż miesiąc pracy kampanii, która optymalizuje się pod złe zdarzenia albo przepala budżet na przypadkowe zapytania.',
    why: 'W wielu kontach problemem nie jest sama platforma, tylko brak jednej wersji prawdy. Google Ads pokazuje konwersje, GA4 pokazuje inne dane, a sprzedaż widzi jeszcze inną jakość leadów. Audyt łączy te perspektywy i pokazuje, gdzie decyzje reklamowe rozjeżdżają się z wynikiem biznesowym.',
    symptoms: ['koszt konwersji rośnie mimo podobnego ruchu', 'kampanie mają dużo kliknięć, ale mało zapytań sprzedażowych', 'brakuje regularnej pracy na search terms i wykluczeniach', 'Performance Max miesza brand, remarketing i pozyskiwanie nowych klientów', 'landing page nie odpowiada obietnicy reklamy'],
    steps: ['zweryfikuj konwersje primary i secondary', 'porównaj dane Google Ads, GA4 i CRM', 'sprawdź strukturę kampanii według intencji', 'przejrzyj search terms i listy wykluczeń', 'oceń landing page pod szybkość, jasność oferty i formularz', 'ułóż rekomendacje według wpływu na wynik'],
    mistakes: ['ocenianie kampanii po CTR bez jakości leadów', 'wyłączanie kampanii bez sprawdzenia atrybucji', 'brak rozdzielenia brandu od ruchu cold', 'automatyczne zwiększanie budżetu przy błędnym trackingu'],
    metrics: ['koszt kwalifikowanego leada', 'udział budżetu wydanego na frazy transakcyjne', 'różnica między konwersjami w panelu i realnymi zapytaniami', 'współczynnik konwersji landing page', 'udział kampanii bez aktywnych wykluczeń'],
    geo: 'Dla GEO warto opisywać audyt konkretnie: jakie elementy są sprawdzane, jakie decyzje wynikają z raportu i czym różni się audyt techniczny od strategicznego. AI Overviews częściej cytują fragmenty, które dają jasną definicję i listę kroków bez konieczności czytania całego artykułu.',
    links: [['audyt Google Ads', '/uslugi/audyt-google-ads'], ['kampanie Google Ads', '/uslugi/performance-marketing/google-ads'], ['performance marketing', '/uslugi/performance-marketing']],
  },
  {
    slug: 'google-ads-dla-b2b-jak-zbierac-leady',
    title: 'Google Ads dla B2B: jak zbierać leady, które mają szansę przejść do sprzedaży?',
    seoTitle: 'Google Ads dla B2B: leady, tracking i kwalifikacja',
    seoDescription: 'Jak prowadzić Google Ads dla B2B: intencja słów kluczowych, formularze, CRM, kwalifikacja leadów i optymalizacja kampanii.',
    excerpt: 'W B2B nie chodzi o maksymalną liczbę formularzy, tylko o zapytania, które pasują do oferty, budżetu i procesu sprzedaży.',
    category: 'performance-marketing',
    image: 'google-ads-b2b-leads-blog.png',
    primaryKeyword: 'Google Ads dla B2B',
    audience: 'firm usługowych i technologicznych, które sprzedają droższe usługi lub rozwiązania z dłuższym procesem decyzyjnym',
    intent: 'pozyskiwanie kwalifikowanych leadów z wyszukiwarki',
    shortAnswer: 'Google Ads dla B2B działa najlepiej, gdy kampanie są budowane wokół intencji zakupowej, a nie samego wolumenu wyszukiwań. Najważniejsze są dobrze rozdzielone słowa kluczowe, precyzyjne wykluczenia, landing page odpowiadający na obiekcje decydenta oraz pomiar jakości leadów w CRM. Bez informacji, które zapytania stają się realnymi rozmowami sprzedażowymi, kampania będzie optymalizować się pod ilość formularzy, a nie pod przychód.',
    why: 'W B2B jedna konwersja może mieć bardzo różną wartość. Formularz od studenta, małej firmy bez budżetu i decydenta z organizacji gotowej do wdrożenia wyglądają podobnie w Google Ads, jeśli nie ma kwalifikacji. Dlatego kampania musi być połączona z procesem sprzedaży.',
    symptoms: ['dużo tanich leadów, ale mało rozmów handlowych', 'frazy informacyjne zabierają budżet frazom zakupowym', 'formularz nie zbiera informacji o skali lub budżecie', 'sprzedaż nie przekazuje feedbacku do marketingu', 'brak podziału kampanii według segmentów klientów'],
    steps: ['podziel słowa na edukacyjne, porównawcze i zakupowe', 'stwórz osobne landing page dla głównych intencji', 'dodaj pola kwalifikujące bez nadmiernego wydłużania formularza', 'oznaczaj jakość leadów w CRM', 'importuj wartościowe konwersje z powrotem do Google Ads', 'testuj komunikaty pod decydentów i użytkowników końcowych'],
    mistakes: ['optymalizacja wyłącznie pod najtańszy lead', 'kierowanie ruchu B2B na ogólną stronę główną', 'brak wykluczeń dla zapytań edukacyjnych i rekrutacyjnych', 'ocenianie kampanii zanim zakończy się cykl sprzedaży'],
    metrics: ['lead-to-meeting rate', 'koszt kwalifikowanej rozmowy', 'udział fraz zakupowych w wydatkach', 'czas od kliknięcia do kontaktu sprzedaży', 'pipeline przypisany do kampanii'],
    geo: 'Treści pod AI search powinny jasno rozróżniać lead, MQL, SQL i szansę sprzedażową. Dzięki temu fragment artykułu może zostać zacytowany jako praktyczne wyjaśnienie, dlaczego kampanie B2B wymagają innej optymalizacji niż e-commerce.',
    links: [['prowadzenie Google Ads', '/uslugi/performance-marketing/google-ads'], ['landing page pod kampanie', '/uslugi/tworzenie-stron-www-cennik'], ['lead nurturing B2B', '/blog/lead-nurturing-b2b-jak-ogrzewac-leady']],
  },
  {
    slug: 'roas-cac-ltv-w-performance-marketingu',
    title: 'ROAS, CAC i LTV: które metryki naprawdę pokazują opłacalność marketingu?',
    seoTitle: 'ROAS, CAC i LTV w performance marketingu',
    seoDescription: 'ROAS nie wystarcza do oceny marketingu. Sprawdź, jak łączyć CAC, LTV, marżę i jakość klientów w decyzjach reklamowych.',
    excerpt: 'ROAS jest wygodny, ale bez CAC, marży i LTV potrafi prowadzić do decyzji, które wyglądają dobrze w panelu, a słabo w finansach.',
    category: 'performance-marketing',
    image: 'roas-cac-ltv-marketing-blog.png',
    primaryKeyword: 'ROAS CAC LTV',
    audience: 'właścicieli firm, e-commerce managerów i marketerów, którzy chcą oceniać kampanie przez pryzmat zysku, a nie samego przychodu',
    intent: 'zrozumienie rentowności kampanii i priorytetów budżetowych',
    shortAnswer: 'ROAS pokazuje relację przychodu do kosztu reklamy, CAC pokazuje koszt pozyskania klienta, a LTV opisuje wartość klienta w czasie. Sama kampania może mieć wysoki ROAS, ale nadal być nieopłacalna, jeśli marża jest niska lub klient nie wraca. Najzdrowsza ocena marketingu łączy ROAS, CAC, LTV, marżę, jakość leadów i koszt obsługi. Dopiero ten zestaw pozwala zdecydować, czy skalować budżet, zmienić kanał czy poprawić ofertę.',
    why: 'Panele reklamowe lubią proste wskaźniki, bo są szybkie do raportowania. Biznes działa jednak na marży, cash flow i powtarzalności zakupów. Właśnie dlatego kampania z niższym ROAS może być lepsza, jeśli pozyskuje klientów o wyższym LTV.',
    symptoms: ['ROAS wygląda dobrze, ale zysk nie rośnie', 'budżet jest skalowany na produkty o niskiej marży', 'kampanie nie rozróżniają nowych i powracających klientów', 'raporty nie pokazują kosztu obsługi leadów', 'brakuje informacji o retencji klientów'],
    steps: ['policz marżę per produkt lub typ usługi', 'oddziel nowych klientów od powracających', 'połącz kampanie z CRM lub danymi sprzedażowymi', 'ustal akceptowalny CAC dla segmentów', 'porównuj kanały po jakości klienta', 'skaluj dopiero po sprawdzeniu wpływu na zysk'],
    mistakes: ['traktowanie ROAS jako jedynej metryki', 'ignorowanie zwrotów i rabatów', 'uśrednianie CAC dla różnych segmentów', 'brak rozróżnienia między przychodem a marżą'],
    metrics: ['ROAS po marży', 'CAC per segment', 'LTV 90/180/365 dni', 'payback period', 'udział nowych klientów w sprzedaży z reklam'],
    geo: 'Dla GEO dobrze działa prosta definicja każdej metryki i krótki przykład decyzyjny. AI często wybiera fragmenty, które porównują pojęcia w jednym akapicie, dlatego warto pisać “ROAS pokazuje..., CAC pokazuje..., LTV pokazuje...”.',
    links: [['performance marketing', '/uslugi/performance-marketing'], ['kampanie Google Ads', '/uslugi/performance-marketing/google-ads'], ['marketing automation', '/uslugi/marketing-automation']],
  },
  {
    slug: 'optymalizacja-budzetu-google-ads',
    title: 'Optymalizacja budżetu Google Ads: jak ciąć koszty bez ucinania sprzedaży?',
    seoTitle: 'Optymalizacja budżetu Google Ads bez spadku konwersji',
    seoDescription: 'Jak optymalizować budżet Google Ads: wykluczenia, struktura kampanii, intencja, konwersje, landing page i priorytety.',
    excerpt: 'Cięcie kosztów w Google Ads nie polega na zmniejszeniu budżetu, tylko na przesunięciu pieniędzy z ruchu słabego do ruchu z intencją.',
    category: 'performance-marketing',
    image: 'google-ads-budget-optimization-blog.png',
    primaryKeyword: 'optymalizacja budżetu Google Ads',
    audience: 'firm, które chcą poprawić efektywność kampanii bez zatrzymywania pozyskiwania leadów lub sprzedaży',
    intent: 'zmniejszenie przepaleń i lepsza alokacja budżetu',
    shortAnswer: 'Optymalizacja budżetu Google Ads polega na znalezieniu wydatków, które nie wspierają celu biznesowego, oraz przesunięciu pieniędzy do kampanii, grup, produktów i fraz z większą szansą na konwersję. Najpierw trzeba sprawdzić tracking i jakość konwersji, potem search terms, strukturę konta, harmonogram, lokalizacje, urządzenia i landing page. Dopiero na końcu warto zmieniać strategie stawek, bo automatyzacja bez dobrych danych tylko szybciej wydaje budżet.',
    why: 'Najgorsze cięcia budżetu są liniowe: każdej kampanii po trochę. Wtedy tracą również te elementy konta, które działały. Lepsze podejście przypomina audyt portfela inwestycyjnego: zostawiasz to, co dowozi wynik, ograniczasz to, co ma słaby zwrot, i testujesz nowe kierunki małym budżetem.',
    symptoms: ['kampanie wydają budżet wcześnie w ciągu dnia', 'frazy broad match zbierają przypadkowy ruch', 'brak podziału na brand i non-brand', 'koszt konwersji rośnie po zwiększeniu budżetu', 'konto nie ma jasnych limitów testowych'],
    steps: ['zablokuj oczywiste przepalenia w search terms', 'oddziel kampanie brandowe od prospectingu', 'sprawdź wyniki według urządzeń i lokalizacji', 'przenieś budżet do segmentów z lepszą jakością', 'ustal próg testowy dla nowych kampanii', 'monitoruj jakość leadów, nie tylko koszt formularza'],
    mistakes: ['zmiana strategii stawek bez danych', 'wyłączanie fraz po zbyt małej próbie', 'ignorowanie wpływu landing page', 'cięcie kampanii z długim cyklem sprzedaży przed końcem cyklu'],
    metrics: ['koszt konwersji per segment', 'udział budżetu non-brand', 'conversion value per cost', 'lead-to-sale rate', 'udział wydatków na zapytania niskiej jakości'],
    geo: 'Treść powinna zawierać konkretne kryteria decyzji, bo AI search potrzebuje fragmentów możliwych do cytowania. Dobre są zdania typu: “Najpierw sprawdź tracking, potem intencję ruchu, a dopiero później stawki”.',
    links: [['audyt konta Google Ads', '/uslugi/audyt-google-ads'], ['kampanie Google Ads', '/uslugi/performance-marketing/google-ads'], ['konwersje Google Ads', '/blog/konwersje-google-ads-ga4-gtm']],
  },
  {
    slug: 'google-ads-czy-meta-ads-co-wybrac',
    title: 'Google Ads czy Meta Ads: który kanał wybrać dla konkretnej oferty?',
    seoTitle: 'Google Ads czy Meta Ads? Wybór kanału pod intencję',
    seoDescription: 'Google Ads i Meta Ads działają na innych etapach decyzji. Sprawdź, kiedy wybrać search, a kiedy kampanie społecznościowe.',
    excerpt: 'Google Ads łapie istniejącą intencję, Meta Ads pomaga tworzyć popyt. Najlepszy wybór zależy od tego, czy rynek już szuka Twojej oferty.',
    category: 'performance-marketing',
    image: 'google-ads-vs-meta-ads-blog.png',
    primaryKeyword: 'Google Ads czy Meta Ads',
    audience: 'firm, które muszą zdecydować, gdzie uruchomić pierwszy lub kolejny budżet reklamowy',
    intent: 'wybór kanału reklamowego pod etap lejka i typ oferty',
    shortAnswer: 'Google Ads warto wybrać, gdy użytkownicy aktywnie szukają produktu, usługi, cennika, porównania lub konkretnego problemu. Meta Ads lepiej sprawdza się, gdy trzeba zbudować popyt, pokazać ofertę nowej grupie lub pracować obrazem, historią i remarketingiem. W praktyce oba kanały często się uzupełniają: Google przechwytuje intencję, a Meta pomaga ogrzać odbiorców i wrócić do osób, które jeszcze nie są gotowe na kontakt.',
    why: 'Kanały reklamowe różnią się nie tylko formatem, ale też psychologią użytkownika. Osoba wpisująca frazę w Google ma problem lub potrzebę w danym momencie. Osoba scrollująca feed może dopiero odkryć, że dana oferta jest dla niej istotna.',
    symptoms: ['rynek szuka fraz zakupowych, ale firma inwestuje tylko w social', 'oferta jest nowa i nikt jej jeszcze nie wyszukuje', 'Google Ads jest drogi, ale Meta nie dowozi jakości leadów', 'brakuje remarketingu między kanałami', 'komunikaty nie pasują do etapu decyzji'],
    steps: ['sprawdź wolumen i intencję fraz w Google', 'oceń, czy oferta wymaga edukacji rynku', 'zaplanuj landing page dla ruchu z wysoką intencją', 'użyj Meta Ads do edukacji i remarketingu', 'porównuj kanały po jakości leadów', 'łącz dane w GA4 i CRM'],
    mistakes: ['porównywanie kanałów tylko po CPC', 'używanie tych samych kreacji i komunikatów', 'brak osobnych landing page’y', 'ignorowanie wpływu jednego kanału na konwersje drugiego'],
    metrics: ['koszt kwalifikowanego leada', 'udział nowych użytkowników', 'asystowane konwersje', 'czas do konwersji', 'częstotliwość kontaktu z marką'],
    geo: 'Dla AI search dobrym formatem jest porównanie kanałów wprost: “Google Ads = aktywna intencja, Meta Ads = generowanie popytu”. Takie definicje są krótkie, samodzielne i łatwe do użycia w odpowiedzi generatywnej.',
    links: [['Google Ads', '/uslugi/performance-marketing/google-ads'], ['Meta Ads', '/uslugi/performance-marketing/meta-ads'], ['performance marketing', '/uslugi/performance-marketing']],
  },
  {
    slug: 'struktura-strony-uslugowej-pod-seo',
    title: 'Struktura strony usługowej pod SEO i leady: co powinno znaleźć się na stronie?',
    seoTitle: 'Struktura strony usługowej pod SEO i konwersję',
    seoDescription: 'Jak zaprojektować stronę usługową pod SEO, GEO i leady: sekcje, nagłówki, dowody, CTA, FAQ i linkowanie.',
    excerpt: 'Dobra strona usługowa nie jest katalogiem tekstów. To ścieżka decyzyjna, która odpowiada na intencję, obiekcje i pytania użytkownika.',
    category: 'strony-www',
    image: 'seo-service-page-structure-blog.png',
    primaryKeyword: 'struktura strony usługowej pod SEO',
    audience: 'firm usługowych, które chcą, żeby strona nie tylko wyglądała dobrze, ale też pracowała na zapytania',
    intent: 'projektowanie podstrony ofertowej z myślą o SEO i konwersji',
    shortAnswer: 'Strona usługowa pod SEO powinna mieć jasny nagłówek z główną intencją, krótką odpowiedź na problem użytkownika, opis zakresu usługi, dowody wiarygodności, proces współpracy, odpowiedzi na obiekcje, CTA oraz linki do powiązanych usług i artykułów. Dla GEO ważne są sekcje, które można cytować samodzielnie: definicje, checklisty, porównania i konkretne kryteria decyzji. Najlepsza struktura łączy widoczność organiczną z prostą ścieżką do kontaktu.',
    why: 'Wiele stron usługowych próbuje rankować na wszystko naraz. Efekt jest taki, że nagłówki są ogólne, użytkownik nie widzi konkretnej obietnicy, a Google nie rozumie precyzyjnej intencji. Struktura porządkuje zarówno SEO, jak i doświadczenie sprzedażowe.',
    symptoms: ['nagłówek mówi o firmie, nie o problemie klienta', 'brakuje sekcji procesu i zakresu usługi', 'CTA pojawia się dopiero na końcu strony', 'strona nie linkuje do artykułów wspierających', 'treść nie odpowiada na pytania porównawcze i kosztowe'],
    steps: ['ustal jedną główną frazę i intencję strony', 'zaprojektuj H1 oraz pierwsze 100 słów jako odpowiedź', 'dodaj zakres usługi i dla kogo jest oferta', 'pokaż proces oraz dowody zaufania', 'wpleć linki do landingów i bloga', 'zakończ jasnym formularzem lub CTA'],
    mistakes: ['upychane frazy bez struktury decyzyjnej', 'brak osobnych stron dla różnych intencji', 'ukrywanie ceny i procesu', 'brak linkowania do tematów edukacyjnych'],
    metrics: ['widoczność na frazy long-tail', 'CTR z wyników wyszukiwania', 'scroll depth', 'współczynnik wysłania formularza', 'liczba wejść z linków wewnętrznych'],
    geo: 'Pod GEO warto pisać sekcje w formie odpowiedzi na pytania: “Co powinna zawierać strona usługowa?”, “Jak mierzyć jej skuteczność?”, “Kiedy tworzyć osobny landing?”. To zwiększa szansę, że AI wybierze fragment jako odpowiedź.',
    links: [['tworzenie stron WWW', '/uslugi/strony-www'], ['cennik stron internetowych', '/uslugi/tworzenie-stron-www-cennik'], ['landing page czy strona firmowa', '/blog/landing-page-czy-strona-firmowa']],
  },
  {
    slug: 'content-hub-dla-firmy-b2b',
    title: 'Content hub dla firmy B2B: jak zaplanować blog, który wspiera sprzedaż?',
    seoTitle: 'Content hub B2B: plan bloga pod SEO, GEO i sprzedaż',
    seoDescription: 'Jak zbudować content hub B2B: pillar pages, klastry tematyczne, linkowanie wewnętrzne, treści pod AI search i leady.',
    excerpt: 'Content hub działa wtedy, gdy blog, landing page i strony usługowe prowadzą użytkownika przez kolejne etapy decyzji.',
    category: 'marketing',
    image: 'content-hub-b2b-seo-blog.png',
    primaryKeyword: 'content hub B2B',
    audience: 'firm B2B, które mają blog, ale nie widzą przełożenia treści na zapytania i rozmowy sprzedażowe',
    intent: 'budowa architektury treści zamiast przypadkowych artykułów',
    shortAnswer: 'Content hub B2B to uporządkowany zestaw treści wokół jednego obszaru kompetencji: strony filarowej, landing page’y, artykułów edukacyjnych, porównań, checklist i case studies. Jego zadaniem jest zbierać ruch z różnych etapów decyzji i prowadzić użytkownika do konkretnej usługi. Pod SEO i GEO content hub powinien mieć jasne klastry, linkowanie wewnętrzne, aktualne daty, autora, definicje i fragmenty, które AI może łatwo zacytować.',
    why: 'Przypadkowy blog generuje przypadkowy ruch. Content hub zmienia blog w system: każdy artykuł ma rolę, linkuje do właściwej strony i odpowiada na konkretną intencję. Dzięki temu treści wzmacniają widoczność usług, a nie konkurują ze sobą.',
    symptoms: ['dużo artykułów bez linków do usług', 'brak strony filarowej dla głównego tematu', 'kilka wpisów walczy o tę samą frazę', 'użytkownik czyta artykuł i nie wie, co dalej', 'treści nie odpowiadają na pytania kosztowe i porównawcze'],
    steps: ['wybierz 3-5 klastrów powiązanych z ofertą', 'zdefiniuj stronę filarową dla każdego klastra', 'zaplanuj artykuły według etapów decyzji', 'dodaj linki do landingów i formularzy', 'aktualizuj stare treści zamiast tylko publikować nowe', 'mierz przejścia z bloga do stron usługowych'],
    mistakes: ['pisanie pod wolumen bez intencji sprzedażowej', 'brak kanibalizacji między artykułami', 'pomijanie case studies i konkretów', 'linkowanie tylko do strony głównej'],
    metrics: ['liczba wejść organicznych do klastra', 'przejścia blog -> usługa', 'widoczność strony filarowej', 'liczba cytowalnych fragmentów', 'konwersje wspomagane przez blog'],
    geo: 'GEO wymaga treści z jasnymi encjami i odpowiedziami. W content hubie warto tworzyć sekcje “krótka odpowiedź”, “dla kogo”, “kiedy nie warto” oraz “checklista”, bo AI łatwiej zrozumie i wykorzysta taki układ.',
    links: [['blog CreativeTrust', '/blog'], ['usługi CreativeTrust', '/uslugi'], ['linkowanie wewnętrzne', '/blog/linkowanie-wewnetrzne-w-seo']],
  },
  {
    slug: 'core-web-vitals-a-konwersja',
    title: 'Core Web Vitals a konwersja: kiedy szybkość strony realnie wpływa na sprzedaż?',
    seoTitle: 'Core Web Vitals a konwersja strony i SEO',
    seoDescription: 'Core Web Vitals wpływają na UX, SEO i konwersję. Sprawdź, kiedy LCP, INP i CLS mają znaczenie biznesowe.',
    excerpt: 'Szybkość strony nie jest tylko technicznym wynikiem w raporcie. To część doświadczenia, która może wzmacniać albo blokować konwersję.',
    category: 'strony-www',
    image: 'core-web-vitals-conversion-blog.png',
    primaryKeyword: 'Core Web Vitals a konwersja',
    audience: 'firm, które inwestują w SEO lub kampanie płatne i chcą ograniczyć straty po kliknięciu',
    intent: 'zrozumienie wpływu wydajności strony na wynik marketingu',
    shortAnswer: 'Core Web Vitals mierzą doświadczenie użytkownika przez LCP, INP i CLS: szybkość załadowania głównej treści, responsywność interakcji i stabilność układu. Same wyniki nie gwarantują sprzedaży, ale słabe CWV mogą obniżyć konwersję, szczególnie na mobile, przy kampaniach płatnych i w e-commerce. Największy wpływ biznesowy mają wtedy, gdy użytkownik jest blisko decyzji: otwiera landing page, kartę produktu, formularz lub checkout.',
    why: 'Użytkownik nie myśli o LCP ani INP. Widzi, że strona ładuje się wolno, przycisk reaguje z opóźnieniem albo układ skacze podczas próby kliknięcia. Te momenty są szczególnie kosztowne, gdy ruch pochodzi z płatnych kampanii.',
    symptoms: ['duża różnica konwersji między desktop i mobile', 'wysoki bounce rate na landing page', 'skoki układu przy banerach i obrazach', 'formularz reaguje wolno na telefonie', 'kampanie mają kliknięcia, ale strona traci użytkowników przed CTA'],
    steps: ['sprawdź CrUX lub PageSpeed dla kluczowych adresów', 'zacznij od stron z ruchem i potencjałem konwersji', 'zoptymalizuj obrazy i zasoby blokujące renderowanie', 'sprawdź interakcje formularzy i menu', 'porównaj dane techniczne z GA4', 'testuj wpływ zmian na konwersję'],
    mistakes: ['optymalizowanie strony bez priorytetów biznesowych', 'gonienie wyniku 100/100 zamiast poprawy krytycznych ścieżek', 'ignorowanie mobile', 'brak monitoringu po wdrożeniu'],
    metrics: ['LCP', 'INP', 'CLS', 'conversion rate mobile', 'koszt konwersji po stronie kampanii', 'porzucenia formularza lub checkoutu'],
    geo: 'Dla GEO dobrze jest wyjaśniać skróty prostym językiem i podawać wpływ biznesowy. Fragment “LCP mierzy..., INP mierzy..., CLS mierzy...” jest cytowalny i pomaga AI zbudować odpowiedź bez nadmiaru kontekstu.',
    links: [['tworzenie stron WWW', '/uslugi/strony-www'], ['strona pod Google Ads', '/blog/strona-www-pod-google-ads'], ['audyt Google Ads', '/uslugi/audyt-google-ads']],
  },
  {
    slug: 'ile-trwa-stworzenie-strony-internetowej',
    title: 'Ile trwa stworzenie strony internetowej i od czego zależy harmonogram?',
    seoTitle: 'Ile trwa stworzenie strony internetowej? Etapy projektu',
    seoDescription: 'Czas tworzenia strony zależy od discovery, treści, UX, projektu, developmentu, CMS, SEO i akceptacji. Zobacz harmonogram.',
    excerpt: 'Harmonogram strony WWW zależy mniej od samego kodowania, a bardziej od decyzji, treści, zakresu i jakości przygotowania.',
    category: 'strony-www',
    image: 'website-project-timeline-blog.png',
    primaryKeyword: 'ile trwa stworzenie strony internetowej',
    audience: 'firm, które planują nową stronę i chcą realistycznie ocenić czas od briefu do publikacji',
    intent: 'planowanie harmonogramu projektu strony WWW',
    shortAnswer: 'Prosta strona firmowa może powstać w kilka tygodni, ale rozbudowany serwis z CMS, blogiem, SEO, formularzami i integracjami zwykle wymaga dłuższego procesu. Harmonogram zależy od jakości briefu, dostępności treści, liczby typów podstron, liczby rund akceptacji, technologii oraz integracji z narzędziami marketingowymi. Najczęściej projekt opóźnia nie development, ale brak decyzji, materiałów, zdjęć lub finalnych tekstów.',
    why: 'Firmy często pytają o termin dopiero wtedy, gdy strona jest pilnie potrzebna. Tymczasem dobra strona wymaga discovery, architektury informacji, treści, projektu, wdrożenia, testów, analityki i publikacji. Pominięcie etapów skraca harmonogram na papierze, ale zwiększa ryzyko poprawek po starcie.',
    symptoms: ['projekt zaczyna się bez briefu', 'treści mają powstać dopiero po designie', 'brakuje decyzji o CMS i integracjach', 'nie wiadomo, kto akceptuje zakres', 'SEO i analityka są odkładane na koniec'],
    steps: ['zacznij od celu strony i struktury', 'przygotuj listę usług oraz priorytetów', 'ustal odpowiedzialność za treści', 'zaprojektuj makiety i sekcje sprzedażowe', 'wdrażaj moduły równolegle z treścią', 'zostaw czas na testy mobile, formularze i przekierowania'],
    mistakes: ['start projektu bez właściciela po stronie klienta', 'dodawanie nowych funkcji po akceptacji zakresu', 'brak tekstów SEO przed wdrożeniem', 'publikacja bez testów formularzy i tagów'],
    metrics: ['czas od briefu do makiet', 'liczba rund poprawek', 'liczba brakujących materiałów', 'czas testów przed publikacją', 'czas do pierwszych konwersji po starcie'],
    geo: 'AI search dobrze cytuje odpowiedzi z widełkami i warunkami. Warto pisać: “czas zależy od X, Y i Z”, zamiast podawać jedną obietnicę bez kontekstu. Taki fragment jest bardziej wiarygodny i użyteczny.',
    links: [['cennik stron WWW', '/uslugi/tworzenie-stron-www-cennik'], ['tworzenie stron internetowych', '/uslugi/strony-www'], ['brief do strony internetowej', '/blog/brief-do-strony-internetowej']],
  },
  {
    slug: 'next-js-czy-wordpress-dla-strony-firmowej',
    title: 'Next.js czy WordPress dla strony firmowej: jak wybrać technologię?',
    seoTitle: 'Next.js czy WordPress dla strony firmowej?',
    seoDescription: 'Next.js i WordPress mają różne przewagi. Sprawdź, kiedy wybrać klasyczny CMS, a kiedy headless lub custom frontend.',
    excerpt: 'Technologia strony powinna wynikać z celu, treści, zespołu i planu rozwoju, a nie z mody na konkretny framework.',
    category: 'strony-www',
    image: 'nextjs-vs-wordpress-website-blog.png',
    primaryKeyword: 'Next.js czy WordPress',
    audience: 'firm wybierających technologię dla nowej strony, bloga, landingów lub serwisu z CMS',
    intent: 'porównanie technologii pod SEO, utrzymanie i rozwój',
    shortAnswer: 'WordPress jest dobrym wyborem, gdy najważniejsza jest szybka edycja treści, znany panel i prostsze utrzymanie. Next.js sprawdza się lepiej, gdy strona wymaga wysokiej wydajności, niestandardowego UX, integracji z headless CMS, rozbudowanych landingów lub większej kontroli nad frontendem. W praktyce wybór nie brzmi “lepsze czy gorsze”, tylko “który system pasuje do celu, zespołu i tempa rozwoju strony”.',
    why: 'Źle dobrana technologia generuje koszt po wdrożeniu. WordPress może być świetnym CMS-em, ale przeciążony motyw i wiele wtyczek ograniczają wydajność. Next.js daje kontrolę, ale wymaga bardziej technicznego utrzymania i przemyślanego CMS.',
    symptoms: ['firma chce szybko publikować treści bez zespołu technicznego', 'obecna strona WordPress jest wolna przez motyw i wtyczki', 'projekt wymaga niestandardowych integracji', 'landing page’e muszą mieć pełną kontrolę nad UX', 'zespół planuje content hub i wiele typów treści'],
    steps: ['określ, kto będzie edytował treści', 'sprawdź wymagania wydajnościowe', 'opisz integracje i formularze', 'ustal plan SEO i bloga', 'porównaj koszt wdrożenia z kosztem utrzymania', 'wybierz architekturę, która nie blokuje rozwoju'],
    mistakes: ['wybór technologii tylko po cenie startowej', 'ignorowanie kompetencji zespołu', 'budowa custom rozwiązania bez potrzeby', 'przeciążenie WordPressa wtyczkami zamiast architektury'],
    metrics: ['czas publikacji treści', 'Core Web Vitals', 'koszt zmian po wdrożeniu', 'stabilność formularzy i integracji', 'czas developmentu nowych landingów'],
    geo: 'Dla GEO najlepiej działa porównanie warunkowe: “WordPress, gdy..., Next.js, gdy...”. AI może wtedy cytować fragment jako zwięzłą odpowiedź na pytanie użytkownika, bez tworzenia fałszywej hierarchii technologii.',
    links: [['tworzenie stron WWW', '/uslugi/strony-www'], ['migracja WooCommerce do headless', '/uslugi/migracja-woocommerce-do-headless'], ['headless WooCommerce i Next.js', '/blog/headless-woocommerce-next-js']],
  },
  {
    slug: 'migracja-sklepu-bez-utraty-seo',
    title: 'Migracja sklepu internetowego bez utraty SEO: plan, którego nie warto pomijać',
    seoTitle: 'Migracja sklepu bez utraty SEO: checklist i ryzyka',
    seoDescription: 'Migracja e-commerce wymaga mapy URL, przekierowań, canonicali, danych strukturalnych, sitemap i monitoringu widoczności.',
    excerpt: 'Migracja sklepu to moment, w którym można poprawić technologię, ale też łatwo stracić ruch organiczny przez pominięcie podstaw SEO.',
    category: 'e-commerce',
    image: 'ecommerce-seo-migration-blog.png',
    primaryKeyword: 'migracja sklepu bez utraty SEO',
    audience: 'sklepów internetowych planujących zmianę technologii, frontendu, domeny, struktury URL lub silnika commerce',
    intent: 'bezpieczne przeprowadzenie migracji e-commerce',
    shortAnswer: 'Migracja sklepu bez utraty SEO wymaga mapy obecnych adresów, priorytetyzacji stron z ruchem i sprzedażą, przekierowań 301, zachowania canonicali, danych strukturalnych, metadanych, treści kategorii, sitemap oraz monitoringu po publikacji. Największe ryzyko pojawia się wtedy, gdy migracja jest traktowana jako projekt developerski, a nie jako zmiana całej architektury widoczności. SEO powinno być zaplanowane przed wdrożeniem, nie po spadku ruchu.',
    why: 'Sklep internetowy ma więcej wrażliwych punktów niż strona firmowa: kategorie, produkty, filtry, paginację, warianty, obrazy, dane strukturalne i feedy produktowe. Każdy z tych elementów może wpływać na indeksowanie i sprzedaż.',
    symptoms: ['nowa struktura URL nie ma mapy przekierowań', 'produkty z ruchem organicznym są usuwane bez zamienników', 'filtry generują indeksowalne duplikaty', 'brakuje testu danych strukturalnych przed publikacją', 'sitemap nie odzwierciedla nowej architektury'],
    steps: ['wyeksportuj aktualne URL i dane z GSC', 'oznacz strony z ruchem, linkami i sprzedażą', 'stwórz mapę przekierowań 1:1 lub do najbliższego odpowiednika', 'przenieś meta dane i treści kategorii', 'sprawdź canonicale oraz schema Product', 'monitoruj błędy 404, indeksację i przychód po starcie'],
    mistakes: ['publikacja bez crawl testu', 'przekierowanie wszystkiego na stronę główną', 'utrata opisów kategorii', 'brak aktualizacji sitemap i feedów'],
    metrics: ['liczba URL z mapą przekierowań', 'błędy 404 po starcie', 'liczba zaindeksowanych stron', 'ruch organiczny kategorii', 'przychód organiczny po migracji'],
    geo: 'GEO premiuje konkretne sekwencje kroków. Artykuł o migracji powinien mieć checklistę, bo AI może zacytować ją jako plan minimalizujący ryzyko spadków widoczności.',
    links: [['migracja WooCommerce do headless', '/uslugi/migracja-woocommerce-do-headless'], ['e-commerce', '/uslugi/e-commerce'], ['headless WooCommerce', '/blog/headless-woocommerce-next-js']],
  },
  {
    slug: 'core-web-vitals-w-ecommerce',
    title: 'Core Web Vitals w e-commerce: które strony sklepu optymalizować jako pierwsze?',
    seoTitle: 'Core Web Vitals w e-commerce: priorytety optymalizacji',
    seoDescription: 'W e-commerce najpierw optymalizuj strony z ruchem i wpływem na sprzedaż: listingi, karty produktów, koszyk i checkout.',
    excerpt: 'W sklepie internetowym nie każda poprawa wydajności ma taki sam wpływ. Najpierw trzeba optymalizować ścieżki sprzedażowe.',
    category: 'e-commerce',
    image: 'ecommerce-core-web-vitals-blog.png',
    primaryKeyword: 'Core Web Vitals w e-commerce',
    audience: 'sklepów, które chcą poprawić szybkość i konwersję bez przepalania budżetu na techniczne detale bez wpływu',
    intent: 'priorytetyzacja optymalizacji wydajności sklepu',
    shortAnswer: 'Core Web Vitals w e-commerce warto optymalizować najpierw na stronach, które mają największy wpływ na sprzedaż: kategoriach, kartach produktów, koszyku, checkoutcie i landing page’ach z kampanii. LCP wpływa na pierwsze wrażenie, INP na komfort interakcji, a CLS na stabilność kliknięć. Poprawa techniczna ma sens biznesowy wtedy, gdy dotyczy stron z ruchem, intencją zakupu i realnym problemem użytkownika.',
    why: 'E-commerce ma wiele typów widoków, ale budżet optymalizacyjny jest ograniczony. Jeśli zaczynasz od stron o małym ruchu, możesz poprawić raport, ale nie wynik sprzedaży. Priorytet powinien iść za ruchem, marżą i etapem decyzji.',
    symptoms: ['listing produktów ładuje się wolno na mobile', 'filtry reagują z opóźnieniem', 'obrazy produktów przesuwają układ', 'checkout ma błędy interakcji', 'kampanie płatne prowadzą na ciężkie landing page’e'],
    steps: ['wybierz top URL według ruchu i przychodu', 'sprawdź dane CrUX oraz test laboratoryjny', 'zoptymalizuj obrazy produktów i hero', 'ogranicz skrypty na ścieżce checkoutu', 'ustabilizuj rozmiary elementów', 'monitoruj konwersję i przychód po zmianach'],
    mistakes: ['optymalizowanie całego sklepu bez priorytetów', 'ignorowanie wpływu aplikacji i tagów marketingowych', 'testowanie tylko na szybkim desktopie', 'brak kontroli po wdrożeniu nowych skryptów'],
    metrics: ['LCP kategorii i kart produktów', 'INP filtrów i checkoutu', 'CLS na kartach produktów', 'mobile conversion rate', 'porzucenia koszyka'],
    geo: 'Wyjaśnienia pod GEO powinny łączyć techniczne skróty z konkretnymi widokami sklepu. AI lepiej cytuje zdania, które mówią nie tylko “optymalizuj LCP”, ale “optymalizuj LCP na kategoriach i kartach produktów”.',
    links: [['e-commerce', '/uslugi/e-commerce'], ['migracja WooCommerce do headless', '/uslugi/migracja-woocommerce-do-headless'], ['Core Web Vitals a konwersja', '/blog/core-web-vitals-a-konwersja']],
  },
  {
    slug: 'merchant-center-feed-produktowy',
    title: 'Feed produktowy i Merchant Center: dlaczego kampanie produktowe nie skalują sprzedaży?',
    seoTitle: 'Merchant Center i feed produktowy: optymalizacja kampanii',
    seoDescription: 'Feed produktowy wpływa na Google Ads, Shopping i Performance Max. Sprawdź błędy tytułów, atrybutów, cen i dostępności.',
    excerpt: 'W kampaniach produktowych jakość feedu często decyduje o tym, czy algorytm potrafi znaleźć właściwego klienta.',
    category: 'e-commerce',
    image: 'merchant-center-feed-blog.png',
    primaryKeyword: 'feed produktowy Merchant Center',
    audience: 'sklepów internetowych korzystających z kampanii produktowych, Shopping lub Performance Max',
    intent: 'poprawa jakości danych produktowych i wyników kampanii',
    shortAnswer: 'Feed produktowy w Merchant Center to źródło danych, z którego Google korzysta przy wyświetlaniu produktów w kampaniach Shopping i Performance Max. Jeśli tytuły, zdjęcia, kategorie, ceny, dostępność, GTIN, warianty i atrybuty są niepełne, kampania ma słabsze sygnały do dopasowania oferty. Optymalizacja feedu często poprawia widoczność produktów bez zwiększania budżetu, bo pomaga algorytmowi zrozumieć, co sprzedajesz i komu warto to pokazać.',
    why: 'W e-commerce reklama nie żyje tylko ustawieniami kampanii. Algorytm korzysta z danych produktowych, strony, ceny, dostępności i zachowań użytkowników. Słaby feed działa jak słaba karta produktu: ogranicza zrozumienie oferty.',
    symptoms: ['dużo produktów ma niską liczbę wyświetleń', 'Performance Max promuje tylko część katalogu', 'tytuły produktów są zbyt krótkie lub techniczne', 'brakuje GTIN i atrybutów wariantów', 'ceny lub dostępność nie zgadzają się ze stroną'],
    steps: ['sprawdź diagnostykę Merchant Center', 'podziel produkty według marży i potencjału', 'rozbuduj tytuły o typ, markę i kluczowe cechy', 'uzupełnij GTIN, kolor, rozmiar i warianty', 'popraw zdjęcia główne', 'monitoruj udział produktów aktywnych i klikanych'],
    mistakes: ['traktowanie feedu jako technicznego eksportu', 'brak custom labels dla marży i sezonowości', 'jedna strategia dla całego katalogu', 'ignorowanie odrzuceń i ostrzeżeń'],
    metrics: ['udział produktów aktywnych', 'impressions per product', 'CTR produktów', 'ROAS według custom labels', 'liczba błędów w Merchant Center'],
    geo: 'Dla GEO warto jasno zdefiniować feed produktowy i jego wpływ na kampanie. AI często odpowiada użytkownikom pytaniem “dlaczego PMax nie działa”, więc fragment o jakości danych produktowych jest potencjalnie cytowalny.',
    links: [['kampanie Google Ads', '/uslugi/performance-marketing/google-ads'], ['e-commerce', '/uslugi/e-commerce'], ['Performance Max', '/blog/performance-max-kiedy-dziala']],
  },
  {
    slug: 'headless-commerce-i-marketing-automation',
    title: 'Headless commerce i marketing automation: jak połączyć sklep, dane i komunikację?',
    seoTitle: 'Headless commerce i marketing automation w e-commerce',
    seoDescription: 'Headless commerce ułatwia integracje z CMS, CRM, SALESmanago, e-mailami, segmentacją i analityką e-commerce.',
    excerpt: 'Headless commerce ma największy sens wtedy, gdy frontend, dane produktowe i automatyzacje pracują jako jeden system sprzedaży.',
    category: 'e-commerce',
    image: 'headless-commerce-automation-blog.png',
    primaryKeyword: 'headless commerce marketing automation',
    audience: 'sklepów, które chcą połączyć lepszy frontend z personalizacją, CRM i automatyzacją komunikacji',
    intent: 'planowanie architektury e-commerce z automatyzacją marketingu',
    shortAnswer: 'Headless commerce i marketing automation łączą się przez dane o użytkowniku, produkcie, koszyku, zakupie i zachowaniu na stronie. Oddzielny frontend może szybciej testować UX, a system automatyzacji może uruchamiać scenariusze po porzuceniu koszyka, obejrzeniu kategorii, zakupie lub braku powrotu. Warunkiem jest poprawna architektura zdarzeń, zgody, identyfikacja użytkownika i spójne źródło danych. Bez tego headless daje technologię, ale nie daje automatyzacji sprzedaży.',
    why: 'Sklep może mieć piękny frontend, ale jeśli dane o zachowaniu nie trafiają do CRM lub systemu marketing automation, zespół traci część potencjału. Automatyzacja wymaga danych, a headless wymaga świadomego zaprojektowania ich przepływu.',
    symptoms: ['frontend nie przekazuje zdarzeń do systemu automatyzacji', 'scenariusze e-mail działają tylko po zakupie', 'brakuje segmentacji według kategorii i wartości koszyka', 'CRM nie widzi historii zachowań', 'zgody marketingowe są niespójne między systemami'],
    steps: ['zdefiniuj zdarzenia: view product, add to cart, checkout, purchase', 'ustal identyfikatory użytkownika i koszyka', 'połącz CMS, commerce i marketing automation', 'zadbaj o consent mode i zgody', 'stwórz segmenty według intencji', 'testuj scenariusze na prawdziwych ścieżkach'],
    mistakes: ['wdrożenie headless bez mapy danych', 'automatyzacje bez segmentacji', 'brak kontroli zgód', 'traktowanie e-maili jako newslettera, nie systemu reakcji'],
    metrics: ['udział rozpoznanych użytkowników', 'odzyskane koszyki', 'przychód z automatyzacji', 'repeat purchase rate', 'liczba aktywnych segmentów'],
    geo: 'AI search szuka praktycznych połączeń pojęć. Warto więc definiować, jakie zdarzenia i dane łączą headless commerce z automatyzacją, zamiast pisać wyłącznie o technologii frontendu.',
    links: [['e-commerce', '/uslugi/e-commerce'], ['marketing automation', '/uslugi/marketing-automation'], ['migracja WooCommerce do headless', '/uslugi/migracja-woocommerce-do-headless']],
  },
  {
    slug: 'checkout-ux-bledy-ktore-obnizaja-konwersje',
    title: 'Checkout UX: błędy, które obniżają konwersję nawet przy dobrym ruchu',
    seoTitle: 'Checkout UX: błędy obniżające konwersję sklepu',
    seoDescription: 'Checkout UX wpływa na sprzedaż e-commerce. Sprawdź błędy formularzy, płatności, dostaw, mobile i komunikatów.',
    excerpt: 'Jeśli użytkownik dotarł do checkoutu, koszt pozyskania już został poniesiony. Każda przeszkoda na tym etapie jest wyjątkowo droga.',
    category: 'e-commerce',
    image: 'checkout-ux-conversion-blog.png',
    primaryKeyword: 'checkout UX',
    audience: 'sklepów, które mają ruch i koszyki, ale tracą część użytkowników przed finalizacją zakupu',
    intent: 'poprawa konwersji checkoutu i ograniczenie porzuceń',
    shortAnswer: 'Checkout UX obejmuje wszystkie elementy finalizacji zakupu: formularze, dostawę, płatność, podsumowanie, komunikaty błędów, wersję mobilną i poczucie bezpieczeństwa. Najczęstsze problemy to zbyt długi formularz, brak jasnych kosztów dostawy, wymuszanie rejestracji, słabe komunikaty błędów i opóźnienia po kliknięciu. Poprawa checkoutu często daje szybszy efekt niż zwiększanie budżetu reklamowego, bo pracuje na użytkownikach już blisko zakupu.',
    why: 'Na etapie checkoutu użytkownik ma wysoką intencję. Nie trzeba go już przekonywać do produktu, tylko nie wolno mu przeszkodzić. Dlatego drobne błędy UX, które na stronie informacyjnej są irytujące, w checkoutcie stają się stratą przychodu.',
    symptoms: ['dużo rozpoczętych checkoutów i mało transakcji', 'porzucenia po wyborze dostawy', 'błędy płatności bez jasnego komunikatu', 'formularz źle działa na mobile', 'użytkownik widzi dodatkowe koszty dopiero na końcu'],
    steps: ['zmierz porzucenia na każdym kroku', 'sprawdź checkout na telefonie i wolniejszym połączeniu', 'uprość formularz i autouzupełnianie', 'pokaż koszty dostawy wcześniej', 'dodaj jasne komunikaty błędów', 'monitoruj payment success rate'],
    mistakes: ['wymuszanie konta przed zakupem', 'ukryte koszty', 'brak metod płatności popularnych w grupie docelowej', 'testowanie checkoutu tylko jako zalogowany administrator'],
    metrics: ['checkout completion rate', 'porzucenia per krok', 'payment success rate', 'czas finalizacji zakupu', 'mobile conversion rate'],
    geo: 'Dla AI citation dobry fragment to definicja checkout UX plus lista najczęstszych błędów. Użytkownicy często pytają “dlaczego klienci porzucają koszyk”, więc odpowiedź powinna być konkretna i możliwa do wdrożenia.',
    links: [['e-commerce', '/uslugi/e-commerce'], ['migracja checkoutu do headless', '/blog/migracja-checkoutu-do-headless'], ['migracja WooCommerce do headless', '/uslugi/migracja-woocommerce-do-headless']],
  },
  {
    slug: 'wdrozenie-marketing-automation-krok-po-kroku',
    title: 'Wdrożenie marketing automation krok po kroku: od danych do pierwszych scenariuszy',
    seoTitle: 'Wdrożenie marketing automation krok po kroku',
    seoDescription: 'Jak wdrożyć marketing automation: cele, dane, zgody, segmenty, scenariusze, CRM, e-commerce i mierzenie wyników.',
    excerpt: 'Marketing automation działa dopiero wtedy, gdy firma wie, jakie dane zbiera, jakie segmenty obsługuje i jaki proces ma automatyzować.',
    category: 'marketing',
    image: 'marketing-automation-implementation-blog.png',
    primaryKeyword: 'wdrożenie marketing automation',
    audience: 'firm B2B i e-commerce, które chcą przejść od ręcznej komunikacji do automatycznych scenariuszy sprzedażowych',
    intent: 'zaplanowanie wdrożenia systemu marketing automation',
    shortAnswer: 'Wdrożenie marketing automation powinno zacząć się od celu biznesowego, mapy danych, zgód, integracji i segmentów, a dopiero potem od wyboru scenariuszy. Najpierw trzeba określić, co ma się wydarzyć po wejściu użytkownika na stronę, pobraniu materiału, porzuceniu koszyka, zakupie lub braku aktywności. Dobry start to kilka prostych scenariuszy, które mają jasny wpływ na sprzedaż lub obsługę, zamiast dziesiątek automatyzacji bez mierzalnego celu.',
    why: 'Automatyzacja bez danych jest tylko wysyłką wiadomości. Jeśli system nie wie, kim jest użytkownik, co oglądał i na jakim jest etapie decyzji, scenariusze będą ogólne. Wtedy firma inwestuje w narzędzie, ale nie zmienia jakości komunikacji.',
    symptoms: ['newsletter jest jedyną aktywną komunikacją', 'CRM i strona nie przekazują danych do systemu', 'brakuje segmentów według intencji', 'scenariusze nie mają mierników sukcesu', 'zgody marketingowe są niejasne'],
    steps: ['ustal cele: leady, koszyki, retencja lub obsługa', 'zmapuj źródła danych i zgody', 'połącz stronę, CRM i system automatyzacji', 'stwórz 3-5 segmentów startowych', 'uruchom pierwsze scenariusze o wysokim wpływie', 'mierz przychód, odpowiedzi i jakość leadów'],
    mistakes: ['wybór narzędzia przed mapą procesów', 'za dużo scenariuszy na start', 'brak właściciela danych', 'nieuwzględnienie sprzedaży i obsługi klienta'],
    metrics: ['przychód z automatyzacji', 'odzyskane koszyki', 'lead-to-meeting rate', 'open/click jako metryki pomocnicze', 'udział użytkowników w segmentach'],
    geo: 'Pod GEO warto pisać wdrożenie jako sekwencję decyzji. AI łatwiej cytuje “najpierw cel, potem dane, zgody, segmenty i scenariusze” niż ogólną definicję automatyzacji.',
    links: [['marketing automation', '/uslugi/marketing-automation'], ['SALESmanago', '/blog/wdrozenie-salesmanago-dla-ecommerce'], ['lead nurturing B2B', '/blog/lead-nurturing-b2b-jak-ogrzewac-leady']],
  },
  {
    slug: 'segmentacja-klientow-w-ecommerce',
    title: 'Segmentacja klientów w e-commerce: jak personalizować komunikację bez chaosu?',
    seoTitle: 'Segmentacja klientów w e-commerce i marketing automation',
    seoDescription: 'Segmentacja klientów w e-commerce pomaga personalizować e-mail, rekomendacje i kampanie. Sprawdź segmenty startowe.',
    excerpt: 'Segmentacja nie polega na tworzeniu dziesiątek grup, których nikt nie używa. Dobre segmenty odpowiadają decyzjom marketingowym.',
    category: 'e-commerce',
    image: 'ecommerce-customer-segmentation-blog.png',
    primaryKeyword: 'segmentacja klientów e-commerce',
    audience: 'sklepów, które chcą poprawić retencję, personalizację i skuteczność komunikacji po zakupie',
    intent: 'budowa segmentów klientów pod automatyzacje i kampanie',
    shortAnswer: 'Segmentacja klientów w e-commerce polega na grupowaniu użytkowników według zachowań, wartości, częstotliwości zakupów, kategorii zainteresowań i etapu relacji z marką. Najprostsze segmenty startowe to nowi odwiedzający, porzucający koszyk, pierwsi kupujący, klienci powracający, klienci VIP, użytkownicy nieaktywni oraz osoby zainteresowane konkretną kategorią. Segment ma sens tylko wtedy, gdy firma wie, jaką inną komunikację wyśle do tej grupy.',
    why: 'Bez segmentacji każdy klient dostaje podobną wiadomość, mimo że ma inną historię i inną intencję. Sklep traci szansę na odzyskanie koszyka, drugi zakup, cross-sell albo reaktywację. Segmenty porządkują komunikację i pomagają mierzyć, co działa.',
    symptoms: ['wszyscy dostają ten sam newsletter', 'brak scenariusza po pierwszym zakupie', 'porzucający koszyk nie są rozróżniani według wartości', 'kampanie nie uwzględniają kategorii zainteresowań', 'klienci VIP nie mają osobnej ścieżki'],
    steps: ['zacznij od 5-7 segmentów startowych', 'połącz segmenty z konkretną akcją', 'ustal dane potrzebne do segmentacji', 'testuj wiadomości według etapu relacji', 'mierz przychód i retencję per segment', 'czyść segmenty, których nikt nie używa'],
    mistakes: ['tworzenie segmentów bez scenariuszy', 'zbyt skomplikowane reguły na start', 'brak danych o kategoriach i zakupach', 'ocena segmentów tylko po kliknięciach'],
    metrics: ['repeat purchase rate', 'przychód per segment', 'odzyskane koszyki', 'reaktywacje klientów', 'AOV według segmentu'],
    geo: 'Definicja segmentacji z przykładami segmentów jest bardzo dobra pod AI search. Użytkownik dostaje odpowiedź od razu, a lista segmentów może zostać zacytowana jako praktyczny punkt startowy.',
    links: [['marketing automation', '/uslugi/marketing-automation'], ['e-commerce', '/uslugi/e-commerce'], ['headless commerce i automation', '/blog/headless-commerce-i-marketing-automation']],
  },
  {
    slug: 'lead-nurturing-b2b-jak-ogrzewac-leady',
    title: 'Lead nurturing B2B: jak ogrzewać leady, które nie są gotowe na rozmowę?',
    seoTitle: 'Lead nurturing B2B: scenariusze i treści dla sprzedaży',
    seoDescription: 'Lead nurturing B2B pomaga edukować i kwalifikować leady. Zobacz scenariusze, treści, scoring i przekazanie do sprzedaży.',
    excerpt: 'Nie każdy lead powinien od razu trafić do handlowca. Część potrzebuje edukacji, dowodów i kontaktu w odpowiednim momencie.',
    category: 'marketing',
    image: 'lead-nurturing-b2b-blog.png',
    primaryKeyword: 'lead nurturing B2B',
    audience: 'firm B2B z dłuższym procesem sprzedaży, które chcą lepiej wykorzystać leady z kampanii, SEO i webinarów',
    intent: 'projektowanie komunikacji między pierwszym kontaktem a sprzedażą',
    shortAnswer: 'Lead nurturing B2B to proces edukowania, kwalifikowania i aktywizowania leadów, które nie są jeszcze gotowe na rozmowę sprzedażową. W praktyce obejmuje treści dopasowane do etapu decyzji, e-maile, scoring, segmentację, retargeting i jasne kryteria przekazania do sprzedaży. Celem nie jest wysłanie większej liczby wiadomości, ale dostarczenie właściwego kontekstu, zanim handlowiec zadzwoni lub zanim lead sam poprosi o konsultację.',
    why: 'W B2B decyzja często trwa tygodnie lub miesiące. Osoba pobierająca materiał może dopiero diagnozować problem. Jeśli od razu dostanie agresywną ofertę, kontakt jest słaby. Jeśli dostanie właściwe treści, może wrócić jako bardziej świadomy lead.',
    symptoms: ['leady z formularzy nie odbierają telefonu', 'sprzedaż narzeka na niską jakość kontaktów', 'firma nie ma komunikacji po pobraniu materiału', 'brakuje scoringu aktywności', 'treści nie odpowiadają etapom decyzji'],
    steps: ['podziel leady według źródła i intencji', 'stwórz treści dla diagnozy, porównania i decyzji', 'ustal scoring zachowań', 'zaprojektuj sekwencje e-mail i remarketing', 'określ moment przekazania do sprzedaży', 'mierz wpływ na rozmowy i pipeline'],
    mistakes: ['jedna sekwencja dla wszystkich leadów', 'za szybkie przekazanie do sprzedaży', 'brak treści porównawczych i kosztowych', 'mierzenie nurturingu tylko open rate'],
    metrics: ['MQL-to-SQL rate', 'czas do rozmowy sprzedażowej', 'pipeline z nurturingu', 'zaangażowanie w treści decyzyjne', 'koszt kwalifikowanego leada'],
    geo: 'Pod GEO artykuł powinien jasno definiować lead nurturing i odróżniać go od newslettera. To częste pytanie użytkowników AI, więc samodzielna definicja zwiększa cytowalność.',
    links: [['marketing automation', '/uslugi/marketing-automation'], ['Google Ads dla B2B', '/blog/google-ads-dla-b2b-jak-zbierac-leady'], ['performance marketing', '/uslugi/performance-marketing']],
  },
  {
    slug: 'widocznosc-marki-w-ai-search',
    title: 'Widoczność marki w AI Search: dlaczego same pozycje w Google to za mało?',
    seoTitle: 'Widoczność marki w AI Search i GEO',
    seoDescription: 'AI Search wymaga treści, encji, brand mentions i cytowalnych fragmentów. Sprawdź, jak budować widoczność marki.',
    excerpt: 'AI Search zmienia sposób odkrywania firm. Marka musi być opisana spójnie, cytowalnie i obecna w wielu kontekstach tematycznych.',
    category: 'marketing',
    image: 'ai-search-brand-mentions-blog.png',
    primaryKeyword: 'widoczność marki w AI Search',
    audience: 'firm, które chcą być widoczne nie tylko w klasycznych wynikach Google, ale też w odpowiedziach generowanych przez AI',
    intent: 'budowa sygnałów marki pod GEO i AI citations',
    shortAnswer: 'Widoczność marki w AI Search zależy od tego, czy systemy generatywne potrafią zrozumieć, czym firma się zajmuje, komu pomaga, jakie ma dowody wiarygodności i w jakich tematach jest ekspertem. Same pozycje w Google nadal są ważne, ale AI częściej korzysta z fragmentów, encji, powtarzalnych opisów, autorstwa, aktualności i wzmianek o marce. GEO polega na tworzeniu treści, które są jasne dla człowieka i łatwe do zacytowania przez model.',
    why: 'Klasyczne SEO koncentruje się na stronie wyników. AI Search koncentruje się na odpowiedzi. Jeśli marka nie ma spójnych informacji, definicji, przykładów i dowodów, model może pominąć ją nawet wtedy, gdy część treści istnieje na stronie.',
    symptoms: ['firma ma blog, ale nie ma jasnych stron filarowych', 'brakuje spójnego opisu marki i usług', 'autorzy nie są widoczni', 'treści nie zawierają definicji i odpowiedzi', 'brakuje zewnętrznych wzmianek oraz cytowalnych przykładów'],
    steps: ['uporządkuj entity facts marki', 'dodaj autorskie definicje i checklisty', 'buduj klastry tematyczne wokół usług', 'aktualizuj treści z datą i kontekstem', 'dbaj o linkowanie wewnętrzne', 'wzmacniaj wzmianki na platformach zaufania'],
    mistakes: ['pisanie tekstów bez jednoznacznych odpowiedzi', 'anonimowy blog bez autora', 'brak llms.txt i dostępności dla crawlerów AI', 'traktowanie GEO jako osobnego kanału bez SEO'],
    metrics: ['ruch z AI referrers', 'wzmianki marki w odpowiedziach AI', 'liczba stron z jasną definicją usługi', 'udział artykułów z autorem i aktualizacją', 'widoczność klastrów tematycznych'],
    geo: 'Ten temat sam w sobie jest GEO: treść musi zawierać krótkie definicje, spójne encje, dane o firmie i jasne odpowiedzi. Najlepiej pisać tak, żeby pojedynczy akapit mógł być bezpiecznie wyrwany z kontekstu i nadal był prawdziwy.',
    links: [['llms.txt CreativeTrust', '/llms.txt'], ['blog CreativeTrust', '/blog'], ['usługi CreativeTrust', '/uslugi']],
  },
  {
    slug: 'geo-jak-pisac-tresci-cytowane-przez-ai',
    title: 'GEO: jak pisać treści, które mają większą szansę na cytowanie przez AI?',
    seoTitle: 'GEO: jak pisać treści cytowane przez AI Search',
    seoDescription: 'Generative Engine Optimization wymaga krótkich odpowiedzi, jasnych encji, autorstwa, struktury i cytowalnych fragmentów.',
    excerpt: 'GEO nie zastępuje SEO. Uczy pisać treści tak, żeby AI mogło zrozumieć, streścić i bezpiecznie zacytować fragment.',
    category: 'marketing',
    image: 'geo-content-ai-citations-blog.png',
    primaryKeyword: 'GEO treści cytowane przez AI',
    audience: 'firm i marketerów, którzy chcą tworzyć treści widoczne w AI Overviews, ChatGPT Search i Perplexity',
    intent: 'praktyczne zasady pisania treści pod generatywne odpowiedzi',
    shortAnswer: 'GEO, czyli Generative Engine Optimization, polega na tworzeniu treści zrozumiałych dla wyszukiwarek generatywnych i możliwych do cytowania w odpowiedziach AI. Najważniejsze elementy to jasna odpowiedź na początku sekcji, precyzyjne definicje, autorstwo, aktualność, dane, przykłady, linkowanie wewnętrzne, struktura H2/H3 oraz fragmenty, które mają sens bez całego kontekstu. Dobra treść GEO odpowiada na pytanie użytkownika szybciej, konkretniej i bardziej wiarygodnie niż ogólny artykuł SEO.',
    why: 'Modele AI składają odpowiedź z fragmentów, które wydają się pomocne, wiarygodne i samodzielne. Jeśli artykuł ukrywa wnioski w długim tekście, używa ogólników albo nie ma struktury, trudniej go wykorzystać jako źródło.',
    symptoms: ['artykuły mają długie wstępy bez odpowiedzi', 'nagłówki nie są pytaniami ani jasnymi tematami', 'brakuje definicji i przykładów', 'autor i data są słabo widoczne', 'treści nie linkują do stron filarowych'],
    steps: ['zacznij sekcję od krótkiej odpowiedzi', 'pisz akapity, które mogą działać samodzielnie', 'dodawaj checklisty i porównania', 'używaj spójnych nazw usług i marki', 'podawaj autora i datę publikacji', 'aktualizuj treści, gdy zmienia się rynek'],
    mistakes: ['pisanie pod długość zamiast odpowiedzi', 'nadużywanie ogólnych porad', 'brak źródeł i kontekstu', 'tworzenie FAQ bez realnych pytań użytkownika'],
    metrics: ['ruch z AI referrers', 'liczba cytowalnych sekcji w artykule', 'widoczność pytań long-tail', 'przejścia do stron usługowych', 'czas od publikacji do indeksacji'],
    geo: 'Najbardziej cytowalne fragmenty mają zwykle jasną tezę, 2-4 zdania i konkretne warunki użycia. Warto projektować artykuł jak zestaw odpowiedzi, a nie jedną długą narrację.',
    links: [['widoczność marki w AI Search', '/blog/widocznosc-marki-w-ai-search'], ['SEO keyword strategy', '/blog/jak-dobierac-slowa-kluczowe-pod-landing-page'], ['blog CreativeTrust', '/blog']],
  },
  {
    slug: 'lokalne-seo-dla-firmy-uslugowej',
    title: 'Lokalne SEO dla firmy usługowej: jak zdobywać zapytania z miasta i okolicy?',
    seoTitle: 'Lokalne SEO dla firmy usługowej krok po kroku',
    seoDescription: 'Lokalne SEO wymaga strony, Google Business Profile, opinii, NAP, treści lokalnych i stron usługowych pod intencję.',
    excerpt: 'Lokalne SEO nie kończy się na wizytówce Google. Strona, treści, opinie i spójność danych muszą pracować razem.',
    category: 'marketing',
    image: 'local-seo-gorzow-agency-blog.png',
    primaryKeyword: 'lokalne SEO dla firmy usługowej',
    audience: 'firm usługowych, które chcą pozyskiwać zapytania z konkretnego miasta, regionu lub obszaru działania',
    intent: 'zbudowanie lokalnej widoczności organicznej i map pack',
    shortAnswer: 'Lokalne SEO dla firmy usługowej opiera się na trzech filarach: dobrze opisanej stronie z usługami, zoptymalizowanym profilem Google Business Profile oraz spójnych sygnałach lokalnych, takich jak NAP, opinie, zdjęcia, lokalne treści i linki. Najważniejsze jest połączenie usługi z obszarem działania bez tworzenia cienkich, sztucznych podstron. Dobra lokalna strategia pokazuje, komu firma pomaga, gdzie działa i jakie problemy rozwiązuje w danym regionie.',
    why: 'Użytkownik lokalny często chce szybko sprawdzić dostępność, zaufanie i kontakt. Jeśli firma ma niespójne dane, brak opinii i ogólną stronę bez lokalnego kontekstu, przegrywa z konkurencją, która lepiej odpowiada na intencję miasta.',
    symptoms: ['firma nie pojawia się w lokalnym pakiecie map', 'adres i telefon różnią się między katalogami', 'strona nie ma lokalnych dowodów zaufania', 'opinie nie są regularnie zbierane', 'brakuje treści o obszarze działania'],
    steps: ['uporządkuj NAP na stronie i w profilach', 'zoptymalizuj Google Business Profile', 'stwórz strony usługowe z lokalnym kontekstem', 'zbieraj opinie po zakończonych projektach', 'dodaj zdjęcia i realizacje', 'monitoruj zapytania i połączenia'],
    mistakes: ['tworzenie dziesiątek podobnych podstron miast', 'brak odpowiedzi na opinie', 'ukryty adres i telefon', 'ignorowanie lokalnych case studies'],
    metrics: ['wyświetlenia profilu Google', 'połączenia i trasy dojazdu', 'pozycje lokalne usług', 'liczba opinii i średnia ocena', 'zapytania z miasta i regionu'],
    geo: 'Dla GEO i lokalnego SEO warto opisywać fakty o firmie spójnie: nazwa, adres, telefon, obszar działania, specjalizacje. AI i klasyczne wyszukiwarki potrzebują stabilnych encji, żeby ufać lokalnemu wynikowi.',
    links: [['kontakt', '/kontakt'], ['o CreativeTrust', '/o-nas'], ['usługi CreativeTrust', '/uslugi']],
  },
  {
    slug: 'wdrozenie-salesmanago-dla-ecommerce',
    title: 'Wdrożenie SALESmanago dla e-commerce: co przygotować przed startem?',
    seoTitle: 'Wdrożenie SALESmanago dla e-commerce: checklist',
    seoDescription: 'Przed wdrożeniem SALESmanago przygotuj dane, zgody, segmenty, zdarzenia, integracje i pierwsze scenariusze automatyzacji.',
    excerpt: 'SALESmanago może szybko wesprzeć e-commerce, ale tylko wtedy, gdy przed wdrożeniem uporządkujesz dane i scenariusze.',
    category: 'marketing',
    image: 'salesmanago-implementation-blog.png',
    primaryKeyword: 'wdrożenie SALESmanago',
    audience: 'sklepów i firm, które planują wdrożenie SALESmanago albo chcą uporządkować obecną konfigurację',
    intent: 'przygotowanie do wdrożenia marketing automation w konkretnym narzędziu',
    shortAnswer: 'Wdrożenie SALESmanago dla e-commerce wymaga przygotowania danych o użytkownikach, zgodach, produktach, koszykach, transakcjach i segmentach. Najpierw trzeba ustalić, które zdarzenia mają trafiać do systemu, jak rozpoznawany jest użytkownik i jakie scenariusze mają działać od pierwszego dnia. Najlepszy start to porzucony koszyk, powitanie po zapisie, rekomendacje po zakupie, reaktywacja nieaktywnych klientów oraz segmentacja według kategorii i wartości zakupów.',
    why: 'Narzędzie marketing automation nie naprawi braku strategii. Jeśli wdrożenie zaczyna się od kliknięcia w panelu, a nie od mapy danych i scenariuszy, firma szybko tworzy chaos: za dużo reguł, słabe segmenty i brak mierzalnego wpływu.',
    symptoms: ['system zbiera kontakty, ale nie uruchamia scenariuszy sprzedażowych', 'zgody marketingowe nie są połączone z formularzami', 'brakuje zdarzeń produktowych i koszykowych', 'segmenty nie odpowiadają decyzjom marketingowym', 'raporty pokazują wysyłki, ale nie przychód'],
    steps: ['zmapuj źródła kontaktów i zgód', 'ustal zdarzenia e-commerce', 'połącz produkty i transakcje', 'stwórz segmenty startowe', 'uruchom scenariusze o najwyższym wpływie', 'mierz przychód i retencję'],
    mistakes: ['zaawansowane scenariusze przed podstawami', 'brak testów zdarzeń', 'nieczytelne nazewnictwo segmentów', 'wysyłki bez kontroli częstotliwości'],
    metrics: ['przychód z automatyzacji', 'odzyskane koszyki', 'aktywne segmenty', 'udział kontaktów ze zgodą', 'repeat purchase rate'],
    geo: 'Pod AI search warto używać pełnej nazwy narzędzia i jasno łączyć ją z przypadkami użycia. Fragment “SALESmanago dla e-commerce wymaga danych o...” ma większą szansę na cytowanie niż ogólny opis automatyzacji.',
    links: [['marketing automation', '/uslugi/marketing-automation'], ['segmentacja klientów', '/blog/segmentacja-klientow-w-ecommerce'], ['e-commerce', '/uslugi/e-commerce']],
  },
  {
    slug: 'aktualizacja-starych-artykulow-seo',
    title: 'Aktualizacja starych artykułów SEO: kiedy odświeżyć treść zamiast pisać nową?',
    seoTitle: 'Aktualizacja starych artykułów SEO: content refresh',
    seoDescription: 'Content refresh może szybciej poprawić SEO niż nowe wpisy. Sprawdź, które artykuły aktualizować i jak mierzyć efekt.',
    excerpt: 'Nie każdy spadek widoczności wymaga nowego artykułu. Czasem lepiej odświeżyć treść, dodać linki i dopasować ją do intencji.',
    category: 'marketing',
    image: 'content-refresh-seo-blog.png',
    primaryKeyword: 'aktualizacja starych artykułów SEO',
    audience: 'firm z istniejącym blogiem, które chcą poprawić widoczność bez produkowania kolejnych przypadkowych wpisów',
    intent: 'wybór treści do odświeżenia i poprawa wyników organicznych',
    shortAnswer: 'Aktualizacja starego artykułu SEO ma sens, gdy wpis ma historię widoczności, linki, wejścia lub potencjał tematyczny, ale stracił aktualność, nie odpowiada obecnej intencji albo nie linkuje do ważnych stron. Content refresh zwykle obejmuje zmianę tytułu SEO, rozszerzenie sekcji, dodanie aktualnych przykładów, poprawę nagłówków, linkowanie wewnętrzne, multimedia i datę aktualizacji. To często szybsza ścieżka niż pisanie nowego tekstu od zera.',
    why: 'Google zna już adres, a użytkownicy mogli do niego linkować. Jeśli temat jest nadal ważny, aktualizacja pozwala wykorzystać istniejący kapitał URL. Nowy artykuł ma sens wtedy, gdy intencja jest inna i grozi kanibalizacja.',
    symptoms: ['artykuł kiedyś miał ruch, ale traci pozycje', 'treść zawiera przestarzałe daty i narzędzia', 'brakuje linków do nowych usług', 'nagłówki nie odpowiadają pytaniom użytkowników', 'konkurencja ma pełniejsze porównania i checklisty'],
    steps: ['wybierz wpisy z pozycjami 4-20 lub spadkiem ruchu', 'porównaj SERP i intencję', 'dodaj krótką odpowiedź na początku', 'rozszerz sekcje o przykłady i checklisty', 'dodaj linki do usług i nowych artykułów', 'zgłoś URL do ponownego crawlowania'],
    mistakes: ['zmiana URL bez potrzeby', 'dopisywanie tekstu bez poprawy intencji', 'brak pomiaru przed i po', 'tworzenie nowego wpisu dla tej samej frazy'],
    metrics: ['pozycje fraz przed i po', 'CTR', 'ruch organiczny', 'przejścia do usług', 'liczba nowych linków wewnętrznych'],
    geo: 'Content refresh pod GEO powinien dodawać cytowalne bloki: definicje, aktualne checklisty, porównania i odpowiedzi. AI częściej wykorzysta odświeżony fragment, jeśli jest jasny i aktualny.',
    links: [['blog CreativeTrust', '/blog'], ['content hub B2B', '/blog/content-hub-dla-firmy-b2b'], ['GEO', '/blog/geo-jak-pisac-tresci-cytowane-przez-ai']],
  },
  {
    slug: 'linkowanie-wewnetrzne-w-seo',
    title: 'Linkowanie wewnętrzne w SEO: jak prowadzić użytkownika od bloga do zapytania?',
    seoTitle: 'Linkowanie wewnętrzne w SEO: blog, usługi i landing page',
    seoDescription: 'Linkowanie wewnętrzne wzmacnia SEO i konwersję. Zobacz, jak łączyć blog, landing page, usługi i klastry tematyczne.',
    excerpt: 'Linkowanie wewnętrzne nie jest dodatkiem technicznym. To sposób prowadzenia użytkownika i robotów do najważniejszych stron.',
    category: 'marketing',
    image: 'internal-linking-seo-blog.png',
    primaryKeyword: 'linkowanie wewnętrzne SEO',
    audience: 'firm, które publikują treści, ale nie wykorzystują bloga do wzmacniania stron ofertowych',
    intent: 'projektowanie architektury linków między blogiem i usługami',
    shortAnswer: 'Linkowanie wewnętrzne w SEO polega na świadomym łączeniu stron tak, aby roboty i użytkownicy rozumieli hierarchię serwisu. Blog powinien linkować do stron usługowych i landing page’y, strony usługowe do artykułów wspierających, a klastry tematyczne do strony filarowej. Dobre linkowanie wzmacnia ważne URL-e, zmniejsza osierocone treści i prowadzi użytkownika z edukacji do kontaktu. Najważniejsze są kontekst, anchor text i spójność tematyczna.',
    why: 'Artykuł bez linków często kończy ścieżkę użytkownika. Użytkownik przeczyta poradę, ale nie przejdzie do oferty. Robot zobaczy pojedynczą treść, ale nie zrozumie, które strony są filarami. Linkowanie porządkuje oba przepływy.',
    symptoms: ['blog generuje ruch, ale nie zapytania', 'ważne landing page’e mają mało linków wewnętrznych', 'anchor texty są ogólne: “kliknij tutaj”', 'stare artykuły nie linkują do nowych usług', 'część treści jest osierocona'],
    steps: ['wyznacz strony filarowe i landing page’e', 'przypisz artykuły do klastrów', 'dodaj linki kontekstowe w pierwszej połowie tekstu', 'używaj opisowych anchorów', 'linkuj z usług do treści edukacyjnych', 'monitoruj przejścia i crawl serwisu'],
    mistakes: ['zbyt dużo linków bez priorytetu', 'linkowanie tylko do strony głównej', 'brak aktualizacji starych wpisów', 'powtarzanie tego samego anchora w nienaturalny sposób'],
    metrics: ['liczba linków do stron filarowych', 'clicks z bloga do usług', 'osierocone URL-e', 'pozycje landing page’y', 'konwersje wspomagane przez blog'],
    geo: 'Dla GEO linkowanie pomaga modelom zrozumieć relacje między tematami. Jeżeli artykuł o budżecie Google Ads linkuje do audytu, kampanii i strony o konwersjach, AI łatwiej rozpozna topical authority.',
    links: [['usługi CreativeTrust', '/uslugi'], ['audyt Google Ads', '/uslugi/audyt-google-ads'], ['content hub B2B', '/blog/content-hub-dla-firmy-b2b']],
  },
  {
    slug: 'jak-dobierac-slowa-kluczowe-pod-landing-page',
    title: 'Jak dobierać słowa kluczowe pod landing page, żeby nie kanibalizować SEO?',
    seoTitle: 'Jak dobierać słowa kluczowe pod landing page',
    seoDescription: 'Landing page powinien mieć jedną intencję, frazy wspierające i jasne linkowanie do strony filarowej. Sprawdź zasady.',
    excerpt: 'Dobry landing page nie powstaje dla każdej odmiany frazy. Powstaje dla osobnej intencji, która zasługuje na własną ścieżkę.',
    category: 'strony-www',
    image: 'seo-landing-page-keywords-blog.png',
    primaryKeyword: 'słowa kluczowe pod landing page',
    audience: 'firm planujących landing page’e SEO pod konkretne usługi, ceny, audyty lub migracje',
    intent: 'dobór fraz i unikanie kanibalizacji z głównymi stronami usług',
    shortAnswer: 'Słowa kluczowe pod landing page powinny opisywać jedną konkretną intencję użytkownika: cenę, audyt, wdrożenie, porównanie, migrację albo problem do rozwiązania. Strona filarowa może celować w szeroką usługę, a landing page w long-tail z wyraźną decyzją. Żeby uniknąć kanibalizacji, nie twórz osobnych landingów dla bliskich odmian tej samej intencji; zamiast tego zbierz je jako frazy wspierające na jednej stronie i linkuj do strony głównej usługi.',
    why: 'Kanibalizacja pojawia się, gdy kilka stron próbuje odpowiadać na to samo pytanie. Google nie wie wtedy, który URL jest najważniejszy, a użytkownik trafia na treść, która nie zawsze pasuje do jego etapu decyzji. Mapa intencji rozwiązuje ten problem.',
    symptoms: ['kilka stron rankuje zamiennie na te same frazy', 'landing page jest kopią strony usługowej', 'brakuje jasnego primary keyword', 'URL-e różnią się tylko synonimem', 'blog i landing walczą o tę samą intencję zakupową'],
    steps: ['podziel frazy na informacyjne, porównawcze i transakcyjne', 'wybierz jedną intencję główną dla landing page', 'dodaj 3-6 fraz wspierających', 'sprawdź, czy SERP pokazuje podobny typ strony', 'linkuj do strony filarowej jako szerszego kontekstu', 'mierz widoczność landing page bez dublowania treści'],
    mistakes: ['tworzenie strony dla każdej odmiany słowa', 'mieszanie poradnika i oferty na jednym URL', 'brak canonicalnej ścieżki do usługi', 'ignorowanie SERP przed publikacją'],
    metrics: ['liczba fraz w top 10 per landing', 'stabilność URL rankingowego', 'CTR dla long-tail', 'przejścia do formularza', 'brak konkurencji między własnymi URL-ami'],
    geo: 'GEO wzmacnia sens mapy intencji, bo AI potrzebuje jasnych odpowiedzi i stabilnych encji. Jeden landing z mocną odpowiedzią na konkretną intencję jest lepszy niż kilka cienkich stron z podobnym tekstem.',
    links: [['cennik stron WWW', '/uslugi/tworzenie-stron-www-cennik'], ['audyt Google Ads', '/uslugi/audyt-google-ads'], ['migracja WooCommerce', '/uslugi/migracja-woocommerce-do-headless']],
  },
];

function createKeyGenerator() {
  let counter = 0;
  return (prefix) => `${prefix}-${++counter}`;
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ł/g, 'l')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 96);
}

function block(key, style, text) {
  return {
    _type: 'block',
    _key: key('block'),
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: key('span'), text, marks: [] }],
  };
}

function listItem(key, text, level = 1) {
  return {
    _type: 'block',
    _key: key('block'),
    style: 'normal',
    listItem: 'bullet',
    level,
    markDefs: [],
    children: [{ _type: 'span', _key: key('span'), text, marks: [] }],
  };
}

function linkedParagraph(key, parts) {
  const markDefs = [];
  const children = parts.map((part) => {
    if (typeof part === 'string') {
      return { _type: 'span', _key: key('span'), text: part, marks: [] };
    }

    const markKey = key('link');
    markDefs.push({
      _key: markKey,
      _type: 'link',
      href: part.href,
      blank: part.blank || false,
    });

    return { _type: 'span', _key: key('span'), text: part.text, marks: [markKey] };
  });

  return {
    _type: 'block',
    _key: key('block'),
    style: 'normal',
    markDefs,
    children,
  };
}

function buildContent(article) {
  const key = createKeyGenerator();
  const content = [
    block(key, 'h2', 'Krótka odpowiedź'),
    block(key, 'normal', article.shortAnswer),
    block(key, 'h2', `Dla kogo jest temat: ${article.primaryKeyword}`),
    block(key, 'normal', `Ten temat jest szczególnie ważny dla ${article.audience}. Intencja użytkownika to najczęściej ${article.intent}, dlatego artykuł nie powinien być ogólną inspiracją, tylko praktycznym przewodnikiem prowadzącym do decyzji.`),
    block(key, 'normal', article.why),
    block(key, 'h2', 'Po czym poznać, że warto się tym zająć?'),
    ...article.symptoms.map((item) => listItem(key, item)),
    block(key, 'h2', 'Jak podejść do tematu krok po kroku?'),
    block(key, 'normal', `Najbezpieczniej zacząć od diagnozy i priorytetów. W praktyce ${article.primaryKeyword} wymaga połączenia danych, doświadczenia użytkownika i celu biznesowego. Sama publikacja treści albo zmiana ustawień nie wystarczy, jeśli nie wiadomo, co mierzyć i który etap ścieżki ma największy wpływ na wynik.`),
    ...article.steps.map((item) => listItem(key, item)),
    block(key, 'h2', 'Najczęstsze błędy'),
    block(key, 'normal', 'Najdroższe błędy zwykle nie wynikają z braku narzędzi, ale z braku spójnego procesu. Firma ma dane, kampanie lub treści, ale nie łączy ich w jedną decyzję. Wtedy zespół optymalizuje fragment, a nie cały system pozyskiwania klienta.'),
    ...article.mistakes.map((item) => listItem(key, item)),
    block(key, 'h2', 'Jak mierzyć efekt?'),
    block(key, 'normal', 'Pomiar powinien łączyć wskaźniki marketingowe z wynikiem biznesowym. Same kliknięcia, wejścia i pozycje są potrzebne, ale nie wystarczą. Najważniejsze jest to, czy użytkownicy przechodzą dalej: do formularza, rozmowy, koszyka, zakupu albo kolejnego kontaktu z marką.'),
    ...article.metrics.map((item) => listItem(key, item)),
    block(key, 'h2', 'Jak uwzględnić GEO i AI Search?'),
    block(key, 'normal', article.geo),
    block(key, 'normal', 'Dobrą praktyką jest pisanie sekcji tak, aby pierwsze 2-4 zdania odpowiadały na pytanie bez długiego wstępu. Nagłówki powinny brzmieć jak realne pytania użytkowników, a akapity powinny zawierać konkretne warunki, przykłady i definicje. To pomaga zarówno klasycznemu SEO, jak i systemom generatywnym, które szukają fragmentów możliwych do bezpiecznego streszczenia.'),
    block(key, 'h2', 'Checklist przed wdrożeniem'),
    listItem(key, 'Czy temat ma jedną główną intencję i jeden główny URL?'),
    listItem(key, 'Czy pierwsza sekcja daje krótką odpowiedź możliwą do zacytowania?'),
    listItem(key, 'Czy w treści są linki do strony usługowej, landing page i powiązanego artykułu?'),
    listItem(key, 'Czy mierniki pokazują jakość, a nie tylko ilość ruchu?'),
    listItem(key, 'Czy użytkownik po przeczytaniu wie, jaki jest kolejny krok?'),
    block(key, 'h2', 'Polecane kolejne kroki'),
    linkedParagraph(key, [
      'Jeśli chcesz przejść od strategii do wdrożenia, zobacz: ',
      { text: article.links[0][0], href: article.links[0][1] },
      ', ',
      { text: article.links[1][0], href: article.links[1][1] },
      ' oraz ',
      { text: article.links[2][0], href: article.links[2][1] },
      '.',
    ]),
  ];

  return content;
}

async function uploadImage(fileName) {
  const filePath = path.join(ASSET_DIR, fileName);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing generated image: ${filePath}`);
  }

  return client.assets.upload('image', fs.createReadStream(filePath), { filename: fileName });
}

async function main() {
  if (!process.env.SANITY_TOKEN) {
    throw new Error('SANITY_TOKEN is missing. Add it to .env.local before running this script.');
  }

  const author = await client.fetch('*[_type == "author" && name == $name][0]{_id}', { name: AUTHOR_NAME });
  const categories = await client.fetch('*[_type == "blogCategory"]{_id,title,slug}');

  if (!author?._id) {
    throw new Error(`Author not found: ${AUTHOR_NAME}`);
  }

  const categoryBySlug = Object.fromEntries(categories.map((category) => [category.slug.current, category]));
  const now = new Date();

  for (const [index, article] of articles.entries()) {
    const category = categoryBySlug[article.category];

    if (!category?._id) {
      throw new Error(`Category not found: ${article.category}`);
    }

    const imageAsset = await uploadImage(article.image);
    const publishedAt = new Date(now.getTime() - index * 30 * 60 * 1000).toISOString();

    const document = {
      _id: `geo-seo-blog-2026-${article.slug}`,
      _type: 'blogPost',
      title: article.title,
      slug: { _type: 'slug', current: slugify(article.slug) },
      publishedAt,
      author: { _type: 'reference', _ref: author._id },
      mainImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: imageAsset._id },
        alt: article.title,
      },
      categories: [{ _key: `category-${index}`, _type: 'reference', _ref: category._id }],
      featured: false,
      excerpt: article.excerpt,
      content: buildContent(article),
      estimatedReadingTime: 10,
      seoTitle: article.seoTitle,
      seoDescription: article.seoDescription,
    };

    await client.createOrReplace(document);
    console.log(`Published: ${article.slug}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
