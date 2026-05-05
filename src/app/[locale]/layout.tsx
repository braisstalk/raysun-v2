import { isValidLocale, rtlLocales } from '@/i18n/config'
import type { Locale } from '@/i18n/config'
import { i18n } from '@/i18n/config'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingActions from '@/components/common/FloatingActions'

import { LocaleProvider } from '@/i18n/LocaleContext'
import { RfqCartProvider } from '@/contexts/RfqCartContext'
import { BASE_URL, SITE_NAME, buildPageMetadata } from '@/lib/seo/metadata'

// Generate static params for all locales
export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }))
}

// Locale-level metadata.
//
// canonical / hreflang / og:url here describe the *locale home page*
// (`/{locale}`). Nested routes MUST override these via their own
// `generateMetadata` (using buildPageMetadata) so that, for example,
// /en/about gets canonical=`${BASE_URL}/en/about` instead of `/en`.
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  const description =
    'GMP-certified pharmaceutical manufacturer specializing in softgels, tablets, capsules, creams, and injections. Serving Southeast Asia and global markets with quality medicines.'

  const pageMetadata = buildPageMetadata({
    locale,
    path: '',
    title: `${SITE_NAME} - GMP Certified Pharmaceutical Manufacturer`,
    description,
  })

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: `${SITE_NAME} - GMP Certified Pharmaceutical Manufacturer`,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    keywords: [
      'pharmaceutical manufacturer', 'GMP certified', 'generic medicines',
      'softgel', 'tablet', 'Southeast Asia', 'Laos', 'healthcare',
    ],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: SITE_NAME,
      description,
      images: ['/logo.png'],
    },
    ...pageMetadata,
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Validate locale
  if (!isValidLocale(locale)) {
    notFound()
  }

  const validLocale = locale as Locale
  const isRtl = rtlLocales.includes(validLocale)

  return (
    <html lang={validLocale} dir={isRtl ? 'rtl' : 'ltr'}>
      <body className="antialiased">
        <LocaleProvider initialLocale={validLocale}>
          <RfqCartProvider>
            <Navbar />
            <main className="min-h-screen pt-16">
              {children}
            </main>
            <Footer />
            <FloatingActions />
          </RfqCartProvider>
        </LocaleProvider>
      </body>
    </html>
  )
}
