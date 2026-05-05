// Content translations for UI strings
import { Locale } from '../config'

export interface ContentTranslations {
  home: {
    hero: {
      title: string
      subtitle: string
      primaryCta: string
      secondaryCta: string
    }
    about: { title: string; description: string }
    capabilities: { title: string }
    products: { title: string; viewAll: string }
    global: { title: string }
    cta: { title: string; subtitle: string }
    manufacturing: { description: string }
  }
  products: {
    categories: Record<string, string>
    searchPlaceholder: string
  }
  news: { readMore: string; latestNews: string }
  resources: { download: string; requestAccess: string; title: string }
}

const th: ContentTranslations = {
  home: {
    hero: {
      title: 'พันธมิตรการผลิตเภสัชภัณฑ์ที่คุณไว้วางใจ',
      subtitle: 'ส่งมอบเภสัชภัณฑ์คุณภาพสูงราคาไม่แพงให้กับชุมชนทั่วโลกจากสิ่งอำนวยความสะดวกที่ได้รับการรับรอง GMP',
      primaryCta: 'สำรวจผลิตภัณฑ์',
      secondaryCta: 'ติดต่อเรา',
    },
    about: { title: 'เกี่ยวกับเรา', description: 'มุ่งมั่นส่งมอบเภสัชภัณฑ์คุณภาพสูงให้กับผู้ป่วยทั่วโลก' },
    capabilities: { title: 'ความสามารถในการผลิต' },
    products: { title: 'ผลิตภัณฑ์ของเรา', viewAll: 'ดูทั้งหมด' },
    global: { title: 'การปรากฏตัวทั่วโลก' },
    cta: { title: 'พร้อมเริ่มต้น?', subtitle: 'ติดต่อเราวันนี้เพื่อหารือเกี่ยวกับความร่วมมือ' },
    manufacturing: { description: 'สิ่งอำนวยความสะดวกการผลิตที่ทันสมัยของเราผลิตผลิตภัณฑ์เภสัชภัณฑ์หลากหลายรูปแบบ' },
  },
  products: {
    categories: {
      antibiotics: 'ยาปฏิชีวนะ',
      analgesics: 'ยาแก้ปวด',
      'anti-inflammatory': 'ยาต้านการอักเสบ',
      cardiovascular: 'ยาหัวใจและหลอดเลือด',
      diabetes: 'ยาเบาหวาน',
      gastrointestinal: 'ยาระบบทางเดินอาหาร',
      respiratory: 'ยาระบบทางเดินหายใจ',
      vitamins: 'วิตามินและอาหารเสริม',
    },
    searchPlaceholder: 'ค้นหาชื่อผลิตภัณฑ์...',
  },
  news: { readMore: 'อ่านเพิ่มเติม', latestNews: 'ข่าวล่าสุด' },
  resources: { download: 'ดาวน์โหลด', requestAccess: 'ขอเข้าถึง', title: 'แหล่งข้อมูล' },
}

const vi: ContentTranslations = {
  home: {
    hero: {
      title: 'Đối tác sản xuất dược phẩm đáng tin cậy',
      subtitle: 'Cung cấp dược phẩm chất lượng cao, giá phải chăng cho cộng đồng trên toàn thế giới',
      primaryCta: 'Khám phá sản phẩm',
      secondaryCta: 'Liên hệ',
    },
    about: { title: 'Về chúng tôi', description: 'Cam kết mang đến dược phẩm chất lượng cao cho bệnh nhân trên toàn thế giới' },
    capabilities: { title: 'Năng lực sản xuất' },
    products: { title: 'Sản phẩm của chúng tôi', viewAll: 'Xem tất cả' },
    global: { title: 'Hiện diện toàn cầu' },
    cta: { title: 'Sẵn sàng bắt đầu?', subtitle: 'Liên hệ với chúng tôi hôm nay để thảo luận về hợp tác' },
    manufacturing: { description: 'Cơ sở sản xuất hiện đại của chúng tôi sản xuất nhiều loại sản phẩm dược phẩm' },
  },
  products: {
    categories: {
      antibiotics: 'Kháng sinh',
      analgesics: 'Giảm đau',
      'anti-inflammatory': 'Kháng viêm',
      cardiovascular: 'Tim mạch',
      diabetes: 'Tiểu đường',
      gastrointestinal: 'Tiêu hóa',
      respiratory: 'Hô hấp',
      vitamins: 'Vitamin & Thực phẩm bổ sung',
    },
    searchPlaceholder: 'Tìm kiếm tên sản phẩm...',
  },
  news: { readMore: 'Đọc thêm', latestNews: 'Tin mới nhất' },
  resources: { download: 'Tải xuống', requestAccess: 'Yêu cầu quyền truy cập', title: 'Tài nguyên' },
}

