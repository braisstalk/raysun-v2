import { NextRequest, NextResponse } from 'next/server'
import { i18n, isValidLocale } from '@/i18n/config'
import type { Locale } from '@/i18n/config'

// Map of Accept-Language prefixes to our supported locales
const langMap: Record<string, Locale> = {
  en: 'en',
  lo: 'lo',
  th: 'th',
  vi: 'vi',
  ar: 'ar',
  es: 'es',
  pt: 'pt',
  // Common variants
  'es-mx': 'es',
  'es-ar': 'es',
  'es-es': 'es',
  'pt-br': 'pt',
  'pt-pt': 'pt',
  'en-us': 'en',
  'en-gb': 'en',
  'en-au': 'en',
  'ar-sa': 'ar',
  'ar-ae': 'ar',
}

// Locales that used to be served but are no longer part of the active set.
// We respond to /fr, /zh, /fr/..., /zh/..., and zh/fr regional variants with
// 410 Gone instead of redirecting them through the default-locale flow —
// otherwise crawlers would chase /en/fr → 404, /en/zh → 404, etc.
const REMOVED_LOCALES = new Set<string>([
  'fr',
  'zh',
  'zh-cn',
  'zh-tw',
  'zh-hk',
  'fr-ca',
  'fr-be',
])

function getPreferredLocale(request: NextRequest): Locale {
  // 1. Check cookie first
  const cookieLocale = request.cookies.get('locale')?.value
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale
  }

  // 2. Check Accept-Language header
  const acceptLang = request.headers.get('accept-language')
  if (acceptLang) {
    const languages = acceptLang
      .split(',')
      .map(lang => {
        const [code, q] = lang.trim().split(';q=')
        return { code: code.toLowerCase().trim(), quality: q ? parseFloat(q) : 1 }
      })
      .sort((a, b) => b.quality - a.quality)

    for (const { code } of languages) {
      // Try exact match first
      if (langMap[code]) return langMap[code]
      // Try primary language tag
      const primary = code.split('-')[0]
      if (langMap[primary]) return langMap[primary]
    }
  }

  // 3. Default
  return i18n.defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip static files, API routes, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.') // static files like .svg, .png, .css, .js
  ) {
    return NextResponse.next()
  }

  // Check if pathname already has a valid locale prefix
  const segments = pathname.split('/')
  const firstSegment = segments[1] // segments[0] is '' because pathname starts with /

  // Removed locales: respond 410 Gone instead of redirecting into /en/fr etc.
  if (firstSegment && REMOVED_LOCALES.has(firstSegment.toLowerCase())) {
    return new NextResponse(
      'This locale is no longer available. Please choose another language at https://www.raysunpharma.com/en\n',
      {
        status: 410,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
        },
      },
    )
  }

  if (firstSegment && isValidLocale(firstSegment)) {
    // Pathname has valid locale — set cookie and continue
    const response = NextResponse.next()
    response.cookies.set('locale', firstSegment, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    })
    return response
  }

  // No locale in pathname — redirect to preferred locale
  const locale = getPreferredLocale(request)
  const newUrl = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)

  // Preserve query params
  newUrl.search = request.nextUrl.search

  const response = NextResponse.redirect(newUrl)
  response.cookies.set('locale', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })
  return response
}

export const config = {
  // Match all paths except static files and API
  matcher: ['/((?!_next|api|favicon\\.ico|images|.*\\..*).*)'],
}
