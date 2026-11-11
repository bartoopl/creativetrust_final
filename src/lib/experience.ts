/**
 * Experience the team may name publicly. Wording is deliberately tense-neutral
 * (noun phrases, no "prowadziliśmy" / "prowadzimy"): the site states the
 * experience, not whether an engagement is past or current. Plain data, no imports.
 */
export interface ExperienceItem {
    brand: string;
    role: string;
    text: string;
}

export const experience: ExperienceItem[] = [
    {
        brand: '5.10.15',
        role: 'Zarządzanie e-commerce',
        text: 'Doświadczenie w zarządzaniu e-commerce ogólnopolskiej marki odzieży dziecięcej.',
    },
    {
        brand: 'Quiosque',
        role: 'Zarządzanie e-commerce',
        text: 'Doświadczenie w zarządzaniu e-commerce ogólnopolskiej marki mody damskiej.',
    },
    {
        brand: 'Monnari',
        role: 'Rozwój grupy kapitałowej',
        text: 'Praca przy rozwoju Grupy Kapitałowej Monnari.',
    },
];

/** One sentence for leads, meta descriptions and Markdown twins. */
export const EXPERIENCE_SENTENCE =
    'Doświadczenie w zarządzaniu e-commerce marek 5.10.15 i Quiosque oraz w pracy przy rozwoju Grupy Kapitałowej Monnari.';

export const AUDIT_HREF = '/uslugi/audyt-e-commerce';
export const MANAGEMENT_HREF = '/uslugi/zarzadzanie-e-commerce';
export const AUDIT_FORM_HREF = `${AUDIT_HREF}#formularz`;

/** English counterparts for the pages under /en; same tense-neutral rule. */
export const experienceEn: ExperienceItem[] = [
    {
        brand: '5.10.15',
        role: 'E-commerce management',
        text: 'Experience managing e-commerce for a nationwide Polish childrenswear brand.',
    },
    {
        brand: 'Quiosque',
        role: 'E-commerce management',
        text: 'Experience managing e-commerce for a nationwide Polish womenswear brand.',
    },
    {
        brand: 'Monnari',
        role: 'Group development',
        text: 'Work on the development of the Monnari capital group.',
    },
];

export const EXPERIENCE_SENTENCE_EN =
    'Experience managing e-commerce for the 5.10.15 and Quiosque brands and working on the development of the Monnari capital group.';

export const AUDIT_HREF_EN = '/en/services/e-commerce-audit';
export const MANAGEMENT_HREF_EN = '/en/services/e-commerce-management';
export const AUDIT_FORM_HREF_EN = `${AUDIT_HREF_EN}#form`;
