import Link from 'next/link';
import type { SeoLink } from '@/lib/blog-seo';

export default function BlogServiceLinks({ links }: { links: SeoLink[] }) {
    if (!links.length) {
        return null;
    }

    return (
        <aside className="ct-panel" style={{ margin: '48px 0', padding: 'clamp(22px, 3vw, 32px)', background: 'var(--panel)' }} aria-label="Powiązane usługi">
            <p className="ct-eyebrow" style={{ margin: 0 }}>Powiązane usługi</p>
            <h2 style={{ margin: '10px 0 22px', fontSize: 22, fontWeight: 600, letterSpacing: '-0.5px', lineHeight: 1.25 }}>Chcesz przejść od wiedzy do działania?</h2>
            <div className="grid gap-3 sm:grid-cols-2">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="ct-card-hover flex flex-col gap-1.5"
                        style={{ padding: 20, background: '#fff', border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-md)', color: 'var(--text)' }}
                    >
                        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, lineHeight: 1.3 }}>{link.title}</h3>
                        <p className="ct-body" style={{ fontSize: 13.5 }}>{link.description}</p>
                    </Link>
                ))}
            </div>
        </aside>
    );
}
