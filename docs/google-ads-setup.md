# Konfiguracja integracji Google Ads

Ten dokument zawiera instrukcje dotyczące konfiguracji integracji z Google Ads API w panelu klienta.

## Wymagane zmienne środowiskowe

Aby integracja z Google Ads działała poprawnie, należy ustawić następujące zmienne środowiskowe w panelu Netlify:

```
GOOGLE_ADS_CLIENT_ID=100321284149936925533
GOOGLE_ADS_CLIENT_EMAIL=creativetrustapp@creativetrust.iam.gserviceaccount.com
GOOGLE_ADS_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEvAIB...
GOOGLE_ADS_DEVELOPER_TOKEN=YOUR_DEVELOPER_TOKEN
GOOGLE_ADS_CUSTOMER_ID=YOUR_CUSTOMER_ID
ADS_SYNC_API_KEY=YOUR_CUSTOM_API_KEY
```

## Konfiguracja konta usługowego Google

1. Przejdź do [Google Cloud Console](https://console.cloud.google.com/)
2. Wybierz projekt lub utwórz nowy
3. Włącz Google Ads API w bibliotece API
4. Utwórz konto usługowe (Service Account) i pobierz klucz JSON
5. Użyj informacji z klucza JSON do ustawienia zmiennych środowiskowych

## Uzyskanie Developer Token

1. Zaloguj się do konta Google Ads
2. Przejdź do [API Center](https://ads.google.com/aw/apicenter)
3. Złóż wniosek o dostęp do API
4. Po zatwierdzeniu, skopiuj Developer Token do zmiennych środowiskowych

## Konfiguracja Customer ID

Customer ID to ID klienta w formacie XXX-XXX-XXXX, które można znaleźć:
1. W menu Google Ads
2. W lewym górnym rogu interfejsu, pod nazwą konta

## Ustawianie API Key

ADS_SYNC_API_KEY to dowolny ciąg znaków (preferowany silny, losowy), który będzie używany do autoryzacji żądań synchronizacji danych. Ustaw ten sam klucz w zmiennych środowiskowych i używaj go podczas wywoływania endpointu `/api/admin/ads/sync`.

## Testowanie integracji

Po ustawieniu wszystkich zmiennych środowiskowych, można przetestować integrację przez:

1. Ręczne wywołanie synchronizacji:
   ```
   curl -X POST -H "x-api-key: YOUR_CUSTOM_API_KEY" https://creativetrust.pl/api/admin/ads/sync
   ```

2. Sprawdzenie logów Netlify pod kątem błędów

## Zarządzanie kampaniami

1. Logowanie do Sanity Studio
2. Przejście do kolekcji "Kampanie reklamowe"
3. Utworzenie nowej kampanii z przypisaniem do klienta
4. Wpisanie ID kampanii z Google Ads w polu "ID kampanii w systemie zewnętrznym"

Po dodaniu kampanii i uruchomieniu synchronizacji, dane powinny pojawić się w panelu klienta.