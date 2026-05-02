const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { createClient } = require('@sanity/client');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const SITE_URL = 'https://www.creativetrust.pl';
const AUTHOR_NAME = 'Bartosz';

const client = createClient({
  projectId: '8mtbrwl1',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const imageByCluster = {
  ads: path.resolve(process.cwd(), 'public/images/seo/google-ads-audit-hero.png'),
  web: path.resolve(process.cwd(), 'public/images/seo/website-pricing-hero.png'),
  ecommerce: path.resolve(process.cwd(), 'public/images/seo/headless-woocommerce-hero.png'),
};

const articles = [
  {
    slug: 'ile-kosztuje-audyt-google-ads',
    title: 'Ile kosztuje audyt Google Ads i kiedy warto go zrobić?',
    seoTitle: 'Ile kosztuje audyt Google Ads? Cena, zakres i kiedy warto',
    seoDescription: 'Sprawdź, kiedy audyt Google Ads ma sens, co powinien obejmować i jak ocenić, czy kampanie przepalają budżet.',
    excerpt: 'Audyt Google Ads ma sens wtedy, gdy kampanie wydają budżet, ale nie wiadomo, co realnie działa i co poprawić w pierwszej kolejności.',
    category: 'performance-marketing',
    imageCluster: 'ads',
    readTime: 6,
    sections: [
      ['h2', 'Kiedy audyt Google Ads ma sens'],
      ['p', 'Audyt Google Ads nie jest potrzebny tylko wtedy, gdy kampania przestaje działać. Często największy sens ma wtedy, gdy konto wydaje budżet, generuje kliknięcia, ale decyzje są podejmowane bardziej na podstawie raportów niż realnej wiedzy o konwersjach. W takiej sytuacji audyt porządkuje konto, tracking i priorytety optymalizacji.'],
      ['p', 'Najczęstszy sygnał ostrzegawczy to rozdźwięk między ruchem a wynikiem biznesowym. W panelu widać kliknięcia, wyświetlenia i średni koszt, ale po stronie sprzedaży nie widać proporcjonalnego wzrostu zapytań. Wtedy trzeba sprawdzić, czy problem leży w kampanii, stronie docelowej, analityce czy w całym lejku.'],
      ['h2', 'Co powinien obejmować dobry audyt'],
      ['p', 'Dobry audyt nie kończy się na stwierdzeniu, że CTR jest za niski albo budżet jest źle rozłożony. Powinien obejmować strukturę konta, słowa kluczowe, search terms, konwersje, GA4, GTM, strategie stawek, wykluczenia, kreacje i jakość landing page. Dopiero taki obraz pokazuje, gdzie naprawdę uciekają pieniądze.'],
      ['p', 'W praktyce najpierw sprawdza się fundamenty: czy konwersje są mierzone poprawnie, czy nie są zdublowane, czy kampanie nie optymalizują się pod zdarzenia bez wartości biznesowej. Dopiero potem ocenia się strukturę i skalowanie. Bez poprawnych danych optymalizacja jest zgadywaniem.'],
      ['h2', 'Ile może kosztować audyt'],
      ['p', 'Cena audytu zależy od wielkości konta, liczby kampanii i zakresu analizy. Prosty przegląd kilku kampanii jest zupełnie inną pracą niż audyt rozbudowanego e-commerce z Performance Max, Merchant Center, remarketingiem i wieloma typami konwersji. Najważniejsze jest to, żeby cena była powiązana z konkretnym zakresem i wynikiem pracy.'],
      ['p', 'Najbardziej wartościowy audyt kończy się listą priorytetów: co poprawić natychmiast, co testować przez kilka tygodni, a czego nie zmieniać bez dodatkowych danych. Wtedy koszt audytu łatwo porównać z budżetem, który konto może przepalać co miesiąc.'],
      ['h2', 'Co dalej po audycie'],
      ['p', 'Po audycie można wdrożyć rekomendacje samodzielnie, przekazać je obecnemu specjaliście albo rozpocząć stałą optymalizację z agencją. Kluczowe jest, żeby nie kończyć na samym dokumencie. Audyt ma być początkiem decyzji, nie kolejnym raportem w folderze.'],
    ],
    links: [
      ['audyt Google Ads', '/uslugi/audyt-google-ads'],
      ['prowadzenie kampanii Google Ads', '/uslugi/performance-marketing/google-ads'],
      ['performance marketing', '/uslugi/performance-marketing'],
    ],
  },
  {
    slug: 'bledy-w-kampaniach-google-ads',
    title: 'Najczęstsze błędy w kampaniach Google Ads, które przepalają budżet',
    seoTitle: 'Błędy w Google Ads, które przepalają budżet kampanii',
    seoDescription: 'Poznaj błędy w Google Ads: zły tracking, brak wykluczeń, chaotyczna struktura konta i landing page bez konwersji.',
    excerpt: 'W Google Ads budżet najczęściej ucieka nie przez jeden duży błąd, ale przez kilka małych decyzji, które działają przeciwko konwersji.',
    category: 'performance-marketing',
    imageCluster: 'ads',
    readTime: 7,
    sections: [
      ['h2', 'Błąd pierwszy: kampania optymalizuje się pod złe konwersje'],
      ['p', 'Jeśli konto Google Ads zbiera konwersje, które nie mają realnej wartości biznesowej, algorytm będzie optymalizował kampanie w złym kierunku. Przykładem może być kliknięcie w przycisk, wejście na podstronę lub mikrozdarzenie traktowane tak samo jak wysłany formularz.'],
      ['p', 'Dlatego pierwszym krokiem zawsze powinien być przegląd GA4, GTM i importu konwersji. Dopiero gdy wiadomo, które zdarzenia są prawdziwymi leadami lub sprzedażą, można oceniać kampanie po kosztach i ROAS.'],
      ['h2', 'Błąd drugi: brak pracy na wyszukiwanych hasłach'],
      ['p', 'Raport wyszukiwanych haseł pokazuje, za jakie realne zapytania płacisz. Jeśli nikt regularnie nie dodaje wykluczeń i nie analizuje intencji słów, kampania może wydawać pieniądze na ruch informacyjny, przypadkowy albo zbyt szeroki.'],
      ['p', 'To szczególnie groźne w usługach B2B, gdzie jedno kliknięcie może kosztować dużo, a różnica między frazą edukacyjną i zakupową jest ogromna. Fraza “co to jest Google Ads” nie ma tej samej wartości co “agencja Google Ads dla sklepu internetowego”.'],
      ['h2', 'Błąd trzeci: zbyt szeroka struktura kampanii'],
      ['p', 'Jedna kampania z wieloma różnymi usługami i grupami odbiorców utrudnia ocenę wyniku. Budżet miesza intencje, reklamy są mniej precyzyjne, a landing page nie odpowiada dokładnie na potrzebę użytkownika.'],
      ['p', 'Lepsza struktura rozdziela kampanie według intencji, typu usługi, marży lub etapu lejka. Dzięki temu łatwiej skalować to, co działa, i zatrzymać wydatki tam, gdzie kampania nie dowozi wyniku.'],
      ['h2', 'Błąd czwarty: landing page nie domyka obietnicy reklamy'],
      ['p', 'Nawet dobrze ustawiona kampania nie naprawi strony, która nie odpowiada na pytanie użytkownika. Jeśli reklama obiecuje audyt, wycenę lub konkretną usługę, strona docelowa musi prowadzić do tej samej decyzji. Ogólna strona główna zwykle jest za szeroka.'],
    ],
    links: [
      ['audyt konta Google Ads', '/uslugi/audyt-google-ads'],
      ['kampanie Google Ads', '/uslugi/performance-marketing/google-ads'],
      ['landing page pod kampanie', '/uslugi/tworzenie-stron-www-cennik'],
    ],
  },
  {
    slug: 'performance-max-kiedy-dziala',
    title: 'Performance Max: kiedy działa, a kiedy tylko ukrywa problemy konta?',
    seoTitle: 'Performance Max: kiedy działa i jak go audytować?',
    seoDescription: 'Performance Max może skalować sprzedaż, ale bez danych i kontroli potrafi ukrywać problemy kampanii Google Ads.',
    excerpt: 'Performance Max nie jest magicznym przyciskiem do sprzedaży. Działa najlepiej tam, gdzie konto ma dane, tracking i jasny cel biznesowy.',
    category: 'performance-marketing',
    imageCluster: 'ads',
    readTime: 7,
    sections: [
      ['h2', 'Dlaczego Performance Max bywa kuszący'],
      ['p', 'Performance Max obiecuje prostą rzecz: jedna kampania, wiele kanałów Google i automatyczna optymalizacja pod cel. Dla wielu firm brzmi to jak sposób na uproszczenie konta i szybkie skalowanie wyników. Problem zaczyna się wtedy, gdy automatyzacja dostaje słabe dane albo zbyt ogólny cel.'],
      ['p', 'Algorytm potrafi znaleźć tanią konwersję, ale nie zawsze oznacza to wartościowego klienta. Jeśli konwersja jest źle ustawiona albo kampania miesza brand, remarketing i nowych użytkowników, wynik w panelu może wyglądać dobrze, a biznesowo niewiele zmieniać.'],
      ['h2', 'Kiedy PMax ma największy sens'],
      ['p', 'Performance Max najczęściej sprawdza się w e-commerce z poprawnie skonfigurowanym Merchant Center, sensowną historią konwersji i dobrą jakością feedu produktowego. Działa też w kontach, które mają jasne sygnały odbiorców i poprawnie mierzą wartość konwersji.'],
      ['p', 'W usługach B2B trzeba ostrożniej podejść do celu kampanii. Formularz kontaktowy, telefon i lead jakościowy nie są tym samym. Jeśli kampania optymalizuje się pod ilość, może sprowadzać zapytania, które nie pasują do oferty.'],
      ['h2', 'Jak audytować Performance Max'],
      ['p', 'Audyt PMax powinien sprawdzić, czy kampania nie zawyża wyniku ruchem brandowym, czy feed produktowy jest kompletny, czy assety są dopasowane do oferty i czy landing page odpowiada intencji użytkownika. Ważne jest też porównanie PMax z kampaniami search i remarketingiem.'],
      ['p', 'Nie chodzi o to, żeby zawsze wyłączać automatyzację. Chodzi o to, żeby wiedzieć, co automatyzacja robi z budżetem i czy skaluje realną sprzedaż, czy tylko raportuje wygodne liczby.'],
      ['h2', 'Co zrobić, jeśli PMax nie dowozi'],
      ['p', 'Najpierw trzeba uporządkować konwersje i segmentację. Potem sprawdzić feed, assety, strukturę konta i podział budżetów. Dopiero na końcu podejmować decyzję o przebudowie kampanii albo zmianie strategii stawek.'],
    ],
    links: [
      ['audyt Google Ads', '/uslugi/audyt-google-ads'],
      ['performance marketing', '/uslugi/performance-marketing'],
      ['e-commerce', '/uslugi/e-commerce'],
    ],
  },
  {
    slug: 'konwersje-google-ads-ga4-gtm',
    title: 'Konwersje w Google Ads: GA4, GTM i najczęstsze błędy pomiaru',
    seoTitle: 'Konwersje Google Ads, GA4 i GTM: jak uniknąć błędów',
    seoDescription: 'Poprawny tracking konwersji w Google Ads jest podstawą optymalizacji. Sprawdź typowe błędy GA4 i GTM.',
    excerpt: 'Jeśli konwersje są źle mierzone, kampania Google Ads będzie optymalizować się pod przypadkowe sygnały.',
    category: 'performance-marketing',
    imageCluster: 'ads',
    readTime: 6,
    sections: [
      ['h2', 'Dlaczego tracking jest ważniejszy niż ustawienia kampanii'],
      ['p', 'W Google Ads jakość danych decyduje o jakości optymalizacji. Nawet najlepsza struktura kampanii nie pomoże, jeśli system otrzymuje błędne sygnały o tym, co jest konwersją. W praktyce oznacza to, że zanim zaczniemy zmieniać stawki i reklamy, trzeba sprawdzić pomiar.'],
      ['p', 'Najczęstszy problem to traktowanie mikrozdarzeń jak realnych leadów. Kliknięcie w przycisk, scroll albo wejście na stronę kontaktu może być przydatne analitycznie, ale nie powinno mieć tej samej wagi co wysłany formularz.'],
      ['h2', 'GA4 i Google Ads nie zawsze pokazują to samo'],
      ['p', 'Różnice między GA4 i Google Ads są normalne, bo narzędzia mają inną metodologię atrybucji. Problem zaczyna się wtedy, gdy różnice są tak duże, że zespół nie wie, któremu raportowi ufać. Wtedy trzeba sprawdzić import konwersji, okna atrybucji i konfigurację zdarzeń.'],
      ['p', 'Warto rozdzielić konwersje podstawowe od pomocniczych. Google Ads powinien optymalizować się pod zdarzenia, które naprawdę pokazują wartość biznesową, a nie pod każdą interakcję użytkownika.'],
      ['h2', 'GTM jako warstwa kontroli'],
      ['p', 'Google Tag Manager pozwala uporządkować zdarzenia, ale tylko wtedy, gdy kontener jest utrzymywany jak system, a nie jak zbiór przypadkowych tagów. Zduplikowane tagi, stare konwersje i brak nazewnictwa potrafią zniszczyć jakość danych.'],
      ['p', 'Dobrym standardem jest opisanie najważniejszych zdarzeń: formularz, telefon, kliknięcie maila, zakup, dodanie do koszyka, rozpoczęcie checkoutu. Każde z nich powinno mieć jasną rolę w lejku.'],
      ['h2', 'Od czego zacząć porządkowanie'],
      ['p', 'Najpierw sprawdź, które konwersje są ustawione jako primary w Google Ads. Potem porównaj je z GA4 i testem w trybie podglądu GTM. Dopiero po takim przeglądzie warto zmieniać strategie stawek i budżety.'],
    ],
    links: [
      ['audyt Google Ads', '/uslugi/audyt-google-ads'],
      ['kampanie Google Ads', '/uslugi/performance-marketing/google-ads'],
      ['formularz na landing page', '/uslugi/tworzenie-stron-www-cennik'],
    ],
  },
  {
    slug: 'ile-kosztuje-strona-internetowa-dla-firmy',
    title: 'Ile kosztuje strona internetowa dla firmy w 2026 roku?',
    seoTitle: 'Ile kosztuje strona internetowa dla firmy? Cena w 2026',
    seoDescription: 'Cena strony internetowej zależy od zakresu, CMS, treści, SEO i integracji. Zobacz, jak podejść do wyceny.',
    excerpt: 'Koszt strony internetowej nie zależy tylko od liczby podstron. Największy wpływ mają treści, CMS, integracje i cel biznesowy.',
    category: 'strony-www',
    imageCluster: 'web',
    readTime: 7,
    sections: [
      ['h2', 'Dlaczego widełki cenowe są tak różne'],
      ['p', 'Strona internetowa może kosztować kilka tysięcy złotych albo wielokrotnie więcej, bo pod tą samą nazwą kryją się bardzo różne zakresy. Prosta wizytówka, landing page pod kampanię i serwis z CMS, blogiem oraz integracjami to trzy różne produkty.'],
      ['p', 'Najczęstszy błąd przy porównywaniu ofert polega na patrzeniu wyłącznie na cenę końcową. Tymczasem ważniejsze jest to, czy w cenie są treści, UX, wersja mobilna, SEO, analityka, formularze, CMS i wsparcie po wdrożeniu.'],
      ['h2', 'Co realnie wpływa na koszt strony'],
      ['p', 'Na cenę wpływa liczba typów podstron, poziom projektu graficznego, jakość treści, integracje z narzędziami marketingowymi i zakres CMS. Duże znaczenie ma też to, czy strona ma być tylko obecnością w sieci, czy ma aktywnie pozyskiwać leady.'],
      ['p', 'Jeśli strona ma współpracować z kampaniami Google Ads lub Meta Ads, trzeba zaplanować formularze, mierzenie konwersji i strukturę sekcji pod decyzję użytkownika. Wtedy oszczędzanie na strategii zwykle odbija się na koszcie pozyskania klienta.'],
      ['h2', 'Landing page, strona firmowa czy serwis'],
      ['p', 'Landing page jest dobry, gdy promujesz jedną usługę lub jedną kampanię. Strona firmowa sprawdza się, gdy użytkownik musi poznać ofertę, zespół i wiarygodność firmy. Rozbudowany serwis jest potrzebny, gdy planujesz SEO, blog, bazę wiedzy lub wiele podstron ofertowych.'],
      ['p', 'Dobry wybór zakresu jest ważniejszy niż wybór najniższej ceny. Zbyt mały zakres oznacza, że po kilku miesiącach strona i tak wymaga przebudowy. Zbyt duży zakres na start zamraża budżet, który można wykorzystać na ruch i testy.'],
      ['h2', 'Jak przygotować się do wyceny'],
      ['p', 'Najlepiej opisać cel strony, grupę odbiorców, najważniejsze usługi, planowane źródła ruchu i to, co użytkownik ma zrobić po wejściu. Taki brief pozwala dobrać zakres, zamiast zgadywać liczbę sekcji i podstron.'],
    ],
    links: [
      ['cennik stron internetowych', '/uslugi/tworzenie-stron-www-cennik'],
      ['tworzenie stron WWW', '/uslugi/strony-www'],
      ['audyt Google Ads', '/uslugi/audyt-google-ads'],
    ],
  },
  {
    slug: 'landing-page-czy-strona-firmowa',
    title: 'Landing page czy strona firmowa: co wybrać pod sprzedaż?',
    seoTitle: 'Landing page czy strona firmowa? Co wybrać dla firmy',
    seoDescription: 'Landing page i strona firmowa mają różne role. Sprawdź, co wybrać pod kampanie, SEO i pozyskiwanie leadów.',
    excerpt: 'Landing page skupia się na jednej decyzji, a strona firmowa buduje szersze zaufanie. Wybór zależy od źródła ruchu i celu.',
    category: 'strony-www',
    imageCluster: 'web',
    readTime: 6,
    sections: [
      ['h2', 'Różnica nie polega tylko na liczbie podstron'],
      ['p', 'Landing page to strona zaprojektowana pod jedną decyzję: wysłanie formularza, pobranie materiału, zapis na konsultację albo zakup konkretnej oferty. Strona firmowa ma szerszą rolę: pokazuje usługi, wiarygodność, zespół, realizacje i kontakt.'],
      ['p', 'Dlatego landing page lepiej sprawdza się przy kampaniach płatnych, a strona firmowa przy ruchu organicznym, ruchu brandowym i użytkownikach, którzy potrzebują więcej kontekstu przed kontaktem.'],
      ['h2', 'Kiedy wybrać landing page'],
      ['p', 'Landing page ma sens, gdy promujesz konkretną usługę, audyt, konsultację lub ofertę sezonową. Użytkownik trafia z reklamy i powinien szybko zobaczyć obietnicę, dowody, zakres oraz formularz. Każda dodatkowa ścieżka może obniżyć konwersję.'],
      ['p', 'To dobry wybór również wtedy, gdy chcesz testować różne komunikaty. Jedna kampania może prowadzić na landing page pod audyt, druga na wycenę strony, trzecia na usługę dla e-commerce.'],
      ['h2', 'Kiedy potrzebna jest strona firmowa'],
      ['p', 'Strona firmowa jest lepsza, gdy oferta jest szersza, decyzja zakupowa trwa dłużej albo firma musi zbudować zaufanie. Użytkownik chce zobaczyć realizacje, proces, specjalizacje i sposób kontaktu.'],
      ['p', 'W SEO strona firmowa jest też centrum linkowania. To z niej powinny wychodzić ścieżki do landing page’y, artykułów i stron usługowych. Bez takiej architektury łatwo stworzyć kilka stron, które konkurują ze sobą o podobne frazy.'],
      ['h2', 'Najlepszy układ: oba typy stron'],
      ['p', 'W praktyce najlepsze efekty daje połączenie: strona firmowa jako filar oraz landing page’e pod konkretne intencje zakupowe. Dzięki temu użytkownik z reklamy dostaje prostą ścieżkę, a użytkownik z Google może wejść głębiej w temat.'],
    ],
    links: [
      ['tworzenie stron WWW', '/uslugi/strony-www'],
      ['cennik stron WWW', '/uslugi/tworzenie-stron-www-cennik'],
      ['performance marketing', '/uslugi/performance-marketing'],
    ],
  },
  {
    slug: 'strona-www-pod-google-ads',
    title: 'Strona WWW pod Google Ads: co musi mieć, żeby kampania konwertowała?',
    seoTitle: 'Strona pod Google Ads: co wpływa na konwersję kampanii',
    seoDescription: 'Kampania Google Ads potrzebuje strony, która odpowiada intencji reklamy, szybko się ładuje i mierzy konwersje.',
    excerpt: 'Google Ads nie kończy się na kliknięciu. Jeśli strona docelowa nie domyka obietnicy reklamy, budżet będzie pracował słabo.',
    category: 'strony-www',
    imageCluster: 'web',
    readTime: 7,
    sections: [
      ['h2', 'Kliknięcie to dopiero połowa pracy'],
      ['p', 'Kampania Google Ads może sprowadzić właściwego użytkownika, ale to strona decyduje, czy użytkownik wykona kolejny krok. Jeśli reklama mówi o audycie, wycenie albo konkretnej usłudze, landing page musi od razu rozwinąć tę obietnicę.'],
      ['p', 'Wysyłanie ruchu na ogólną stronę główną często obniża konwersję, bo użytkownik musi sam znaleźć odpowiedni kontekst. Przy droższych kliknięciach to szybka droga do przepalania budżetu.'],
      ['h2', 'Najważniejsze elementy strony pod kampanię'],
      ['p', 'Strona pod kampanię powinna mieć jasny nagłówek, konkretną propozycję wartości, krótki opis procesu, dowody zaufania, odpowiedzi na obiekcje i formularz dostępny bez szukania. Każda sekcja powinna przybliżać do decyzji.'],
      ['p', 'Nie chodzi o agresywną sprzedaż. Chodzi o usunięcie niepewności: co dostanę, ile to potrwa, z kim rozmawiam, co stanie się po wysłaniu formularza i dlaczego warto zrobić to teraz.'],
      ['h2', 'Tracking i formularz'],
      ['p', 'Formularz powinien być krótki, ale wystarczający do kwalifikacji leadu. Im bardziej złożona usługa, tym bardziej opłaca się dodać pole o budżecie, zakresie albo problemie. Dzięki temu zespół sprzedaży wie, jak odpowiedzieć.'],
      ['p', 'Równolegle trzeba mierzyć wysłanie formularza, kliknięcia telefonu, maila i inne istotne zdarzenia. Bez tego kampania nie ma dobrych danych do optymalizacji.'],
      ['h2', 'Szybkość i spójność komunikatu'],
      ['p', 'Strona docelowa powinna ładować się szybko i być spójna z reklamą. Jeśli użytkownik kliknął frazę “audyt Google Ads”, nie powinien trafić na ogólną ofertę marketingową bez jasnej ścieżki do audytu.'],
    ],
    links: [
      ['audyt Google Ads', '/uslugi/audyt-google-ads'],
      ['kampanie Google Ads', '/uslugi/performance-marketing/google-ads'],
      ['tworzenie stron internetowych', '/uslugi/strony-www'],
    ],
  },
  {
    slug: 'brief-do-strony-internetowej',
    title: 'Brief do strony internetowej: co przygotować przed wyceną?',
    seoTitle: 'Brief do strony internetowej: co przygotować do wyceny',
    seoDescription: 'Dobry brief do strony WWW pomaga szybciej wycenić projekt i uniknąć nietrafionego zakresu.',
    excerpt: 'Dobry brief nie musi być długi. Musi jasno pokazać cel strony, odbiorców, zakres treści i oczekiwane działanie użytkownika.',
    category: 'strony-www',
    imageCluster: 'web',
    readTime: 6,
    sections: [
      ['h2', 'Po co w ogóle brief'],
      ['p', 'Brief pomaga zamienić ogólne “potrzebujemy strony” w konkretny zakres projektu. Dzięki temu agencja może zaproponować rozwiązanie, które pasuje do celu biznesowego, a nie tylko do liczby podstron.'],
      ['p', 'Bez briefu wycena zwykle opiera się na założeniach. Jedna strona firmowa może oznaczać pięć prostych podstron, a inna rozbudowany serwis z CMS, blogiem, bazą wiedzy i integracją CRM.'],
      ['h2', 'Najważniejsze pytania w briefie'],
      ['p', 'Najpierw trzeba określić, co strona ma robić: pozyskiwać leady, wspierać sprzedaż, budować wiarygodność, edukować rynek czy obsługiwać kampanie. Potem warto opisać grupę odbiorców i główne obiekcje, które strona ma przełamać.'],
      ['p', 'Kolejne elementy to lista usług, przykłady konkurencji, materiały marki, treści, zdjęcia, wymagane integracje i informacja, kto będzie później edytował stronę. To wszystko wpływa na technologię i koszt.'],
      ['h2', 'Czego nie trzeba mieć na start'],
      ['p', 'Nie musisz mieć gotowej struktury strony ani pełnych tekstów. Dobrze zaprojektowany proces powinien pomóc w ustaleniu architektury informacji. Warto jednak wiedzieć, które usługi są priorytetowe i skąd ma przychodzić ruch.'],
      ['p', 'Jeśli strona ma wspierać SEO, trzeba od początku zaplanować słowa kluczowe, landing page’e i linkowanie wewnętrzne. Jeśli ma wspierać kampanie, trzeba zaplanować konwersje i formularze.'],
      ['h2', 'Jak brief wpływa na cenę'],
      ['p', 'Im mniej niewiadomych, tym łatwiej dobrać zakres i uniknąć dopisywania kosztów w trakcie. Dobry brief nie obniża jakości, ale ogranicza ryzyko nieporozumień.'],
    ],
    links: [
      ['wycena strony internetowej', '/uslugi/tworzenie-stron-www-cennik'],
      ['tworzenie stron WWW', '/uslugi/strony-www'],
      ['kontakt z CreativeTrust', '/kontakt'],
    ],
  },
  {
    slug: 'kiedy-woocommerce-headless-ma-sens',
    title: 'Kiedy migracja WooCommerce do headless ma sens?',
    seoTitle: 'Kiedy WooCommerce headless ma sens? Migracja do Next.js',
    seoDescription: 'Headless WooCommerce ma sens przy problemach z wydajnością, UX, integracjami i skalowaniem sklepu.',
    excerpt: 'Headless nie jest dla każdego sklepu. Ma sens wtedy, gdy WooCommerce ogranicza szybkość, rozwój UX lub integracje.',
    category: 'e-commerce',
    imageCluster: 'ecommerce',
    readTime: 7,
    sections: [
      ['h2', 'Headless nie jest celem samym w sobie'],
      ['p', 'Migracja WooCommerce do headless ma sens tylko wtedy, gdy rozwiązuje konkretny problem biznesowy. Sam fakt użycia Next.js, API i nowego frontendu nie gwarantuje lepszej sprzedaży. Potrzebny jest powód: wydajność, elastyczność UX, skala ruchu albo integracje.'],
      ['p', 'Dla małego sklepu z prostym katalogiem tradycyjny WooCommerce może być wystarczający. Pełna migracja byłaby wtedy zbyt drogim sposobem na problem, który da się rozwiązać optymalizacją motywu, hostingu lub wtyczek.'],
      ['h2', 'Sygnały, że warto rozważyć headless'],
      ['p', 'Pierwszy sygnał to problemy z wydajnością, których nie da się trwale rozwiązać cachem i porządkami w WordPressie. Drugi to koszt każdej zmiany UX: jeśli checkout, listing lub karta produktu są blokowane przez motyw i wtyczki, osobny frontend daje więcej kontroli.'],
      ['p', 'Trzeci sygnał to integracje. Jeśli sklep potrzebuje PIM, ERP, OMS, zaawansowanej analityki albo marketing automation, architektura oparta o API ułatwia rozdzielenie odpowiedzialności.'],
      ['h2', 'Co zostaje z WooCommerce'],
      ['p', 'W jednym scenariuszu WooCommerce zostaje backendem: zarządza produktami, zamówieniami i częścią logiki sklepu, a Next.js odpowiada za frontend. To dobre rozwiązanie, gdy zespół zna WooCommerce i nie chce od razu migrować całego silnika.'],
      ['p', 'W drugim scenariuszu migracja idzie dalej: do Medusa, Saleor albo Shopify Plus. To ma sens przy większej skali, potrzebie stabilniejszego commerce backendu lub zmianie modelu operacyjnego sklepu.'],
      ['h2', 'Jak zacząć bez ryzyka'],
      ['p', 'Najbezpieczniej zacząć od audytu i mapy migracji. Czasem pierwszym krokiem jest checkout, czasem listing produktów, a czasem tylko warstwa treści i landing page’e. Pełna przebudowa bez etapów zwiększa ryzyko spadku sprzedaży i problemów SEO.'],
    ],
    links: [
      ['migracja WooCommerce do headless', '/uslugi/migracja-woocommerce-do-headless'],
      ['e-commerce i headless commerce', '/uslugi/e-commerce'],
      ['marketing automation', '/uslugi/marketing-automation'],
    ],
  },
  {
    slug: 'headless-woocommerce-next-js',
    title: 'Headless WooCommerce i Next.js: co realnie zmienia w sklepie?',
    seoTitle: 'Headless WooCommerce Next.js: korzyści, ryzyka i SEO',
    seoDescription: 'Headless WooCommerce z Next.js oddziela frontend od backendu. Sprawdź, co zmienia dla UX, SEO i integracji.',
    excerpt: 'Headless WooCommerce z Next.js daje większą kontrolę nad frontendem, ale wymaga lepszej architektury i utrzymania.',
    category: 'e-commerce',
    imageCluster: 'ecommerce',
    readTime: 7,
    sections: [
      ['h2', 'Na czym polega headless WooCommerce'],
      ['p', 'W klasycznym WooCommerce WordPress odpowiada jednocześnie za panel, logikę sklepu i renderowanie frontendu. W podejściu headless WooCommerce może zostać zapleczem dla produktów i zamówień, a frontend sklepu działa jako osobna aplikacja, na przykład w Next.js.'],
      ['p', 'Taki podział pozwala rozwijać warstwę doświadczenia użytkownika niezależnie od motywu WordPress. Sklep może mieć szybsze listingi, lepiej zaprojektowany checkout i większą kontrolę nad SEO technicznym.'],
      ['h2', 'Co zyskuje frontend w Next.js'],
      ['p', 'Next.js daje możliwości renderowania po stronie serwera, generowania statycznych stron, cache i optymalizacji obrazów. Dla e-commerce oznacza to większą kontrolę nad szybkością i strukturą stron produktów, kategorii oraz treści poradnikowych.'],
      ['p', 'Największa korzyść nie polega jednak tylko na technologii. Osobny frontend ułatwia testowanie UX, budowę dedykowanych landing page’y i łączenie commerce z CMS oraz narzędziami marketingowymi.'],
      ['h2', 'Jakie są ryzyka'],
      ['p', 'Headless zwiększa złożoność. Zamiast jednego systemu utrzymujesz przynajmniej dwie warstwy: backend commerce i frontend. Dochodzą API, cache, preview treści, synchronizacja koszyka, checkout i monitoring.'],
      ['p', 'Dlatego projekt wymaga dobrego discovery. Trzeba określić, które funkcje WooCommerce zostają, które trzeba zbudować na froncie, a które lepiej przenieść do innego silnika commerce.'],
      ['h2', 'Wpływ na SEO'],
      ['p', 'Headless może pomóc SEO, jeśli poprawia Core Web Vitals, strukturę URL, dane strukturalne i kontrolę nad treścią. Może też zaszkodzić, jeśli migracja pominie przekierowania, meta dane, canonicale i indeksowalność. Technologia nie zastępuje planu migracji.'],
    ],
    links: [
      ['migracja WooCommerce do headless', '/uslugi/migracja-woocommerce-do-headless'],
      ['headless e-commerce', '/uslugi/e-commerce'],
      ['cennik strony internetowej', '/uslugi/tworzenie-stron-www-cennik'],
    ],
  },
  {
    slug: 'migracja-checkoutu-do-headless',
    title: 'Migracja checkoutu do headless jako pierwszy krok: co mierzyć?',
    seoTitle: 'Migracja checkoutu do headless: KPI, ryzyka i plan',
    seoDescription: 'Checkout first to bezpieczny sposób testowania headless w e-commerce. Sprawdź, jakie KPI mierzyć.',
    excerpt: 'Nie każda migracja headless musi zaczynać się od całego sklepu. Czasem najlepszym pierwszym krokiem jest checkout.',
    category: 'e-commerce',
    imageCluster: 'ecommerce',
    readTime: 6,
    sections: [
      ['h2', 'Dlaczego checkout jest dobrym etapem testowym'],
      ['p', 'Checkout to najbardziej krytyczny fragment sklepu. Jeśli działa wolno, jest nieczytelny lub ma błędy integracji, bezpośrednio wpływa na przychód. Dlatego w części projektów migracja do headless może zacząć się właśnie od checkoutu, a nie od całego katalogu.'],
      ['p', 'Taki etap pozwala ograniczyć ryzyko. Zamiast przebudowywać wszystko naraz, zespół sprawdza nową architekturę na fragmencie, który ma jasne KPI i bezpośredni wpływ na konwersję.'],
      ['h2', 'Jakie KPI mierzyć'],
      ['p', 'Najważniejsze metryki to współczynnik rozpoczęcia checkoutu, completion rate, porzucenia na krokach, payment success rate, błędy płatności, czas ładowania widoków i liczba problemów JavaScript. Do tego warto mierzyć wpływ na AOV i koszt pozyskania klienta.'],
      ['p', 'Bez baseline przed migracją trudno udowodnić efekt. Dlatego przed wdrożeniem trzeba zebrać dane z obecnego checkoutu i ustalić, które zmiany mają największy potencjał.'],
      ['h2', 'Co może pójść źle'],
      ['p', 'Największe ryzyka dotyczą płatności, dostaw, kuponów, logowania i synchronizacji koszyka. W headless trzeba jasno ustalić, gdzie jest źródło prawdy i jak frontend komunikuje się z backendem commerce.'],
      ['p', 'Migracja checkoutu wymaga też planu awaryjnego. Jeśli nowy checkout ma problem, zespół musi wiedzieć, jak szybko wrócić do stabilnego wariantu.'],
      ['h2', 'Kiedy iść dalej'],
      ['p', 'Jeśli etap checkoutu poprawia konwersję, stabilność i tempo wdrażania zmian, można przejść do listingów, kart produktów i warstwy contentowej. Wtedy headless przestaje być eksperymentem, a zaczyna być strategią platformy.'],
    ],
    links: [
      ['migracja WooCommerce do headless', '/uslugi/migracja-woocommerce-do-headless'],
      ['e-commerce', '/uslugi/e-commerce'],
      ['audyt Google Ads dla e-commerce', '/uslugi/audyt-google-ads'],
    ],
  },
  {
    slug: 'woocommerce-shopify-plus-medusa-saleor',
    title: 'WooCommerce, Shopify Plus, Medusa czy Saleor: co wybrać przy migracji?',
    seoTitle: 'WooCommerce vs Shopify Plus vs Medusa vs Saleor przy migracji',
    seoDescription: 'Wybór silnika e-commerce zależy od skali, integracji, zespołu i kosztu utrzymania. Porównujemy podejścia.',
    excerpt: 'Migracja sklepu to nie tylko wybór technologii. To decyzja o operacjach, integracjach, kosztach i tempie rozwoju.',
    category: 'e-commerce',
    imageCluster: 'ecommerce',
    readTime: 8,
    sections: [
      ['h2', 'Nie ma jednej najlepszej platformy'],
      ['p', 'WooCommerce, Shopify Plus, Medusa i Saleor rozwiązują różne problemy. Najgorsza decyzja to wybór technologii na podstawie popularności, bez zrozumienia modelu sprzedaży, integracji i kompetencji zespołu.'],
      ['p', 'Dla części firm WooCommerce nadal będzie dobrym backendem. Dla innych lepszym kierunkiem będzie Shopify Plus z gotowym ekosystemem albo headless backend typu Medusa lub Saleor, który daje więcej kontroli nad logiką commerce.'],
      ['h2', 'Kiedy zostać przy WooCommerce'],
      ['p', 'WooCommerce ma sens, gdy zespół dobrze zna WordPress, katalog nie jest ekstremalnie złożony, a największym problemem jest frontend, nie logika zamówień. Wtedy można rozważyć Next.js storefront podłączony do obecnego backendu.'],
      ['p', 'To scenariusz pośredni: nie wyrzucasz całej operacji, ale zdejmujesz z WooCommerce odpowiedzialność za renderowanie frontu.'],
      ['h2', 'Kiedy Shopify Plus'],
      ['p', 'Shopify Plus jest dobrym wyborem, gdy firma chce stabilnego, zarządzanego silnika commerce, dużego ekosystemu aplikacji i mniej odpowiedzialności za infrastrukturę. Koszt jest bardziej przewidywalny, ale część logiki trzeba dopasować do reguł platformy.'],
      ['p', 'To dobry kierunek dla marek, które chcą szybko skalować sprzedaż i nie chcą budować wszystkiego od zera.'],
      ['h2', 'Kiedy Medusa lub Saleor'],
      ['p', 'Medusa i Saleor są ciekawsze tam, gdzie logika commerce jest niestandardowa: B2B, marketplace, wiele cenników, integracje z ERP lub potrzeba większej kontroli nad API. Wymagają jednak silniejszego zespołu technicznego i planu utrzymania.'],
      ['p', 'Wybór platformy powinien wynikać z architektury docelowej, a nie z samego hasła “headless”. Najpierw trzeba opisać procesy, dane i ograniczenia, dopiero potem wybrać silnik.'],
    ],
    links: [
      ['migracja WooCommerce do headless', '/uslugi/migracja-woocommerce-do-headless'],
      ['headless commerce', '/uslugi/e-commerce'],
      ['marketing automation dla e-commerce', '/uslugi/marketing-automation'],
    ],
  },
];

function key(prefix) {
  key.counter = (key.counter || 0) + 1;
  return `${prefix}-${key.counter}`;
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

function block(style, text) {
  return {
    _type: 'block',
    _key: key('block'),
    style,
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: key('span'),
        text,
        marks: [],
      },
    ],
  };
}

function linkedParagraph(parts) {
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
      blank: false,
    });

    return {
      _type: 'span',
      _key: key('span'),
      text: part.text,
      marks: [markKey],
    };
  });

  return {
    _type: 'block',
    _key: key('block'),
    style: 'normal',
    markDefs,
    children,
  };
}

