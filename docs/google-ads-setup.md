# Panel Klienta - Statystyki Kampanii

Ten dokument zawiera instrukcje dotyczące konfiguracji i zarządzania statystykami kampanii reklamowych w panelu klienta.

## Symulowane dane kampanii

Aktualna implementacja używa symulowanych danych kampanii zamiast bezpośredniej integracji z Google Ads API. Jest to rozwiązanie przejściowe, które pozwala na prezentację funkcjonalności panelu klienta bez konieczności pełnej konfiguracji Google Ads API.

## Zmienne środowiskowe

Aby zabezpieczyć endpointy synchronizacji, należy ustawić zmienną środowiskową w panelu Netlify:

```
ADS_SYNC_API_KEY=YOUR_CUSTOM_API_KEY
```

## Dodawanie kampanii reklamowych

Aby dodać kampanie reklamowe do panelu klienta:

1. Zaloguj się do Sanity Studio
2. Przejdź do sekcji "Kampanie reklamowe"
3. Kliknij "Utwórz nowy dokument"
4. Wypełnij formularz:
   - Nazwa kampanii - nazwa widoczna dla klienta
   - Klient - wybierz klienta, do którego przypisana jest kampania
   - Platforma - wybierz "Google Ads" lub "Meta Ads" 
   - ID kampanii w systemie zewnętrznym - wpisz ID kampanii
   - Status - wybierz "active", "paused" lub "ended"
   - Data rozpoczęcia i zakończenia - ustaw daty kampanii
5. Zapisz dokument

Po dodaniu kampanii do Sanity, będą one widoczne w panelu klienta. Dane statystyczne będą automatycznie aktualizowane raz dziennie.

## Przyszła implementacja Google Ads API

W przyszłości planowana jest pełna integracja z Google Ads API. Będzie ona wymagała:

1. Konfiguracji konta deweloperskiego Google
2. Uzyskania Developer Token z Google Ads 
3. Konfiguracji konta usługowego z odpowiednimi uprawnieniami
4. Dodania ID klienta Google Ads (Customer ID)

## Testowanie i synchronizacja danych

Po skonfigurowaniu API Key, możesz ręcznie wyzwolić aktualizację danych kampanii:

```
curl -X POST -H "x-api-key: YOUR_CUSTOM_API_KEY" https://creativetrust.pl/api/admin/ads/sync
```

Ten endpoint wygeneruje losowe dane statystyczne dla wszystkich kampanii w systemie, symulując codzienną aktualizację danych.

### Automatyczna synchronizacja

Skonfigurowana funkcja zaplanowana w Netlify (`scheduled-sync`) uruchamia się codziennie i wykonuje to samo żądanie.

## Monitorowanie

Po uruchomieniu synchronizacji, możesz monitorować proces w następujący sposób:

1. Sprawdź logi w panelu Netlify
2. Zaloguj się do Sanity Studio i sprawdź, czy pojawiły się nowe dokumenty typu "Statystyki kampanii"
3. Sprawdź w panelu klienta, czy dane statystyczne są widoczne