import {type SiteLocale} from '@/lib/locales';
import {PacificMap} from './pacific-map';
const text={
  id:{label:'Jangkauan Pasar',title:'Membangun koneksi perdagangan\nmelintasi kawasan Pasifik.',body:'Berbasis di Indonesia sebagai pusat sourcing dan ekspor, kami menghubungkan kebutuhan mitra di Hong Kong dan Korea Selatan.',countries:['Indonesia','Hong Kong','Korea Selatan'],roles:['Basis sourcing & ekspor','Koneksi perdagangan','Koneksi perdagangan']},
  en:{label:'Market Reach',title:'Building trade connections\nacross the Pacific region.',body:'Based in Indonesia as our sourcing and export base, we connect with the needs of partners in Hong Kong and South Korea.',countries:['Indonesia','Hong Kong','South Korea'],roles:['Sourcing & export base','Trade connections','Trade connections']},
  zh:{label:'市场覆盖',title:'建立跨越太平洋地区的\n贸易联系。',body:'我们以印度尼西亚为采购与出口基地，对接香港和韩国合作伙伴的需求。',countries:['印度尼西亚','香港','韩国'],roles:['采购与出口基地','贸易联系','贸易联系']},
  ko:{label:'시장 네트워크',title:'태평양 지역을 연결하는\n무역 파트너십.',body:'인도네시아를 소싱 및 수출 거점으로 삼아 홍콩과 한국 파트너의 요구를 연결합니다.',countries:['인도네시아','홍콩','한국'],roles:['소싱 및 수출 거점','무역 네트워크','무역 네트워크']},
};
export function MarketReach({locale}: {locale:SiteLocale}) {
  const t=text[locale];
  return <div className="container market-reach-grid"><div><p className="eyebrow">{t.label}</p><h2>{t.title}</h2><p className="market-reach-description">{t.body}</p></div><PacificMap locale={locale}/></div>;
}
