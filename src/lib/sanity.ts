import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: '8mtbrwl1', // Zastąp ID projektu z sanity.json
    dataset: 'production',
    apiVersion: '2023-05-03',
    useCdn: process.env.NODE_ENV === 'production',
});

// Konfiguracja dla obrazów z Sanity
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
    return builder.image(source);
}

// Funkcje do pobierania danych portfolio
export async function getPortfolioProjects() {
    return await client.fetch(`
    *[_type == "portfolioProject"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      client,
      mainImage,
      categories[]->{
        _id,
        title,
        slug
      },
      description,
      publishedAt
    }
  `);
}

export async function getPortfolioProjectsByCategory(categorySlug: string) {
    return await client.fetch(`
    *[_type == "portfolioProject" && references(*[_type == "serviceCategory" && slug.current == $categorySlug]._id)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      client,
      mainImage,
      categories[]->{
        _id,
        title,
        slug
      },
      description,
      publishedAt
    }
  `, { categorySlug });
}

export async function getServiceCategories() {
    return await client.fetch(`
    *[_type == "serviceCategory"] | order(title asc) {
      _id,
      title,
      slug,
      description
    }
  `);
}