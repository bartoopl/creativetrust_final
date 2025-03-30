import nodemailer from 'nodemailer';

interface EmailPayload {
    to: string;
    subject: string;
    text: string;
    html?: string;
}

export const sendEmail = async (data: EmailPayload) => {
    const { to, subject, text, html } = data;

    // Sprawdź, czy jesteśmy w środowisku Netlify
    const isNetlify = process.env.NETLIFY === 'true';

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

    // W trybie rozwojowym możemy logować e-maile zamiast je wysyłać
    if (process.env.NODE_ENV === 'development' && !isNetlify) {
        console.log('========= WIADOMOŚĆ E-MAIL =========');
        console.log('Do:', to);
        console.log('Temat:', subject);
        console.log('Treść:', text);
        console.log('HTML:', html || 'Brak');
        console.log('===================================');

        // W trybie developerskim możemy zwrócić sukces bez faktycznego wysyłania
        return { success: true };
    }

    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM || 'noreply@creativetrust.pl',
            to,
            subject,
            text,
            html: html || text.replace(/\n/g, '<br>'), // Prosty fallback dla HTML
        };

        // Dodatkowe logi dla debugowania
        console.log('Sending email with options:', {
            host: process.env.EMAIL_SERVER,
            port: process.env.EMAIL_PORT,
            user: process.env.EMAIL_USER ? '(configured)' : '(missing)',
            to,
            subject
        });

        const info = await transporter.sendMail(mailOptions);
        console.log('Wiadomość wysłana:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Błąd podczas wysyłania e-maila:', error);
        throw error;
    }
};