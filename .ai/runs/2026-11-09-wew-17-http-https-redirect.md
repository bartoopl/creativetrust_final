# Execution plan — WEW-17: one-hop 301 from http:// to https://www.creativetrust.pl

Source: Jira WEW-17 (https://creativetrust-team.atlassian.net/browse/WEW-17).

## Goal

Every `http://` and apex variant of creativetrust.pl answers with a single 301 to `https://www.creativetrust.pl/<same path>`. No 5xx.

## Findings that differ from the ticket (09.11.2026)

- **The 500 does not come from the site.** `HTTP/1.1 500` with `Server: Pingora` is the agent sandbox's egress proxy. From the same sandbox, `http://example.com/`, `http://www.google.com/` and `http://netlify.com/` also return `500 Pingora`. Seen from the internet (check-host.net nodes in PL, NL, UK, BR and JP, plus hackertarget headers), port 80 returns **301**.
- Real chains, measured from the internet:
  - `http://www.creativetrust.pl/blog` → 301 `https://www.creativetrust.pl/blog` → 200. One hop, OK.
  - `http://creativetrust.pl/blog` → 301 `https://creativetrust.pl/blog` → 301 `https://www.creativetrust.pl/blog` → 200. **Two hops**, which fails the "one hop" criterion.
  - `https://creativetrust.pl/blog` → 301 `https://www.creativetrust.pl/blog`. OK.
- Netlify issues both redirects (`x-nf-request-id`). Cloudflare proxies without redirecting, so "Always Use HTTPS" is off.
- HSTS is already sent by `next.config.ts` (`max-age=31536000; includeSubDomains`).

## Scope

- `netlify.toml`: domain-level 301 rules send the apex (`http://` and `https://`) straight to `https://www.creativetrust.pl/:splat`. The rules never target their own host, so they cannot loop in any Cloudflare SSL mode.
- `scripts/hosting-redirects.test.mjs`: unit test that guards those rules.
- PR body: the manual Cloudflare steps. A Single Redirect Rule is the guaranteed one-hop fix at the edge and also covers `http://www`.

## Non-goals

- Cloudflare and Netlify dashboard changes (done by hand, described in the PR).
- HSTS preload and changes to the existing HSTS header.
- An in-app (Next.js `proxy.ts`) scheme redirect: behind Cloudflare plus Netlify the app cannot reliably see the visitor's scheme.

## Risks

- Netlify may apply its own forced-HTTPS redirect before the `netlify.toml` rules. Then `http://creativetrust.pl` stays two hops until the Cloudflare Redirect Rule is added. The repo rule is harmless either way, and the manual step is the reliable fix.
- `.ai/agentic.config.json` is absent. Values follow previous runs: base `main`, runs in `.ai/runs`, GitHub tracker, gate = `typecheck`, `test`, `check:design`, `build`.

## Implementation Plan

### Phase 1: Apex → www in one hop

- 1.1 Add domain-level apex redirects to netlify.toml with a guard test.

## Progress

PR: #23

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles.

### Phase 1: Apex → www in one hop

- [x] 1.1 Add domain-level apex redirects to netlify.toml with a guard test — 4a58684
