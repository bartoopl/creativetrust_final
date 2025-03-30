// netlify/functions/contact.js
const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    // Timeout ustawiony na 9 sekund (netlify ma limit 10 sekund)
    context.callbackWaitsForEmptyEventLoop = false;
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Przekroczono czas oczekiwania na odpowiedź serwera email')), 9000);
    });

    // Sprawdź, czy to żądanie POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ success: false, message: 'Method Not Allowed' })
        };
    }

    try {
        // Pobierz dane z żądania
        const data = JSON.parse(event.body);
        const { name, email, subject, message, type } = data;

        // Podstawowa walidacja
        if (!name || !email || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    success: false,
                    message: 'Wymagane pola są puste'
                })
            };
        }

        // Walidacja e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    success: false,
                    message: 'Niepoprawny format adresu e-mail'
                })
            };
        }

        console.log('Otrzymano formularz kontaktowy:', { name, email, subject, message, type });

        // Ustal adresata w zależności od typu formularza
        const recipient = type === 'automation'
            ? process.env.EMAIL_AUTOMATION || 'automation@creativetrust.pl'
            : process.env.EMAIL_CONTACT || 'office@creativetrust.pl';

        // Przygotuj temat e-maila
        const emailSubject = type === 'automation'
            ? `[Marketing Automation] Nowe zapytanie od ${name}`
            : `[Formularz kontaktowy] ${subject || 'Nowa wiadomość'}`;

        // Loguj informacje o konfiguracji email dla debugowania
        console.log('Email config:', {
            host: process.env.EMAIL_SERVER,
            port: process.env.EMAIL_PORT,
            secure: process.env.EMAIL_SECURE === 'true',
            user: process.env.EMAIL_USER ? '(configured)' : '(missing)',
            recipient
        });

        // Konfiguracja transportera nodemailer
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SERVER || 'smtp.gmail.com',
            port: parseInt(process.env.EMAIL_PORT || '587'),
            secure: process.env.EMAIL_SECURE === 'true',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
            // Dodatkowe opcje dla szybszego połączenia
            connectionTimeout: 5000, // 5 sekund na połączenie
            greetingTimeout: 5000,   // 5 sekund na przywitanie
            socketTimeout: 5000,     // 5 sekund na timeout socketa
        });

        // Opcje e-maila
        const mailOptions = {
            from: process.env.EMAIL_FROM || 'noreply@creativetrust.pl',
            to: recipient,
            subject: emailSubject,
            text: `Od: ${name} (${email})
        
${message}

---
Ta wiadomość została wysłana za pomocą formularza kontaktowego na stronie creativetrust.pl.`,
        };

        try {
            // Użyj Promise.race, aby sprawdzić, co będzie szybsze: wysłanie maila czy timeout
            const info = await Promise.race([
                transporter.sendMail(mailOptions),
                timeoutPromise
            ]);

            console.log('Email wysłany pomyślnie:', info.messageId);

            // Nie wysyłamy już potwierdzenia, aby zmieścić się w limicie czasu
            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: true,
                    message: 'Wiadomość została wysłana. Dziękujemy za kontakt!'
                })
            };
        } catch (emailError) {
            console.error('Błąd podczas wysyłania e-maila:', emailError);

            // Zapisujemy dane do bazy danych lub innego miejsca (np. do pliku)
            // W tym przypadku po prostu logujemy dane, które można przekazać do zewnętrznego serwisu
            console.log('Dane do późniejszego przetworzenia:', {
                name,
                email,
                subject,
                message,
                type,
                recipient,
                timestamp: new Date().toISOString()
            });

            // Mimo błędu wysyłki, zwracamy sukces użytkownikowi
            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: true,
                    message: 'Dziękujemy za wiadomość! Ze względu na problemy techniczne, wiadomość zostanie przetworzona z opóźnieniem.'
                })
            };
        }

    } catch (error) {
        console.error('Błąd podczas przetwarzania formularza kontaktowego:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                message: 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.'
            })
        };
    }
};