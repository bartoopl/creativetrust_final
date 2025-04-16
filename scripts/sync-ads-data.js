#!/usr/bin/env node

/**
 * Skrypt do synchronizacji danych z Google Ads i Meta Ads.
 * Może być uruchamiany jako zadanie cron lub ręcznie.
 * 
 * Użycie:
 * node scripts/sync-ads-data.js
 * 
 * Lub jako zadanie cron:
 * 0 1 * * * node /ścieżka/do/projektu/scripts/sync-ads-data.js >> /ścieżka/do/projektu/logs/ads-sync.log 2>&1
 */

const https = require('https');

// Konfiguracja
const API_KEY = process.env.ADS_SYNC_API_KEY || 'twój-klucz-api';
const API_URL = process.env.API_URL || 'https://twojadomena.pl/api/admin/ads/sync';

// Wykonaj żądanie POST do endpointu synchronizacji
const req = https.request(
  API_URL,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    }
  },
  (res) => {
    let data = '';
    
    // Zbierz odpowiedź
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    // Zakończ i wyświetl wynik
    res.on('end', () => {
      console.log(`Status: ${res.statusCode}`);
      try {
        const result = JSON.parse(data);
        console.log('Synchronizacja zakończona:');
        console.log(JSON.stringify(result, null, 2));
      } catch (e) {
        console.log('Odpowiedź:', data);
      }
    });
  }
);

// Obsługa błędów
req.on('error', (error) => {
  console.error('Błąd synchronizacji:', error.message);
  process.exit(1);
});

req.end();

console.log('Rozpoczęto synchronizację danych reklamowych...');