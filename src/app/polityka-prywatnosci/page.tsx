import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Polityka Prywatności - CreativeTrust',
    description: 'Polityka prywatności opisuje zasady przetwarzania przez nas informacji na Twój temat, w tym danych osobowych oraz ciasteczek, czyli tzw. cookies.',
};

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-medium mb-8">Polityka Prywatności</h1>

                <div className="prose max-w-none">
                    <p className="text-lg mb-8">
                        Polityka prywatności opisuje zasady przetwarzania przez nas informacji na Twój temat, w tym danych osobowych oraz ciasteczek, czyli tzw. cookies.
                    </p>

                    <h2 className="text-2xl font-medium mt-10 mb-4">1. Informacje ogólne</h2>
                    <p>
                        Niniejsza polityka dotyczy Serwisu www, funkcjonującego pod adresem url: creativetrust.pl
                    </p>
                    <p>
                        Operatorem serwisu oraz Administratorem danych osobowych jest: CreativeTrust Natalia Staszak Kombatantów 34/500
                    </p>
                    <p>
                        Adres kontaktowy poczty elektronicznej operatora: office@creativetrust.pl
                    </p>
                    <p>
                        Operator jest Administratorem Twoich danych osobowych w odniesieniu do danych podanych dobrowolnie w Serwisie.
                    </p>
                    <p>
                        Serwis wykorzystuje dane osobowe w następujących celach:
                    </p>
                    <ul>
                        <li>Obsługa zapytań przez formularz</li>
                        <li>Prezentacja oferty lub informacji</li>
                    </ul>
                    <p>
                        Serwis realizuje funkcje pozyskiwania informacji o użytkownikach i ich zachowaniu w następujący sposób:
                    </p>
                    <ul>
                        <li>Poprzez dobrowolnie wprowadzone w formularzach dane, które zostają wprowadzone do systemów Operatora.</li>
                        <li>Poprzez zapisywanie w urządzeniach końcowych plików cookie (tzw. „ciasteczka").</li>
                    </ul>

                    <h2 className="text-2xl font-medium mt-10 mb-4">2. Wybrane metody ochrony danych stosowane przez Operatora</h2>
                    <p>
                        Miejsca logowania i wprowadzania danych osobowych są chronione w warstwie transmisji (certyfikat SSL). Dzięki temu dane osobowe i dane logowania, wprowadzone na stronie, zostają zaszyfrowane w komputerze użytkownika i mogą być odczytane jedynie na docelowym serwerze.
                    </p>
                    <p>
                        Dane osobowe przechowywane w bazie danych są zaszyfrowane w taki sposób, że jedynie posiadający Operator klucz może je odczytać. Dzięki temu dane są chronione na wypadek wykradzenia bazy danych z serwera.
                    </p>
                    <p>
                        Hasła użytkowników są przechowywane w postaci hashowanej. Funkcja hashująca działa jednokierunkowo - nie jest możliwe odwrócenie jej działania, co stanowi obecnie współczesny standard w zakresie przechowywania haseł użytkowników.
                    </p>
                    <p>
                        Operator okresowo zmienia swoje hasła administracyjne.
                    </p>
                    <p>
                        W celu ochrony danych Operator regularnie wykonuje kopie bezpieczeństwa.
                    </p>
                    <p>
                        Istotnym elementem ochrony danych jest regularna aktualizacja wszelkiego oprogramowania, wykorzystywanego przez Operatora do przetwarzania danych osobowych, co w szczególności oznacza regularne aktualizacje komponentów programistycznych.
                    </p>

                    <h2 className="text-2xl font-medium mt-10 mb-4">3. Hosting</h2>
                    <p>
                        Serwis jest hostowany (technicznie utrzymywany) na serwerach operatora: inna firma
                    </p>
                    <p>
                        Firma hostingowa w celu zapewnienia niezawodności technicznej prowadzi logi na poziomie serwera. Zapisowi mogą podlegać:
                    </p>
                    <ul>
                        <li>zasoby określone identyfikatorem URL (adresy żądanych zasobów – stron, plików),</li>
                        <li>czas nadejścia zapytania,</li>
                        <li>czas wysłania odpowiedzi,</li>
                        <li>nazwę stacji klienta – identyfikacja realizowana przez protokół HTTP,</li>
                        <li>informacje o błędach jakie nastąpiły przy realizacji transakcji HTTP,</li>
                        <li>adres URL strony poprzednio odwiedzanej przez użytkownika (referer link) – w przypadku gdy przejście do Serwisu nastąpiło przez odnośnik,</li>
                        <li>informacje o przeglądarce użytkownika,</li>
                        <li>informacje o adresie IP,</li>
                        <li>informacje diagnostyczne związane z procesem samodzielnego zamawiania usług poprzez rejestratory na stronie,</li>
                        <li>informacje związane z obsługą poczty elektronicznej kierowanej do Operatora oraz wysyłanej przez Operatora.</li>
                    </ul>

                    <h2 className="text-2xl font-medium mt-10 mb-4">4. Twoje prawa i dodatkowe informacje o sposobie wykorzystania danych</h2>
                    <p>
                        W niektórych sytuacjach Administrator ma prawo przekazywać Twoje dane osobowe innym odbiorcom, jeśli będzie to niezbędne do wykonania zawartej z Tobą umowy lub do zrealizowania obowiązków ciążących na Administratorze. Dotyczy to takich grup odbiorców:
                    </p>
                    <ul>
                        <li>firma hostingowa na zasadzie powierzenia</li>
                        <li>operatorzy pocztowi</li>
                        <li>upoważnieni pracownicy i współpracownicy, którzy korzystają z danych w celu realizacji celu działania strony</li>
                        <li>firmy, świadczące usługi marketingu na rzecz Administratora</li>
                    </ul>
                    <p>
                        Twoje dane osobowe przetwarzane przez Administratora nie dłużej, niż jest to konieczne do wykonania związanych z nimi czynności określonych osobnymi przepisami (np. o prowadzeniu rachunkowości). W odniesieniu do danych marketingowych dane nie będą przetwarzane dłużej niż przez 3 lata.
                    </p>
                    <p>
                        Przysługuje Ci prawo żądania od Administratora:
                    </p>
                    <ul>
                        <li>dostępu do danych osobowych Ciebie dotyczących,</li>
                        <li>ich sprostowania,</li>
                        <li>usunięcia,</li>
                        <li>ograniczenia przetwarzania,</li>
                        <li>oraz przenoszenia danych.</li>
                    </ul>
                    <p>
                        Przysługuje Ci prawo do złożenia sprzeciwu w zakresie przetwarzania wskazanego w pkt 3.2 wobec przetwarzania danych osobowych w celu wykonania prawnie uzasadnionych interesów realizowanych przez Administratora, w tym profilowania, przy czym prawo sprzeciwu nie będzie mogło być wykonane w przypadku istnienia ważnych prawnie uzasadnionych podstaw do przetwarzania, nadrzędnych wobec Ciebie interesów, praw i wolności, w szczególności ustalenia, dochodzenia lub obrony roszczeń.
                    </p>
                    <p>
                        Na działania Administratora przysługuje skarga do Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa.
                    </p>
                    <p>
                        Podanie danych osobowych jest dobrowolne, lecz niezbędne do obsługi Serwisu.
                    </p>
                    <p>
                        W stosunku do Ciebie mogą być podejmowane czynności polegające na zautomatyzowanym podejmowaniu decyzji, w tym profilowaniu w celu świadczenia usług w ramach zawartej umowy oraz w celu prowadzenia przez Administratora marketingu bezpośredniego.
                    </p>
                    <p>
                        Dane osobowe nie są przekazywane od krajów trzecich w rozumieniu przepisów o ochronie danych osobowych. Oznacza to, że nie przesyłamy ich poza teren Unii Europejskiej.
                    </p>

                    <h2 className="text-2xl font-medium mt-10 mb-4">5. Informacje w formularzach</h2>
                    <p>
                        Serwis zbiera informacje podane dobrowolnie przez użytkownika, w tym dane osobowe, o ile zostaną one podane.
                    </p>
                    <p>
                        Serwis może zapisać informacje o parametrach połączenia (oznaczenie czasu, adres IP).
                    </p>
                    <p>
                        Serwis, w niektórych wypadkach, może zapisać informację ułatwiającą powiązanie danych w formularzu z adresem e-mail użytkownika wypełniającego formularz. W takim wypadku adres e-mail użytkownika pojawia się wewnątrz adresu url strony zawierającej formularz.
                    </p>
                    <p>
                        Dane podane w formularzu są przetwarzane w celu wynikającym z funkcji konkretnego formularza, np. w celu dokonania procesu obsługi zgłoszenia serwisowego lub kontaktu handlowego, rejestracji usług itp. Każdorazowo kontekst i opis formularza w czytelny sposób informuje, do czego on służy.
                    </p>

                    <h2 className="text-2xl font-medium mt-10 mb-4">6. Logi Administratora</h2>
                    <p>
                        Informacje zachowaniu użytkowników w serwisie mogą podlegać logowaniu. Dane te są wykorzystywane w celu administrowania serwisem.
                    </p>

                    <h2 className="text-2xl font-medium mt-10 mb-4">7. Istotne techniki marketingowe</h2>
                    <p>
                        Operator stosuje analizę statystyczną ruchu na stronie, poprzez Google Analytics (Google Inc. z siedzibą w USA). Operator nie przekazuje do operatora tej usługi danych osobowych, a jedynie zanonimizowane informacje. Usługa bazuje na wykorzystaniu ciasteczek w urządzeniu końcowym użytkownika. W zakresie informacji o preferencjach użytkownika gromadzonych przez sieć reklamową Google użytkownik może przeglądać i edytować informacje wynikające z plików cookies przy pomocy narzędzia: <a href="https://www.google.com/ads/preferences/" target="_blank" rel="noopener noreferrer">https://www.google.com/ads/preferences/</a>
                    </p>
                    <p>
                        Operator stosuje techniki remarketingowe, pozwalające na dopasowanie przekazów reklamowych do zachowania użytkownika na stronie, co może dawać złudzenie, że dane osobowe użytkownika są wykorzystywane do jego śledzenia, jednak w praktyce nie dochodzi do przekazania żadnych danych osobowych od Operatora do operatorom reklam. Technologicznym warunkiem takich działań jest włączona obsługa plików cookie.
                    </p>
                    <p>
                        Operator stosuje korzysta z piksela Facebooka. Ta technologia powoduje, że serwis Facebook (Facebook Inc. z siedzibą w USA) wie, że dana osoba w nim zarejestrowana korzysta z Serwisu. Bazuje w tym wypadku na danych, wobec których sam jest administratorem, Operator nie przekazuje od siebie żadnych dodatkowych danych osobowych serwisowi Facebook. Usługa bazuje na wykorzystaniu ciasteczek w urządzeniu końcowym użytkownika.
                    </p>
                    <p>
                        Operator stosuje rozwiązanie badające zachowanie użytkowników poprzez tworzenie map ciepła oraz nagrywanie zachowania na stronie. Te informacje są anonimizowane zanim zostaną przesłane do operatora usługi tak, że nie wie on jakiej osoby fizycznej one dotyczą. W szczególności nagrywaniu nie podlegają wpisywane hasła oraz inne dane osobowe.
                    </p>
                    <p>
                        Operator stosuje rozwiązanie automatyzujące działanie Serwisu w odniesieniu do użytkowników, np. mogące przesłać maila do użytkownika po odwiedzeniu konkretnej podstrony, o ile wyraził on zgodę na otrzymywanie korespondencji handlowej od Operatora.
                    </p>

                    <h2 className="text-2xl font-medium mt-10 mb-4">8. Informacja o plikach cookies</h2>
                    <p>
                        Serwis korzysta z plików cookies.
                    </p>
                    <p>
                        Pliki cookies (tzw. „ciasteczka") stanowią dane informatyczne, w szczególności pliki tekstowe, które przechowywane są w urządzeniu końcowym Użytkownika Serwisu i przeznaczone są do korzystania ze stron internetowych Serwisu. Cookies zazwyczaj zawierają nazwę strony internetowej, z której pochodzą, czas przechowywania ich na urządzeniu końcowym oraz unikalny numer.
                    </p>
                    <p>
                        Podmiotem zamieszczającym na urządzeniu końcowym Użytkownika Serwisu pliki cookies oraz uzyskującym do nich dostęp jest operator Serwisu.
                    </p>
                    <p>
                        Pliki cookies wykorzystywane są w następujących celach:
                    </p>
                    <ul>
                        <li>utrzymanie sesji użytkownika Serwisu (po zalogowaniu), dzięki której użytkownik nie musi na każdej podstronie Serwisu ponownie wpisywać loginu i hasła;</li>
                        <li>realizacji celów określonych powyżej w części "Istotne techniki marketingowe";</li>
                    </ul>
                    <p>
                        W ramach Serwisu stosowane są dwa zasadnicze rodzaje plików cookies: „sesyjne" (session cookies) oraz „stałe" (persistent cookies). Cookies „sesyjne" są plikami tymczasowymi, które przechowywane są w urządzeniu końcowym Użytkownika do czasu wylogowania, opuszczenia strony internetowej lub wyłączenia oprogramowania (przeglądarki internetowej). „Stałe" pliki cookies przechowywane są w urządzeniu końcowym Użytkownika przez czas określony w parametrach plików cookies lub do czasu ich usunięcia przez Użytkownika.
                    </p>
                    <p>
                        Oprogramowanie do przeglądania stron internetowych (przeglądarka internetowa) zazwyczaj domyślnie dopuszcza przechowywanie plików cookies w urządzeniu końcowym Użytkownika. Użytkownicy Serwisu mogą dokonać zmiany ustawień w tym zakresie. Przeglądarka internetowa umożliwia usunięcie plików cookies. Możliwe jest także automatyczne blokowanie plików cookies Szczegółowe informacje na ten temat zawiera pomoc lub dokumentacja przeglądarki internetowej.
                    </p>
                    <p>
                        Ograniczenia stosowania plików cookies mogą wpłynąć na niektóre funkcjonalności dostępne na stronach internetowych Serwisu.
                    </p>
                    <p>
                        Pliki cookies zamieszczane w urządzeniu końcowym Użytkownika Serwisu wykorzystywane mogą być również przez współpracujące z operatorem Serwisu podmioty, w szczególności dotyczy to firm: Google (Google Inc. z siedzibą w USA), Facebook (Facebook Inc. z siedzibą w USA), Twitter (Twitter Inc. z siedzibą w USA).
                    </p>

                    <h2 className="text-2xl font-medium mt-10 mb-4">9. Zarządzanie plikami cookies – jak w praktyce wyrażać i cofać zgodę?</h2>
                    <p>
                        Jeśli użytkownik nie chce otrzymywać plików cookies, może zmienić ustawienia przeglądarki. Zastrzegamy, że wyłączenie obsługi plików cookies niezbędnych dla procesów uwierzytelniania, bezpieczeństwa, utrzymania preferencji użytkownika może utrudnić, a w skrajnych przypadkach może uniemożliwić korzystanie ze stron www
                    </p>
                    <p>
                        W celu zarządzania ustawienia cookies wybierz z listy poniżej przeglądarkę internetową, której używasz i postępuj zgodnie z instrukcjami:
                    </p>
                    <ul className="flex flex-wrap gap-4">
                        <li><a href="https://support.microsoft.com/pl-pl/microsoft-edge/usuwanie-plik%C3%B3w-cookie-w-przegl%C4%85darce-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Edge</a></li>
                        <li><a href="https://support.microsoft.com/pl-pl/windows/usuwanie-plik%C3%B3w-cookie-i-zarz%C4%85dzanie-nimi-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer">Internet Explorer</a></li>
                        <li><a href="https://support.google.com/chrome/answer/95647?hl=pl" target="_blank" rel="noopener noreferrer">Chrome</a></li>
                        <li><a href="https://support.apple.com/pl-pl/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
                        <li><a href="https://support.mozilla.org/pl/kb/wlaczanie-i-wylaczanie-ciasteczek-witryn" target="_blank" rel="noopener noreferrer">Firefox</a></li>
                        <li><a href="https://help.opera.com/pl/latest/web-preferences/#cookies" target="_blank" rel="noopener noreferrer">Opera</a></li>
                    </ul>
                    <p className="mt-4">
                        Urządzenia mobilne:
                    </p>
                    <ul className="flex flex-wrap gap-4">
                        <li><a href="https://support.google.com/chrome/answer/95647?hl=pl" target="_blank" rel="noopener noreferrer">Android</a></li>
                        <li><a href="https://support.apple.com/pl-pl/HT201265" target="_blank" rel="noopener noreferrer">Safari (iOS)</a></li>
                        <li><a href="https://support.microsoft.com/pl-pl/windows/windows-phone-7-3ebc303c-59c0-d367-3995-f258b184fabb" target="_blank" rel="noopener noreferrer">Windows Phone</a></li>
                    </ul>
                </div>

                <div className="mt-12 pt-6 border-t border-gray-200">
                    <Link href="/" className="text-gray-700 hover:text-black flex items-center">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2"
                        >
                            <path
                                d="M19 12H5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M12 19L5 12L12 5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Powrót do strony głównej
                    </Link>
                </div>
            </div>
        </main>
    );
}