import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: '8mtbrwl1', // Zastąp ID projektu z sanity.json
    dataset: 'production',
    apiVersion: '2023-05-03',
    useCdn: process.env.NODE_ENV === 'production',
    token: process.env.SANITY_TOKEN, // Dodaj token do zapytań (potrzebny do mutacji)
});

// Konfiguracja dla obrazów z Sanity
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
    return builder.image(source);
}

// Dodaj tę funkcję do pliku lib/sanity.ts

// Funkcja do pobierania wszystkich projektów portfolio
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

// Funkcja do pobierania pojedynczego projektu portfolio
export async function getPortfolioProject(slug: string) {
    return await client.fetch(`
    *[_type == "portfolioProject" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      client,
      mainImage,
      galleryImages,
      projectUrl,
      scopeOfWork,
      categories[]->{
        _id,
        title,
        slug
      },
      description,
      publishedAt
    }
  `, { slug });
}

// Funkcja do pobierania projektów portfolio według kategorii
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

// ----- Blog functions -----

// Funkcja pobierająca wszystkie wpisy bloga
export async function getBlogPosts() {
    return await client.fetch(`
    *[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      estimatedReadingTime,
      featured,
      "authorName": author->name,
      "authorImage": author->image,
      "authorSlug": author->slug,
      "categories": categories[]->{ _id, title, slug, color }
    }
  `);
}

// Funkcja pobierająca wyróżnione wpisy bloga
export async function getFeaturedBlogPosts() {
    return await client.fetch(`
    *[_type == "blogPost" && featured == true] | order(publishedAt desc)[0...3] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      estimatedReadingTime,
      "authorName": author->name,
      "authorImage": author->image,
      "authorSlug": author->slug,
      "categories": categories[]->{ _id, title, slug, color }
    }
  `);
}

// Funkcja pobierająca pojedynczy wpis bloga
export async function getBlogPost(slug: string) {
    return await client.fetch(`
    *[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      content,
      publishedAt,
      estimatedReadingTime,
      featured,
      "author": author->{
        name,
        slug,
        image,
        bio,
        role
      },
      "categories": categories[]->{ _id, title, slug, color },
      "relatedPosts": *[_type == "blogPost" && 
                         slug.current != $slug && 
                         count(categories[@._ref in ^.^.categories[]._ref]) > 0] | 
                         order(publishedAt desc)[0...3] {
        _id,
        title,
        slug,
        mainImage,
        publishedAt
      },
      seoTitle,
      seoDescription
    }
  `, { slug });
}

// Funkcja pobierająca wpisy bloga według kategorii
export async function getBlogPostsByCategory(categorySlug: string) {
    return await client.fetch(`
    *[_type == "blogPost" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      estimatedReadingTime,
      "authorName": author->name,
      "authorImage": author->image,
      "authorSlug": author->slug,
      "categories": categories[]->{ _id, title, slug, color }
    }
  `, { categorySlug });
}

// Funkcja pobierająca wszystkie kategorie bloga
export async function getBlogCategories() {
    return await client.fetch(`
    *[_type == "blogCategory"] | order(title asc) {
      _id,
      title,
      slug,
      description,
      color,
      "count": count(*[_type == "blogPost" && references(^._id)])
    }
  `);
}

// Funkcja pobierająca informacje o autorze
export async function getBlogAuthor(slug: string) {
    return await client.fetch(`
    *[_type == "author" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      image,
      bio,
      role,
      socialLinks,
      "posts": *[_type == "blogPost" && author._ref == ^._id] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        mainImage,
        publishedAt,
        estimatedReadingTime
      }
    }
  `, { slug });
}