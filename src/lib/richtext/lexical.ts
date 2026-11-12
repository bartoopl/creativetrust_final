/**
 * Payload rich text (Lexical JSON) ⇄ Portable Text blocks.
 *
 * The site renders and turns into Markdown the Portable Text shape it always
 * has (src/components/PortableTextContent.tsx, src/lib/markdown/portable-text.ts),
 * so content edited in Payload is converted back to it when read. The import
 * script uses the opposite direction. Both cover what the editor allows:
 * paragraph, h2–h4, blockquote, bullet/number lists (nested), bold, italic,
 * underline, inline code, links and uploaded images; line breaks inside a block
 * are "\n" in Portable Text. Pure, import-free: node --test covers it.
 */

import type { PortableTextBlock, PortableTextSpan } from '../markdown/portable-text';

// Lexical text format bit flags.
const FORMAT = { strong: 1, em: 2, 'strike-through': 4, underline: 8, code: 16 } as const;
type Decorator = keyof typeof FORMAT;
const DECORATORS = Object.keys(FORMAT) as Decorator[];

export interface LexicalNode {
    type: string;
    children?: LexicalNode[];
    [key: string]: unknown;
}

export interface LexicalState {
    root: LexicalNode;
}

const element = (type: string, children: LexicalNode[], extra: Record<string, unknown> = {}): LexicalNode => ({
    type,
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    ...extra,
    children,
});

const textNode = (text: string, format: number): LexicalNode => ({
    type: 'text',
    text,
    format,
    detail: 0,
    mode: 'normal',
    style: '',
    version: 1,
});

// ---------------------------------------------------------------- PT → Lexical

export interface ToLexicalOptions {
    /** Payload media id for a Portable Text image block, or null to drop it. */
    resolveImage?: (block: PortableTextBlock) => string | number | null | undefined;
}

function formatOf(marks: string[]): number {
    return marks.reduce((bits, mark) => bits | (FORMAT[mark as Decorator] ?? 0), 0);
}

/** Text with "\n" becomes text nodes separated by linebreak nodes. */
function textNodes(text: string, format: number): LexicalNode[] {
    const out: LexicalNode[] = [];
    text.split('\n').forEach((part, index) => {
        if (index > 0) out.push({ type: 'linebreak', version: 1 });
        if (part) out.push(textNode(part, format));
    });
    return out;
}

function inlineToLexical(block: PortableTextBlock): LexicalNode[] {
    const defs = new Map((block.markDefs ?? []).map((def) => [def._key, def]));
    const spans = (block.children ?? []).filter((child): child is PortableTextSpan => child._type === 'span');
    const out: LexicalNode[] = [];
    let i = 0;
    while (i < spans.length) {
        const marks = spans[i].marks ?? [];
        const linkKey = marks.find((mark) => defs.get(mark)?._type === 'link');
        if (!linkKey) {
            out.push(...textNodes(spans[i].text ?? '', formatOf(marks)));
            i += 1;
            continue;
        }
        const children: LexicalNode[] = [];
        while (i < spans.length && (spans[i].marks ?? []).includes(linkKey)) {
            children.push(...textNodes(spans[i].text ?? '', formatOf(spans[i].marks ?? [])));
            i += 1;
        }
        const def = defs.get(linkKey)!;
        const href = typeof def.href === 'string' ? def.href : '';
        if (!href) {
            out.push(...children);
            continue;
        }
        out.push(
            element('link', children, {
                version: 3,
                fields: { linkType: 'custom', url: href, newTab: def.blank === true },
            }),
        );
    }
    return out;
}

function blockToLexical(block: PortableTextBlock): LexicalNode {
    const children = inlineToLexical(block);
    const style = block.style ?? 'normal';
    if (/^h[1-6]$/.test(style)) {
        // The editor offers h2–h4; an h1 in content would compete with the page title.
        const tag = style === 'h1' ? 'h2' : Number(style[1]) > 4 ? 'h4' : style;
        return element('heading', children, { tag });
    }
    if (style === 'blockquote') return element('quote', children);
    return element('paragraph', children, { textFormat: 0, textStyle: '' });
}

type ListType = 'bullet' | 'number';

