'use client';
import {useState} from 'react';
import {Camera} from 'lucide-react';
import Image from 'next/image';
import type {SiteLocale} from '@/lib/locales';
const unavailable={id:'Foto segera tersedia',en:'Photo coming soon',zh:'产品图片即将上线',ko:'제품 사진 준비 중'};
export function ProductImage({src, alt, className = '', priority = false,locale='id'}: {src: string; alt: string; className?: string; priority?: boolean;locale?:SiteLocale}) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) return <div className={`product-photo-placeholder ${className}`} role="img" aria-label={alt}><Camera size={42} strokeWidth={1.2}/><span>{alt}</span><small>{unavailable[locale]}</small></div>;
  return <Image className={className} src={src} alt={alt} width={1000} height={1000} sizes={className.includes('detail-photo') ? '(max-width: 620px) 100vw, 600px' : '(max-width: 620px) 50vw, (max-width: 900px) 45vw, 420px'} loading={priority ? 'eager' : 'lazy'} onError={() => setFailed(true)}/>;
}