function portableText(article) {
  const content = article.sections.map(([style, text]) => block(style === 'p' ? 'normal' : style, text));

  content.push(block('h2', 'Polecane kolejne kroki'));
  content.push(
    linkedParagraph([
      'Jeśli chcesz przejść od wiedzy do działania, zobacz: ',
      { text: article.links[0][0], href: article.links[0][1] },
      ', ',
      { text: article.links[1][0], href: article.links[1][1] },
      ' oraz ',
      { text: article.links[2][0], href: article.links[2][1] },
      '.',
    ])
  );

  return content;
}

async function uploadImages() {
  const result = {};

  for (const [cluster, filePath] of Object.entries(imageByCluster)) {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing image: ${filePath}`);
    }

    const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
      filename: path.basename(filePath),
    });
    result[cluster] = asset._id;
  }

  return result;
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
  const uploadedImages = await uploadImages();
  const now = new Date();

  for (const [index, article] of articles.entries()) {
    const category = categoryBySlug[article.category];

    if (!category?._id) {
      throw new Error(`Category not found: ${article.category}`);
    }

    const publishedAt = new Date(now.getTime() - index * 60 * 60 * 1000).toISOString();
    const imageAssetId = uploadedImages[article.imageCluster];
    const document = {
      _id: `seo-blog-${article.slug}`,
      _type: 'blogPost',
      title: article.title,
      slug: {
        _type: 'slug',
        current: slugify(article.slug),
      },
      publishedAt,
      author: {
        _type: 'reference',
        _ref: author._id,
      },
      mainImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAssetId,
        },
        alt: article.title,
      },
      categories: [
        {
          _key: key('category'),
          _type: 'reference',
          _ref: category._id,
        },
      ],
      featured: false,
      excerpt: article.excerpt,
      content: portableText(article),
      estimatedReadingTime: article.readTime,
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
