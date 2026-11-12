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

/** Blog listing card — the same flat Tile Gray card as the homepage blog section. */
export default function BlogPostCard({ href, title, image, meta, excerpt, footer, as: Tag = 'h3' }: BlogPostCardProps) {
    return (
        <Link href={href} className="ct-tile ct-v2-card flex h-full flex-col gap-4" style={{ padding: 12, color: 'inherit' }}>
            <div className="ct-v2-media" style={{ aspectRatio: '16/9' }}>
                {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={image} alt={title} loading="lazy" />
                ) : null}
            </div>
            <div className="flex flex-1 flex-col gap-2" style={{ padding: '4px 12px 14px' }}>
                {meta && <span style={{ fontSize: 14, color: 'var(--accent)' }}>{meta}</span>}
                <Tag className="ct-card-title" style={{ margin: 0, fontSize: 19, fontWeight: 500, lineHeight: 1.3, letterSpacing: '-0.01em', color: 'var(--text)' }}>{title}</Tag>
                {excerpt && <p className="line-clamp-3" style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: 'var(--muted)' }}>{excerpt}</p>}
                {footer && <span style={{ marginTop: 'auto', paddingTop: 8, fontSize: 14, color: 'var(--muted-2)' }}>{footer}</span>}
            </div>
        </Link>
    );
}
