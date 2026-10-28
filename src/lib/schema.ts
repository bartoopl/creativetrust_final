const SITE_URL = 'https://www.creativetrust.pl';

/**
 * The one company description, used verbatim by the Organization JSON-LD,
 * llms.txt and the homepage Markdown twin: models assemble the description of
 * a company from these signals, so they must not disagree.
 */
export const COMPANY_DESCRIPTION =
    'CreativeTrust to AI-native partner produktowy z Gorzowa Wielkopolskiego, działający od 2010 roku. W jednym zespole łączy strategię, design, development i automatyzację AI: projektuje i wdraża strony WWW, sklepy e-commerce (w tym headless), marketing automation (SALESmanago) i social media.';
export const FOUNDING_YEAR = '2010';

/** Legal identity, as published in the privacy policy (operator of the site). */
export const LEGAL_NAME = 'CreativeTrust Natalia Staszak';
/** NIP, digits only. Set it to add `taxID`/`vatID` to the JSON-LD and NIP to the footer. */
export const TAX_ID: string | undefined = undefined;
export const STREET_ADDRESS = 'ul. Kombatantów 34/500';
export const POSTAL_CITY = '66-400 Gorzów Wielkopolski';
const LOGO_URL = `${SITE_URL}/logo.svg`;

type JsonLd = Record<string, unknown>;

export const organizationSchema: JsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: 'CreativeTrust',
            url: SITE_URL,
            legalName: LEGAL_NAME,
            taxID: TAX_ID,
            vatID: TAX_ID ? `PL${TAX_ID}` : undefined,
            foundingDate: FOUNDING_YEAR,
            description: COMPANY_DESCRIPTION,
            logo: {
                '@type': 'ImageObject',
                url: LOGO_URL,
            },
            image: LOGO_URL,
            email: 'office@creativetrust.pl',
            telephone: '+48570526421',
            address: {
                '@type': 'PostalAddress',
                streetAddress: STREET_ADDRESS,
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
            description: COMPANY_DESCRIPTION,
            image: LOGO_URL,
            logo: LOGO_URL,
            parentOrganization: { '@id': `${SITE_URL}/#organization` },
            telephone: '+48570526421',
            email: 'office@creativetrust.pl',
            address: {
                '@type': 'PostalAddress',
                streetAddress: STREET_ADDRESS,
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

export interface PersonInput {
    name: string;
    /** Author slug: `/blog/autor/<slug>` is the person's page. */
    slug?: string;
    jobTitle?: string;
    sameAs?: string[];
    image?: string;
    description?: string;
}

export function personId(slug: string): string {
    return `${SITE_URL}/blog/autor/${slug}#person`;
}

/** Person node (no @context) to embed as an author or a page's main entity. */
export function buildPersonSchema({ name, slug, jobTitle, sameAs, image, description }: PersonInput): JsonLd {
    return {
        '@type': 'Person',
        '@id': slug ? personId(slug) : undefined,
        name,
        url: slug ? `${SITE_URL}/blog/autor/${slug}` : undefined,
        jobTitle,
        description,
        image,
        sameAs: sameAs?.length ? sameAs : undefined,
        worksFor: { '@id': `${SITE_URL}/#organization` },
    };
}

export function buildProfilePageSchema(person: PersonInput & { slug: string }): JsonLd {
    return {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        url: `${SITE_URL}/blog/autor/${person.slug}`,
        inLanguage: 'pl-PL',
        mainEntity: buildPersonSchema(person),
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
    author,
}: {
    title: string;
    description?: string;
    url: string;
    datePublished: string;
    dateModified?: string;
    image?: string;
    authorName?: string;
    /** Full author entity; takes precedence over authorName. */
    author?: PersonInput;
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
        author: author
            ? buildPersonSchema(author)
            : authorName
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

/** A portfolio case study: work CreativeTrust created for a client. */
export function buildCreativeWorkSchema({
    name,
    description,
    url,
    clientName,
    dateCreated,
    image,
    keywords,
    sameAs,
}: {
    name: string;
    description?: string;
    url: string;
    clientName?: string;
    dateCreated?: string;
    image?: string[];
    keywords?: string[];
    /** The live project, when public. */
    sameAs?: string;
}): JsonLd {
    return {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        '@id': `${url}#creativework`,
        name,
        headline: name,
        description: description || undefined,
        url,
        mainEntityOfPage: url,
        dateCreated,
        image: image?.length ? image : undefined,
        keywords: keywords?.length ? keywords.join(', ') : undefined,
        sameAs,
        creator: { '@id': `${SITE_URL}/#organization` },
        publisher: { '@id': `${SITE_URL}/#organization` },
        about: clientName ? { '@type': 'Organization', name: clientName } : undefined,
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
