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
      config: {
        applyBaseStyles: true,
      },
    }),
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/drafts/')
    })
  ],
  base: '/',
});