function listNode(listType: ListType, items: LexicalNode[]): LexicalNode {
    return element('list', items, { listType, start: 1, tag: listType === 'number' ? 'ol' : 'ul' });
}

/** Consecutive list blocks (with levels) → nested Lexical lists. */
function listToLexical(blocks: PortableTextBlock[], level: number): LexicalNode {
    const listType: ListType = blocks[0].listItem === 'number' ? 'number' : 'bullet';
    const items: LexicalNode[] = [];
    let i = 0;
    while (i < blocks.length) {
        const blockLevel = blocks[i].level ?? 1;
        if (blockLevel > level) {
            // Deeper items: a list inside its own list item, as Lexical stores nesting.
            const start = i;
            while (i < blocks.length && (blocks[i].level ?? 1) > level) i += 1;
            items.push(element('listitem', [listToLexical(blocks.slice(start, i), level + 1)], { value: items.length + 1 }));
            continue;
        }
        items.push(element('listitem', inlineToLexical(blocks[i]), { value: items.length + 1 }));
        i += 1;
    }
    return listNode(listType, items);
}

/** Splits a run of list blocks at the top level wherever the list type changes. */
function topLevelLists(blocks: PortableTextBlock[]): PortableTextBlock[][] {
    const runs: PortableTextBlock[][] = [];
    for (const block of blocks) {
        const last = runs[runs.length - 1];
        if (last && ((block.level ?? 1) > 1 || block.listItem === last[0].listItem)) last.push(block);
        else runs.push([block]);
    }
    return runs;
}

/** Plain text (old portfolio descriptions) → paragraphs split on blank lines. */
export function plainTextToPortableText(text: string): PortableTextBlock[] {
    return text
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.replace(/[ \t]+$/gm, '').trim())
        .filter(Boolean)
        .map((paragraph, index) => ({
            _type: 'block',
            _key: `p${index}`,
            style: 'normal',
            markDefs: [],
            children: [{ _type: 'span', text: paragraph, marks: [] }],
        }));
}

export function portableTextToLexical(value: PortableTextBlock[] | string | null | undefined, options: ToLexicalOptions = {}): LexicalState {
    const blocks = typeof value === 'string' ? plainTextToPortableText(value) : (value ?? []);
    const children: LexicalNode[] = [];
    let i = 0;
    while (i < blocks.length) {
        const block = blocks[i];
        if (block._type === 'block' && block.listItem) {
            const start = i;
            while (i < blocks.length && blocks[i]._type === 'block' && blocks[i].listItem) i += 1;
            const run = blocks.slice(start, i);
            for (const list of topLevelLists(run)) children.push(listToLexical(list, 1));
            continue;
        }
        if (block._type === 'block') {
            children.push(blockToLexical(block));
        } else if (block._type === 'image') {
            const id = options.resolveImage?.(block);
            if (id != null) children.push({ type: 'upload', version: 3, format: '', relationTo: 'media', value: id, fields: {} });
        }
        i += 1;
    }
    return { root: element('root', children) };
}

// ---------------------------------------------------------------- Lexical → PT

/** A populated media document as Payload returns it. */
export interface MediaDoc {
    id?: string | number;
    url?: string | null;
    alt?: string | null;
    caption?: string | null;
    [key: string]: unknown;
}

export interface ToPortableTextOptions {
    /** URL path for an internal link to a Payload document (`linkType: 'internal'`). */
    internalHref?: (relationTo: string, doc: Record<string, unknown>) => string | null;
}

interface InlineState {
    children: PortableTextSpan[];
    markDefs: NonNullable<PortableTextBlock['markDefs']>;
}

function marksOf(format: unknown): string[] {
    const bits = typeof format === 'number' ? format : 0;
    return DECORATORS.filter((decorator) => bits & FORMAT[decorator]);
}

function linkHref(fields: Record<string, unknown>, options: ToPortableTextOptions): string | null {
    if (fields.linkType === 'internal') {
        const doc = fields.doc as { relationTo?: string; value?: unknown } | undefined;
        if (doc?.relationTo && doc.value && typeof doc.value === 'object') {
            return options.internalHref?.(doc.relationTo, doc.value as Record<string, unknown>) ?? null;
        }
        return null;
    }
    return typeof fields.url === 'string' ? fields.url : null;
}

