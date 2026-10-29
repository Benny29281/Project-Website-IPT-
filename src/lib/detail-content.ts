import {copy as originalCopy, products as originalProducts} from './content';
import {brandCopy as originalBrand, productCategories as originalCategories} from './brand-content';
import {landingCopy} from './landing-content';
import type {SiteLocale} from './locales';

const translations = {
  zh: {
    home:'首页', products:'产品', title:'相机与即时成像胶片', text:'探索适合企业采购和贸易需求的摄影产品。', all:'全部产品', search:'搜索产品…', back:'返回产品列表', quote:'询价', sample:'产品供应、规格和最低订购量以报价确认为准。',
    specs:['采购基地','包装','最低订购量','文件'], specValues:['印度尼西亚','按产品确认','以报价确认为准','按运输要求确认'],
    results:'件产品', empty:'暂无符合条件的产品。', retry:'请尝试其他类别，或联系我们讨论您的需求。', more:'探索更多产品', price:'价格暂未公布', add:'加入购物车', added:'已加入购物车', max:'每件产品最多 99 件',
    categories:['即时成像胶片','Instax 即时成像相机','QuickSnap 一次性相机','显卡'],
    names:['Gigabyte 显卡','Fujifilm QuickSnap','Instax SQ40','Instax Wide 400 黑色','Instax Wide 400 绿色','Instax Mini Pink Lemonade 胶片','Instax Square 黑框胶片','Instax Wide 双包装胶片'],
    descriptions:[
      'Gigabyte 三风扇散热设计显卡。型号、规格及供应情况将在订购前确认。',
      'Fujifilm QuickSnap 一次性胶片相机，配备内置闪光灯，轻松记录生活瞬间。',
      'Fujifilm Instax SQ40 即时成像相机，采用方形照片格式和经典黑色设计。',
      'Fujifilm Instax Wide 400 即时成像相机，适用于宽幅摄影。',
      '绿色 Fujifilm Instax Wide 400 即时成像相机，采用宽幅照片格式。',
      '迷你格式即时成像胶片，搭配 Pink Lemonade 粉色边框。参考产品包装为每盒 10 张。',
      '方形即时成像胶片，搭配黑色边框。参考产品包装为每盒 10 张。',
      '宽幅即时成像胶片双包装，参考产品包装共 20 张。',
    ],
    hero:'连接印度尼西亚优质产品\n与国际市场', discover:'了解更多', who:'关于我们', whoTitle:'立足印度尼西亚\n赋能全球贸易',
    profile:'PT Indonesia Pacific Trade 是一家总部位于印度尼西亚的贸易与出口公司，致力于将优质印尼产品与全球需求相连接。我们专注于消费影像产品的采购与分销，包括 Instax 胶片和相纸、Fujifilm Instax 相机及 Polaroid 相机。我们的重点市场包括中国、韩国和香港，致力于建立可靠、互利且长期的商业伙伴关系。',
    how:'我们的工作方式', howTitle:'顺畅的跨境商业解决方案', howText:'我们协调贸易全流程，支持从采购到交付的顺畅供应链运作。',
    steps:['采购','核实','执行','出口'], stepDescriptions:['通过可靠的印度尼西亚供应渠道寻找并采购优质产品。','协调产品规格、供应情况与商业要求，确保一致性。','以透明、高效的方式管理采购和跨境商业交易。','处理出口准备，并协调货物运往海外目标市场。'],
    core:'核心产品', coreSub:'消费影像与摄影解决方案', market:'市场覆盖', marketTitle:'构建跨越太平洋地区\n的贸易联系', marketText:'以印度尼西亚为主要采购与出口基地，服务充满活力的亚洲消费市场。',
    contact:'联系我们的团队', photo:'协调商业与贸易需求', china:'中国', korea:'韩国', hongkong:'香港', indonesia:'印度尼西亚', map:'印度尼西亚与中国、韩国和香港之间的贸易联系示意图', mapCaption:'贸易网络示意图',
    descriptionTitle:'产品描述', descriptionIntro:'了解 Instax SQ40：经典设计，配备自动曝光、方形照片格式及专用自拍模式。',
    features:[['自动曝光','自动调整曝光，帮助您在较暗环境中也能拍出明亮的照片。'],['方形格式','以方形画幅记录精彩瞬间，为创意构图留出空间。'],['自拍模式','旋转镜头环即可进入自拍模式，并使用自拍镜构图。']], imageAlt:'Instax SQ40 功能指南：镜头、自拍镜、机身、取景器、自动曝光、方形格式与自拍模式。',
  },
  ko: {
    home:'홈', products:'제품', title:'카메라 및 즉석 필름', text:'기업 구매와 무역에 필요한 다양한 사진 제품을 살펴보세요.', all:'전체 제품', search:'제품 검색…', back:'제품 목록으로', quote:'견적 요청', sample:'공급 가능 여부, 사양 및 최소 주문 수량은 견적을 통해 확인합니다.',
    specs:['소싱 거점','포장','최소 주문 수량','서류'], specValues:['인도네시아','제품별 확인','견적 시 확인','배송 요건에 따라 확인'],
    results:'개 제품', empty:'조건에 맞는 제품이 없습니다.', retry:'다른 카테고리를 선택하거나 담당 팀에 문의해 주세요.', more:'다른 제품 살펴보기', price:'가격 미정', add:'장바구니에 담기', added:'장바구니에 담았습니다', max:'제품당 최대 99개',
    categories:['즉석 필름','Instax 즉석 카메라','QuickSnap 일회용 카메라','그래픽 카드'],
    names:['Gigabyte 그래픽 카드','Fujifilm QuickSnap','Instax SQ40','Instax Wide 400 블랙','Instax Wide 400 그린','Instax Mini Pink Lemonade 필름','Instax Square 블랙 프레임 필름','Instax Wide 트윈 팩 필름'],
    descriptions:[
      '트리플 팬 냉각 설계의 Gigabyte 그래픽 카드입니다. 모델, 사양 및 공급 가능 여부는 주문 전에 확인합니다.',
      '플래시가 내장된 Fujifilm QuickSnap 일회용 필름 카메라로 소중한 순간을 간편하게 기록하세요.',
      '정사각형 사진 포맷과 클래식한 블랙 디자인의 Fujifilm Instax SQ40 즉석 카메라입니다.',
      '와이드 포맷 촬영을 위한 Fujifilm Instax Wide 400 즉석 카메라입니다.',
      '와이드 사진 포맷을 지원하는 그린 색상의 Fujifilm Instax Wide 400 즉석 카메라입니다.',
      'Pink Lemonade 프레임의 미니 포맷 즉석 필름입니다. 제품 이미지 기준 10매 구성입니다.',
      '블랙 프레임의 정사각형 즉석 필름입니다. 제품 이미지 기준 10매 구성입니다.',
      '와이드 포맷 즉석 필름 트윈 팩입니다. 제품 이미지 기준 총 20매 구성입니다.',
    ],
    hero:'인도네시아의 우수한 제품을\n국제 시장과 연결합니다', discover:'자세히 보기', who:'회사 소개', whoTitle:'인도네시아에서 시작하는\n글로벌 무역',
    profile:'PT Indonesia Pacific Trade는 인도네시아에 기반을 둔 무역 및 수출 기업으로, 우수한 인도네시아 제품을 세계 시장의 수요와 연결합니다. Instax 필름과 인화지, Fujifilm Instax 카메라, Polaroid 카메라 등 소비자 영상 제품의 소싱과 유통을 전문으로 합니다. 중국, 한국, 홍콩을 주요 시장으로 삼아 신뢰할 수 있고 상호 이익이 되는 장기적인 비즈니스 파트너십을 구축합니다.',
    how:'업무 진행 방식', howTitle:'원활한 국경 간 비즈니스 솔루션', howText:'소싱부터 배송까지 원활한 공급망 운영을 위해 무역 전 과정을 조율합니다.',
    steps:['소싱','검증','실행','수출'], stepDescriptions:['신뢰할 수 있는 인도네시아 공급 채널에서 우수한 제품을 발굴하고 조달합니다.','제품 사양, 공급 가능 여부 및 거래 요건을 조율하여 일관성을 유지합니다.','투명하고 효율적인 방식으로 구매와 국경 간 상거래를 관리합니다.','수출 준비를 진행하고 해외 목적지까지의 배송을 조율합니다.'],
    core:'주요 제품', coreSub:'소비자 영상 및 사진 솔루션', market:'시장 네트워크', marketTitle:'태평양 지역을 잇는\n무역 네트워크', marketText:'인도네시아를 주요 소싱 및 수출 거점으로 삼아 역동적인 아시아 소비 시장과 연결합니다.',
    contact:'담당 팀에 문의하기', photo:'비즈니스 및 무역 요건 조율', china:'중국', korea:'한국', hongkong:'홍콩', indonesia:'인도네시아', map:'인도네시아와 중국, 한국, 홍콩 간의 무역 네트워크 개념도', mapCaption:'무역 네트워크 개념도',
    descriptionTitle:'제품 설명', descriptionIntro:'Instax SQ40의 클래식한 디자인, 자동 노출, 정사각형 사진 포맷 및 전용 셀피 모드를 만나보세요.',
    features:[['자동 노출','자동으로 노출을 조절하여 어두운 환경에서도 밝은 사진을 촬영할 수 있도록 도와줍니다.'],['정사각형 포맷','창의적인 구도를 담을 수 있는 정사각형 프레임으로 소중한 순간을 기록하세요.'],['셀피 모드','렌즈 링을 돌려 셀피 모드로 전환하고 셀피 미러로 구도를 맞추세요.']], imageAlt:'Instax SQ40 기능 안내: 렌즈, 셀피 미러, 본체, 뷰파인더, 자동 노출, 정사각형 포맷 및 셀피 모드.',
  },
};

