// Translation dictionaries
import { Locale } from '../i18n/config'

// Base translations (English)
const en = {
  common: {
    home: 'Home',
    about: 'About Us',
    products: 'Products',
    news: 'News',
    resources: 'Resources',
    contact: 'Contact',
    careers: 'Careers',
    verify: 'Verify',
    orderNow: 'Order Now',
    learnMore: 'Learn More',
    viewAll: 'View All',
    readMore: 'Read More',
    applyNow: 'Apply Now',
    submit: 'Submit',
    send: 'Send',
    cancel: 'Cancel',
    search: 'Search',
    loading: 'Loading...',
    success: 'Success',
    error: 'Error',
    required: 'Required',
    optional: 'Optional',
  },
  nav: {
    whatScienceCanDo: 'What science can do',
    overview: 'Overview',
    storiesOfImpact: 'Stories of impact',
    publications: 'Publications',
    manufacturing: 'Manufacturing',
    rdInnovation: 'R&D Innovation',
    qualityCompliance: 'Quality & Compliance',
  },
  footer: {
    quickLinks: 'Quick Links',
    products: 'Products',
    aboutUs: 'About Us',
    careers: 'Careers',
    contact: 'Contact',
    businessEnquiries: 'Business Enquiries',
    generalEnquiries: 'General Enquiries',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    sitemap: 'Sitemap',
    allRightsReserved: 'All rights reserved',
  },
}

// Placeholder translations for other languages (fallback to English)
const lo: typeof en = en // Lao - placeholder
const th: typeof en = en // Thai - placeholder
const vi: typeof en = en // Vietnamese - placeholder
const ar: typeof en = en // Arabic - placeholder
const es: typeof en = en // Spanish - placeholder
const pt: typeof en = en // Portuguese - placeholder

export const dictionaries: Record<Locale, typeof en> = {
  en,
  lo,
  th,
  vi,
  ar,
  es,
  pt,
}

// Get dictionary for a locale (with fallback to English)
export function getDictionary(locale: Locale): typeof en {
  return dictionaries[locale] || dictionaries.en
}
