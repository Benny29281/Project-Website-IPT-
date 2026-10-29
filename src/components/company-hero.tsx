'use client';
import Image from 'next/image';
import {useEffect,useRef,useState} from 'react';
import {ArrowRight,ChevronLeft,ChevronRight,Pause,Play} from 'lucide-react';
import {companyHeroSlides,companyHomeCopy} from '@/lib/company-home-content';
import {landingCopy} from '@/lib/landing-content';
import type {SiteLocale} from '@/lib/locales';

export function CompanyHero({locale}:{locale:SiteLocale}) {
  const [index,setIndex]=useState(0);const [playing,setPlaying]=useState(false);const [visible,setVisible]=useState(true);
  const touch=useRef<{x:number;y:number}|null>(null);const text=landingCopy[locale];const t=companyHomeCopy[locale];const controls=text.slideshow;
  const slide=companyHeroSlides[index];
  const move=(amount:number)=>setIndex(current=>(current+amount+companyHeroSlides.length)%companyHeroSlides.length);
  useEffect(()=>{
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');setPlaying(!reduced.matches);
    const motion=()=>{if(reduced.matches)setPlaying(false)};const visibility=()=>setVisible(document.visibilityState==='visible');visibility();
    reduced.addEventListener('change',motion);document.addEventListener('visibilitychange',visibility);
    return()=>{reduced.removeEventListener('change',motion);document.removeEventListener('visibilitychange',visibility)};
  },[]);
  useEffect(()=>{if(!playing||!visible)return;const timer=setTimeout(()=>setIndex(current=>(current+1)%companyHeroSlides.length),5000);return()=>clearTimeout(timer)},[playing,visible,index]);
  return <section className="company-hero" aria-roledescription="carousel" aria-label={text.eyebrow}
    onFocusCapture={event=>{if(event.target instanceof Element&&event.target.matches(':focus-visible')&&!event.target.closest('.company-hero-play'))setPlaying(false)}}
    onKeyDown={event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();setPlaying(false);move(event.key==='ArrowLeft'?-1:1)}}}
    onTouchStart={event=>{const p=event.touches[0];touch.current={x:p.clientX,y:p.clientY}}}
    onTouchEnd={event=>{const start=touch.current;touch.current=null;if(!start)return;const p=event.changedTouches[0];const dx=p.clientX-start.x;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(p.clientY-start.y)*1.5)move(dx<0?1:-1)}} onTouchCancel={()=>{touch.current=null}}>
    <div className="company-hero-photos" aria-live="off">{companyHeroSlides.map((photo,i)=><div key={photo.id} className={`company-hero-photo ${i===index?'is-active':''}`} aria-hidden={i!==index}><Image src={photo.image} alt={photo.alt[locale]} fill sizes="100vw" priority={i===0} loading={i===0?undefined:'eager'} style={{objectPosition:photo.position}}/></div>)}</div>
    <div className="company-hero-shade"/>
    <div className="container company-hero-content"><p className="company-hero-kicker">{t.network}</p><h1>{text.hero}</h1><p className="company-hero-description">{text.heroText}</p><a className="company-hero-cta" href="#our-business">{t.heroLink}<ArrowRight size={19}/></a></div>
    <div className="container company-hero-controls"><div className="company-hero-progress"><span className="company-hero-count">0{index+1}<small>/ 03</small></span><div className="company-hero-dots" role="group" aria-label={controls.choose}>{companyHeroSlides.map((photo,i)=><button type="button" key={photo.id} aria-label={`${controls.show} ${i+1}: ${photo.title[locale]}`} aria-current={index===i?'true':undefined} onClick={()=>setIndex(i)}><span/></button>)}</div><span className="company-hero-caption" aria-live={playing?'off':'polite'}>{slide.title[locale]}</span></div><div className="company-hero-buttons"><button type="button" aria-label={controls.previous} onClick={()=>move(-1)}><ChevronLeft size={22}/></button><button type="button" className="company-hero-play" aria-label={playing?controls.pause:controls.play} onClick={()=>setPlaying(value=>!value)}>{playing?<Pause size={17}/>:<Play size={17}/>}</button><button type="button" aria-label={controls.next} onClick={()=>move(1)}><ChevronRight size={22}/></button></div></div>
    <span className="company-hero-photo-note">{t.photoNote}</span>
  </section>;
}
