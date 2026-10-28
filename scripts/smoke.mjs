import assert from 'node:assert/strict';
const base = process.env.TEST_BASE_URL || 'http://localhost:3000';
const routes = ['/id','/en','/id/about','/id/products','/en/products/instax-sq40','/id/services','/id/services/export','/id/news','/en/news/export-preparation','/id/contact?product=instax-sq40','/id/careers','/id/privacy','/id/terms','/sitemap.xml','/robots.txt'];
for (const path of routes) {
  const response = await fetch(`${base}${path}`);
  assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
  const html = await response.text();
  if (path.startsWith('/en')) assert.match(html, /<html[^>]*lang="en"/);
  if (path.startsWith('/id')) assert.match(html, /<html[^>]*lang="id"/);
  console.log(`PASS ${path}`);
}
assert.equal((await fetch(`${base}/id/products/not-a-product`)).status, 404);
const invalid = await fetch(`${base}/api/quote`, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({name:'Preview check', email:'invalid'})});
assert.equal(invalid.status, 400);
console.log('PASS invalid product 404 and inquiry validation 400');
console.log(`${routes.length + 2} checks passed.`);
