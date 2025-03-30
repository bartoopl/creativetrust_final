const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    // Nie czekaj na pętlę zdarzeń, aby zakończyć funkcję
    context.callbackWaitsForEmptyEventLoop = false;

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

        // Zwróć sukces niezależnie od wyniku wysyłki
        // To eliminuje problem timeoutu, bo nie czekamy na wysłanie maila
        const response = {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                message: 'Wiadomość została przyjęta. Dziękujemy za kontakt!'
            })
        };

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
            connectionTimeout: 5000,
            greetingTimeout: 5000,
            socketTimeout: 5000,
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

        // Wyślij email asynchronicznie (nie czekamy na wynik)
        transporter.sendMail(mailOptions)
            .then(info => {
                console.log('Email wysłany pomyślnie:', info.messageId);

                // Próbujemy wysłać potwierdzenie do nadawcy, ale również asynchronicznie
                const confirmationOptions = {
                    from: process.env.EMAIL_FROM || 'noreply@creativetrust.pl',
                    to: email,
                    subject: 'Potwierdzenie otrzymania wiadomości - CreativeTrust',
                    text: `Witaj ${name},

Dziękujemy za kontakt z CreativeTrust. Otrzymaliśmy Twoją wiadomość i odpowiemy na nią najszybciej jak to możliwe.

Twoja wiadomość:
${message}

Pozdrawiamy,
Zespół CreativeTrust
`,
                };

                return transporter.sendMail(confirmationOptions);
            })
            .then(info => {
                console.log('Potwierdzenie wysłane pomyślnie:', info?.messageId);
            })
            .catch(error => {
                console.error('Błąd podczas wysyłania e-maila:', error);

                // Tutaj możemy dodać kod, który zapisuje dane formularza do bazy danych
                // lub innego miejsca w przypadku błędu wysyłki
            });

        // Natychmiast zwracamy odpowiedź użytkownikowi
        return response;

    } catch (error) {
        console.error('Błąd podczas przetwarzania formularza kontaktowego:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                message: 'Wystąpił błąd podczas przetwarzania wiadomości. Spróbuj ponownie później.'
            })
        };
    }
};