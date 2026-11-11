import { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import CTASection from '@/components/CTASection';
import { NumberedGrid } from '@/components/LandingBlocks';
import { EXPERIENCE_SENTENCE, experience } from '@/lib/experience';
import { SITE_URL } from '@/lib/schema';
import { pageAlternates } from '@/lib/i18n';

export const metadata: Metadata = {
    title: 'O nas | Zespół od audytu i zarządzania e-commerce',
    description: 'CreativeTrust audytuje sklepy internetowe i prowadzi e-commerce marek z zewnątrz. Doświadczenie w zarządzaniu e-commerce 5.10.15 i Quiosque oraz w pracy przy rozwoju Grupy Kapitałowej Monnari. Na rynku od 2010 roku.',
    alternates: pageAlternates('/o-nas', 'pl', SITE_URL),
};

const values = [
    { title: 'Wynik przed zakresem', description: 'Zaczynamy od sprzedaży, marży i czasu zespołu. Technologię i działania dobieramy do tego, co ma się poprawić.' },
    { title: 'Liczby na stole', description: 'Ustalamy cele, priorytety i odpowiedzialność na początku. Raportujemy to, co zmieniło wynik — nie listę wykonanych zadań.' },
    { title: 'Część zespołu klienta', description: 'Pracujemy jak dział e-commerce po Waszej stronie, a nie jak odłączony podwykonawca.' },
];

const milestones = [
    { year: '2010', title: 'Start agencji', description: 'Budowaliśmy pierwsze kampanie i komunikację dla marek, które potrzebowały prostszej ścieżki do klienta.' },
    { year: '2016', title: 'Web & e-commerce', description: 'Dołożyliśmy projektowanie stron i sklepów, żeby kontrolować cały lejek, a nie tylko fragment.' },
    { year: '2024', title: 'SALESmanago partner', description: 'Wzmocniliśmy obszar automatyzacji i pracy z danymi marketingowymi.' },
    { year: '2025', title: 'AI w procesie', description: 'AI wplecione w research, analitykę i development. Krótszy czas od diagnozy do wdrożenia.' },
    { year: '2026', title: 'Audyt i zarządzanie e-commerce', description: 'Do budowy sklepów i stron dochodzą audyt sklepu i prowadzenie e-commerce z zewnątrz — w tym samym zespole.' },
];

const stats = [
    ['15+', 'lat na rynku'],
    ['3', 'ogólnopolskie marki odzieżowe w doświadczeniu zespołu'],
    ['150+', 'zrealizowanych projektów'],
    ['5–7', 'dni roboczych na audyt e-commerce'],
];

export default function AboutPage() {
    return (
        <main style={{ minHeight: '100vh' }}>
            <PageHero
                eyebrow="O NAS"
                title="Zespół, który zna e-commerce od strony zarządzania."
                description="Audytujemy sklepy internetowe i prowadzimy e-commerce marek z zewnątrz. Projektujemy też i budujemy sklepy oraz strony internetowe. Opieramy się na doświadczeniu w budowaniu rosnących marek na polskim rynku."
                cta={{ label: 'Porozmawiajmy', href: '/kontakt' }}
                ctaSecondary={{ label: 'Zobacz usługi', href: '/uslugi' }}
            />

            <section style={{ padding: '0 var(--pad-x)', background: 'var(--panel)', borderBottom: '1px solid var(--line)' }}>
                <div className="mx-auto grid max-w-[1280px] grid-cols-2 md:grid-cols-4">
                    {stats.map(([val, label], i) => (
                        <div
                            key={label}
                            className={`${i % 2 === 1 ? 'border-l' : ''} ${i >= 2 ? 'border-t md:border-t-0' : ''} ${i === 2 ? 'md:border-l' : ''}`}
                            style={{ borderColor: 'var(--line)', padding: 'clamp(24px, 3vw, 36px) clamp(16px, 2vw, 28px)' }}
                        >
                            <div style={{ fontWeight: 500, fontSize: 'clamp(28px, 3vw, 40px)', letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--text)' }}>{val}</div>
                            <div className="ct-meta" style={{ marginTop: 10 }}>{label}</div>
                        </div>
                    ))}
                </div>
            </section>

            <Section
                eyebrow="DOŚWIADCZENIE"
                title="Rosnące marki na polskim rynku."
                description={EXPERIENCE_SENTENCE}
                border={false}
            >
                <NumberedGrid cols={3} numbered={false} items={experience.map((item) => ({ title: item.brand, text: item.text }))} />
            </Section>

            <Section eyebrow="CO NAS PROWADZI" title="Zasady, które trzymają współpracę w ryzach." tint>
                <div className="ct-grid-lines grid-cols-1 md:grid-cols-3" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    {values.map((v, i) => (
                        <div key={v.title} className="flex flex-col gap-3" style={{ padding: 28 }}>
                            <span className="ct-mono" style={{ fontSize: 12, color: 'var(--accent)' }}>0{i + 1}</span>
                            <h3 style={{ fontWeight: 500, fontSize: 18, margin: '12px 0 0', letterSpacing: '-0.3px' }}>{v.title}</h3>
                            <p className="ct-body" style={{ fontSize: 15 }}>{v.description}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section eyebrow="NASZA DROGA" title="Budowaliśmy kompetencje tam, gdzie rósł rynek.">
                <div className="ct-grid-lines grid-cols-1 sm:grid-cols-2 lg:grid-cols-5" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    {milestones.map((m) => (
                        <div key={m.year} className="flex flex-col gap-3" style={{ padding: '24px 22px' }}>
                            <span className="ct-meta" style={{ color: 'var(--accent)' }}>{m.year}</span>
                            <h3 style={{ fontWeight: 500, fontSize: 18, margin: '12px 0 0', letterSpacing: '-0.3px' }}>{m.title}</h3>
                            <p className="ct-body" style={{ fontSize: 15 }}>{m.description}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <CTASection />
        </main>
    );
}
