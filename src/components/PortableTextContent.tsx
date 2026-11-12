"use client";

import React from 'react';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/lib/media';
import { canonicalHref } from '@/lib/markdown/portable-text';
import Image from 'next/image';
import Link from 'next/link';

interface PortableTextContentProps {
    content: any;
    /** Smaller type for short blocks such as author bios. */
    compact?: boolean;
}

const headingStyle: React.CSSProperties = { color: 'var(--text)', fontWeight: 500, lineHeight: 1.25 };

const PortableTextContent: React.FC<PortableTextContentProps> = ({ content, compact = false }) => {
    const components = {
        types: {
            image: ({ value }: any) => {
                if (!value?.asset?.url) {
                    return null;
                }
                return (
                    <figure style={{ margin: '40px 0' }}>
                        <div style={{ borderRadius: 12, overflow: 'hidden', background: 'var(--panel)' }}>
                            <Image
                                src={urlFor(value).width(1200).url()}
                                alt={value.alt || 'Obraz w treści'}
                                width={800}
                                height={500}
                                className="object-cover"
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    maxWidth: '100%',
                                    height: 'auto'
                                }}
                            />
                        </div>
                        {value.alt && (
                            <figcaption style={{ marginTop: 10, fontSize: 14, lineHeight: 1.45, color: 'var(--muted-2)' }}>
                                {value.alt}
                            </figcaption>
                        )}
                    </figure>
                );
            },
            code: ({ value }: any) => (
                <pre className="ct-mono" style={{ margin: '0 0 24px', padding: '16px 18px', fontSize: 13, lineHeight: 1.6, color: 'var(--text)', background: 'var(--panel)', borderRadius: 10, overflowX: 'auto' }}>
                    <code>{value?.code}</code>
                </pre>
            ),
        },
        marks: {
            link: ({ children, value }: any) => {
                const rel = value?.blank ? 'noreferrer noopener' : undefined;
                const target = value?.blank ? '_blank' : undefined;
                return (
                    <Link
                        href={canonicalHref(value?.href ?? '')}
                        rel={rel}
                        target={target}
                        style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: 3, textDecorationThickness: 1 }}
                    >
                        {children}
                    </Link>
                );
            },
            strong: ({ children }: any) => (
                <strong style={{ color: 'var(--text)', fontWeight: 500 }}>{children}</strong>
            ),
            code: ({ children }: any) => (
                <code className="ct-mono" style={{ fontSize: '0.88em', color: 'var(--text)', background: 'var(--panel)', borderRadius: 5, padding: '1px 6px' }}>{children}</code>
            ),
        },
        block: {
            h2: ({ children }: any) => (
                <h2 style={{ ...headingStyle, fontSize: 'clamp(24px, 2.6vw, 32px)', letterSpacing: '-0.03em', lineHeight: 1.2, margin: '56px 0 16px', textWrap: 'balance' }}>{children}</h2>
            ),
            h3: ({ children }: any) => (
                <h3 style={{ ...headingStyle, fontSize: 21, letterSpacing: '-0.015em', margin: '40px 0 12px' }}>{children}</h3>
            ),
            h4: ({ children }: any) => (
                <h4 style={{ ...headingStyle, fontSize: 17, margin: '28px 0 10px' }}>{children}</h4>
            ),
            normal: ({ children }: any) => (
                <p style={{ margin: compact ? '0 0 8px' : '0 0 22px' }}>{children}</p>
            ),
            blockquote: ({ children }: any) => (
                <blockquote style={{ margin: '36px 0', padding: '4px 0 4px 22px', borderLeft: '2px solid var(--accent)', fontSize: compact ? 15 : 20, lineHeight: 1.5, letterSpacing: '-0.01em', color: 'var(--text)' }}>
                    {children}
                </blockquote>
            ),
        },
        list: {
            bullet: ({ children }: any) => (
                <ul style={{ margin: '0 0 22px', paddingLeft: 22, listStyle: 'disc' }} className="marker:text-[var(--accent)]">{children}</ul>
            ),
            number: ({ children }: any) => (
                <ol style={{ margin: '0 0 22px', paddingLeft: 22, listStyle: 'decimal' }} className="marker:font-mono marker:text-[13px] marker:text-[var(--muted-2)]">{children}</ol>
            ),
        },
        listItem: {
            bullet: ({ children }: any) => (
                <li style={{ marginBottom: 8, paddingLeft: 4 }}>{children}</li>
            ),
            number: ({ children }: any) => (
                <li style={{ marginBottom: 8, paddingLeft: 4 }}>{children}</li>
            ),
        },
    };

    return (
        <div style={{ fontSize: compact ? 14 : 17, lineHeight: compact ? 1.6 : 1.75, color: compact ? 'var(--muted)' : 'var(--text-2)' }}>
            <PortableText value={content} components={components} />
        </div>
    );
};

export default PortableTextContent;
