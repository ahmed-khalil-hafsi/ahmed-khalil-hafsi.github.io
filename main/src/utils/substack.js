// import fetch from 'node-fetch';
import { parseStringPromise } from 'xml2js';

// Simple in-memory cache
let cachedArticles = null;
let lastFetchTime = null;
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

export async function getSubstackArticles() {
  // Check if we have cached articles that are still fresh
  const now = Date.now();
  if (cachedArticles && lastFetchTime && (now - lastFetchTime < CACHE_DURATION)) {
    return cachedArticles;
  }

  try {
    // Use native fetch instead of node-fetch
    // Add a cache-busting parameter to avoid CORS issues with GitHub Pages caching
    const response = await fetch(`https://negotiations.substack.com/feed?t=${Date.now()}`, {
      headers: {
        'Accept': 'application/rss+xml, application/xml, text/xml',
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status} ${response.statusText}`);
    }
    
    const xml = await response.text();
    
    // Parse the XML
    const result = await parseStringPromise(xml);
    
    if (!result.rss || !result.rss.channel || !result.rss.channel[0].item) {
      throw new Error('Invalid RSS feed format');
    }
    
    // Map to a more usable format
    const articles = result.rss.channel[0].item.map(item => {
      // Extract the first image from the content if available
      const content = item['content:encoded'] ? item['content:encoded'][0] : '';
      const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
      const imageUrl = imgMatch ? imgMatch[1] : null;
      
      // Clean up the description (remove HTML and limit length)
      const rawDescription = item.description ? item.description[0] : '';
      const cleanDescription = rawDescription
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces
        .substring(0, 200) + '...'; // Limit length
      
      return {
        title: item.title ? item.title[0] : 'Untitled Article',
        date: new Date(item.pubDate ? item.pubDate[0] : Date.now()),
        displayDate: new Date(item.pubDate ? item.pubDate[0] : Date.now()).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        excerpt: cleanDescription,
        url: item.link ? item.link[0] : 'https://negotiations.substack.com',
        imageUrl,
        featured: false
      };
    });
    
    // Update cache
    cachedArticles = articles;
    lastFetchTime = now;
    
    return articles;
  } catch (error) {
    console.error('Error fetching Substack articles:', error);
    
    // Return cached articles even if they're expired, or an empty array if none exist
    return cachedArticles || [];
  }
} 