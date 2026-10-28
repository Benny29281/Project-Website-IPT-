'use client';
import {useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight, CheckCircle2} from 'lucide-react';
import {copy, products, type Locale} from '@/lib/content';

export function QuoteForm({locale, product = ''}: {locale: Locale; product?: string}) {
  const t = copy[locale]; const [state, setState] = useState<'idle' | 'pending' | 'success' | 'error'>('idle'); const [error, setError] = useState('');
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); const form = e.currentTarget; setState('pending');
    try {const response = await fetch('/api/quote', {method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({...Object.fromEntries(new FormData(form)), locale})});
      const data = await response.json(); if (!response.ok) throw new Error(data.error); setState('success'); form.reset();
    } catch (err) {setError(err instanceof Error ? err.message : 'Request failed'); setState('error');}
  }
  if (state === 'success') return <div className="form-success" role="status"><CheckCircle2 size={44}/><h2>{t.success}</h2><button className="button" onClick={() => setState('idle')}>{locale === 'id' ? 'Kirim permintaan lain' : 'Send another request'}</button></div>;
  return <form className="quote-form" onSubmit={submit}><div className="form-grid">{['name','company','email','phone','country'].map((field, i) => <label key={field}>{t.form[i]}{['name','email'].includes(field) && ' *'}<input name={field} type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'} required={['name','email'].includes(field)} maxLength={200} autoComplete={['name','organization','email','tel','country-name'][i]}/></label>)}<label>{t.form[5]}<select name="product" defaultValue={product}><option value="">{locale === 'id' ? 'Pilih produk' : 'Select a product'}</option>{products.map(p => <option key={p.slug} value={p.slug}>{p.name[locale]}</option>)}<option value="other">{locale === 'id' ? 'Lainnya / kemitraan' : 'Other / partnership'}</option></select></label><label>{t.form[6]}<input name="volume" maxLength={100} placeholder={locale === 'id' ? 'Contoh: 5 ton / bulan' : 'e.g. 5 tonnes / month'}/></label><label>{t.form[7]}<input name="destination" maxLength={200}/></label><label>{t.form[8]}<select name="incoterm"><option value="">{locale === 'id' ? 'Diskusikan dengan tim' : 'Discuss with our team'}</option>{['FOB','CIF','CFR','EXW','DAP'].map(x => <option key={x}>{x}</option>)}</select></label><label className="full-width">{t.form[9]} *<textarea name="message" required minLength={10} maxLength={5000} rows={5}/></label></div><div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div><label className="consent"><input type="checkbox" name="consent" required/><span>{t.consent} <Link href={`/${locale}/privacy`}>{t.privacy}</Link></span></label>{state === 'error' && <p className="form-error" role="alert">{error}</p>}<button className="button" disabled={state === 'pending'} type="submit">{state === 'pending' ? t.pending : t.submit}<ArrowUpRight size={17}/></button><p className="content-note">{locale === 'id' ? 'Kolom bertanda * wajib diisi.' : 'Fields marked * are required.'}</p></form>;
}
