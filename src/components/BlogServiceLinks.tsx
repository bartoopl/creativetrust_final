import Link from 'next/link';
import type { SeoLink } from '@/lib/blog-seo';

export default function BlogServiceLinks({ links }: { links: SeoLink[] }) {
    if (!links.length) {
        return null;
    }

    return (
        <aside className="my-12 rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8" aria-label="Powiązane usługi">
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-gray-500">Powiązane usługi</p>
            <h2 className="mb-6 text-2xl font-medium">Chcesz przejść od wiedzy do działania?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="rounded-xl border border-gray-200 bg-white p-5 no-underline transition-colors hover:border-gray-400"
                    >
                        <h3 className="mb-2 text-lg font-medium text-black">{link.title}</h3>
                        <p className="m-0 text-sm leading-relaxed text-gray-600">{link.description}</p>
                    </Link>
                ))}
            </div>
        </aside>
    );
}
