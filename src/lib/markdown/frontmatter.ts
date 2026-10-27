/**
 * Tiny YAML-subset frontmatter for the AI Markdown files: scalar strings
 * (plain, "double" or 'single' quoted), inline `[a, b]` lists and block
 * `- item` lists. No imports, so `node --test` can load it directly.
 */

export type FrontmatterValue = string | string[];
export type Frontmatter = Record<string, FrontmatterValue>;

export interface ParsedMarkdown {
    data: Frontmatter;
    body: string;
}

const FENCE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function unquote(raw: string): string {
    const value = raw.trim();
    if (value.length >= 2 && value.startsWith('"') && value.endsWith('"')) {
        return value.slice(1, -1).replace(/\\(["\\n])/g, (_, ch) => (ch === 'n' ? '\n' : ch));
    }
    if (value.length >= 2 && value.startsWith("'") && value.endsWith("'")) {
        return value.slice(1, -1).replace(/''/g, "'");
    }
    return value;
}

/** Splits `a, "b, c", d` on commas outside quotes. */
function splitInlineList(inner: string): string[] {
    const items: string[] = [];
    let current = '';
    let quote: string | null = null;
    for (const ch of inner) {
        if (quote) {
            if (ch === quote) quote = null;
            current += ch;
        } else if (ch === '"' || ch === "'") {
            quote = ch;
            current += ch;
        } else if (ch === ',') {
            items.push(current);
            current = '';
        } else {
            current += ch;
        }
    }
    items.push(current);
    return items.map(unquote).filter((item) => item !== '');
}

export function parseFrontmatter(source: string): ParsedMarkdown {
    const match = FENCE.exec(source);
    if (!match) return { data: {}, body: source };

    const data: Frontmatter = {};
    let listKey: string | null = null;
    for (const line of match[1].split(/\r?\n/)) {
        if (line.trim() === '' || line.trim().startsWith('#')) continue;
        const item = /^\s+-\s+(.*)$/.exec(line) ?? /^-\s+(.*)$/.exec(line);
        if (item && listKey) {
            (data[listKey] as string[]).push(unquote(item[1]));
            continue;
        }
        const pair = /^([A-Za-z_][\w-]*):(?:\s+(.*))?$/.exec(line);
        if (!pair) throw new Error(`Unsupported frontmatter line: ${line}`);
        const [, key, rawValue = ''] = pair;
        const value = rawValue.trim();
        if (value === '') {
            data[key] = [];
            listKey = key;
        } else if (value.startsWith('[') && value.endsWith(']')) {
            data[key] = splitInlineList(value.slice(1, -1));
            listKey = null;
        } else {
            data[key] = unquote(value);
            listKey = null;
        }
    }
    return { data, body: source.slice(match[0].length) };
}

function quote(value: string): string {
    return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r?\n/g, '\\n')}"`;
}

/** Serialises with every string double-quoted; empty values are dropped. */
export function serializeFrontmatter(data: Record<string, FrontmatterValue | null | undefined>): string {
    const lines = ['---'];
    for (const [key, value] of Object.entries(data)) {
        if (value == null) continue;
        if (Array.isArray(value)) {
            const items = value.map((v) => v.trim()).filter(Boolean);
            if (items.length === 0) continue;
            lines.push(`${key}:`, ...items.map((v) => `  - ${quote(v)}`));
        } else if (value.trim() !== '') {
            lines.push(`${key}: ${quote(value.trim())}`);
        }
    }
    lines.push('---');
    return `${lines.join('\n')}\n`;
}

/** First string value of a key, or undefined. */
export function frontmatterString(data: Frontmatter, key: string): string | undefined {
    const value = data[key];
    return typeof value === 'string' ? value : undefined;
}
