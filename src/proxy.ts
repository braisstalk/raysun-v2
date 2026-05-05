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
