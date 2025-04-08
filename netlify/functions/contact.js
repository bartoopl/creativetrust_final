const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    // Log request info for debugging
    console.log('Otrzymano zapytanie do funkcji contact:', {
        headers: event.headers,
        httpMethod: event.httpMethod,
        path: event.path
    });

    // Ustawienie, by funkcja czekała na zakończenie wszystkich operacji
    context.callbackWaitsForEmptyEventLoop = true;

    // Sprawdź, czy to żądanie POST
    if (event.httpMethod !== 'POST') {
        console.log('Nieprawidłowa metoda HTTP:', event.httpMethod);
        return {
            statusCode: 405,
            body: JSON.stringify({ success: false, message: 'Method Not Allowed' })
        };
    }

    try {
        // Pobierz dane z żądania
        const data = JSON.parse(event.body);
        const { name, email, subject, message, type } = data;

        console.log('Dane formularza:', { name, email, subject, messageLength: message?.length, type });

        // Podstawowa walidacja
        if (!name || !email || !message) {
            console.log('Brak wymaganych pól');
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
            console.log('Nieprawidłowy format email:', email);
            return {
                statusCode: 400,
                body: JSON.stringify({
                    success: false,
                    message: 'Niepoprawny format adresu e-mail'
                })
            };
        }

        // Ustal adresata w zależności od typu formularza
        const recipient = type === 'automation'
            ? process.env.EMAIL_AUTOMATION || 'automation@creativetrust.pl'
            : process.env.EMAIL_CONTACT || 'office@creativetrust.pl';

        // Przygotuj temat e-maila
        const emailSubject = type === 'automation'
            ? `[Marketing Automation] Nowe zapytanie od ${name}`
            : `[Formularz kontaktowy] ${subject || 'Nowa wiadomość'}`;

        // Loguj informacje o konfiguracji email dla debugowania
        console.log('Konfiguracja email:', {
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
            debug: true, // Włącz debugowanie dla nodemailer
            logger: true // Włącz logowanie dla nodemailer
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
            // Sprawdź połączenie z serwerem SMTP przed wysłaniem
            console.log('Sprawdzanie połączenia z serwerem SMTP...');
            await transporter.verify();
            console.log('Połączenie z serwerem SMTP ustanowione.');

            // Wysyłanie e-maila
            console.log('Próba wysłania e-maila do:', recipient);
            const info = await transporter.sendMail(mailOptions);
            console.log('Email wysłany pomyślnie. ID wiadomości:', info.messageId);

            // Opcjonalnie - potwierdzenie dla nadawcy
            try {
                console.log('Próba wysłania potwierdzenia do:', email);
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
                const confirmInfo = await transporter.sendMail(confirmationOptions);
                console.log('Potwierdzenie wysłane pomyślnie. ID wiadomości:', confirmInfo.messageId);
            } catch (confirmationError) {
                console.error('Błąd podczas wysyłania potwierdzenia:', confirmationError);
                // Nie przerywamy wykonania funkcji, jeśli potwierdzenie się nie powiedzie
            }

            return {
                statusCode: 200,
                body: JSON.stringify({
                    success: true,
                    message: 'Wiadomość została wysłana. Dziękujemy za kontakt!',
                    messageId: info.messageId
                })
            };
        } catch (emailError) {
            console.error('Błąd podczas wysyłania e-maila:', emailError);

            // Zwracamy błąd klientowi, ale z szczegółami dla diagnostyki
            return {
                statusCode: 500,
                body: JSON.stringify({
                    success: false,
                    message: 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.',
                    error: process.env.NODE_ENV === 'development' ? emailError.message : undefined
                })
            };
        }
    } catch (error) {
        console.error('Błąd podczas przetwarzania formularza kontaktowego:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                message: 'Wystąpił błąd podczas przetwarzania formularza. Spróbuj ponownie później.',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            })
        };
    }
};