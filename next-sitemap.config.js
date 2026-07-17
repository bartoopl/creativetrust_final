/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.creativetrust.pl',
    generateRobotsTxt: true,
    robotsTxtOptions: {
        transformRobotsTxt: async (config, robotsTxt) => {
            return robotsTxt.replace(
                '# Sitemaps',
                '# AI access policy\nContent-Signal: search=yes,ai-input=yes,ai-train=no\n\n# Sitemaps'
            );
        },
    },
    generateIndexSitemap: true,
    exclude: [
        '/admin/*',
        '/login-admin',
        '/logowanie-klienta',
        '/panel-klienta',
        '/panel-klienta/*',
        '/rejestracja-klienta',
        '/uslugi/landing-page-google-ads',
        '/uslugi/landing-page-pod-reklamy'
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
                "slug": slug.current,
                _updatedAt
            }
        `);

        // Pobranie slugów projektów portfolio
        const portfolioProjects = await client.fetch(`
            *[_type == "portfolioProject"] {
                "slug": slug.current,
                _updatedAt
            }
        `);

        // Pobranie kategorii bloga
        const blogCategories = await client.fetch(`
            *[_type == "blogCategory"] {
                "slug": slug.current,
                _updatedAt
            }
        `);

        // Pobranie autorów bloga
        const blogAuthors = await client.fetch(`
            *[_type == "author"] {
                "slug": slug.current,
                _updatedAt
            }
        `);

        // Pobranie wpisów z bazy wiedzy
        const knowledgeBaseEntries = await client.fetch(`
            *[_type == "knowledgeBase"] {
                "slug": slug.current,
                _updatedAt
            }
        `);

        // Tworzenie ścieżek dla wszystkich dynamicznych stron
        const blogPostPaths = blogPosts.map(post => ({
            loc: `/blog/${post.slug}`,
            changefreq: 'weekly',
            priority: 0.8,
            lastmod: post._updatedAt,
        }));

        const portfolioProjectPaths = portfolioProjects.map(project => ({
            loc: `/portfolio/${project.slug}`,
            changefreq: 'monthly',
            priority: 0.7,
            lastmod: project._updatedAt,
        }));

        const blogCategoryPaths = blogCategories.map(category => ({
            loc: `/blog/kategoria/${category.slug}`,
            changefreq: 'weekly',
            priority: 0.6,
            lastmod: category._updatedAt,
        }));

        const blogAuthorPaths = blogAuthors.map(author => ({
            loc: `/blog/autor/${author.slug}`,
            changefreq: 'monthly',
            priority: 0.6,
            lastmod: author._updatedAt,
        }));

        const knowledgeBasePaths = knowledgeBaseEntries.map(entry => ({
            loc: `/baza-wiedzy/${entry.slug}`,
            changefreq: 'monthly',
            priority: 0.7,
            lastmod: entry._updatedAt,
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
