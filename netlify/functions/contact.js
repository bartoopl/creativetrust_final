const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    // Sprawdź, czy to żądanie POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' })
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

        // Konfiguracja transportera nodemailer
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SERVER || 'smtp.gmail.com',
            port: parseInt(process.env.EMAIL_PORT || '587'),
            secure: process.env.EMAIL_SECURE === 'true',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
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

        // Wysyłanie e-maila
        await transporter.sendMail(mailOptions);

        // Opcjonalnie - potwierdzenie dla nadawcy
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

        try {
            await transporter.sendMail(confirmationOptions);
        } catch (confirmationError) {
            console.error('Błąd podczas wysyłania potwierdzenia:', confirmationError);
            // Nie przerywamy wykonania funkcji, jeśli potwierdzenie się nie powiedzie
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                message: 'Wiadomość została wysłana. Dziękujemy za kontakt!'
            })
        };

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