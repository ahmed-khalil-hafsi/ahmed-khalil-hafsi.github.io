import rss from '@astrojs/rss';
import { getSubstackArticles } from '../utils/substack.js';

export async function get(context) {
  // Get articles using our utility function
  const articles = await getSubstackArticles();
  
  // Format them for the RSS feed
  const items = articles.map(article => ({
    title: article.title,
    pubDate: article.date,
    description: article.excerpt,
    link: article.url,
    customData: `<author>Ahmed K. Hafsi</author>`
  }));

  return rss({
    title: 'Games & Negotiations by Ahmed K. Hafsi',
    description: 'Strategic insights on game theory and negotiation',
    site: context.site,
    items
  });
} 