import type {SiteLocale as Locale} from '@/lib/locales';
import {detailCopy} from '@/lib/detail-content';
// This is a schematic map: anchor Hong Kong to the southern China coastline
// (the mainland path's 336,188 vertex), rather than the open sea below it.
const hongKong = {x: 336, y: 188};
const activeRoutes=[
  {key:'china',path:'M328 342Q191 210 302 139',delay:'-1s'},
  {key:'korea',path:'M328 342Q445 255 395 162',delay:'-3s'},
  {key:'hongkong',path:`M328 342Q253 268 ${hongKong.x} ${hongKong.y}`,delay:'-4.5s'},
];
// Additional endpoints are schematic, matching the existing illustration.
// These pale routes show potential reach, not established trading markets.
const futureRoutes=[
  {x:232,y:228,path:'M328 342Q158 313 232 228',names:{id:'India',en:'India',zh:'印度',ko:'인도'}},
  {x:279,y:238,path:'M328 342Q215 302 279 238',names:{id:'Thailand',en:'Thailand',zh:'泰国',ko:'태국'}},
  {x:320,y:255,path:'M328 342Q280 288 320 255',names:{id:'Vietnam',en:'Vietnam',zh:'越南',ko:'베트남'}},
  {x:278,y:314,path:'M328 342Q290 353 278 314',names:{id:'Malaysia',en:'Malaysia',zh:'马来西亚',ko:'말레이시아'}},
  {x:291,y:331,path:'M328 342Q300 360 291 331',names:{id:'Singapura',en:'Singapore',zh:'新加坡',ko:'싱가포르'}},
  {x:358,y:254,path:'M328 342Q393 316 358 254',names:{id:'Filipina',en:'Philippines',zh:'菲律宾',ko:'필리핀'}},
  {x:439,y:173,path:'M328 342Q506 291 439 173',names:{id:'Jepang',en:'Japan',zh:'日本',ko:'일본'}},
  {x:485,y:399,path:'M328 342Q419 307 485 399',names:{id:'Australia',en:'Australia',zh:'澳大利亚',ko:'호주'}},
];
const mapLabels={
  id:{active:'Koneksi perdagangan',future:'Potensi jangkauan · Coming soon'},
  en:{active:'Trade connections',future:'Potential reach · Coming soon'},
  zh:{active:'贸易联系',future:'潜在市场 · 敬请期待'},
  ko:{active:'무역 네트워크',future:'잠재 시장 · 준비 중'},
};
export function PacificMap({locale}: {locale: Locale}) {
  const labels=mapLabels[locale];
  return <div className="pacific-map"><svg viewBox="0 0 640 410" role="img" aria-label={detailCopy[locale].map}>
    <defs><pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2477d1" strokeWidth=".5" opacity=".13"/></pattern></defs>
    <rect width="640" height="410" rx="4" fill="#f2f7fc"/><rect width="640" height="410" fill="url(#map-grid)"/>
    <g fill="#dce7f2" stroke="#fff" strokeWidth="1.8"><path d="M25 55 71 40 122 57 162 28 212 44 240 25 310 42 330 29 371 48 402 40 449 66 460 90 434 105 423 128 390 132 378 157 350 170 336 188 302 191 286 213 263 216 249 199 231 211 218 191 198 185 178 156 148 154 132 128 98 140 78 115 48 111 39 85Z"/><path d="m195 183 24 8 12 20 19-12 15 20-10 31-14 8-7 25-14-15-3-29-12-20Z"/><path d="m266 218 19-7 17-19 20 5-7 28 18 15 6 28-11 22-16-7-5-29-19-12Z"/><path d="m393 133 13 13-1 18-13 8-11-12Z"/><path d="m452 137 7 12-8 24-12 7-5 19-16 5-6-10 19-16 7-26Z"/><path d="m353 230 10 12-2 17 11 15-9 6-9-18-7-17Z"/><path d="m309 292 20-10 20 16-5 15-29 2-13-10Z"/><path d="m246 286 16 3 22 29 13 12-9 10-27-26Z"/><path d="m294 337 39 3 25 9-5 9-32-5-24-6Z"/><path d="m361 313 12 1 8 20-11 10-6-13-14 2-4-9Z"/><path d="m393 348 41-5 28 11 23 5-4 18-32-3-20-13-31-2Z"/><path d="m440 393 40-17 55 10 25 24H438Z"/><path d="m494 99 8 6 2 12-9 4-6-10Z"/></g>
    <g className="pacific-future-routes" fill="none" stroke="#9ec9ed" strokeWidth="1.2" strokeDasharray="3 6" opacity=".7">{futureRoutes.map(route=><path key={route.names.en} d={route.path}/>)}</g>
    <g fill="#bed9ef" stroke="#f2f7fc" strokeWidth="1.5">{futureRoutes.map(route=><circle key={route.names.en} cx={route.x} cy={route.y} r="3.5"><title>{`${route.names[locale]} · ${labels.future}`}</title></circle>)}</g>
    <g className="pacific-active-routes" fill="none" stroke="#2477d1" strokeWidth="1.7" strokeDasharray="5 5" opacity=".85">{activeRoutes.map(route=><path key={route.key} d={route.path}/>)}</g>
    <g className="pacific-moving-arrows" aria-hidden="true">{activeRoutes.map(route=><g key={route.key}><path d="M6 0 -4 -4 -1 0 -4 4Z" fill="#2477d1" stroke="#fff" strokeWidth=".7" strokeLinejoin="round"/><animateMotion path={route.path} dur="5s" begin={route.delay} rotate="auto" repeatCount="indefinite"/></g>)}</g>
    <circle className="pacific-origin-pulse" cx="328" cy="342" r="10" fill="none" stroke="#2477d1" strokeWidth="1.2" aria-hidden="true"><animate attributeName="r" values="10;24" dur="2.5s" repeatCount="indefinite"/><animate attributeName="opacity" values=".45;0" dur="2.5s" repeatCount="indefinite"/></circle>
    <g fill="#2477d1"><circle cx="302" cy="139" r="5"/><circle cx="395" cy="162" r="5"/><circle cx={hongKong.x} cy={hongKong.y} r="5"><title>{detailCopy[locale].hongkong}</title></circle><circle cx="328" cy="342" r="7"/></g><circle cx="328" cy="342" r="15" fill="none" stroke="#2477d1" opacity=".3"/>
    <path d={`M${hongKong.x + 6} ${hongKong.y + 3}l10 12`} fill="none" stroke="#1b4f88" strokeWidth="1"/>
    <g fill="#1b4f88" fontFamily="Inter Variable,Inter,Arial,sans-serif" fontSize="12" fontWeight="600"><text x="274" y="124">{detailCopy[locale].china}</text><text x="410" y="164">{detailCopy[locale].korea}</text><text x="343" y="210">{detailCopy[locale].hongkong}</text><text x="275" y="382">{detailCopy[locale].indonesia}</text></g><text x="25" y="385" fontFamily="Inter Variable,Inter,Arial,sans-serif" fill="#738ca8" fontSize="8" letterSpacing="1">{detailCopy[locale].mapCaption}</text>
  </svg><div className="pacific-map-legend"><span><i className="pacific-legend-active"/>{labels.active}</span><span><i className="pacific-legend-future"/>{labels.future}</span></div></div>;
}
