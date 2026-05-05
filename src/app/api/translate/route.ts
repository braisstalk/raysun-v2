export const dynamic = 'force-static'

import { NextRequest, NextResponse } from 'next/server'

const langMap: Record<string, string> = {
  en: 'en',
  zh: 'zh-CN',
  lo: 'lo',
  th: 'th',
  vi: 'vi',
  ar: 'ar',
  es: 'es',
  fr: 'fr',
}

async function doTranslate(text: string, targetLang: string): Promise<string> {
  if (!text || !targetLang || targetLang === 'en') return text

  const googleLang = langMap[targetLang] || targetLang
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${googleLang}&dt=t&q=${encodeURIComponent(text)}`

  const res = await fetch(url)
  if (!res.ok) {
    console.error(`[translate] Google API returned ${res.status} for lang=${googleLang}`)
    return text
  }

  const data = await res.json()
  const translated = data?.[0]?.map((item: any) => item[0]).join('') || text
  return translated
}

// GET handler - for testing: /api/translate?text=hello&lang=zh
export async function GET(request: NextRequest) {
  const text = request.nextUrl.searchParams.get('text') || ''
  const lang = request.nextUrl.searchParams.get('lang') || 'zh'

  if (!text) {
    return NextResponse.json({ status: 'ok', message: 'Translate API is running. Use ?text=hello&lang=zh to test.' })
  }

  try {
    const translated = await doTranslate(text, lang)
    return NextResponse.json({ original: text, translated, lang })
  } catch (err: any) {
    console.error('[translate] GET error:', err.message)
    return NextResponse.json({ error: err.message, translated: text })
  }
}

// POST handler - for production use
export async function POST(request: NextRequest) {
  try {
    const { text, targetLang } = await request.json()
    const translated = await doTranslate(text, targetLang)
    return NextResponse.json({ translated })
  } catch (err: any) {
    console.error('[translate] POST error:', err.message)
    return NextResponse.json({ translated: '' })
  }
}
