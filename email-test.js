// Zapisz jako fixed-email-test.js
const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' }); // Jawnie wskazujemy na .env.local

async function testEmailConfig() {
    console.log('Testowanie konfiguracji email z pliku .env.local...');

    // Sprawdź zmienne
    console.log('Konfiguracja:');
    console.log('- EMAIL_SERVER:', process.env.EMAIL_SERVER);
    console.log('- EMAIL_PORT:', process.env.EMAIL_PORT);
    console.log('- EMAIL_SECURE:', process.env.EMAIL_SECURE);
    console.log('- EMAIL_USER:', process.env.EMAIL_USER);
    console.log('- EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '[ustawione]' : '[brak]');

    try {
        // Konfiguracja transportera nodemailer
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SERVER,
            port: parseInt(process.env.EMAIL_PORT || '587'),
            secure: process.env.EMAIL_SECURE === 'true',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            }
        });

        // Testowanie połączenia
        console.log('\nTestowanie połączenia z serwerem...');
        await transporter.verify();
        console.log('✅ Połączenie udane!');

    } catch (error) {
        console.error('❌ Błąd podczas testowania:', error);
    }
}

testEmailConfig().catch(console.error);