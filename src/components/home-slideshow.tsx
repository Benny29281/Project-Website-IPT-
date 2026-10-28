'use client';

import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {ArrowRight,ChevronLeft,ChevronRight,Pause,Play} from 'lucide-react';
import type {Locale} from '@/lib/content';
import {homeSlides} from '@/lib/home-slides';

export function HomeSlideshow({locale}: {locale: Locale}) {
  const en=locale==='en';
  const [index,setIndex]=useState(0);
  const [playing,setPlaying]=useState(false);
  const [visible,setVisible]=useState(true);
  const touch=useRef<{x:number;y:number}|null>(null);
  const swiped=useRef(false);
  const slide=homeSlides[index];
  const slideHref=`/${locale}${slide.path || `/products/${slide.slug}`}`;

  useEffect(()=>{
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    setPlaying(!reduced.matches);
    function motionChanged() {if (reduced.matches) setPlaying(false)}
    function visibilityChanged() {setVisible(document.visibilityState==='visible')}
    visibilityChanged();
    reduced.addEventListener('change',motionChanged);
    document.addEventListener('visibilitychange',visibilityChanged);
    return ()=>{reduced.removeEventListener('change',motionChanged);document.removeEventListener('visibilitychange',visibilityChanged)};
  },[]);

  useEffect(()=>{
    if (!playing || !visible) return;
    const timer=window.setTimeout(()=>setIndex(current=>(current+1)%homeSlides.length),5000);
    return ()=>window.clearTimeout(timer);
  },[index,playing,visible]);

  function navigate(next: number) {setIndex((next+homeSlides.length)%homeSlides.length)}

  return <section className="home-slideshow" role="region" aria-roledescription="carousel" aria-label={en ? 'Featured products' : 'Produk unggulan'}
    onFocusCapture={event=>{if (event.target instanceof Element && event.target.matches(':focus-visible') && !event.target.closest('.slide-play')) setPlaying(false)}}
    onKeyDown={event=>{if (event.key==='ArrowLeft' || event.key==='ArrowRight') {event.preventDefault();setPlaying(false);navigate(index+(event.key==='ArrowLeft' ? -1 : 1))}}}>
    <div className="slideshow-viewport"
      onTouchStart={event=>{const finger=event.touches[0];touch.current={x:finger.clientX,y:finger.clientY};swiped.current=false}}
      onTouchEnd={event=>{const start=touch.current;touch.current=null;if (!start) return;const finger=event.changedTouches[0];const dx=finger.clientX-start.x;const dy=finger.clientY-start.y;if (Math.abs(dx)>50 && Math.abs(dx)>Math.abs(dy)*1.5) {swiped.current=true;navigate(index+(dx<0 ? 1 : -1))}}}
      onTouchCancel={()=>{touch.current=null}}
      onClickCapture={event=>{if (swiped.current) {event.preventDefault();swiped.current=false}}}>
      <div className="slideshow-slide" role="group" aria-roledescription="slide" aria-label={`${index+1} ${en ? 'of' : 'dari'} ${homeSlides.length}: ${slide.title}`}>
        <Link href={slideHref} className="slideshow-image-link" aria-label={slide.path ? (en ? `Explore Instax cameras: ${slide.title}` : `Jelajahi kamera Instax: ${slide.title}`) : `${en ? 'View' : 'Lihat'} ${slide.title}`}>
          <Image key={slide.image} src={slide.image} alt={slide.alt[locale]} fill sizes="(max-width: 1600px) 100vw, 1600px" priority={index===0} loading={index===0 ? undefined : 'eager'}/>
        </Link>
      </div>
      <button type="button" className="slide-arrow slide-prev" onClick={()=>navigate(index-1)} aria-label={en ? 'Previous photo' : 'Foto sebelumnya'}><ChevronLeft size={25}/></button>
      <button type="button" className="slide-arrow slide-next" onClick={()=>navigate(index+1)} aria-label={en ? 'Next photo' : 'Foto berikutnya'}><ChevronRight size={25}/></button>
    </div>
    <div className="slideshow-controls">
      <Link href={slideHref} className="slideshow-caption">{slide.title}<ArrowRight size={15}/></Link>
      <div className="slide-dots" role="group" aria-label={en ? 'Select a photo' : 'Pilih foto'}>{homeSlides.map((item,i)=><button key={item.slug} type="button" className={i===index ? 'slide-dot active' : 'slide-dot'} aria-label={`${en ? 'Show photo' : 'Tampilkan foto'} ${i+1}: ${item.title}`} aria-current={i===index ? 'true' : undefined} onClick={()=>navigate(i)}><span/></button>)}</div>
      <button type="button" className="slide-play" aria-label={playing ? (en ? 'Pause slideshow' : 'Jeda slideshow') : (en ? 'Play slideshow' : 'Putar slideshow')} onClick={()=>setPlaying(current=>!current)}>{playing ? <Pause size={17}/> : <Play size={17}/>}</button>
      <span className="slide-count" aria-live={playing ? 'off' : 'polite'} aria-atomic="true">{index+1} / {homeSlides.length}</span>
    </div>
  </section>;
}