export const detailCopy = {
  id:{results:'produk ditemukan',empty:'Belum ada produk yang sesuai.',retry:'Coba kategori lain atau hubungi tim kami untuk kebutuhan Anda.',more:'Jelajahi produk lainnya',price:'Harga belum tersedia',add:'Tambah ke Keranjang',added:'Ditambahkan',max:'Maks. 99 per produk',contact:'Hubungi Tim Kami',photo:'Koordinasi kebutuhan bisnis dan perdagangan',china:'Tiongkok',korea:'Korea Selatan',hongkong:'Hong Kong',indonesia:'Indonesia',map:'Ilustrasi koneksi perdagangan dari Indonesia ke Tiongkok, Korea Selatan, dan Hong Kong',mapCaption:'ILUSTRASI JARINGAN PERDAGANGAN',descriptionTitle:'Deskripsi Produk',descriptionIntro:'Kenali Instax SQ40: desain klasik dengan pencahayaan otomatis, format foto persegi, dan mode khusus selfie.',features:[['Auto Exposure','Penyesuaian pencahayaan otomatis membantu menghasilkan foto yang cerah, termasuk di tempat yang lebih gelap.'],['Format Square','Abadikan momen dalam bingkai persegi yang memberi ruang untuk komposisi kreatif.'],['Selfie Mode','Putar cincin lensa untuk mengaktifkan mode selfie, lalu gunakan cermin selfie untuk mengatur posisi foto.']],imageAlt:'Panduan fitur Instax SQ40: lensa, cermin selfie, bagian depan dan belakang, viewfinder, Auto Exposure, Format Square, dan Selfie Mode.'},
  en:{results:'products found',empty:'No matching products yet.',retry:'Try another category or contact our team to discuss your needs.',more:'Explore our products',price:'Price not set yet',add:'Add to Cart',added:'Added to cart',max:'Max. 99 per product',contact:'Contact Our Team',photo:'Coordinating business and trade requirements',china:'China',korea:'South Korea',hongkong:'Hong Kong',indonesia:'Indonesia',map:'Illustration of trade connections from Indonesia to China, South Korea, and Hong Kong',mapCaption:'TRADE NETWORK ILLUSTRATION',descriptionTitle:'Product Description',descriptionIntro:'Discover the Instax SQ40: a classic design with automatic exposure, a square photo format, and a dedicated selfie mode.',features:[['Auto Exposure','Automatic exposure adjustment helps you capture bright photos, including in darker settings.'],['Square Format','Capture your moments in a square frame with room for creative compositions.'],['Selfie Mode','Twist the lens ring to enter selfie mode and use the selfie mirror to frame your shot.']],imageAlt:'Instax SQ40 feature guide showing the lens, selfie mirror, front body, viewfinder, rear body, Auto Exposure, Square Format, and Selfie Mode.'},
  ...translations,
};

