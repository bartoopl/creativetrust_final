/**
 * Builders for /llms.txt (index of Markdown resources, llmstxt.org format)
 * and /llms-full.txt (every page's Markdown in one file). Pure string work,
 * no imports, so `node --test` can load it directly.
 */

export const CONTENT_SIGNAL = 'search=yes, ai-input=yes, ai-train=no';

export interface LlmsPage {
    title: string;
    description: string;
    /** Absolute `.md` URL. */
    url: string;
    section: 'company' | 'services' | 'pricing' | 'landings';
    optional?: boolean;
}

export interface LlmsArticle {
    title: string;
    url: string;
    summary?: string | null;
    kind: 'blog' | 'knowledge-base';
}

export interface LlmsInput {
    origin: string;
    pages: LlmsPage[];
    articles: LlmsArticle[];
}

const SECTION_TITLES: Record<LlmsPage['section'], string> = {
    company: 'Firma',
    services: 'Usługi',
    pricing: 'Cenniki',
    landings: 'Specjalizacje',
};

const SUMMARY =
    'CreativeTrust to agencja z Gorzowa Wielkopolskiego, która projektuje i wdraża strony WWW, sklepy e-commerce (w tym headless), marketing automation (SALESmanago) i social media. AI przyspiesza research i produkcję, a decyzje i jakość zostają po stronie zespołu.';

const oneLine = (text?: string | null) => (text ?? '').replace(/\s+/g, ' ').trim();

function link(title: string, url: string, note?: string | null) {
    const description = oneLine(note);
    return `- [${oneLine(title)}](${url})${description ? `: ${description}` : ''}`;
}

function header(origin: string): string[] {
    return [
        '# CreativeTrust',
        '',
        `> ${SUMMARY}`,
        '',
        `Content-Signal: ${CONTENT_SIGNAL}`,
        '',
        `Wszystkie odnośniki prowadzą do wersji Markdown stron ${origin}. Treści są po polsku, ceny podajemy netto. Kontakt: office@creativetrust.pl, +48 570 526 421.`,
    ];
}

export function buildLlmsTxt({ origin, pages, articles }: LlmsInput): string {
    const lines = header(origin);
    for (const section of Object.keys(SECTION_TITLES) as LlmsPage['section'][]) {
        const items = pages.filter((p) => p.section === section && !p.optional);
        if (!items.length) continue;
        lines.push('', `## ${SECTION_TITLES[section]}`, '', ...items.map((p) => link(p.title, p.url, p.description)));
    }

    const blog = articles.filter((a) => a.kind === 'blog');
    if (blog.length) lines.push('', '## Blog', '', ...blog.map((a) => link(a.title, a.url, a.summary)));

    const kb = articles.filter((a) => a.kind === 'knowledge-base');
    if (kb.length) lines.push('', '## Baza wiedzy', '', ...kb.map((a) => link(a.title, a.url, a.summary)));

    const optional = pages.filter((p) => p.optional);
    lines.push(
        '',
        '## Optional',
        '',
        link('Pełna treść wszystkich stron', `${origin}/llms-full.txt`, 'Wszystkie powyższe strony w jednym pliku Markdown'),
        ...optional.map((p) => link(p.title, p.url, p.description)),
    );
    return `${lines.join('\n')}\n`;
}

export interface LlmsFullDocument {
    /** Absolute `.md` URL. */
    url: string;
    /** Markdown body without frontmatter, starting with its `#` heading. */
    body: string;
}

/** Page headings are demoted one level so the file keeps a single `#`. */
function demoteHeadings(markdown: string): string {
    let fenced = false;
    return markdown
        .split('\n')
        .map((line) => {
            if (/^(```|~~~)/.test(line)) fenced = !fenced;
            return !fenced && /^#{1,5}\s/.test(line) ? `#${line}` : line;
        })
        .join('\n');
}

export function buildLlmsFullTxt({ origin, documents, articles }: { origin: string; documents: LlmsFullDocument[]; articles: LlmsArticle[] }): string {
    const parts = [header(origin).join('\n')];
    for (const doc of documents) {
        parts.push(`Źródło: ${doc.url}\n\n${demoteHeadings(doc.body.trim())}`);
    }
    if (articles.length) {
        parts.push(
            [
                '## Artykuły i baza wiedzy',
                '',
                'Najnowsze artykuły bloga i hasła bazy wiedzy CreativeTrust. Pełna treść każdego z nich jest pod podanym adresem `.md`.',
                '',
                ...articles.map((a) => link(a.title, a.url, a.summary)),
            ].join('\n'),
        );
    }
    return `${parts.join('\n\n---\n\n')}\n`;
}
