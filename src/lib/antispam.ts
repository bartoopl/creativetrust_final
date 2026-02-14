/**
 * Antyspam utility functions for form protection
 */

// Rate limiting storage (in-memory, will reset on server restart)
// For production, consider using Redis or a database
interface RateLimitEntry {
    count: number;
    resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Configuration
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes in milliseconds
const RATE_LIMIT_MAX_REQUESTS = 3; // Max 3 submissions per IP per window
const MIN_FORM_FILL_TIME = 3000; // Minimum 3 seconds to fill the form (in milliseconds)
const HONEYPOT_FIELD_NAME = 'website'; // Name of the honeypot field

/**
 * Get client IP address from request
 */
export function getClientIP(request: Request): string {
    // Try various headers that might contain the real IP
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    const cfConnectingIP = request.headers.get('cf-connecting-ip'); // Cloudflare
    
    if (forwarded) {
        // x-forwarded-for can contain multiple IPs, take the first one
        return forwarded.split(',')[0].trim();
    }
    
    if (realIP) {
        return realIP.trim();
    }
    
    if (cfConnectingIP) {
        return cfConnectingIP.trim();
    }
    
    // Fallback to a default value (shouldn't happen in production)
    return 'unknown';
}

/**
 * Check rate limiting for an IP address
 */
export function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
    const now = Date.now();
    const entry = rateLimitStore.get(ip);
    
    // Clean up old entries periodically
    if (rateLimitStore.size > 1000) {
        for (const [key, value] of rateLimitStore.entries()) {
            if (value.resetAt < now) {
                rateLimitStore.delete(key);
            }
        }
    }
    
    // If no entry exists or window has expired, create new entry
    if (!entry || entry.resetAt < now) {
        rateLimitStore.set(ip, {
            count: 1,
            resetAt: now + RATE_LIMIT_WINDOW
        });
        return { allowed: true };
    }
    
    // Check if limit exceeded
    if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
        const retryAfter = Math.ceil((entry.resetAt - now) / 1000); // seconds
        return { allowed: false, retryAfter };
    }
    
    // Increment count
    entry.count++;
    rateLimitStore.set(ip, entry);
    
    return { allowed: true };
}

/**
 * Validate honeypot field (should be empty for legitimate users)
 */
export function validateHoneypot(data: Record<string, any>): boolean {
    const honeypotValue = data[HONEYPOT_FIELD_NAME];
    // If honeypot field is filled, it's likely a bot
    return !honeypotValue || honeypotValue.trim() === '';
}

/**
 * Validate form fill time (bot forms are usually filled too quickly)
 */
export function validateFormTime(formTimestamp: number): boolean {
    const now = Date.now();
    const timeElapsed = now - formTimestamp;
    
    // If form was filled in less than MIN_FORM_FILL_TIME, it's suspicious
    return timeElapsed >= MIN_FORM_FILL_TIME;
}

/**
 * Additional validation checks for spam detection
 */
export function validateContent(data: { name?: string; email?: string; message?: string }): { valid: boolean; reason?: string } {
    const { name, email, message } = data;
    
    // Check for suspicious patterns
    if (name) {
        // Multiple consecutive identical characters (e.g., "aaa")
        if (/(.)\1{4,}/.test(name)) {
            return { valid: false, reason: 'Podejrzany format imienia' };
        }
        
        // Suspicious patterns (e.g., "test123", "asdf")
        if (/^(test|asdf|qwerty|spam|admin)/i.test(name)) {
            return { valid: false, reason: 'Podejrzana nazwa' };
        }
    }
    
    if (email) {
        // Check for disposable email domains (common in spam)
        const disposableDomains = [
            'tempmail.com', 'throwaway.email', '10minutemail.com',
            'guerrillamail.com', 'mailinator.com', 'trashmail.com',
            'yopmail.com', 'fakeinbox.com', 'temp-mail.org', 'getnada.com',
            'sharklasers.com', 'guerrillamail.org', 'maildrop.cc'
        ];
        const domain = email.split('@')[1]?.toLowerCase();
        if (domain && disposableDomains.some(d => domain.includes(d))) {
            return { valid: false, reason: 'Podejrzany adres email' };
        }
    }
    
    if (message) {
        // Check for excessive links (spam often contains many URLs)
        const linkCount = (message.match(/https?:\/\//gi) || []).length;
        if (linkCount > 5) {
            return { valid: false, reason: 'Zbyt wiele linków w wiadomości' };
        }
        
        // Check for suspicious patterns (e.g., excessive capitalization, repeated characters)
        if (message.length > 1000 && /(.)\1{10,}/.test(message)) {
            return { valid: false, reason: 'Podejrzana treść wiadomości' };
        }
        
        // Check for common spam keywords
        const spamKeywords = ['buy now', 'click here', 'limited offer', 'act now', 'free money'];
        const messageLower = message.toLowerCase();
        if (spamKeywords.some(keyword => messageLower.includes(keyword))) {
            // This is a soft check - might have false positives
            // Only flag if combined with other suspicious patterns
        }
    }
    
    return { valid: true };
}

/**
 * Main antispam validation function
 */
export function validateAntispam(
    request: Request,
    data: Record<string, any>,
    formTimestamp?: number
): { valid: boolean; error?: string; retryAfter?: number } {
    // 1. Rate limiting
    const ip = getClientIP(request);
    const rateLimit = checkRateLimit(ip);
    
    if (!rateLimit.allowed) {
        return {
            valid: false,
            error: `Zbyt wiele prób wysłania formularza. Spróbuj ponownie za ${Math.ceil(rateLimit.retryAfter! / 60)} minut.`,
            retryAfter: rateLimit.retryAfter
        };
    }
    
    // 2. Honeypot validation
    if (!validateHoneypot(data)) {
        console.log('Honeypot triggered for IP:', ip);
        // Return generic error to not reveal the protection
        return {
            valid: false,
            error: 'Wystąpił błąd podczas przetwarzania formularza.'
        };
    }
    
    // 3. Form time validation
    if (formTimestamp && !validateFormTime(formTimestamp)) {
        console.log('Form filled too quickly for IP:', ip);
        return {
            valid: false,
            error: 'Formularz został wypełniony zbyt szybko. Proszę wypełnić go ponownie.'
        };
    }
    
    // 4. Content validation
    const contentValidation = validateContent(data);
    if (!contentValidation.valid) {
        console.log('Content validation failed for IP:', ip, contentValidation.reason);
        return {
            valid: false,
            error: contentValidation.reason || 'Nieprawidłowa zawartość formularza.'
        };
    }
    
    return { valid: true };
}

export { HONEYPOT_FIELD_NAME, MIN_FORM_FILL_TIME };

