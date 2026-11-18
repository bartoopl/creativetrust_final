import RelatedLinks from '@/components/RelatedLinks';
import type { SeoLink } from '@/lib/blog-seo';

/** Blog posts → the service pages that continue them. */
export default function BlogServiceLinks({ links }: { links: SeoLink[] }) {
    return <RelatedLinks links={links} />;
}
