'use client';
import {useState} from 'react';
import {ArrowUpRight,CheckCircle2} from 'lucide-react';
import {landingCopy} from '@/lib/landing-content';
import {baseLocale,languageNames,type SiteLocale} from '@/lib/locales';
import {companyInfo} from '@/lib/company-info';
export function LandingContactForm({locale}: {locale:SiteLocale}) {
  const t=landingCopy[locale];const [status,setStatus]=useState<'idle'|'pending'|'success'|'error'>('idle');const [error,setError]=useState('');
  async function submit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();if (status==='pending') return;const form=event.currentTarget;const data=Object.fromEntries(new FormData(form));setStatus('pending');setError('');
    try {const response=await fetch('/api/quote',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...data,locale:baseLocale(locale),message:`Preferred language: ${languageNames[locale]}\n${data.message}`})});
      if (!response.ok) throw new Error(response.status===503 ? t.unavailable : response.status===400 ? t.invalid : t.error);
      setStatus('success');form.reset();
    } catch(err) {setError(err instanceof Error ? err.message : t.error);setStatus('error')}
  }
  if (status==='success') return <div className="landing-form-success" role="status"><CheckCircle2 size={42}/><h3>{t.success}</h3></div>;
  return <form className="landing-contact-form" onSubmit={submit}><div className="form-grid">{['name','company','email','phone'].map((field,i)=><label key={field}>{t.formLabels[i]}{(field==='name'||field==='email') && ' *'}<input name={field} type={field==='email' ? 'email' : field==='phone' ? 'tel' : 'text'} autoComplete={['name','organization','email','tel'][i]} required={field==='name'||field==='email'} maxLength={200}/></label>)}<label className="full-width">{t.formLabels[4]} *<textarea name="message" rows={4} minLength={10} maxLength={4800} required/></label></div><div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div><label className="consent"><input name="consent" type="checkbox" required/><span>{t.consent}</span></label>{error && <p className="form-error" role="alert">{error} <a href={companyInfo.phoneHref}>{companyInfo.phone}</a></p>}<button className="button" type="submit" disabled={status==='pending'}>{status==='pending' ? t.sending : t.send}<ArrowUpRight size={17}/></button></form>;
}