function localizedCopy(locale:'zh'|'ko') {
  const t=translations[locale];
  return {...originalCopy.en,nav:[t.home,landingCopy[locale].about,t.products,landingCopy[locale].services,'',landingCopy[locale].contact],productsTitle:t.title,productsText:t.text,productsTag:landingCopy[locale].productsTag,all:t.all,allProducts:t.all,search:t.search,detail:t.discover,back:t.back,quote:t.quote,sample:t.sample,specs:t.specs,specValues:t.specValues};
}
export const copy={...originalCopy,zh:localizedCopy('zh'),ko:localizedCopy('ko')};
function localizedBrand(locale:'zh'|'ko') {
  const t=translations[locale];
  return {...originalBrand.en,hero:t.hero,discover:t.discover,who:t.who,whoTitle:t.whoTitle,profile:t.profile,how:t.how,howTitle:t.howTitle,howText:t.howText,steps:t.steps,descriptions:t.stepDescriptions,core:t.core,coreSub:t.coreSub,market:t.market,marketTitle:t.marketTitle,marketText:t.marketText};
}
export const brandCopy={...originalBrand,zh:localizedBrand('zh'),ko:localizedBrand('ko')};
export const productCategories=originalCategories.map((category,i)=>({...category,label:{...category.label,zh:translations.zh.categories[i],ko:translations.ko.categories[i]}}));
export const products=originalProducts.map((product,i)=>{
  const category=productCategories.find(category=>category.slug===product.category)!;
  return {...product,name:{...product.name,zh:translations.zh.names[i],ko:translations.ko.names[i]},description:{...product.description,zh:translations.zh.descriptions[i],ko:translations.ko.descriptions[i]},categoryName:{...product.categoryName,zh:category.label.zh,ko:category.label.ko}};
});
export const detailTitles:Record<SiteLocale,{about:string;products:string}>={id:{about:'Tentang Kami',products:'Produk Indonesia'},en:{about:'About Us',products:'Indonesian Products'},zh:{about:'公司简介',products:'产品'},ko:{about:'회사 소개',products:'제품'}};
