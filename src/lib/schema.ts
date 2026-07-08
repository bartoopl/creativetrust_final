const SITE_URL = 'https://www.creativetrust.pl';

type JsonLd = Record<string, unknown>;

export const organizationSchema: JsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: 'CreativeTrust',
            url: SITE_URL,
            foundingDate: '2016',
            description:
                'Agencja marketingowa specjalizująca się w stronach WWW, e-commerce, marketing automation i performance marketingu.',
            email: 'office@creativetrust.pl',
            telephone: '+48570526421',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'ul. Kombatantów 34/500',
                addressLocality: 'Gorzów Wielkopolski',
                postalCode: '66-400',
                addressCountry: 'PL',
            },
            sameAs: [
                'https://www.linkedin.com/company/creativetrust',
                'https://www.facebook.com/creativetrustpl/',
                'https://www.instagram.com/creativetrust_/',
            ],
        },
        {
            '@type': 'LocalBusiness',
            '@id': `${SITE_URL}/#localbusiness`,
            name: 'CreativeTrust',
            url: SITE_URL,
            telephone: '+48570526421',
            email: 'office@creativetrust.pl',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'ul. Kombatantów 34/500',
                addressLocality: 'Gorzów Wielkopolski',
                postalCode: '66-400',
                addressCountry: 'PL',
            },
            geo: {
                '@type': 'GeoCoordinates',
                latitude: 52.7369,
                longitude: 15.2288,
            },
            openingHoursSpecification: [
                {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                    opens: '09:00',
                    closes: '17:00',
                },
            ],
        },
        {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            name: 'CreativeTrust',
            url: SITE_URL,
            inLanguage: 'pl-PL',
            publisher: {
                '@id': `${SITE_URL}/#organization`,
            },
        },
    ],
};

export function buildBreadcrumbSchema(items: Array<{ name: string; url: string }>): JsonLd {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

export function buildServiceSchema({
    name,
    description,
    url,
    serviceType,
    areaServed = 'PL',
}: {
    name: string;
    description: string;
    url: string;
    serviceType: string;
    areaServed?: string;
}): JsonLd {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name,
        description,
        serviceType,
        provider: {
            '@id': `${SITE_URL}/#organization`,
        },
        areaServed,
        url,
    };
}

export function buildFaqSchema(items: Array<{ question: string; answer: string }>): JsonLd {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    };
}

export function buildBlogPostingSchema({
    title,
    description,
    url,
    datePublished,
    dateModified,
    image,
    authorName,
}: {
    title: string;
    description?: string;
    url: string;
    datePublished: string;
    dateModified?: string;
    image?: string;
    authorName?: string;
}): JsonLd {
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description,
        url,
        datePublished,
        dateModified: dateModified || datePublished,
        image,
        author: authorName
            ? {
                  '@type': 'Person',
                  name: authorName,
              }
            : undefined,
        publisher: {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: 'CreativeTrust',
        },
        inLanguage: 'pl-PL',
    };
}

export function buildDefinedTermSchema({
    title,
    description,
    url,
    datePublished,
    tags,
}: {
    title: string;
    description?: string;
    url: string;
    datePublished: string;
    tags?: string[];
}): JsonLd {
    return {
        '@context': 'https://schema.org',
        '@type': 'DefinedTerm',
        name: title,
        description,
        url,
        datePublished,
        inDefinedTermSet: `${SITE_URL}/baza-wiedzy`,
        keywords: tags?.join(', '),
    };
}

export { SITE_URL };