const ar: ContentTranslations = {
  home: {
    hero: {
      title: 'شريك تصنيع الأدوية الموثوق',
      subtitle: 'تقديم أدوية عالية الجودة بأسعار معقولة للمرضى في جميع أنحاء العالم',
      primaryCta: 'استكشف المنتجات',
      secondaryCta: 'اتصل بنا',
    },
    about: { title: 'من نحن', description: 'نلتزم بتقديم أدوية عالية الجودة للمرضى حول العالم' },
    capabilities: { title: 'قدرات التصنيع' },
    products: { title: 'منتجاتنا', viewAll: 'عرض الكل' },
    global: { title: 'الحضور العالمي' },
    cta: { title: 'مستعد للبدء؟', subtitle: 'اتصل بنا اليوم لمناقشة فرص التعاون' },
    manufacturing: { description: 'تنتج مرافق التصنيع الحديثة لدينا مجموعة واسعة من المنتجات الصيدلانية' },
  },
  products: {
    categories: {
      antibiotics: 'المضادات الحيوية',
      analgesics: 'مسكنات الألم',
      'anti-inflammatory': 'مضادات الالتهاب',
      cardiovascular: 'أمراض القلب',
      diabetes: 'السكري',
      gastrointestinal: 'الجهاز الهضمي',
      respiratory: 'الجهاز التنفسي',
      vitamins: 'الفيتامينات والمكملات',
    },
    searchPlaceholder: 'البحث عن اسم المنتج...',
  },
  news: { readMore: 'اقرأ المزيد', latestNews: 'أحدث الأخبار' },
  resources: { download: 'تحميل', requestAccess: 'طلب الوصول', title: 'الموارد' },
}

const en: ContentTranslations = {
  home: {
    hero: {
      title: 'Your Trusted Pharmaceutical Manufacturing Partner',
      subtitle: 'Delivering high-quality, affordable medicines to communities worldwide from our GMP-certified facility in Laos.',
      primaryCta: 'Explore Products',
      secondaryCta: 'Contact Us',
    },
    about: { title: 'About Us', description: 'Committed to delivering high-quality medicines to patients worldwide' },
    capabilities: { title: 'Our Capabilities' },
    products: { title: 'Our Products', viewAll: 'View All' },
    global: { title: 'Global Presence' },
    cta: { title: 'Ready to Start?', subtitle: 'Contact us today to discuss partnership opportunities' },
    manufacturing: { description: 'Our modern manufacturing facility produces a wide range of pharmaceutical products' },
  },
  products: {
    categories: {
      antibiotics: 'Antibiotics',
      analgesics: 'Analgesics',
      'anti-inflammatory': 'Anti-inflammatory',
      cardiovascular: 'Cardiovascular',
      diabetes: 'Diabetes',
      gastrointestinal: 'Gastrointestinal',
      respiratory: 'Respiratory',
      vitamins: 'Vitamins & Supplements',
    },
    searchPlaceholder: 'Search product name...',
  },
  news: { readMore: 'Read More', latestNews: 'Latest News' },
  resources: { download: 'Download', requestAccess: 'Request Access', title: 'Resources' },
}

const lo: ContentTranslations = th
const es: ContentTranslations = vi
const pt: ContentTranslations = en // Portuguese - placeholder, falls back to English content

export const contentTranslations: Record<Locale, ContentTranslations> = {
  en, th, vi, ar, lo, es, pt,
}

export function getContentTranslation(locale: Locale): ContentTranslations {
  return contentTranslations[locale] || contentTranslations.en
}
