/**
 * Sets a new password for a Payload admin account and lifts a login lockout.
 * For when the password is lost and the "forgot password" e-mail cannot be used.
 *
 *   npm run payload -- run scripts/set-admin-password.ts
 *       without ADMIN_EMAIL: lists the accounts and changes nothing
 *   ADMIN_EMAIL=… ADMIN_PASSWORD=… npm run payload -- run scripts/set-admin-password.ts
 *       sets the password (at least 12 characters) and unlocks the account
 *
 * Env: DATABASE_URL and PAYLOAD_SECRET, as for the app. The password is never printed.
 */
import config from '@payload-config';
import { getPayload } from 'payload';
import { parseResetRequest } from './lib/admin-password.mjs';

process.env.PAYLOAD_SKIP_REVALIDATE = '1';

async function main() {
    const request = parseResetRequest(process.env);
    const payload = await getPayload({ config });

    const { docs } = await payload.find({ collection: 'users', limit: 0, depth: 0, overrideAccess: true });
    const emails = docs.map((user) => String(user.email).toLowerCase());

    if (request.mode === 'list') {
        console.log(emails.length ? `Accounts:\n${emails.map((email) => `  ${email}`).join('\n')}` : 'No accounts yet: open /admin to create the first one.');
        console.log('Set ADMIN_EMAIL and ADMIN_PASSWORD to change a password.');
        return;
    }

    const user = docs.find((candidate) => String(candidate.email).toLowerCase() === request.email);
    if (!user) {
        throw new Error(`No account ${request.email}. Existing accounts: ${emails.join(', ') || 'none'}`);
    }

    await payload.update({ collection: 'users', id: user.id, data: { password: request.password }, overrideAccess: true });
    // unlock reads only the e-mail; the generated type also asks for a password.
    await payload.unlock({ collection: 'users', data: { email: user.email, password: request.password }, overrideAccess: true });
    console.log(`Password changed for ${user.email}; the account is unlocked. Log in at /admin.`);
}

// `payload run` exits once the module is loaded, so the work must finish inside the import.
try {
    await main();
    process.exit(0);
} catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
}
