import type { Metadata } from 'next'
import { i18n, isValidLocale, openGraphLocales } from '@/i18n/config'
import type { Locale } from '@/i18n/config'

export const BASE_URL = 'https://www.raysunpharma.com'

export const SITE_NAME = 'Raysun Biopharma'
// Stable URL that resolves to app/opengraph-image.tsx — kept relative so
// Next.js prepends `metadataBase` and bots see an absolute URL.
export const DEFAULT_OG_IMAGE = '/opengraph-image'
export const DEFAULT_OG_IMAGE_WIDTH = 1200
export const DEFAULT_OG_IMAGE_HEIGHT = 630

// Convert any path-like input into a canonical leading-slash, no-trailing-slash form.
// "" or "/" or undefined → "" (so callers can compose `${BASE_URL}/${locale}${path}`
// for the locale home page without producing a stray trailing slash).
export function normalizePath(path?: string | null): string {
  if (!path) return ''
  const trimmed = path.trim()
  if (!trimmed || trimmed === '/') return ''
  const withLeading = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  return withLeading.length > 1 && withLeading.endsWith('/')
    ? withLeading.slice(0, -1)
    : withLeading
}

function resolveLocale(locale: string | undefined): Locale {
  return locale && isValidLocale(locale) ? locale : i18n.defaultLocale
}

export function buildCanonical(locale: string, path: string): string {
  const validLocale = resolveLocale(locale)
  return `${BASE_URL}/${validLocale}${normalizePath(path)}`
}

export function buildOpenGraphUrl(locale: string, path: string): string {
  return buildCanonical(locale, path)
}

// Returns a hreflang map covering every supported locale plus x-default.
// Each entry points at the same logical path under that locale.
export function buildAlternates(path: string): Record<string, string> {
  const norm = normalizePath(path)
  const languages: Record<string, string> = {}
  for (const loc of i18n.locales) {
    languages[loc] = `${BASE_URL}/${loc}${norm}`
  }
  languages['x-default'] = `${BASE_URL}/${i18n.defaultLocale}${norm}`
  return languages
}

export interface BuildPageMetadataOpts {
  locale: string
  path: string
  title?: string
  description?: string
  ogImage?: string
}

// Builds the canonical / hreflang / OpenGraph fields for a specific page.
// Returns a partial Metadata object that callers should return from their
// page or layout `generateMetadata`. Anything not set here (e.g. site-wide
// keywords, robots, twitter card) falls through to the parent layout.
export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  ogImage,
}: BuildPageMetadataOpts): Metadata {
  const validLocale = resolveLocale(locale)
  const canonical = buildCanonical(validLocale, path)
  const alternates = buildAlternates(path)
  const ogLocale = openGraphLocales[validLocale]

  const og = ogImage ?? DEFAULT_OG_IMAGE

  const meta: Metadata = {
    alternates: {
      canonical,
      languages: alternates,
    },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: SITE_NAME,
      locale: ogLocale,
      title: title ?? `${SITE_NAME} - GMP Certified Pharmaceutical Manufacturer`,
      ...(description ? { description } : {}),
      images: [
        {
          url: og,
          width: DEFAULT_OG_IMAGE_WIDTH,
          height: DEFAULT_OG_IMAGE_HEIGHT,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title ?? SITE_NAME,
      ...(description ? { description } : {}),
      images: [og],
    },
  }

  if (title) meta.title = title
  if (description) meta.description = description

  return meta
}
