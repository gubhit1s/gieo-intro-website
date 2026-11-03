// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // The live address. Canonical URLs, the sitemap, robots.txt and the social
  // preview tags are all built from this.
  site: 'https://hocvancunggieo.com',
  // Pages are served without a trailing slash (/tai-lieu, not /tai-lieu/),
  // matching every internal link. `format: 'file'` writes tai-lieu.html rather
  // than tai-lieu/index.html, which is what lets Cloudflare Pages serve the
  // slash-less URL directly instead of redirecting to the slashed one.
  trailingSlash: 'never',
  build: { format: 'file' },
  // Static output: every section is pre-rendered to HTML so the page's text
  // content is present before any JavaScript runs. See research.md R-001.
  output: 'static',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '~': new URL('./src', import.meta.url).pathname,
      },
    },
  },
});
