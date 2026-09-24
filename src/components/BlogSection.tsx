import Link from 'next/link';
import { getBlogPosts, urlFor } from '@/lib/sanity';
import SectionHeader from './ui/SectionHeader';
import BlogPostCard from './BlogPostCard';

interface BlogPost {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt?: string;
    mainImage: any;
    publishedAt: string;
}

function formatMonthYear(dateString: string) {
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
                        <BlogPostCard
                            key={post._id}
                            href={`/blog/${post.slug.current}`}
                            title={post.title}
                            image={post.mainImage ? urlFor(post.mainImage).width(800).url() : undefined}
                            meta={`Artykuł · ${formatMonthYear(post.publishedAt)}`}
                            excerpt={post.excerpt}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
