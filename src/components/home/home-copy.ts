import type { Locale } from '@/lib/i18n';
import { pipeline as pipelinePl } from '../Hero';
import { testimonials as testimonialsPl } from '../TestimonialSection';
import { stats as statsPl } from '../StatsSection';
import { AUDIT_FORM_HREF, AUDIT_FORM_HREF_EN } from '@/lib/experience';

/** Homepage copy per language; the Polish lists stay where the legacy sections define them. */
export const homeCopy = {
    pl: {
        pipeline: pipelinePl,
        steps: [
            { num: '01', title: 'Rozmowa wstępna', description: 'Sprawdzamy, czy audyt ma w Twoim przypadku sens biznesowy. Bez zobowiązań.', duration: '15 minut' },
            { num: '02', title: 'Audyt e-commerce', description: 'Wywiad, analiza danych i zaplecza sklepu. Stała kwota, znana z góry.', duration: '5–7 dni roboczych' },
            { num: '03', title: 'Roadmapa', description: 'Priorytety w kolejności wpływu na zysk i czas zespołu, z wyceną ich realizacji.', duration: 'na koniec audytu' },
            { num: '04', title: 'Zarządzanie i wdrożenia', description: 'Prowadzimy e-commerce z zewnątrz i wdrażamy zmiany. Koszt audytu odliczamy w pierwszym miesiącu.', duration: 'miesięczny abonament' },
        ],
        reasons: [
            { title: 'Znamy e-commerce od strony zarządzania', text: 'Doświadczenie w zarządzaniu e-commerce marek 5.10.15 i Quiosque oraz w pracy przy rozwoju Grupy Kapitałowej Monnari.' },
            { title: 'Liczymy marżę, nie tylko przychód', text: 'Patrzymy na zysk, zwroty, koszty kanałów i czas zespołu — nie na sam ruch i obrót.' },
            { title: 'Doradzamy i budujemy', text: 'Ten sam zespół stawia diagnozę, projektuje i wdraża sklepy oraz strony. Raport nie trafia do szuflady.' },
            { title: 'Nie sprzedajemy platformy', text: 'Open source i sprawdzone technologie: Medusa.js, Next.js, React. Zmianę systemu rekomendujemy tylko wtedy, gdy się opłaca.' },
        ],
        testimonials: testimonialsPl,
        stats: statsPl,
        contactHref: '/kontakt',
        portfolioHref: '/portfolio',
        dateLocale: 'pl-PL',
        showcase: {
            eyebrow: 'Sklepy i strony internetowe',
            title: ['Projektujemy i ', 'budujemy', ' sklepy oraz strony.'],
            lead: 'Od celu biznesowego po start i rozwój — jako osobny projekt albo wykonanie roadmapy z audytu. AI skraca research i produkcję, ludzie pilnują decyzji, jakości i wyniku.' as string | undefined,
            cta: 'Sklepy internetowe',
            ctaHref: '/uslugi/e-commerce' as string | undefined,
            secondary: 'Strony internetowe',
            secondaryHref: '/uslugi/strony-www',
            frameLabel: 'Przykładowy przebieg wdrożenia',
            frameTitle: 'creativetrust / wdrożenie',
            frameBadge: '● AI w procesie',
        },
        proof: { label: 'CreativeTrust w liczbach i klienci', eyebrow: 'Zaufali nam m.in.' },
        services: {
            eyebrow: 'Co robimy',
            title: ['Diagnozujemy, prowadzimy i ', 'budujemy', ' e‑commerce.'],
        },
        whyUs: {
            eyebrow: 'Dlaczego CreativeTrust',
            title: ['Patrzymy na sklep jak ', 'zarząd', ', nie jak wykonawca.'],
        },
        process: {
            eyebrow: 'Jak pracujemy',
            title: ['Małe ryzyko na starcie. ', 'Konkretny plan', ' na dalej.'],
        },
        cases: {
            eyebrow: 'Jak to wygląda w praktyce',
            title: ['Realizacje, które ', 'pracują', ' na wynik.'],
            fallback: 'Realizacja',
            all: 'Wszystkie realizacje',
        },
        voices: { eyebrow: 'Klienci', title: 'Mówią wprost. Tak jak my.' },
        blog: {
            eyebrow: 'Blog',
            title: ['Wiedza, którą ', 'warto', ' mieć.'],
            all: 'Wszystkie artykuły',
        },
        closing: {
            eyebrow: 'Pierwszy krok',
            title: ['Zacznij od ', 'audytu.', ''],
            lead: 'W 5–7 dni roboczych wiesz, gdzie sklep traci sprzedaż, marżę i czas zespołu — i co z tym zrobić w pierwszej kolejności.',
            cta: 'Zamów audyt e-commerce',
            ctaHref: AUDIT_FORM_HREF as string | undefined,
            secondary: 'Umów 15 minut rozmowy',
            secondaryHref: '/kontakt',
        },
    },
    en: {
        pipeline: [
            { num: '01', title: 'Business goal', text: 'KPIs and a measurable result before the first pixel.', status: 'brief', module: 'module_goal' },
            { num: '02', title: 'AI research', text: 'Market, competitors and data — in days, not weeks.', status: 'strategy', module: 'module_research' },
            { num: '03', title: 'Prototype', text: 'UX and UI tested on real scenarios.', status: 'design', module: 'module_prototype' },
            { num: '04', title: 'Build', text: 'Next.js, Medusa.js, automations and integrations.', status: 'development', module: 'module_deploy' },
            { num: '05', title: 'Optimisation', text: 'Monitoring and iterations from launch day.', status: 'growth', module: 'module_optimize' },
        ],
        steps: [
            { num: '01', title: 'Intro call', description: 'We check whether an audit makes business sense in your case. No commitment.', duration: '15 minutes' },
            { num: '02', title: 'E-commerce audit', description: 'Interviews, data analysis and a look behind the scenes of your store. A fixed fee, agreed upfront.', duration: '5–7 working days' },
            { num: '03', title: 'Roadmap', description: 'Priorities ranked by their impact on profit and team time, with a quote for delivering them.', duration: 'at the end of the audit' },
            { num: '04', title: 'Management and delivery', description: 'We run your e-commerce from the outside and deliver the changes. The audit fee is credited in the first month.', duration: 'monthly retainer' },
        ],
        reasons: [
            { title: 'We know e-commerce from the management side', text: 'Experience managing e-commerce for the 5.10.15 and Quiosque brands and working on the development of the Monnari capital group.' },
            { title: 'We count margin, not just revenue', text: 'We look at profit, returns, channel costs and team time — not just traffic and turnover.' },
            { title: 'We advise and we build', text: 'The same team diagnoses, designs and builds stores and websites. The report does not end up in a drawer.' },
            { title: "We don't sell a platform", text: 'Open source and proven technology: Medusa.js, Next.js, React. We recommend changing systems only when it pays off.' },
        ],
        testimonials: [
            { name: 'Anna', text: 'CreativeTrust doesn’t just do what’s in the brief. They actively suggest what to change to get better results.' },
            { name: 'Marcin', text: 'Our Medusa.js store is faster, looks better and costs us less per month than our previous platform.' },
            { name: 'Karolina', text: 'The marketing automation they implemented cut our lead handling time in half.' },
            { name: 'Tomasz', text: 'Honest and direct — they know what they’re talking about and say it plainly.' },
        ],
        stats: [
            { value: '15+', label: 'years in the market' },
            { value: '3', label: 'nationwide Polish fashion brands in the team’s experience' },
            { value: '150+', label: 'projects delivered' },
        ],
        contactHref: '/en/contact',
        portfolioHref: '/en/portfolio',
        dateLocale: 'en-GB',
        showcase: {
            eyebrow: 'Online stores and websites',
            title: ['We design and ', 'build', ' online stores and websites.'],
            lead: 'From the business goal to launch and growth — as a standalone project or as delivery of the audit roadmap. AI shortens research and production; people own the decisions, the quality and the result.',
            cta: 'Online stores',
            ctaHref: '/en/services/e-commerce',
            secondary: 'Websites',
            secondaryHref: '/en/services/websites',
            frameLabel: 'A sample build timeline',
            frameTitle: 'creativetrust / delivery',
            frameBadge: '● AI in the process',
        },
        proof: { label: 'CreativeTrust in numbers and clients', eyebrow: 'Trusted by, among others' },
        services: {
            eyebrow: 'What we do',
            title: ['We diagnose, run and ', 'build', ' e‑commerce.'],
        },
        whyUs: {
            eyebrow: 'Why CreativeTrust',
            title: ['We look at a store like ', 'the board', ', not like a contractor.'],
        },
        process: {
            eyebrow: 'How we work',
            title: ['Low risk at the start. ', 'A concrete plan', ' for what comes next.'],
        },
        cases: {
            eyebrow: 'What it looks like in practice',
            title: ['Projects that ', 'work', ' for results.'],
            fallback: 'Project',
            all: 'All projects',
        },
        voices: { eyebrow: 'Clients', title: 'They speak plainly. Just like us.' },
        blog: {
            eyebrow: 'Blog (in Polish)',
            title: ['Knowledge ', 'worth', ' having.'],
            all: 'All articles',
        },
        closing: {
            eyebrow: 'The first step',
            title: ['Start with ', 'an audit.', ''],
            lead: 'In 5–7 working days you know where your store is losing sales, margin and team time — and what to fix first.',
            cta: 'Order an e-commerce audit',
            ctaHref: AUDIT_FORM_HREF_EN as string | undefined,
            secondary: 'Book a 15-minute call',
            secondaryHref: '/en/contact',
        },
    },
} satisfies Record<Locale, unknown>;

export type HomeCopy = (typeof homeCopy)[Locale];
