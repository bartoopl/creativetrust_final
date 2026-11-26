/**
 * FAQ from the article body: editors write an `## FAQ` section with one `###`
 * question per entry and the answer as the paragraphs under it. The JSON-LD
 * FAQPage is generated from that markup, so it always matches what a reader
 * sees (no hand-maintained copy). Pure, so `node --test` covers it.
 */
import type { PortableTextBlock } from './markdown/portable-text';

export interface FaqItem {
    question: string;
    answer: string;
}

/** Heading text editors use for the section, e.g. „FAQ", „Najczęstsze pytania". */
const FAQ_HEADING = /^(faq|najcz[eę]stsze pytania|pytania i odpowiedzi)\b/i;

const textOf = (block: PortableTextBlock): string =>
    (block.children ?? [])
        .map((child) => (typeof (child as { text?: unknown }).text === 'string' ? String((child as { text: string }).text) : ''))
        .join('')
        .replace(/\s+/g, ' ')
        .trim();

const heading = (block: PortableTextBlock, style: string): boolean =>
    block._type === 'block' && !block.listItem && block.style === style;

export function extractFaq(blocks: PortableTextBlock[] | null | undefined): FaqItem[] {
    const list = Array.isArray(blocks) ? blocks : [];
    const start = list.findIndex((block) => heading(block, 'h2') && FAQ_HEADING.test(textOf(block)));
    if (start < 0) return [];

    const items: FaqItem[] = [];
    let current: FaqItem | null = null;

    for (const block of list.slice(start + 1)) {
        // The next section ends the FAQ.
        if (heading(block, 'h2')) break;
        if (heading(block, 'h3')) {
            current = { question: textOf(block), answer: '' };
            items.push(current);
            continue;
        }
        if (!current) continue;
        const text = textOf(block);
        if (text) current.answer = current.answer ? `${current.answer} ${text}` : text;
    }

    return items.filter((item) => item.question && item.answer);
}
