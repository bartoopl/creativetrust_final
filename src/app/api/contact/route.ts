import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { validateAntispam } from '@/lib/antispam';

// Replies follow the page the form was sent from; e-mails to the team stay Polish.
const REPLIES = {
    pl: {
        spam: null,
        required: 'Wymagane pola są puste',
        email: 'Niepoprawny format adresu e-mail',
        failed: 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.',
        sent: 'Wiadomość została wysłana. Dziękujemy za kontakt!',
        confirmationSubject: 'Potwierdzenie otrzymania wiadomości - CreativeTrust',
        confirmation: (name: string, message: string) => `Witaj ${name},

Dziękujemy za kontakt z CreativeTrust. Otrzymaliśmy Twoją wiadomość i odpowiemy na nią najszybciej jak to możliwe.

Twoja wiadomość:
${message}

Pozdrawiamy,
Zespół CreativeTrust
`,
    },
    en: {
        spam: 'We could not process the form. Please try again later.',
        required: 'Required fields are empty',
        email: 'Invalid e-mail address',
        failed: 'Something went wrong while sending your message. Please try again later.',
        sent: 'Your message has been sent. Thank you for getting in touch!',
        confirmationSubject: 'We have received your message - CreativeTrust',
        confirmation: (name: string, message: string) => `Hi ${name},

Thank you for contacting CreativeTrust. We have received your message and will reply as soon as possible.

Your message:
${message}

Best regards,
The CreativeTrust team
`,
    },
};

export async function POST(request: Request) {
    try {
        // Logowanie informacji o żądaniu dla debugowania
        console.log('Otrzymano żądanie do API kontaktowego');

        // Pobieranie danych z żądania
        const data = await request.json();
        const { name, email, subject, message, type, formTimestamp } = data;
        const locale = data?.locale === 'en' ? 'en' : 'pl';
        const reply = REPLIES[locale];
        
        // Antyspam validation
        const antispamResult = validateAntispam(request, data, formTimestamp);
        if (!antispamResult.valid) {
            console.log('Antyspam validation failed:', antispamResult.error);
            return NextResponse.json(
                { success: false, message: reply.spam ?? antispamResult.error ?? 'Wystąpił błąd podczas przetwarzania formularza.' },
                { status: 429 }
            );
        }

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
                { success: false, message: reply.required },
                { status: 400 }
            );
        }

        // Bardzo podstawowa walidacja e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log('Nieprawidłowy format email:', email);
            return NextResponse.json(
                { success: false, message: reply.email },
                { status: 400 }
            );
        }

        console.log('Formularz przeszedł walidację');

        const recipient = process.env.EMAIL_CONTACT || 'office@creativetrust.pl';

        // Czytelne etykiety tematów z formularza kontaktowego
        const subjectLabels: Record<string, string> = {
            general: 'Zapytanie ogólne',
            cooperation: 'Współpraca',
            project: 'Wycena projektu',
            support: 'Wsparcie techniczne',
            other: 'Inny',
        };

        // Przygotuj temat e-maila
        const emailSubject = (locale === 'en' ? '[EN] ' : '') + `[Formularz kontaktowy] ${subjectLabels[subject] || subject || 'Nowa wiadomość'}`;

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
                    { success: false, message: reply.failed },
                    { status: 500 }
                );
            }
        }

        // Opcjonalnie - wysyłka potwierdzenia do nadawcy
        try {
            await sendEmail({
                to: email,
                subject: reply.confirmationSubject,
                text: reply.confirmation(name, message),
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
            message: reply.sent
        });

    } catch (error) {
        console.error('Nieoczekiwany błąd podczas przetwarzania formularza kontaktowego:', error);

        return NextResponse.json(
            { success: false, message: 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.' },
            { status: 500 }
        );
    }
}