import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://projexions.net',
  integrations: [sitemap()],
  redirects: {
    '/tax-season-bookkeeping-review': {
      status: 301,
      destination: '/tax-season-bookkeeping-readiness',
    },
    '/privacy': {
      status: 301,
      destination: '/privacy-policy',
    },
    '/terms': {
      status: 301,
      destination: '/terms-of-service',
    },
  },
});

