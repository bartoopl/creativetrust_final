import Image from 'next/image';
import sizes from '@/lib/illustrations.json';

export type IllustrationId = keyof typeof sizes;

/**
 * Static isometric illustration rendered in Blender (blender/illustrations/build.py,
 * `npm run illustrations`). Transparent WebP, so it sits on white and tinted sections alike.
 * Lazy by default; pass `preload` for one shown above the fold.
 */
export default function Illustration({ id, alt, preload = false, className = '' }: { id: IllustrationId; alt: string; preload?: boolean; className?: string }) {
    const { width, height } = sizes[id];
    return (
        <Image
            src={`/illustrations/${id}.webp`}
            alt={alt}
            width={width}
            height={height}
            preload={preload}
            sizes="(min-width: 1024px) 560px, 100vw"
            className={className}
            style={{ display: 'block', width: '100%', height: 'auto' }}
        />
    );
}

/** Body copy beside an illustration: text first on mobile, two columns from lg. */
export function ProseWithIllustration({ children, id, alt, gap = 32 }: { children: React.ReactNode; id: IllustrationId; alt: string; gap?: number }) {
    return (
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div className="flex flex-col" style={{ gap }}>{children}</div>
            <div style={{ maxWidth: 560, width: '100%', justifySelf: 'center' }}>
                <Illustration id={id} alt={alt} />
            </div>
        </div>
    );
}
