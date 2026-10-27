import SectionHeader from './SectionHeader';

interface SectionProps {
    id?: string;
    eyebrow?: string;
    title?: React.ReactNode;
    description?: React.ReactNode;
    right?: React.ReactNode;
    tint?: boolean;
    border?: boolean;
    children?: React.ReactNode;
    className?: string;
    maxWidth?: number;
}

/** Standard page section, 1280px container. `tint` is kept for API compatibility: sections separate through whitespace on the Paper canvas, cards carry the Tile Gray. */
export default function Section({ id, eyebrow, title, description, right, tint, border = true, children, className = '', maxWidth = 1280 }: SectionProps) {
    return (
        <section
            id={id}
            className={`ct-section ${className}`}
            data-tint={tint || undefined}
            style={{ borderTop: border ? '1px solid var(--line)' : undefined }}
        >
            <div className="flex flex-col gap-10" style={{ maxWidth, margin: '0 auto' }}>
                {title && <SectionHeader eyebrow={eyebrow} title={title} description={description} right={right} />}
                {children}
            </div>
        </section>
    );
}
