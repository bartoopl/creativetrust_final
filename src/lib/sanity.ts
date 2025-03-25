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

// Funkcja pobierająca wszystkie wpisy z bazy wiedzy
export async function getKnowledgeBase() {
    return await client.fetch(`
    *[_type == "knowledgeBase"] | order(letter asc, title asc) {
      _id,
      title,
      slug,
      letter,
      shortDescription,
      publishedAt,
      tags
    }
  `);
}

// Funkcja pobierająca wpisy z bazy wiedzy dla konkretnej litery
export async function getKnowledgeBaseByLetter(letter: string) {
    return await client.fetch(`
    *[_type == "knowledgeBase" && letter == $letter] | order(title asc) {
      _id,
      title,
      slug,
      letter,
      shortDescription,
      publishedAt,
      tags
    }
  `, { letter });
}

// Funkcja pobierająca pojedynczy wpis z bazy wiedzy
export async function getKnowledgeBaseEntry(slug: string) {
    return await client.fetch(`
    *[_type == "knowledgeBase" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      letter,
      shortDescription,
      content,
      publishedAt,
      tags,
      seoTitle,
      seoDescription
    }
  `, { slug });
}

// Funkcja pobierająca wszystkie dostępne litery z istniejących wpisów
export async function getKnowledgeBaseLetters() {
    const result = await client.fetch(`
    *[_type == "knowledgeBase"] {
      letter
    } | order(letter asc)
  `);

    // Tworzymy zbiór unikalnych liter i konwertujemy z powrotem do tablicy
    const uniqueLetters = [...new Set(result.map((item: any) => item.letter))];
    return uniqueLetters;
}