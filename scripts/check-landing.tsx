import assert from 'node:assert/strict';
import {Children,isValidElement,type ReactNode} from 'react';
import Home,{generateMetadata} from '../src/app/(frontend)/[locale]/page';
import {Footer} from '../src/components/site';
import {landingCopy,landingSections} from '../src/lib/landing-content';
import {localizedPath,siteLocales} from '../src/lib/locales';
import {companyInfo} from '../src/lib/company-info';
import sitemap from '../src/app/sitemap';
import {NextRequest} from 'next/server';
import {proxy} from '../src/proxy';
import {PacificMap} from '../src/components/pacific-map';
import ContentPage,{generateMetadata as detailMetadata} from '../src/app/(frontend)/[locale]/[...slug]/page';
import {CompanyProfile} from '../src/components/company-profile';
import {ProductDescription} from '../src/components/product-description';
import {products,productCategories,copy,brandCopy,detailCopy,detailTitles} from '../src/lib/detail-content';
import {businessSectors,corporateCopy,policyPaths} from '../src/lib/corporate-content';
import BusinessPage from '../src/app/(frontend)/[locale]/business/[sector]/page';
import {PolicyPlaceholder} from '../src/components/policy-placeholder';
import {CompanyHomeIntro} from '../src/components/company-home-intro';
import {CompanyHero} from '../src/components/company-hero';
import {companyHeroSlides,companyHomeCopy} from '../src/lib/company-home-content';
import {access} from 'node:fs/promises';
import type {SiteLocale} from '../src/lib/locales';

function inspect(root:ReactNode) {
  const tags:string[]=[];const ids:string[]=[];const sources:string[]=[];const formLocales:string[]=[];const links:string[]=[];let heroCount=0;let text='';
  function visit(value:ReactNode) {Children.forEach(value,node=>{
    if (typeof node==='string'||typeof node==='number') {text+=String(node);return}
    if (!isValidElement<{children?:ReactNode;id?:string;src?:string;locale?:string;href?:string}>(node)) return;
    if (typeof node.type==='string') tags.push(node.type);
    if (node.props.id) ids.push(node.props.id);
    if (node.props.src) sources.push(node.props.src);
    if (node.props.locale) formLocales.push(node.props.locale);
    if (node.props.href) links.push(node.props.href);
    if (node.type===CompanyHero) heroCount++;
    if (node.type===CompanyHomeIntro) visit(CompanyHomeIntro({locale:node.props.locale as SiteLocale}));
    visit(node.props.children);
  })}
  visit(root);return {tags,ids,sources,formLocales,links,heroCount,text};
}

