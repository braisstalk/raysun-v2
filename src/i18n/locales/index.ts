// Locale translations export
import { en } from './en'
import type { Translations } from './en'
import { lo } from './lo'
import { th } from './th'
import { vi } from './vi'
import { ar } from './ar'
import { es } from './es'
import { pt } from './pt'
import { Locale } from '../config'

// NOTE: typed as `any` to avoid forcing every locale dictionary to perfectly
// mirror the English shape. Type-safe consumers can import `Translations`
// from './en' directly.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const translations: Record<Locale, any> = {
  en,
  lo,
  th,
  vi,
  ar,
  es,
  pt,
}

export { en, lo, th, vi, ar, es, pt }
export type { Translations }
