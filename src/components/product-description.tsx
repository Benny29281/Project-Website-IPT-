import Image from 'next/image';
import type {Locale} from '@/lib/content';

export function ProductDescription({slug, locale}: {slug: string; locale: Locale}) {
  if (slug !== 'instax-sq40') return null;
  const en = locale === 'en';
  const features = en ? [
    ['Auto Exposure', 'Automatic exposure adjustment helps you capture bright photos, including in darker settings.'],
    ['Square Format', 'Capture your moments in a square frame with room for creative compositions.'],
    ['Selfie Mode', 'Twist the lens ring to enter selfie mode and use the selfie mirror to frame your shot.'],
  ] : [
    ['Auto Exposure', 'Penyesuaian pencahayaan otomatis membantu menghasilkan foto yang cerah, termasuk di tempat yang lebih gelap.'],
    ['Format Square', 'Abadikan momen dalam bingkai persegi yang memberi ruang untuk komposisi kreatif.'],
    ['Selfie Mode', 'Putar cincin lensa untuk mengaktifkan mode selfie, lalu gunakan cermin selfie untuk mengatur posisi foto.'],
  ];

  return <section className="product-description" aria-labelledby="product-description-heading">
    <h2 id="product-description-heading">{en ? 'Product Description' : 'Deskripsi Produk'}</h2>
    <p>{en ? 'Discover the Instax SQ40: a classic design with automatic exposure, a square photo format, and a dedicated selfie mode.' : 'Kenali Instax SQ40: desain klasik dengan pencahayaan otomatis, format foto persegi, dan mode khusus selfie.'}</p>
    <div className="product-feature-grid">{features.map(([title, description]) => <div key={title}><h3>{title}</h3><p>{description}</p></div>)}</div>
    <Image
      className="product-description-image"
      src="/products/instax-sq40-description.png"
      alt={en ? 'Instax SQ40 feature guide showing the lens, selfie mirror, front body, viewfinder, rear body, Auto Exposure, Square Format, and Selfie Mode.' : 'Panduan fitur Instax SQ40 yang menampilkan lensa, cermin selfie, bagian depan, viewfinder, bagian belakang, Auto Exposure, Format Square, dan Selfie Mode.'}
      width={750}
      height={1242}
      sizes="(max-width: 750px) 100vw, 750px"
    />
  </section>;
}
