// i18n configuration
export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'lo', 'th', 'vi', 'ar', 'es', 'pt'],
} as const

export type Locale = (typeof i18n)['locales'][number]

// Native language names for language switcher
export const languageNames: Record<Locale, string> = {
  en: 'English',
  lo: 'ລາວ',
  th: 'ไทย',
  vi: 'Tiếng Việt',
  ar: 'العربية',
  es: 'Español',
  pt: 'Português',
}

// English names for reference
export const languageNamesEnglish: Record<Locale, string> = {
  en: 'English',
  lo: 'Lao',
  th: 'Thai',
  vi: 'Vietnamese',
  ar: 'Arabic',
  es: 'Spanish',
  pt: 'Portuguese',
}

// RTL locales
export const rtlLocales: Locale[] = ['ar']

// OpenGraph locale codes (BCP 47-ish region tags) for social cards
export const openGraphLocales: Record<Locale, string> = {
  en: 'en_US',
  lo: 'lo_LA',
  th: 'th_TH',
  vi: 'vi_VN',
  ar: 'ar_AE',
  es: 'es_ES',
  pt: 'pt_PT',
}

// Check if a string is a valid locale
export function isValidLocale(value: string): value is Locale {
  return (i18n.locales as readonly string[]).includes(value)
}
