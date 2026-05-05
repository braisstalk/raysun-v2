import { NextRequest, NextResponse } from 'next/server'
import {
  checkRateLimit,
  getClientIp,
  isAllowedOrigin,
  isBodyWithinLimit,
  validateString,
} from '@/lib/api/guard'
import { i18n, isValidLocale } from '@/i18n/config'
import type { Locale } from '@/i18n/config'

const MAX_BODY_BYTES = 8 * 1024
const MAX_TEXT_LENGTH = 1500
const RATE_LIMIT_WINDOW_MS = 60 * 1000
const RATE_LIMIT_MAX = 30
const CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour
const CACHE_MAX_ENTRIES = 1000

// Set ENABLE_TRANSLATE_API=0 (or leave the env unset and TRANSLATE_API_DEFAULT
// to "off") in environments where you want the route to behave as a no-op
// passthrough. Default is enabled so existing AutoText components keep
// working without extra config.
function isTranslateEnabled(): boolean {
  const flag = process.env.ENABLE_TRANSLATE_API
  if (flag === '0' || flag === 'false') return false
  return true
}

// Map our internal locale codes to Google's expected language codes.
const langMap: Record<Locale, string> = {
  en: 'en',
  lo: 'lo',
  th: 'th',
  vi: 'vi',
  ar: 'ar',
  es: 'es',
  pt: 'pt',
}

interface CacheEntry {
  translated: string
  expiresAt: number
}
const translationCache = new Map<string, CacheEntry>()

function cacheKey(text: string, lang: Locale): string {
  return `${lang}::${text}`
}

function readCache(key: string): string | null {
  const entry = translationCache.get(key)
  if (!entry) return null
  if (entry.expiresAt <= Date.now()) {
    translationCache.delete(key)
    return null
  }
  return entry.translated
}

function writeCache(key: string, translated: string): void {
  if (translationCache.size >= CACHE_MAX_ENTRIES) {
    // Naive LRU-ish: drop the oldest insertion order entry.
    const firstKey = translationCache.keys().next().value
    if (firstKey) translationCache.delete(firstKey)
  }
  translationCache.set(key, { translated, expiresAt: Date.now() + CACHE_TTL_MS })
}

async function callGoogle(text: string, targetLang: Locale): Promise<string> {
  const googleLang = langMap[targetLang] ?? targetLang
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(
    googleLang,
  )}&dt=t&q=${encodeURIComponent(text)}`

  const res = await fetch(url, {
    // Avoid Next.js fetch caching adding stale data on top of our own cache.
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`upstream ${res.status}`)
  }

  const data = (await res.json()) as unknown
  if (!Array.isArray(data) || !Array.isArray(data[0])) return text
  const segments = (data[0] as unknown[])
    .map((item) => (Array.isArray(item) && typeof item[0] === 'string' ? item[0] : ''))
    .join('')
  return segments || text
}

async function translateOnce(
  text: string,
  targetLang: Locale,
): Promise<{ translated: string; cached: boolean }> {
  if (!text || targetLang === 'en') return { translated: text, cached: false }

  const key = cacheKey(text, targetLang)
  const cached = readCache(key)
  if (cached !== null) return { translated: cached, cached: true }

  try {
    const translated = await callGoogle(text, targetLang)
    writeCache(key, translated)
    return { translated, cached: false }
  } catch (err) {
    console.error('[translate] upstream error:', (err as Error)?.message)
    return { translated: text, cached: false }
  }
}

function genericError(message: string, status: number) {
  return NextResponse.json({ error: message, translated: '' }, { status })
}

function rateLimit(request: NextRequest) {
  const ip = getClientIp(request)
  return checkRateLimit(ip, {
    key: 'translate',
    windowMs: RATE_LIMIT_WINDOW_MS,
    max: RATE_LIMIT_MAX,
  })
}

function tooManyResponse(resetAt: number) {
  return NextResponse.json(
    { error: 'too many requests', translated: '' },
    {
      status: 429,
      headers: {
        'Retry-After': Math.max(1, Math.ceil((resetAt - Date.now()) / 1000)).toString(),
      },
    },
  )
}

// GET: handy for sanity checks via /api/translate?text=hello&lang=pt
export async function GET(request: NextRequest) {
  if (!isAllowedOrigin(request.headers.get('origin'))) {
    return genericError('forbidden', 403)
  }

  const limit = rateLimit(request)
  if (!limit.ok) return tooManyResponse(limit.resetAt)

  const text = request.nextUrl.searchParams.get('text') || ''
  const lang = request.nextUrl.searchParams.get('lang') || i18n.defaultLocale

  if (!text) {
    return NextResponse.json({
      status: 'ok',
      message: `Translate API is running. Use ?text=hello&lang=${i18n.defaultLocale} to test.`,
      enabled: isTranslateEnabled(),
    })
  }

  if (text.length > MAX_TEXT_LENGTH) {
    return genericError('text too long', 400)
  }
  if (!isValidLocale(lang)) {
    return genericError('unsupported locale', 400)
  }

  if (!isTranslateEnabled()) {
    return NextResponse.json({ original: text, translated: text, lang, disabled: true })
  }

  const { translated, cached } = await translateOnce(text, lang)
  return NextResponse.json({ original: text, translated, lang, cached })
}

// POST: production path used by AutoText / useAutoTranslate.
export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request.headers.get('origin'))) {
    return genericError('forbidden', 403)
  }

  if (!isBodyWithinLimit(request, MAX_BODY_BYTES)) {
    return genericError('payload too large', 413)
  }

  const limit = rateLimit(request)
  if (!limit.ok) return tooManyResponse(limit.resetAt)

  let raw: Record<string, unknown>
  try {
    raw = (await request.json()) as Record<string, unknown>
  } catch {
    return genericError('invalid json', 400)
  }

  const text = validateString(raw.text, MAX_TEXT_LENGTH, true)
  if (!text.ok) return genericError('invalid text', 400)

  const targetLangRaw = typeof raw.targetLang === 'string' ? raw.targetLang : ''
  if (!isValidLocale(targetLangRaw)) {
    return genericError('unsupported locale', 400)
  }
  const targetLang: Locale = targetLangRaw

  if (!isTranslateEnabled()) {
    return NextResponse.json({ translated: text.value, disabled: true })
  }

  const { translated, cached } = await translateOnce(text.value, targetLang)
  return NextResponse.json({ translated, cached })
}
