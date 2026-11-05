import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { CONSENT_BOOTSTRAP_SCRIPT, GTM_ID, gtmLoaderScript, leadSourceForHref, trackLead } from '../src/lib/analytics.ts';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const read = (path) => readFileSync(join(ROOT, path), 'utf8');

/** Runs the GTM loader on a hostname and returns the script URLs it inserted. */
function loadGtm(hostname) {
    const inserted = [];
    const script = { parentNode: { insertBefore: (el) => inserted.push(el.src) } };
    const context = {
        location: { hostname },
        document: { getElementsByTagName: () => [script], createElement: () => ({}) },
    };
    context.window = context;
    vm.runInNewContext(gtmLoaderScript('www.creativetrust.pl'), context);
    return inserted;
}

test('GTM loads on the production hostname only', () => {
    assert.deepEqual(loadGtm('www.creativetrust.pl'), [`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`]);
    for (const hostname of ['localhost', '127.0.0.1', 'deploy-preview-14--creativetrust.netlify.app']) {
        assert.deepEqual(loadGtm(hostname), [], hostname);
    }
});

test('the layout loads GTM through the guarded loader', () => {
    const layout = read('src/app/layout.tsx');
    assert.match(layout, /gtmLoaderScript\(new URL\(SITE_URL\)\.hostname\)/);
    assert.doesNotMatch(layout, /googletagmanager\.com\/gtm\.js/);
});

/** Runs the consent bootstrap against a stored state and returns what reached the dataLayer. */
function bootstrap(stored) {
    const context = { localStorage: { getItem: (key) => stored[key] ?? null } };
    context.window = context;
    vm.runInNewContext(CONSENT_BOOTSTRAP_SCRIPT, context);
    const commands = context.dataLayer.filter((entry) => !entry.event).map((entry) => Array.from(entry));
    return {
        gtag: context.gtag,
        commands,
        update: commands.find(([command, action]) => command === 'consent' && action === 'update')?.[2],
        events: context.dataLayer.filter((entry) => entry.event),
    };
}

test('consent defaults to denied and a new visitor gets no update', () => {
    const { gtag, commands, update, events } = bootstrap({});
    assert.equal(typeof gtag, 'function', 'consent-utils relies on a global gtag');
    assert.deepEqual(commands[0].slice(0, 2), ['consent', 'default']);
    assert.equal(commands[0][2].analytics_storage, 'denied');
    assert.equal(update, undefined);
    assert.equal(events.length, 0);
});

test('a returning visitor who accepted everything is restored through gtag', () => {
    const { update, events } = bootstrap({ cookieConsent: 'all' });
    assert.equal(update.analytics_storage, 'granted');
    assert.equal(update.ad_storage, 'granted');
    assert.equal(events[0].event, 'consent_update');
});

test('custom settings win over the consent type, and refusals stay denied', () => {
    const custom = bootstrap({
        cookieConsent: 'custom',
        cookieConsentSettings: JSON.stringify({ analytics_storage: true, ad_storage: false, functionality_storage: true, personalization_storage: false }),
    });
    assert.equal(custom.update.analytics_storage, 'granted');
    assert.equal(custom.update.ad_storage, 'denied');
    assert.equal(bootstrap({ cookieConsent: 'essential' }).update.analytics_storage, 'denied');
});

test('corrupted stored settings leave the defaults in place', () => {
    assert.equal(bootstrap({ cookieConsentSettings: '{not json' }).update, undefined);
});

test('trackLead pushes generate_lead with the source and nothing else', () => {
    const previous = globalThis.window;
    globalThis.window = {};
    try {
        trackLead('contact_form');
        assert.deepEqual(window.dataLayer, [{ event: 'generate_lead', lead_source: 'contact_form' }]);
    } finally {
        globalThis.window = previous;
    }
});

test('each form reports a lead only after the send is confirmed', () => {
    const order = (path, confirmed, source) => {
        const code = read(path);
        const tracked = code.indexOf(`trackLead('${source}')`);
        assert.ok(tracked > code.indexOf(confirmed) && code.indexOf(confirmed) > -1, path);
    };
    order('src/components/ContactForm.tsx', 'await submission;', 'contact_form');
    order('src/components/LandingLeadForm.tsx', 'if (!response.ok)', 'landing_form');
    order('src/components/home/LeadRequest.tsx', 'if (res.ok && data?.success !== false)', 'assistant_form');
});

test('mailto and tel links map to their lead source, other links to none', () => {
    assert.equal(leadSourceForHref('mailto:office@creativetrust.pl'), 'email_click');
    assert.equal(leadSourceForHref('tel:+48570526421'), 'phone_click');
    assert.equal(leadSourceForHref('/kontakt'), null);
    assert.equal(leadSourceForHref('https://example.com/?mailto:x'), null);
    assert.match(read('src/app/layout.tsx'), /<LeadLinkTracking \/>/);
});
