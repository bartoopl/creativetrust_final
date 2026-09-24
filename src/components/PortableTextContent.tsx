"use client";

import React from 'react';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';
import Link from 'next/link';

interface PortableTextContentProps {
    content: any;
    /** Smaller type for short blocks such as author bios. */
    compact?: boolean;
}

const headingStyle: React.CSSProperties = { color: 'var(--text)', fontWeight: 600, lineHeight: 1.25 };

const PortableTextContent: React.FC<PortableTextContentProps> = ({ content, compact = false }) => {
    const components = {
        types: {
            image: ({ value }: any) => {
                if (!value?.asset?._ref) {
                    return null;
                }
                return (
                    <figure style={{ margin: '32px 0' }}>
                        <div style={{ border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--panel)' }}>
                            <Image
                                src={urlFor(value).url()}
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
                            <figcaption className="ct-meta" style={{ marginTop: 10, color: 'var(--muted-2)', textTransform: 'none' }}>
                                {value.alt}
                            </figcaption>
                        )}
                    </figure>
                );
            },
            code: ({ value }: any) => (
                <pre className="ct-mono" style={{ margin: '0 0 24px', padding: '16px 18px', fontSize: 13, lineHeight: 1.6, color: 'var(--text)', background: 'var(--panel)', border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-sm)', overflowX: 'auto' }}>
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
                        href={value?.href}
                        rel={rel}
                        target={target}
                        style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: 3, textDecorationThickness: 1 }}
                    >
                        {children}
                    </Link>
                );
            },
            strong: ({ children }: any) => (
                <strong style={{ color: 'var(--text)', fontWeight: 600 }}>{children}</strong>
            ),
            code: ({ children }: any) => (
                <code className="ct-mono" style={{ fontSize: '0.88em', color: 'var(--text)', background: 'var(--panel)', border: '1px solid var(--line-strong)', borderRadius: 4, padding: '1px 5px' }}>{children}</code>
            ),
        },
        block: {
            h2: ({ children }: any) => (
                <h2 style={{ ...headingStyle, fontSize: 'clamp(22px, 2.4vw, 28px)', letterSpacing: '-0.6px', margin: '48px 0 16px' }}>{children}</h2>
            ),
            h3: ({ children }: any) => (
                <h3 style={{ ...headingStyle, fontSize: 20, letterSpacing: '-0.3px', margin: '36px 0 12px' }}>{children}</h3>
            ),
            h4: ({ children }: any) => (
                <h4 style={{ ...headingStyle, fontSize: 17, margin: '28px 0 10px' }}>{children}</h4>
            ),
            normal: ({ children }: any) => (
                <p style={{ margin: compact ? '0 0 8px' : '0 0 20px' }}>{children}</p>
            ),
            blockquote: ({ children }: any) => (
                <blockquote style={{ margin: '28px 0', padding: '16px 20px', borderLeft: '2px solid var(--accent)', background: 'var(--panel)', borderTop: '1px solid var(--line)', borderRight: '1px solid var(--line)', borderBottom: '1px solid var(--line)', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', color: 'var(--text-2)' }}>
                    {children}
                </blockquote>
            ),
        },
        list: {
            bullet: ({ children }: any) => (
                <ul style={{ margin: '0 0 20px', paddingLeft: 22, listStyle: 'square' }} className="marker:text-[var(--accent)]">{children}</ul>
            ),
            number: ({ children }: any) => (
                <ol style={{ margin: '0 0 20px', paddingLeft: 22, listStyle: 'decimal' }} className="marker:font-mono marker:text-[13px] marker:text-[var(--muted-2)]">{children}</ol>
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
        <div style={{ fontSize: compact ? 14 : 16, lineHeight: compact ? 1.6 : 1.7, color: 'var(--muted)' }}>
            <PortableText value={content} components={components} />
        </div>
    );
};

export default PortableTextContent;
