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
