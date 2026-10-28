/**
 * Sanity Portable Text → Markdown for the blog and knowledge-base twins.
 * Covers what the schemas allow: h2–h4/normal/blockquote blocks, bullet and
 * number lists, strong/em/code marks, link annotations, images and code
 * blocks. Image URLs come from a callback so this file stays import-free.
 */

export interface PortableTextSpan {
    _type: 'span';
    text?: string;
    marks?: string[];
}

export interface PortableTextBlock {
    _type: string;
    _key?: string;
    style?: string;
    listItem?: 'bullet' | 'number' | string;
    level?: number;
    children?: Array<PortableTextSpan | { _type: string; [key: string]: unknown }>;
    markDefs?: Array<{ _key: string; _type: string; href?: string; [key: string]: unknown }>;
    [key: string]: unknown;
}

export interface PortableTextOptions {
    /** Absolute URL for an image block, or null to skip it. */
    imageUrl?: (image: PortableTextBlock) => string | null | undefined;
}

const HEADING_RANK: Record<string, number> = { h1: 1, h2: 2, h3: 3, h4: 4, h5: 5, h6: 6 };
const DECORATORS = ['code', 'em', 'strong'] as const;

/** Escapes characters that would otherwise turn plain text into markup. */
export function escapeMarkdown(text: string): string {
    return text.replace(/[\\`*_[\]<]/g, (ch) => `\\${ch}`);
}

/** Escapes a line start that Markdown would read as a heading, quote or list. */
function escapeLineStart(text: string): string {
    return text.replace(/^(\s*)(#{1,6}\s|>|[-+]\s|\d+[.)]\s)/, (_, space, token) => `${space}\\${token}`);
}

function wrap(text: string, marker: string): string {
    // Markers must hug the text: `** bold**` is not bold.
    const match = /^(\s*)([\s\S]*?)(\s*)$/.exec(text)!;
    return match[2] ? `${match[1]}${marker}${match[2]}${marker}${match[3]}` : text;
}

function renderSpanText(span: PortableTextSpan): string {
    const marks = new Set(span.marks ?? []);
    const raw = span.text ?? '';
    let text = marks.has('code') ? raw : escapeMarkdown(raw);
    for (const decorator of DECORATORS) {
        if (!marks.has(decorator)) continue;
        if (decorator === 'code') {
            const ticks = raw.includes('`') ? '``' : '`';
            text = wrap(text, ticks);
        } else {
            text = wrap(text, decorator === 'strong' ? '**' : '*');
        }
    }
    return text;
}

/** Inline content of a text block, with links grouped across spans. */
export function renderInline(block: PortableTextBlock): string {
    const defs = new Map((block.markDefs ?? []).map((def) => [def._key, def]));
    const spans = (block.children ?? []).filter((child): child is PortableTextSpan => child._type === 'span');

    // Merge neighbours with identical marks so `**a****b**` never appears.
    const merged: PortableTextSpan[] = [];
    for (const span of spans) {
        const last = merged[merged.length - 1];
        const key = (span.marks ?? []).slice().sort().join('|');
        if (last && (last.marks ?? []).slice().sort().join('|') === key) {
            last.text = (last.text ?? '') + (span.text ?? '');
        } else {
            merged.push({ ...span });
        }
    }

    let out = '';
    let i = 0;
    while (i < merged.length) {
        const linkKey = (merged[i].marks ?? []).find((m) => defs.get(m)?._type === 'link');
        if (!linkKey) {
            out += renderSpanText(merged[i]);
            i += 1;
            continue;
        }
        let label = '';
        while (i < merged.length && (merged[i].marks ?? []).includes(linkKey)) {
            label += renderSpanText({ ...merged[i], marks: (merged[i].marks ?? []).filter((m) => m !== linkKey) });
            i += 1;
        }
        const href = defs.get(linkKey)?.href;
        out += href ? `[${label.trim()}](${href.replace(/[()\s]/g, encodeURIComponent)})` : label;
    }
    return out;
}

function renderCode(block: PortableTextBlock): string {
    const code = typeof block.code === 'string' ? block.code.replace(/\s+$/, '') : '';
    if (!code) return '';
    const language = typeof block.language === 'string' && /^[\w+-]+$/.test(block.language) ? block.language : 'text';
    const fence = code.includes('```') ? '````' : '```';
    return `${fence}${language}\n${code}\n${fence}`;
}

function renderImage(block: PortableTextBlock, options: PortableTextOptions): string {
    const url = options.imageUrl?.(block);
    if (!url) return '';
    const alt = typeof block.alt === 'string' ? block.alt.replace(/[[\]]/g, ' ').replace(/\s+/g, ' ').trim() : '';
    const caption = typeof block.caption === 'string' ? block.caption.trim() : '';
    return caption ? `![${alt}](${url})\n\n*${escapeMarkdown(caption)}*` : `![${alt}](${url})`;
}

const isHeading = (block: PortableTextBlock) => block._type === 'block' && !block.listItem && HEADING_RANK[block.style ?? ''] !== undefined;

/** Headings carry their own weight, so bold inside them is noise. */
function withoutStrong(block: PortableTextBlock): PortableTextBlock {
    return {
        ...block,
        children: block.children?.map((child) =>
            child._type === 'span' ? { ...child, marks: ((child as PortableTextSpan).marks ?? []).filter((m) => m !== 'strong') } : child,
        ),
    };
}

/**
 * Editors pick heading styles for looks (an entry may use only h4), so the
 * levels actually used are re-ranked from `##` under the document's `#`, and
 * a heading never goes more than one level deeper than the previous one.
 */
function headingLevels(blocks: PortableTextBlock[]): Map<PortableTextBlock, number> {
    const headings = blocks.filter((block) => isHeading(block) && renderInline(block).trim());
    const ranks = [...new Set(headings.map((block) => HEADING_RANK[block.style!]))].sort((a, b) => a - b);
    const levels = new Map<PortableTextBlock, number>();
    let previous = 1;
    for (const block of headings) {
        const level = Math.min(2 + ranks.indexOf(HEADING_RANK[block.style!]), previous + 1, 6);
        levels.set(block, level);
        previous = level;
    }
    return levels;
}

function renderTextBlock(block: PortableTextBlock, headingLevel?: number): string {
    if (headingLevel) {
        const text = renderInline(withoutStrong(block)).trim().replace(/\s*\n\s*/g, ' ');
        return text ? `${'#'.repeat(headingLevel)} ${text}` : '';
    }
    const inline = renderInline(block).trim();
    if (!inline) return '';
    if (block.style === 'blockquote') {
        return inline.split('\n').map((line) => `> ${line}`).join('\n');
    }
    // A single newline inside a paragraph is a soft break in the editor.
    return escapeLineStart(inline).replace(/\n/g, '  \n');
}

export function portableTextToMarkdown(
    blocks: PortableTextBlock[] | null | undefined,
    options: PortableTextOptions = {},
): string {
    if (!Array.isArray(blocks)) return '';
    const chunks: string[] = [];
    let list: string[] = [];
    const counters: number[] = [];
    const levels = headingLevels(blocks);

    const flushList = () => {
        if (list.length) chunks.push(list.join('\n'));
        list = [];
        counters.length = 0;
    };

    for (const block of blocks) {
        if (block._type === 'block' && block.listItem) {
            const level = Math.max(1, Math.floor(block.level ?? 1));
            counters.length = level;
            counters[level - 1] = (counters[level - 1] ?? 0) + 1;
            const text = renderInline(block).trim().replace(/\n/g, ' ');
            if (!text) continue;
            const marker = block.listItem === 'number' ? `${counters[level - 1]}.` : '-';
            list.push(`${'    '.repeat(level - 1)}${marker} ${text}`);
            continue;
        }
        flushList();
        const rendered =
            block._type === 'block'
                ? renderTextBlock(block, levels.get(block))
                : block._type === 'image'
                  ? renderImage(block, options)
                  : block._type === 'code'
                    ? renderCode(block)
                    : '';
        if (rendered) chunks.push(rendered);
    }
    flushList();
    return chunks.join('\n\n');
}

/** Plain text of the text blocks (for meta descriptions and JSON-LD), cut on a word boundary. */
export function portableTextToPlainText(blocks: PortableTextBlock[] | string | null | undefined, maxLength = Infinity): string {
    const text = (
        typeof blocks === 'string'
            ? blocks
            : Array.isArray(blocks)
              ? blocks
                    .filter((block) => block._type === 'block')
                    .map((block) => (block.children ?? []).map((child) => (typeof child.text === 'string' ? child.text : '')).join(''))
                    .join(' ')
              : ''
    )
        .replace(/\s+/g, ' ')
        .trim();
    if (text.length <= maxLength) return text;
    const cut = text.slice(0, maxLength - 1);
    const lastSpace = cut.lastIndexOf(' ');
    return `${(lastSpace > maxLength * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:–—-]+$/, '')}…`;
}
