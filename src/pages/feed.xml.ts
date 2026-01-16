import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const articles = await getCollection('articles');
  const sortedArticles = articles.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  const baseUrl = site?.href || 'https://projexions.com';

  const rssItems = sortedArticles.map((article) => {
    const pubDate = article.data.pubDate.toUTCString();
    const link = `${baseUrl}/articles/${article.slug}`;

    return `
    <item>
      <title><![CDATA[${article.data.title}]]></title>
      <description><![CDATA[${article.data.description}]]></description>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${article.data.category}</category>
    </item>`;
  }).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Projexions Articles</title>
    <description>Articles covering bookkeeping cleanup, tax-season preparation, and financial organization.</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};