for (const locale of siteLocales) {
  const params=Promise.resolve({locale});
  const page=inspect(await Home({params}));
  assert.equal(page.heroCount,1,`${locale}: one company hero carousel`);
  for (const section of landingSections.filter(id=>id!=='products')) assert.ok(page.ids.includes(section),`${locale}: missing ${section}`);
  assert.ok(!page.ids.includes('products'),`${locale}: product section must stay hidden`);
  assert.ok(page.ids.includes('market-reach'),`${locale}: missing market reach`);
  const marketMap=inspect(PacificMap({locale}));
  assert.ok(marketMap.tags.includes('svg') && marketMap.tags.includes('pattern'),`${locale}: market map includes coordinate grid`);
  assert.ok(page.text.includes(companyHomeCopy[locale].aboutHeading),`${locale}: missing translated heading`);
  assert.ok(page.text.includes(companyHomeCopy[locale].business));
  for(const sector of businessSectors) assert.ok(page.links.includes(`/${locale}/business/${sector.slug}`));
  assert.ok(page.formLocales.includes(locale),`${locale}: form and slideshow receive the selected language`);
  assert.ok(page.sources.some(src=>src.includes('google.com/maps/embed')),`${locale}: missing office map`);
  assert.ok(page.text.includes(companyInfo.phone),`${locale}: missing business phone`);
  const footer=inspect(Footer({locale}));
  assert.ok(footer.text.includes(corporateCopy[locale].privacy),`${locale}: missing translated footer`);
  const metadata=await generateMetadata({params});
  assert.ok(metadata.alternates.languages['zh-CN']);assert.ok(metadata.alternates.languages.ko);
  console.log(`PASS ${locale}: page composition, language propagation, footer, map, metadata`);
}
assert.equal(companyHeroSlides.length,3);
assert.deepEqual(companyHeroSlides.map(slide=>slide.id),['sea','air','road']);
for(const slide of companyHeroSlides) {await access(`public${slide.image}`);for(const locale of siteLocales) assert.ok(slide.alt[locale]);}
const urls=sitemap().map(item=>item.url);
assert.ok(urls.some(url=>url.endsWith('/zh')));assert.ok(urls.some(url=>url.endsWith('/ko')));
console.log('PASS sitemap includes Mandarin and Korean landing pages');
for (const locale of siteLocales) {
  for (const path of ['about','products',...products.map(p=>`products/${p.slug}`)]) {
    const response=proxy(new NextRequest(`https://preview.example/${locale}/${path}?category=instax-camera`));
    assert.equal(response.headers.get('location'),null,`${locale}/${path}: must not redirect languages`);
    assert.equal(response.headers.get('x-middleware-request-x-site-locale'),locale);
    const params=Promise.resolve({locale,slug:path.split('/')});
    const page=inspect(await ContentPage({params,searchParams:Promise.resolve({})}));
    assert.ok(page.formLocales.every(value=>value===locale),`${locale}/${path}: all child components use selected language`);
    assert.ok(page.links.filter(link=>link.startsWith('/')).every(link=>link.startsWith(`/${locale}`)),`${locale}/${path}: internal links preserve language`);
    const metadata=await detailMetadata({params,searchParams:Promise.resolve({})});
    assert.ok(metadata.alternates?.languages?.['zh-CN']);assert.ok(metadata.alternates?.languages?.ko);
    assert.ok(urls.some(url=>url.endsWith(`/${locale}/${path}`)),`${locale}/${path}: present in sitemap`);
  }
  const profile=inspect(CompanyProfile({locale}));
  assert.ok(profile.text.includes(brandCopy[locale].profile));
  assert.ok(profile.links.filter(link=>link.startsWith('/')).every(link=>link.startsWith(`/${locale}`)));
  const footer=inspect(Footer({locale}));
  assert.ok(footer.links.includes(`/${locale}/products`));
  assert.ok(footer.links.includes(`/${locale}${policyPaths.compliance}`));assert.ok(footer.links.includes(`/${locale}${policyPaths.privacy}`));
  assert.ok(!footer.links.some(link=>link.includes('nagase')));
  assert.ok(footer.links.includes(`/${locale}/terms`));assert.ok(footer.links.includes(`/${locale}/social-media-policy`));
  assert.ok(footer.links.includes(`mailto:${companyInfo.email}`));assert.ok(footer.links.includes(`https://wa.me/${companyInfo.whatsapp}`));
  for(const sector of businessSectors) {
    const path=`/${locale}/business/${sector.slug}`;
    assert.ok(footer.links.includes(path));
    const response=proxy(new NextRequest(`https://preview.example${path}`));assert.equal(response.headers.get('location'),null);
    const business=inspect(await BusinessPage({params:Promise.resolve({locale,sector:sector.slug})}));
    assert.ok(business.text.includes(sector.title[locale]));
    assert.ok(business.links.every(link=>link.startsWith(`/${locale}`)));
    assert.ok(urls.some(url=>url.endsWith(path)));
  }
  for(const policy of ['compliance','privacy','terms','social'] as const) {
    const response=proxy(new NextRequest(`https://preview.example/${locale}${policyPaths[policy]}`));
    assert.equal(response.headers.get('location'),null);
    const placeholder=inspect(await PolicyPlaceholder({params:Promise.resolve({locale}),policy}));
    assert.equal(placeholder.text,corporateCopy[locale][policy]);
    assert.equal(placeholder.tags.filter(tag=>tag==='h1').length,1);
  }
  assert.ok(inspect(await Home({params:Promise.resolve({locale})})).links.includes(`/${locale}/about`));
  assert.ok(inspect(ProductDescription({slug:'instax-sq40',locale})).text.includes(detailCopy[locale].descriptionTitle));
  assert.ok(copy[locale].productsTitle);assert.ok(detailTitles[locale].about);
  for (const p of products) {assert.ok(p.name[locale]);assert.ok(p.description[locale]);assert.ok(p.categoryName[locale]);}
  for (const category of productCategories) assert.ok(category.label[locale]);
  for (const target of siteLocales) assert.equal(localizedPath(`/${locale}/products/instax-sq40`,target),`/${target}/products/instax-sq40`);
  if (locale==='zh'||locale==='ko') {
    assert.notEqual(brandCopy[locale].profile,brandCopy.en.profile);
    assert.notEqual(copy[locale].productsTitle,copy.en.productsTitle);
    for (const p of products) assert.notEqual(p.description[locale],p.description.en);
  }
  console.log(`PASS ${locale}: profile, catalog and all 8 product details preserve language, links, metadata and translations`);
}
