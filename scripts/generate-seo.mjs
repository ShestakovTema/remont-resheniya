import fs from 'fs';
import path from 'path';

const publicDir = path.resolve('public');

// 1. robots.txt
const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://remontresheniya.ru/sitemap.xml`;
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);

// 2. sitemap.xml
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://remontresheniya.ru/</loc>
    <lastmod>2026-08-19</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://remontresheniya.ru/elite/</loc>
    <lastmod>2026-08-19</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://remontresheniya.ru/newbuilding/</loc>
    <lastmod>2026-08-19</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://remontresheniya.ru/secondary/</loc>
    <lastmod>2026-08-19</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>`;
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml);

console.log('SEO files generated successfully.');
