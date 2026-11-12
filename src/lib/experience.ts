/**
 * Experience the team may name publicly (a selection, see INDUSTRIES). Wording is deliberately tense-neutral
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

/**
 * The brands above are the ones we name, not the only ones: the team's
 * e-commerce experience spans many brands and industries. Copy leads with the
 * breadth and introduces the brands with „m.in.” / "including".
 */
export const INDUSTRIES = ['moda', 'automotive', 'kosmetologia', 'farmacja', 'telefony'] as const;
export const INDUSTRIES_EN = ['fashion', 'automotive', 'cosmetology', 'pharmaceuticals', 'mobile phones'] as const;

/** One sentence for leads and section descriptions. */
export const EXPERIENCE_SENTENCE =
    'Doświadczenie w e-commerce marek z wielu branż — moda, automotive, kosmetologia, farmacja, telefony — m.in. w zarządzaniu e-commerce 5.10.15 i Quiosque oraz w pracy przy rozwoju Grupy Kapitałowej Monnari.';

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
    'E-commerce experience across brands in many industries — fashion, automotive, cosmetology, pharmaceuticals, mobile phones — including managing e-commerce for 5.10.15 and Quiosque and working on the development of the Monnari capital group.';

export const AUDIT_HREF_EN = '/en/services/e-commerce-audit';
export const MANAGEMENT_HREF_EN = '/en/services/e-commerce-management';
export const AUDIT_FORM_HREF_EN = `${AUDIT_HREF_EN}#form`;
