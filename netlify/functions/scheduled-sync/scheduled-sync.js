const https = require('https');

/**
 * Funkcja Netlify uruchamiana według harmonogramu
 * dla synchronizacji danych reklamowych
 */
exports.handler = async function(event, context) {
  // Upewnij się, że to faktycznie wywołanie zaplanowane
  if (event.httpMethod !== "POST" || !event.headers['x-netlify-scheduled']) {
    return {
      statusCode: 401,
      body: "Unauthorized"
    };
  }

  // Konfiguracja endpointu API
  const API_KEY = process.env.ADS_SYNC_API_KEY;
  const API_ENDPOINT = `${process.env.URL || 'https://creativetrust.pl'}/api/admin/ads/sync`;

  console.log(`Rozpoczęcie synchronizacji danych reklamowych o ${new Date().toISOString()}`);
  
  try {
    // Wywołaj endpoint synchronizacji
    const result = await fetchWithTimeout(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      }
    }, 30000); // 30 sekund timeout

    console.log('Synchronizacja zakończona pomyślnie:', result);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: "Synchronizacja zakończona pomyślnie",
        timestamp: new Date().toISOString(),
        result 
      })
    };
  } catch (error) {
    console.error('Błąd synchronizacji:', error.message);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: error.message,
        timestamp: new Date().toISOString() 
      })
    };
  }
};

/**
 * Pomocnicza funkcja do wykonywania żądań HTTP z timeoutem
 */
async function fetchWithTimeout(url, options, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      options,
      (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            try {
              resolve(JSON.parse(data));
            } catch (e) {
              resolve(data);
            }
          } else {
            reject(new Error(`Status code: ${res.statusCode}, Response: ${data}`));
          }
        });
      }
    );
    
    // Timeout
    const timeoutId = setTimeout(() => {
      req.destroy();
      reject(new Error(`Request timed out after ${timeout}ms`));
    }, timeout);
    
    // Obsługa błędów
    req.on('error', (err) => {
      clearTimeout(timeoutId);
      reject(err);
    });
    
    // Zakończ żądanie
    req.end();
  });
}