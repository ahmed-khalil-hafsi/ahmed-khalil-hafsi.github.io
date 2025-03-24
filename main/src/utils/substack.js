// import fetch from 'node-fetch';
import { parseStringPromise } from 'xml2js';

// Simple in-memory cache
let cachedArticles = null;
let lastFetchTime = null;
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

export async function getSubstackArticles() {
  try {
    // Fetch the static JSON file
    const response = await fetch('/data/substack-articles.json');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.status} ${response.statusText}`);
    }
    
    const articles = await response.json();
    
    // Convert date strings back to Date objects
    return articles.map(article => ({
      ...article,
      date: new Date(article.date)
    }));
  } catch (error) {
    console.error('Error fetching articles:', error);
    return []; // Return empty array on error
  }
} 