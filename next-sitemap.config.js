/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://creativetrust.pl',
    generateRobotsTxt: true,
    generateIndexSitemap: true,
    exclude: [
        '/admin/*',
        '/login-admin',
        '/logowanie-klienta',
        '/panel-klienta/*',
        '/rejestracja-klienta'
    ],
    additionalPaths: async (config) => {
        const { createClient } = require('next-sanity');

        // Inicjalizacja clienta Sanity
        const client = createClient({
            projectId: '8mtbrwl1',
            dataset: 'production',
            apiVersion: '2023-05-03',
            useCdn: true,
        });

        // Pobranie slugów wpisów blogowych
        const blogPosts = await client.fetch(`
            *[_type == "blogPost"] {
                "slug": slug.current
            }
        `);

        // Pobranie slugów projektów portfolio
        const portfolioProjects = await client.fetch(`
            *[_type == "portfolioProject"] {
                "slug": slug.current
            }
        `);

        // Pobranie kategorii bloga
        const blogCategories = await client.fetch(`
            *[_type == "blogCategory"] {
                "slug": slug.current
            }
        `);

        // Pobranie autorów bloga
        const blogAuthors = await client.fetch(`
            *[_type == "author"] {
                "slug": slug.current
            }
        `);

        // Pobranie wpisów z bazy wiedzy
        const knowledgeBaseEntries = await client.fetch(`
            *[_type == "knowledgeBase"] {
                "slug": slug.current
            }
        `);

        // Tworzenie ścieżek dla wszystkich dynamicznych stron
        const blogPostPaths = blogPosts.map(post => ({
            loc: `/blog/${post.slug}`,
            changefreq: 'weekly',
            priority: 0.8,
            lastmod: new Date().toISOString(),
        }));

        const portfolioProjectPaths = portfolioProjects.map(project => ({
            loc: `/portfolio/${project.slug}`,
            changefreq: 'monthly',
            priority: 0.7,
            lastmod: new Date().toISOString(),
        }));

        const blogCategoryPaths = blogCategories.map(category => ({
            loc: `/blog/kategoria/${category.slug}`,
            changefreq: 'weekly',
            priority: 0.6,
            lastmod: new Date().toISOString(),
        }));

        const blogAuthorPaths = blogAuthors.map(author => ({
            loc: `/blog/autor/${author.slug}`,
            changefreq: 'monthly',
            priority: 0.6,
            lastmod: new Date().toISOString(),
        }));

        const knowledgeBasePaths = knowledgeBaseEntries.map(entry => ({
            loc: `/baza-wiedzy/${entry.slug}`,
            changefreq: 'monthly',
            priority: 0.7,
            lastmod: new Date().toISOString(),
        }));

        // Połączenie wszystkich ścieżek
        return [
            ...blogPostPaths,
            ...portfolioProjectPaths,
            ...blogCategoryPaths,
            ...blogAuthorPaths,
            ...knowledgeBasePaths,
        ];
    }
}