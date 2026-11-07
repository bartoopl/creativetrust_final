import type { Locale } from '@/lib/i18n';
import { pipeline as pipelinePl } from '../Hero';
import { steps as stepsPl } from '../ProcessPipelineSection';
import { reasons as reasonsPl } from '../WhyUsSection';
import { testimonials as testimonialsPl } from '../TestimonialSection';
import { stats as statsPl } from '../StatsSection';

/** Homepage copy per language; the Polish lists stay where the legacy sections define them. */
export const homeCopy = {
    pl: {
        pipeline: pipelinePl,
        steps: stepsPl,
        reasons: reasonsPl,
        testimonials: testimonialsPl,
        stats: statsPl,
        contactHref: '/kontakt',
        portfolioHref: '/portfolio',
        dateLocale: 'pl-PL',
        showcase: {
            eyebrow: 'AI-native partner produktowy',
            title: ['AI skraca research i produkcję. ', 'Zespół', ' pilnuje decyzji, jakości i wyniku.'],
            cta: 'Umów konsultację',
            secondary: 'Zobacz usługi',
            frameLabel: 'Przykładowy przebieg wdrożenia',
            frameTitle: 'creativetrust / wdrożenie',
            frameBadge: '● AI w procesie',
        },
        proof: { label: 'Nasi klienci i liczby', eyebrow: 'Zaufali nam m.in.' },
        services: {
            eyebrow: 'Od projektu do wyniku',
            title: ['Wszystko, czego potrzebujesz, żeby ', 'rosnąć', ' w digital.'],
            details: {
                'strony-www': ['Projekt pod cel biznesowy', 'UX, który konwertuje', 'Next.js i performance'],
                'e-commerce': ['Headless / Medusa.js', 'Migracje bez utraty SEO', 'Integracje ERP, CRM, marketplace'],
                'marketing-automation': ['Wdrożenia SALESmanago', 'Lejki, scoring, segmentacja', 'E-mail, SMS, push'],
                'social-media': ['Strategia i harmonogram', 'Content i kampanie', 'Raportowanie wyników'],
            } as Record<string, string[]>,
        },
        whyUs: {
            eyebrow: 'Dlaczego CreativeTrust',
            title: ['Nie agencja od ładnych rzeczy. ', 'Partner', ', który wdraża szybko.'],
        },
        process: {
            eyebrow: 'Jak działamy',
            title: ['Nasz proces. ', 'AI', ' w każdym kroku.'],
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
            eyebrow: 'Łączymy myślenie biznesowe z prędkością AI',
            title: ['Zacznij budować ', 'digitalnie.', ''],
            lead: 'Senior specjaliści i narzędzia AI — realizujemy projekty szybciej, bez obniżania poprzeczki.',
            cta: 'Umów bezpłatną konsultację',
            secondary: 'Zadaj nam pytanie',
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
            { num: '01', title: 'Brief', description: 'We talk about your business, goals and KPIs.', duration: '1–2 days' },
            { num: '02', title: 'AI strategy', description: 'AI analyses the market and data. We design the plan.', duration: '2–3 days' },
            { num: '03', title: 'Design', description: 'Prototypes and UI/UX in hours, not weeks.', duration: '3–5 days' },
            { num: '04', title: 'AI×3 build', description: 'AI speeds up coding — 3× faster than the usual pace.', duration: '1–4 weeks' },
            { num: '05', title: 'Launch & growth', description: 'Launch, monitoring and optimisation from day one.', duration: 'Ongoing' },
        ],
        reasons: [
            { title: 'We are in business, not just next to it', text: 'Every design decision is a business decision for us, not an aesthetic one.' },
            { title: 'Human judgement + AI speed', text: 'Business experience and delivery accelerated by AI — without losing quality.' },
            { title: 'End-to-end service', text: 'Websites, online stores, marketing automation and social media under one roof.' },
            { title: 'Open source, proven technology', text: 'Medusa.js, Next.js, React. Zero vendor lock-in, full control over the code.' },
        ],
        testimonials: [
            { name: 'Anna', text: 'CreativeTrust doesn’t just do what’s in the brief. They actively suggest what to change to get better results.' },
            { name: 'Marcin', text: 'Our Medusa.js store is faster, looks better and costs us less per month than our previous platform.' },
            { name: 'Karolina', text: 'The marketing automation they implemented cut our lead handling time in half.' },
            { name: 'Tomasz', text: 'Honest and direct — they know what they’re talking about and say it plainly.' },
        ],
        stats: [
            { value: '50+', label: 'Projects delivered' },
            { value: '3×', label: 'Faster with AI in the process' },
            { value: '100%', label: 'Projects with a measurable goal' },
        ],
        contactHref: '/en/contact',
        portfolioHref: '/en/portfolio',
        dateLocale: 'en-GB',
        showcase: {
            eyebrow: 'AI-native product partner',
            title: ['AI shortens research and production. ', 'Our team', ' owns the decisions, the quality and the result.'],
            cta: 'Book a consultation',
            secondary: 'See services',
            frameLabel: 'A sample project timeline',
            frameTitle: 'creativetrust / delivery',
            frameBadge: '● AI in the process',
        },
        proof: { label: 'Our clients and numbers', eyebrow: 'Trusted by, among others' },
        services: {
            eyebrow: 'From project to results',
            title: ['Everything you need to ', 'grow', ' in digital.'],
            details: {
                'strony-www': ['Designed for a business goal', 'UX that converts', 'Next.js and performance'],
                'e-commerce': ['Headless / Medusa.js', 'Migrations without losing SEO', 'ERP, CRM and marketplace integrations'],
                'marketing-automation': ['SALESmanago implementations', 'Funnels, scoring, segmentation', 'E-mail, SMS, push'],
                'social-media': ['Strategy and schedule', 'Content and campaigns', 'Performance reporting'],
            } as Record<string, string[]>,
        },
        whyUs: {
            eyebrow: 'Why CreativeTrust',
            title: ['Not an agency for pretty things. ', 'A partner', ' that ships fast.'],
        },
        process: {
            eyebrow: 'How we work',
            title: ['Our process. ', 'AI', ' in every step.'],
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
            eyebrow: 'Business thinking at the speed of AI',
            title: ['Start building ', 'digitally.', ''],
            lead: 'Senior specialists and AI tools — we deliver projects faster without lowering the bar.',
            cta: 'Book a free consultation',
            secondary: 'Ask us a question',
        },
    },
} satisfies Record<Locale, unknown>;

export type HomeCopy = (typeof homeCopy)[Locale];
