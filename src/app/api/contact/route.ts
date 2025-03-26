import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
    try {
        // Pobieranie danych z żądania
        const data = await request.json();
        const { name, email, subject, message, type } = data;

        // Walidacja danych
        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, message: 'Wymagane pola są puste' },
                { status: 400 }
            );
        }

        // Bardzo podstawowa walidacja e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, message: 'Niepoprawny format adresu e-mail' },
                { status: 400 }
            );
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

        // Wysyłamy e-mail za pomocą modułu e-mail
        try {
            await sendEmail({
                to: recipient,
                subject: emailSubject,
                text: `Od: ${name} (${email})
        
${message}

---
Ta wiadomość została wysłana za pomocą formularza kontaktowego na stronie creativetrust.pl.`,
            });
        } catch (emailError) {
            console.error('Błąd podczas wysyłania e-maila:', emailError);
            // Nawet jeśli wysyłanie e-maila nie powiedzie się, nie chcemy pokazywać tego błędu użytkownikowi
            // Zamiast tego możemy zapisać przynajmniej dane formularza do bazy danych lub w logach
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
        } catch (confirmationError) {
            console.error('Błąd podczas wysyłania potwierdzenia:', confirmationError);
            // Nie musimy informować użytkownika o błędzie wysyłki potwierdzenia
        }

        // Zwracamy sukces
        return NextResponse.json({
            success: true,
            message: 'Wiadomość została wysłana. Dziękujemy za kontakt!'
        });

    } catch (error) {
        console.error('Błąd podczas przetwarzania formularza kontaktowego:', error);

        return NextResponse.json(
            { success: false, message: 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.' },
            { status: 500 }
        );
    }
}