export const metadata = {
    title: 'Admin',
    description: 'Sanity Studio',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="pl">
        <body>{children}</body>
        </html>
    )
}