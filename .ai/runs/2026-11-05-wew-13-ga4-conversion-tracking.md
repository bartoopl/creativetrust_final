# Execution plan — WEW-13: GA4 conversion tracking and canonical www links

Source: Jira WEW-13 (https://creativetrust-team.atlassian.net/browse/WEW-13) + live inspection on 2026-11-05 of the published GTM container (GTM-WTKHM3K, version 10), the production sitemap and CMS content.

## Goal

Contact leads become measurable in GA4 (`generate_lead`), development traffic stops reaching the production property, and nothing rendered by the site points at the non-www host.

## Findings that shape the scope

- The URL-named events come from GTM, not the repository: a GA4 Event tag has its event name set to `{{Page URL}}` and fires on every page. Deleting it is a panel step; the code has no event of that kind.
- The container has no consumer of the `consent_update` dataLayer event, and `restoreConsents()` only pushed that event, so a returning visitor's stored consent never reached Consent Mode.
- The sitemap, robots.txt and canonicals already use www (195 of 195 sitemap URLs return 200). Non-www URLs remain only as 19 links in 9 CMS documents.

## Scope

- `src/lib/analytics.ts` — GTM loader limited to the production hostname, consent bootstrap, `generate_lead` helper.
- `src/app/layout.tsx` — uses those scripts, mounts the link tracker.
- `src/components/LeadLinkTracking.tsx` — mailto/tel clicks.
- `ContactForm`, `LandingLeadForm`, `home/LeadRequest` — `generate_lead` on a confirmed send.
- `src/lib/markdown/portable-text.ts` (`canonicalHref`), `PortableTextContent` — non-www links rewritten in the Markdown and HTML renderers.

## Non-goals

- GTM, GA4 and GSC panel changes (no access from code): listed as manual steps in the PR.
- Editing CMS content, including the dead links left over from the old WordPress site: listed in the PR.
- Consent Mode v2 signals (`ad_user_data`, `ad_personalization`).

## Implementation Plan

### Phase 1: GA4 bootstrap

1.1 Load GTM only on the production hostname. 1.2 Restore stored consent through `gtag('consent', 'update')`.

### Phase 2: generate_lead

2.1 Push `generate_lead` from the three forms after a confirmed send. 2.2 Push it for mailto/tel clicks.

### Phase 3: Canonical links

3.1 Rewrite non-www links from CMS content in HTML and Markdown output.

## Risks

- Until the GTM steps are published, `generate_lead` stays in the dataLayer and never reaches GA4.
- GTM Preview no longer connects on localhost or deploy previews; it has to be run against production.

## Progress

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles.

### Phase 1: GA4 bootstrap

- [ ] 1.1 Load GTM only on the production hostname
- [ ] 1.2 Restore stored consent through gtag consent update

### Phase 2: generate_lead

- [ ] 2.1 Push generate_lead from the three forms after a confirmed send
- [ ] 2.2 Push generate_lead for mailto/tel clicks

### Phase 3: Canonical links

- [ ] 3.1 Rewrite non-www links from CMS content in HTML and Markdown output
