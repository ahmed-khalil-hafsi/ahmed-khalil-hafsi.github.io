// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ahmedhafsi.com',
  integrations: [
    tailwind({
      applyBaseStyles: true,
    }),
    mdx(),
    sitemap({
      filter: (page) => {
        // Exclude any draft pages from the sitemap
        return !page.includes('/drafts/');
      }
    })
  ],
  base: '/',
});
