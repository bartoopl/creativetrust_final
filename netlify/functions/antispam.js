/**
 * Antyspam dla formularzy - funkcja Netlify
 * Ta sama logika co w src/lib/antispam.ts
 */

const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minut
const RATE_LIMIT_MAX_REQUESTS = 3; // Max 3 zgłoszenia na IP w oknie (bardziej restrykcyjne)
const MIN_FORM_FILL_TIME = 3000; // Min. 3 sekundy na wypełnienie
const HONEYPOT_FIELD_NAME = 'website';

const rateLimitStore = new Map();

function getClientIP(headers) {
    const forwarded = headers['x-forwarded-for'];
    const realIP = headers['x-real-ip'];
    const nfClientIP = headers['x-nf-client-connection-ip'];
    
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }
    if (realIP) {
        return realIP.trim();
    }
    if (nfClientIP) {
        return nfClientIP.trim();
    }
    return 'unknown';
}

function checkRateLimit(ip) {
    const now = Date.now();
    const entry = rateLimitStore.get(ip);
    
    if (rateLimitStore.size > 1000) {
        for (const [key, value] of rateLimitStore.entries()) {
            if (value.resetAt < now) {
                rateLimitStore.delete(key);
            }
        }
    }
    
    if (!entry || entry.resetAt < now) {
        rateLimitStore.set(ip, {
            count: 1,
            resetAt: now + RATE_LIMIT_WINDOW
        });
        return { allowed: true };
    }
    
    if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
        return { 
            allowed: false, 
            retryAfter: Math.ceil((entry.resetAt - now) / 1000) 
        };
    }
    
    entry.count++;
    rateLimitStore.set(ip, entry);
    return { allowed: true };
}

function validateHoneypot(data) {
    const honeypotValue = data[HONEYPOT_FIELD_NAME];
    return !honeypotValue || String(honeypotValue).trim() === '';
}

function validateFormTime(formTimestamp) {
    if (!formTimestamp) return true;
    const now = Date.now();
    const timeElapsed = now - formTimestamp;
    return timeElapsed >= MIN_FORM_FILL_TIME;
}

function validateContent(data) {
    const { name, email, message } = data;
    
    if (name) {
        if (/(.)\1{4,}/.test(name)) {
            return { valid: false, reason: 'Podejrzany format imienia' };
        }
        if (/^(test|asdf|qwerty|spam|admin)/i.test(name)) {
            return { valid: false, reason: 'Podejrzana nazwa' };
        }
    }
    
    if (email) {
        const disposableDomains = [
            'tempmail.com', 'throwaway.email', '10minutemail.com',
            'guerrillamail.com', 'mailinator.com', 'trashmail.com',
            'yopmail.com', 'fakeinbox.com', 'temp-mail.org', 'getnada.com',
            'sharklasers.com', 'guerrillamail.org', 'maildrop.cc'
        ];
        const domain = (email.split('@')[1] || '').toLowerCase();
        if (domain && disposableDomains.some(d => domain.includes(d))) {
            return { valid: false, reason: 'Podejrzany adres email' };
        }
    }
    
    if (message) {
        const linkCount = (message.match(/https?:\/\//gi) || []).length;
        if (linkCount > 5) {
            return { valid: false, reason: 'Zbyt wiele linków w wiadomości' };
        }
        if (message.length > 1000 && /(.)\1{10,}/.test(message)) {
            return { valid: false, reason: 'Podejrzana treść wiadomości' };
        }
    }
    
    return { valid: true };
}

function validateAntispam(headers, data) {
    const ip = getClientIP(headers);
    
    // 1. Rate limiting
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
        return {
            valid: false,
            statusCode: 429,
            body: JSON.stringify({
                success: false,
                message: `Zbyt wiele prób wysłania formularza. Spróbuj ponownie za ${Math.ceil(rateLimit.retryAfter / 60)} minut.`
            })
        };
    }
    
    // 2. Honeypot
    if (!validateHoneypot(data)) {
        console.log('Honeypot triggered for IP:', ip);
        return {
            valid: false,
            statusCode: 429,
            body: JSON.stringify({
                success: false,
                message: 'Wystąpił błąd podczas przetwarzania formularza.'
            })
        };
    }
    
    // 3. Form time
    if (!validateFormTime(data.formTimestamp)) {
        console.log('Form filled too quickly for IP:', ip);
        return {
            valid: false,
            statusCode: 429,
            body: JSON.stringify({
                success: false,
                message: 'Formularz został wypełniony zbyt szybko. Proszę wypełnić go ponownie.'
            })
        };
    }
    
    // 4. Content validation
    const contentValidation = validateContent(data);
    if (!contentValidation.valid) {
        console.log('Content validation failed for IP:', ip, contentValidation.reason);
        return {
            valid: false,
            statusCode: 400,
            body: JSON.stringify({
                success: false,
                message: contentValidation.reason || 'Nieprawidłowa zawartość formularza.'
            })
        };
    }
    
    return { valid: true };
}

module.exports = { validateAntispam };
