import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { MIN_PASSWORD_LENGTH, normalizeEmail, parseResetRequest } from './lib/admin-password.mjs';

test('without an e-mail the script only lists accounts', () => {
    assert.deepEqual(parseResetRequest({}), { mode: 'list' });
    assert.deepEqual(parseResetRequest({ ADMIN_EMAIL: '   ', ADMIN_PASSWORD: 'x' }), { mode: 'list' });
});

test('the e-mail is trimmed and lower-cased', () => {
    assert.equal(normalizeEmail('  Admin@CreativeTrust.PL '), 'admin@creativetrust.pl');
    const request = parseResetRequest({ ADMIN_EMAIL: ' Admin@CreativeTrust.pl', ADMIN_PASSWORD: 'a'.repeat(MIN_PASSWORD_LENGTH) });
    assert.equal(request.mode, 'reset');
    assert.equal(request.email, 'admin@creativetrust.pl');
});

test('rejects a malformed e-mail and a short or missing password', () => {
    assert.throws(() => parseResetRequest({ ADMIN_EMAIL: 'admin', ADMIN_PASSWORD: 'a'.repeat(20) }), /not an e-mail/);
    assert.throws(() => parseResetRequest({ ADMIN_EMAIL: 'a@b.pl', ADMIN_PASSWORD: 'short' }), /at least 12/);
    assert.throws(() => parseResetRequest({ ADMIN_EMAIL: 'a@b.pl' }), /at least 12/);
});

test('the error message never echoes the password', () => {
    try {
        parseResetRequest({ ADMIN_EMAIL: 'a@b.pl', ADMIN_PASSWORD: 'secret123' });
        assert.fail('expected a throw');
    } catch (error) {
        assert.doesNotMatch(String(error), /secret123/);
    }
});

test('the script sets the password through Payload and unlocks the account', () => {
    const script = readFileSync(new URL('./set-admin-password.ts', import.meta.url), 'utf8');
    assert.match(script, /payload\.update\(\{ collection: 'users', id: user\.id, data: \{ password: request\.password \}/);
    assert.match(script, /payload\.unlock\(\{ collection: 'users'/);
    assert.doesNotMatch(script, /console\.(log|error)\([^\n]*request\.password/);
});
