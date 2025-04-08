import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
    try {
        // Logowanie informacji o żądaniu dla debugowania
        console.log('Otrzymano żądanie do API kontaktowego');

        // Pobieranie danych z żądania
        const data = await request.json();
        const { name, email, subject, message, type } = data;

        console.log('Otrzymane dane formularza:', {
            name,
            email,
            subject,
            messageLength: message?.length,
            type
        });

        // Walidacja danych
        if (!name || !email || !message) {
            console.log('Brak wymaganych pól w formularzu');
            return NextResponse.json(
                { success: false, message: 'Wymagane pola są puste' },
                { status: 400 }
            );
        }

        // Bardzo podstawowa walidacja e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log('Nieprawidłowy format email:', email);
            return NextResponse.json(
                { success: false, message: 'Niepoprawny format adresu e-mail' },
                { status: 400 }
            );
        }

        console.log('Formularz przeszedł walidację');

        // Ustal adresata w zależności od typu formularza
        const recipient = type === 'automation'
            ? process.env.EMAIL_AUTOMATION || 'automation@creativetrust.pl'
            : process.env.EMAIL_CONTACT || 'office@creativetrust.pl';

        // Przygotuj temat e-maila
        const emailSubject = type === 'automation'
            ? `[Marketing Automation] Nowe zapytanie od ${name}`
            : `[Formularz kontaktowy] ${subject || 'Nowa wiadomość'}`;

        console.log('Przygotowanie do wysłania email do:', recipient);
        console.log('Temat:', emailSubject);

        // Wysyłamy e-mail za pomocą modułu e-mail
        try {
            // Logowanie konfiguracji email
            console.log('Konfiguracja email:', {
                server: process.env.EMAIL_SERVER,
                port: process.env.EMAIL_PORT,
                secure: process.env.EMAIL_SECURE,
                user: process.env.EMAIL_USER ? '(skonfigurowany)' : '(brak)',
                from: process.env.EMAIL_FROM
            });

            await sendEmail({
                to: recipient,
                subject: emailSubject,
                text: `Od: ${name} (${email})
        
${message}

---
Ta wiadomość została wysłana za pomocą formularza kontaktowego na stronie creativetrust.pl.`,
            });

            console.log('Email główny wysłany pomyślnie');
        } catch (emailError) {
            console.error('Błąd podczas wysyłania e-maila:', emailError);
            // Nawet jeśli wysyłanie e-maila nie powiedzie się, zapisujemy dane formularza w logach
            console.log('Dane formularza (nie wysłane):', data);

            // Zwracamy błąd tylko w środowisku deweloperskim, na produkcji udajemy sukces
            if (process.env.NODE_ENV === 'development') {
                return NextResponse.json(
                    { success: false, message: 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.' },
                    { status: 500 }
                );
            }
        }

        // Opcjonalnie - wysyłka potwierdzenia do nadawcy
        try {
            await sendEmail({
                to: email,
                subject: 'Potwierdzenie otrzymania wiadomości - CreativeTrust',
                text: `Witaj ${name},

Dziękujemy za kontakt z CreativeTrust. Otrzymaliśmy Twoją wiadomość i odpowiemy na nią najszybciej jak to możliwe.

Twoja wiadomość:
${message}

Pozdrawiamy,
Zespół CreativeTrust
`,
            });
            console.log('Email z potwierdzeniem wysłany pomyślnie');
        } catch (confirmationError) {
            console.error('Błąd podczas wysyłania potwierdzenia:', confirmationError);
            // Nie musimy informować użytkownika o błędzie wysyłki potwierdzenia
        }

        // Zwracamy sukces
        console.log('Pomyślnie zakończono obsługę formularza');
        return NextResponse.json({
            success: true,
            message: 'Wiadomość została wysłana. Dziękujemy za kontakt!'
        });

    } catch (error) {
        console.error('Nieoczekiwany błąd podczas przetwarzania formularza kontaktowego:', error);

        return NextResponse.json(
            { success: false, message: 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.' },
            { status: 500 }
        );
    }
}