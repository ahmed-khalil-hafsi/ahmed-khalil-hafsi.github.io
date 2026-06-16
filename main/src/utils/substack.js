import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { parseStringPromise } from 'xml2js';

// Resolve the Substack RSS export that ships in public/ relative to this module,
// so the lookup works regardless of the build's working directory.
const FEED_PATH = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../../public/substack_feed.xml'
);

// Simple in-memory cache so multiple consumers in one build don't re-parse.
let cachedArticles = null;

export async function getSubstackArticles() {
  if (cachedArticles) {
    return cachedArticles;
  }

  try {
    const xml = await readFile(FEED_PATH, 'utf-8');
    const parsed = await parseStringPromise(xml, {
      explicitArray: false,
      trim: true,
    });

    const channel = parsed?.rss?.channel;
    const rawItems = channel?.item ?? [];
    const items = Array.isArray(rawItems) ? rawItems : [rawItems];

    cachedArticles = items
      .map((item) => ({
        title: item.title ?? '',
        excerpt: item.description ?? '',
        url: item.link ?? '',
        date: item.pubDate ? new Date(item.pubDate) : new Date(),
      }))
      // Newest first.
      .sort((a, b) => b.date - a.date);

    return cachedArticles;
  } catch (error) {
    console.error('Error reading Substack feed:', error);
    return []; // Return empty array on error
  }
}
