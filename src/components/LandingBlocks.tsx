import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import NotchedButton from '@/components/ui/NotchedButton';

/*
 * Shared presentation blocks for the SEO landing pages under /uslugi
 * (hero media, hairline numbered grids, price tiers, bullet rows, split sections, inline CTA).
 */

const GRID_COLS: Record<number, string> = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3 md:[&>*:last-child:nth-child(odd)]:col-span-2 lg:[&>*:last-child:nth-child(odd)]:col-span-1',
    4: 'md:grid-cols-2 lg:grid-cols-4',
    5: 'md:grid-cols-2 lg:grid-cols-5 md:[&>*:last-child:nth-child(odd)]:col-span-2 lg:[&>*:last-child:nth-child(odd)]:col-span-1',
};

export function gridCols(cols: number) {
    return `grid-cols-1 ${GRID_COLS[cols] ?? GRID_COLS[2]}`;
}

/** Right column of a landing PageHero: framed image + bordered panel (bullet list or custom content). */
export function HeroMedia({ src, alt, label, items, children }: {
    src: string;
    alt: string;
    label: string;
    items?: string[];
    children?: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-4">
            <div
                className="relative aspect-[16/10] overflow-hidden"
                style={{ border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-lg)', background: 'var(--panel)' }}
            >
                <Image src={src} alt={alt} fill priority className="object-cover" />
            </div>
            <div className="ct-panel" style={{ padding: '22px 24px 10px' }}>
                <p className="ct-meta" style={{ margin: '0 0 10px' }}>{label}</p>
                {items && <BulletList items={items} />}
                {children}
            </div>
        </div>
    );
}

/** Vertical bullet list: 6px accent square + hairline top border per row. */
export function BulletList({ items, fontSize = 15 }: { items: string[]; fontSize?: number }) {
    return (
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {items.map((item) => (
                <li key={item} className="flex items-start gap-3" style={{ padding: '12px 0', borderTop: '1px solid var(--line)' }}>
                    <span className="ct-bullet" aria-hidden="true" style={{ marginTop: fontSize * 0.5 }} />
                    <span style={{ fontSize, lineHeight: 1.5, color: 'var(--text-2)' }}>{item}</span>
                </li>
            ))}
        </ul>
    );
}

/** Bullet rows laid out in two columns (used for use cases, outcomes, checklists). */
export function BulletColumns({ items }: { items: string[] }) {
    return (
        <div className="grid grid-cols-1 gap-x-10 md:grid-cols-2" style={{ borderBottom: '1px solid var(--line)' }}>
            {items.map((item) => (
                <div key={item} className="flex items-start gap-3" style={{ padding: '16px 0', borderTop: '1px solid var(--line)' }}>
                    <span className="ct-bullet" aria-hidden="true" style={{ marginTop: 8 }} />
                    <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.55, color: 'var(--text-2)' }}>{item}</p>
                </div>
            ))}
        </div>
    );
}

type GridItem = { title?: string; text?: string };

/** 1px hairline grid of cells with mono 01/02 numerals. */
export function NumberedGrid({ items, cols = 4, numbered = true }: { items: GridItem[]; cols?: number; numbered?: boolean }) {
    return (
        <div className={`ct-grid-lines ${gridCols(cols)}`} style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            {items.map((item, i) => (
                <div key={item.title ?? item.text} className="flex flex-col gap-2.5" style={{ padding: 28 }}>
                    {numbered && (
                        <span className="ct-mono" style={{ fontSize: 12, fontWeight: 500, color: 'var(--muted)', marginBottom: 14 }}>
                            {String(i + 1).padStart(2, '0')}
                        </span>
                    )}
                    {item.title && <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600, lineHeight: 1.3 }}>{item.title}</h3>}
                    {item.text && (
                        item.title
                            ? <p className="ct-body">{item.text}</p>
                            : <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.55, color: 'var(--text-2)' }}>{item.text}</p>
                    )}
                </div>
            ))}
        </div>
    );
}

/** Two-column section body: header on the left, content on the right. */
export function SplitLayout({ eyebrow, title, children }: { eyebrow?: string; title: React.ReactNode; children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
                <SectionHeader eyebrow={eyebrow} title={title} maxWidth="22ch" />
            </div>
            <div>{children}</div>
        </div>
    );
}

/** Bordered inline CTA panel (never a filled band). */
export function InlineCTA({ title, text, cta }: { title: string; text: string; cta: { label: string; href: string } }) {
    return (
        <div className="ct-panel flex flex-col items-start justify-between gap-6 p-8 md:p-10 lg:flex-row lg:items-center" style={{ background: 'var(--panel)' }}>
            <div>
                <h2 style={{ margin: '0 0 10px', fontSize: 24, fontWeight: 600, letterSpacing: '-0.5px' }}>{title}</h2>
                <p className="ct-body" style={{ fontSize: 15, maxWidth: '62ch' }}>{text}</p>
            </div>
            <NotchedButton href={cta.href}>{cta.label}</NotchedButton>
        </div>
    );
}

type PriceItem = { name: string; price: string; text: string; features?: string[] };

/** Price tiers in a hairline grid: numeral, name, price, description, optional bullet features. */
export function PriceGrid({ items }: { items: PriceItem[] }) {
    return (
        <div className={`ct-grid-lines ${gridCols(3)}`} style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            {items.map((item, i) => (
                <div key={item.name} className="flex flex-col" style={{ padding: 28 }}>
                    <span className="ct-mono" style={{ fontSize: 12, fontWeight: 500, color: 'var(--muted)', marginBottom: 20 }}>
                        {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 600 }}>{item.name}</h3>
                    <p style={{ margin: '0 0 14px', fontSize: 28, fontWeight: 600, letterSpacing: '-0.8px', color: 'var(--accent)' }}>{item.price}</p>
                    <p className="ct-body" style={{ fontSize: 15 }}>{item.text}</p>
                    {item.features && (
                        <div className="mt-auto pt-6">
                            <BulletList items={item.features} fontSize={14} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
