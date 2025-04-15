// First, import all our schema types
import blogPost from './blogPost'
import blogCategory from './blogCategory'
import author from './author'
import portfolioProject from './portfolioProject'
import serviceCategory from './serviceCategory'
import knowledgeBase from './knowledgeBase'
import client from './client';
import invoice from './invoice'

// Then, export the schema array - this is what Sanity Studio uses
export const schemaTypes = [
    // Document types
    blogPost,
    blogCategory,
    author,
    portfolioProject,
    serviceCategory,
    knowledgeBase,
    client,
    invoice,
]