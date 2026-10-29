import Image from 'next/image';
import type {SiteLocale} from '@/lib/locales';
import {detailCopy} from '@/lib/detail-content';
export function ProductDescription({slug,locale}: {slug:string;locale:SiteLocale}) {
  if (slug !== 'instax-sq40') return null;
  const t=detailCopy[locale];
  return <section className="product-description" aria-labelledby="product-description-heading">
    <h2 id="product-description-heading">{t.descriptionTitle}</h2><p>{t.descriptionIntro}</p>
    <div className="product-feature-grid">{t.features.map(([title,description])=><div key={title}><h3>{title}</h3><p>{description}</p></div>)}</div>
    <Image className="product-description-image" src="/products/instax-sq40-description.png" alt={t.imageAlt} width={750} height={1242} sizes="(max-width: 750px) 100vw, 750px"/>
  </section>;
}
