import Eyebrow from './Eyebrow';

interface SectionHeaderProps {
    eyebrow?: string;
    title: React.ReactNode;
    description?: React.ReactNode;
    right?: React.ReactNode;
    as?: 'h1' | 'h2';
    maxWidth?: string;
}

/** Eyebrow + H2 (+ optional lead and right-aligned action) used at the top of every section. */
export default function SectionHeader({ eyebrow, title, description, right, as: Tag = 'h2', maxWidth = '32ch' }: SectionHeaderProps) {
    return (
        <div className="flex flex-wrap items-end justify-between gap-4">
            <div style={{ maxWidth: '100%' }}>
                {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
                <Tag className={Tag === 'h1' ? 'ct-h1' : 'ct-h2'} style={{ maxWidth, marginTop: eyebrow ? 10 : 0 }}>
                    {title}
                </Tag>
                {description && (
                    <p className="ct-lead" style={{ marginTop: 14, maxWidth: '60ch', fontSize: 16 }}>
                        {description}
                    </p>
                )}
            </div>
            {right && <div>{right}</div>}
        </div>
    );
}