function collectInline(nodes: LexicalNode[] | undefined, state: InlineState, options: ToPortableTextOptions, extraMarks: string[] = []) {
    for (const node of nodes ?? []) {
        if (node.type === 'text') {
            state.children.push({ _type: 'span', text: String(node.text ?? ''), marks: [...marksOf(node.format), ...extraMarks] });
        } else if (node.type === 'linebreak') {
            // A break inside formatted text (e.g. a code snippet) keeps that formatting,
            // as it was one span in Portable Text.
            const previous = state.children[state.children.length - 1];
            const inherit = previous && extraMarks.every((mark) => previous.marks?.includes(mark));
            state.children.push({ _type: 'span', text: '\n', marks: inherit ? [...(previous.marks ?? [])] : [...extraMarks] });
        } else if (node.type === 'link' || node.type === 'autolink') {
            const fields = (node.fields ?? {}) as Record<string, unknown>;
            const href = linkHref(fields, options);
            if (!href) {
                collectInline(node.children, state, options, extraMarks);
                continue;
            }
            const key = `link${state.markDefs.length}`;
            state.markDefs.push({ _key: key, _type: 'link', href, ...(fields.newTab ? { blank: true } : {}) });
            collectInline(node.children, state, options, [...extraMarks, key]);
        } else if (node.children) {
            collectInline(node.children, state, options, extraMarks);
        }
    }
}

/** Joins neighbouring spans with identical marks (linebreaks split them in Lexical). */
function mergeSpans(spans: PortableTextSpan[]): PortableTextSpan[] {
    const out: PortableTextSpan[] = [];
    for (const span of spans) {
        const last = out[out.length - 1];
        if (last && (last.marks ?? []).join('|') === (span.marks ?? []).join('|')) {
            last.text = (last.text ?? '') + (span.text ?? '');
        } else {
            out.push({ ...span, marks: [...(span.marks ?? [])] });
        }
    }
    return out;
}

function textBlock(key: string, nodes: LexicalNode[] | undefined, options: ToPortableTextOptions, extra: Partial<PortableTextBlock>): PortableTextBlock {
    const state: InlineState = { children: [], markDefs: [] };
    collectInline(nodes, state, options);
    const children = mergeSpans(state.children);
    return {
        _type: 'block',
        _key: key,
        style: 'normal',
        ...extra,
        markDefs: state.markDefs,
        children: children.length ? children : [{ _type: 'span', text: '', marks: [] }],
    };
}

export function lexicalToPortableText(state: LexicalState | null | undefined, options: ToPortableTextOptions = {}): PortableTextBlock[] {
    const out: PortableTextBlock[] = [];
    let counter = 0;
    const nextKey = () => `b${(counter += 1)}`;

    const visitList = (list: LexicalNode, level: number) => {
        const listItem = list.listType === 'number' ? 'number' : 'bullet';
        for (const item of list.children ?? []) {
            const nested = (item.children ?? []).filter((child) => child.type === 'list');
            const inline = (item.children ?? []).filter((child) => child.type !== 'list');
            if (inline.length || !nested.length) out.push(textBlock(nextKey(), inline, options, { listItem, level }));
            for (const sub of nested) visitList(sub, level + 1);
        }
    };

    for (const node of state?.root?.children ?? []) {
        switch (node.type) {
            case 'heading':
                out.push(textBlock(nextKey(), node.children, options, { style: String(node.tag ?? 'h2') }));
                break;
            case 'quote':
                out.push(textBlock(nextKey(), node.children, options, { style: 'blockquote' }));
                break;
            case 'list':
                visitList(node, 1);
                break;
            case 'upload': {
                const media = node.value && typeof node.value === 'object' ? (node.value as MediaDoc) : null;
                if (!media?.url) break;
                out.push({
                    _type: 'image',
                    _key: nextKey(),
                    asset: media,
                    ...(media.alt ? { alt: media.alt } : {}),
                    ...(media.caption ? { caption: media.caption } : {}),
                });
                break;
            }
            default:
                out.push(textBlock(nextKey(), node.children, options, {}));
        }
    }
    return out;
}
