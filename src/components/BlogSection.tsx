import Link from 'next/link';
import { getBlogPosts, urlFor } from '@/lib/sanity';
import SectionHeader from './ui/SectionHeader';

interface BlogPost {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt?: string;
    mainImage: any;
    publishedAt: string;
}

export function formatMonthYear(dateString: string) {
    const date = new Date(dateString);
    const formatted = new Intl.DateTimeFormat('pl-PL', { month: 'long', year: 'numeric' }).format(date);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export default async function BlogSection() {
    let posts: BlogPost[] = [];
    try {
        posts = (await getBlogPosts()) ?? [];
    } catch {
        posts = [];
    }

    if (!posts.length) return null;

    return (
        <section className="ct-section" style={{ borderTop: '1px solid var(--line)' }}>
            <div className="mx-auto flex max-w-[1280px] flex-col gap-10">
                <SectionHeader
                    eyebrow="Blog"
                    title="Wiedza, którą warto mieć."
                    right={<Link href="/blog" className="ct-link">Wszystkie artykuły →</Link>}
                />
                <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))' }}>
                    {posts.slice(0, 3).map((post) => (
                        <Link key={post._id} href={`/blog/${post.slug.current}`} className="ct-card-hover flex flex-col overflow-hidden" style={{ border: '1px solid rgba(17,24,39,0.1)', borderRadius: 8, color: 'inherit' }}>
                            <div className={post.mainImage ? '' : 'ct-placeholder'} style={{ height: 180, overflow: 'hidden', borderBottom: '1px solid var(--line)' }}>
                                {post.mainImage && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={urlFor(post.mainImage).width(800).url()} alt={post.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                )}
                            </div>
                            <div className="flex flex-1 flex-col gap-2" style={{ padding: 22 }}>
                                <span className="ct-meta">Artykuł · {formatMonthYear(post.publishedAt)}</span>
                                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600, lineHeight: 1.3 }}>{post.title}</h3>
                                {post.excerpt && <p className="ct-body" style={{ fontSize: 13 }}>{post.excerpt}</p>}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
