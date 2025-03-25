"use client";

import React from 'react';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';
import Link from 'next/link';

interface PortableTextContentProps {
    content: any;
}

const PortableTextContent: React.FC<PortableTextContentProps> = ({ content }) => {
    const components = {
        types: {
            image: ({ value }: any) => {
                if (!value?.asset?._ref) {
                    return null;
                }
                return (
                    <div className="my-8 relative">
                        <Image
                            src={urlFor(value).url()}
                            alt={value.alt || 'Obraz w treści'}
                            width={800}
                            height={500}
                            className="rounded-lg object-cover"
                            style={{
                                maxWidth: '100%',
                                height: 'auto'
                            }}
                        />
                        {value.alt && (
                            <div className="mt-2 text-sm text-gray-500 italic">
                                {value.alt}
                            </div>
                        )}
                    </div>
                );
            },
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
                        className="text-blue-600 hover:text-blue-800 underline"
                    >
                        {children}
                    </Link>
                );
            },
        },
        block: {
            h2: ({ children }: any) => (
                <h2 className="text-3xl font-medium mt-12 mb-6">{children}</h2>
            ),
            h3: ({ children }: any) => (
                <h3 className="text-2xl font-medium mt-8 mb-4">{children}</h3>
            ),
            h4: ({ children }: any) => (
                <h4 className="text-xl font-medium mt-6 mb-3">{children}</h4>
            ),
            normal: ({ children }: any) => (
                <p className="mb-6 leading-relaxed">{children}</p>
            ),
        },
        list: {
            bullet: ({ children }: any) => (
                <ul className="mb-6 list-disc pl-6">{children}</ul>
            ),
            number: ({ children }: any) => (
                <ol className="mb-6 list-decimal pl-6">{children}</ol>
            ),
        },
        listItem: {
            bullet: ({ children }: any) => (
                <li className="mb-2">{children}</li>
            ),
            number: ({ children }: any) => (
                <li className="mb-2">{children}</li>
            ),
        },
    };

    return (
        <div className="prose-lg max-w-none">
            <PortableText value={content} components={components} />
        </div>
    );
};

export default PortableTextContent;