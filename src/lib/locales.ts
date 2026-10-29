import type {Locale} from './content';
export const siteLocales = ['id','en','zh','ko'] as const;
export type SiteLocale = typeof siteLocales[number];
export const languageNames: Record<SiteLocale,string> = {id:'Indonesia',en:'English',zh:'中文',ko:'한국어'};
export function isSiteLocale(value: string): value is SiteLocale {return siteLocales.includes(value as SiteLocale)}
export function baseLocale(value: string): Locale {return value === 'id' ? 'id' : 'en'}
export function localizedPath(pathname:string, locale:string) {
  return `/${locale}${pathname.replace(/^\/(id|en|zh|ko)(?=\/|$)/,'')}`;
}
export function languageAlternates(base: string, path = '') {return Object.fromEntries(siteLocales.map(locale=>[locale === 'zh' ? 'zh-CN' : locale,`${base}/${locale}${path}`]))}
