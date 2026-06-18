import Image from 'next/image';

interface ClientLogo {
    id: number;
    name: string;
    logo: string;
}

interface ClientLogosProps {
    className?: string;
}

export default function ClientLogos({ className = '' }: ClientLogosProps) {
    const clients: ClientLogo[] = [
        { id: 1, name: 'Monnari', logo: '/logos/client1.png' },
        { id: 2, name: '51015kids', logo: '/logos/client2.png' },
        { id: 3, name: 'Sulphur', logo: '/logos/client3.png' },
        { id: 4, name: 'EB-GABINET', logo: '/logos/client4.svg' },
        { id: 5, name: 'Dr Pazera', logo: '/logos/client5.png' },
        { id: 6, name: 'Kapica Pasterski Partnerzy', logo: '/logos/client6.png' },
        { id: 7, name: 'Quiosque', logo: '/logos/QuiosqueLogo.png' },
    ];

    return (
        <section className="w-full px-6 py-10">
            <div className="mx-auto max-w-[1800px] border-y border-slate-200 py-8">
                <div className="grid gap-8 lg:grid-cols-[0.35fr_0.65fr] lg:items-center">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Zaufali nam
                        </p>
                        <p className="mt-3 max-w-xs text-sm leading-6 text-slate-600">
                            Pracowaliśmy z markami z retailu, usług i e-commerce. Nazwy są różne, ale oczekiwanie zwykle jest jedno:
                            mniej chaosu, więcej wyniku.
                        </p>
                    </div>

                    <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-7 ${className}`}>
                        {clients.map((client) => (
                            <div
                                key={client.id}
                                className="flex h-16 items-center justify-center rounded-[8px] border border-slate-200 bg-white px-4 py-3 grayscale transition-all hover:grayscale-0"
                            >
                                <div className="relative h-10 w-full">
                                    <Image
                                        src={client.logo}
                                        alt={`${client.name} logo`}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
