import Link from 'next/link';
import { getBlogPosts, urlFor } from '@/lib/sanity';

interface BlogPost {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt?: string;
    mainImage: unknown;
    publishedAt: string;
}

const monthYear = (date: string) => {
    const formatted = new Intl.DateTimeFormat('pl-PL', { month: 'long', year: 'numeric' }).format(new Date(date));
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

/** Latest three articles as flat Tile Gray cards under a centered statement. */
export default async function HomeBlog() {
    // Sanity errors are thrown: on hourly revalidation Next keeps the last good
    // homepage instead of caching one without this section.
    const posts: BlogPost[] = (await getBlogPosts()) ?? [];
    if (!posts.length) return null;

    return (
        <section className="ct-section">
            <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-12">
                <div className="flex flex-col items-center gap-3 text-center">
                    <span className="ct-eyebrow">Blog</span>
                    <h2 className="ct-h2 ct-statement">Wiedza, którą <span className="ct-electric">warto</span> mieć.</h2>
                </div>
                <ul className="grid w-full grid-cols-1 gap-1 md:grid-cols-3" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {posts.slice(0, 3).map((post) => (
                        <li key={post._id}>
                            <Link href={`/blog/${post.slug.current}`} className="ct-tile ct-v2-card flex h-full flex-col gap-4" style={{ padding: 12, color: 'inherit' }}>
                                <div className="ct-v2-media" style={{ aspectRatio: '16/9' }}>
                                    {post.mainImage ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={urlFor(post.mainImage).width(800).url()} alt={post.title} loading="lazy" />
                                    ) : null}
                                </div>
                                <div className="flex flex-1 flex-col gap-2" style={{ padding: '4px 12px 16px' }}>
                                    <span style={{ fontSize: 14, color: 'var(--muted-2)' }}>{monthYear(post.publishedAt)}</span>
                                    <h3 style={{ margin: 0, fontSize: 19, fontWeight: 500, lineHeight: 1.3, letterSpacing: '-0.01em' }}>{post.title}</h3>
                                    {post.excerpt && <p className="line-clamp-3" style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: 'var(--muted)' }}>{post.excerpt}</p>}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
                <Link href="/blog" className="ct-ghost">Wszystkie artykuły</Link>
            </div>
        </section>
    );
}
