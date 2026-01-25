import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site?.href || 'https://projexions.com';
  
  // Static pages
  const staticPages = [
    '',
    '/services',
    '/articles',
    '/store',
    '/about',
    '/contact',
    '/bookkeeping-west-hollywood',
    '/tax-season-bookkeeping-readiness',
    '/sitemap',
    '/privacy-policy',
    '/terms-of-service',
    '/disclaimer',
    '/cookie-policy',
    '/do-not-sell',
  ];

  // Articles
  const articles = await getCollection('articles');
  const articleUrls = articles.map((article) => `/articles/${article.slug}`);

  // Combine all URLs
  const allUrls = [...staticPages, ...articleUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls.map((url) => {
    const fullUrl = `${baseUrl}${url}`;
    // Priority: homepage highest, then main pages, then articles
    let priority = '0.8';
    if (url === '') priority = '1.0';
    else if (staticPages.includes(url)) priority = '0.9';
    else priority = '0.7';
    
    return `  <url>
    <loc>${fullUrl}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};

