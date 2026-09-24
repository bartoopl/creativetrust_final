import Link from 'next/link';

interface BlogPostCardProps {
    href: string;
    title: string;
    image?: string;
    meta?: string;
    excerpt?: string;
    footer?: string;
    as?: 'h2' | 'h3' | 'h4';
}

/** Blog listing card — same pattern as the homepage BlogSection / CaseStudyCard. */
export default function BlogPostCard({ href, title, image, meta, excerpt, footer, as: Tag = 'h3' }: BlogPostCardProps) {
    return (
        <Link href={href} className="ct-card-hover flex flex-col overflow-hidden" style={{ border: '1px solid rgba(17,24,39,0.1)', borderRadius: 8, color: 'inherit', background: '#fff' }}>
            <div className={image ? '' : 'ct-placeholder'} style={{ aspectRatio: '16/9', overflow: 'hidden', background: image ? 'var(--panel2)' : undefined, borderBottom: '1px solid var(--line)' }}>
                {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={image} alt={title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <span className="ct-mono" style={{ fontSize: 11, fontWeight: 500, color: 'var(--muted)' }}>BRAK ZDJĘCIA</span>
                )}
            </div>
            <div className="flex flex-1 flex-col gap-2" style={{ padding: 22 }}>
                {meta && <span className="ct-meta" style={{ color: 'var(--accent)' }}>{meta}</span>}
                <Tag style={{ margin: 0, fontSize: 17, fontWeight: 600, lineHeight: 1.3, color: 'var(--text)' }}>{title}</Tag>
                {excerpt && <p className="ct-body line-clamp-3" style={{ fontSize: 13.5 }}>{excerpt}</p>}
                {footer && <span className="ct-meta" style={{ marginTop: 'auto', paddingTop: 10, color: 'var(--muted-2)' }}>{footer}</span>}
            </div>
        </Link>
    );
}
