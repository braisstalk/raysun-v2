'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'
import { STRAPI_URL } from '@/lib/strapi/client'
import type { StrapiGlobal } from '@/lib/strapi/api'
import AutoText from '@/components/common/AutoText'

// Decommissioned URL prefixes — code-side defense in case the CMS still
// returns links pointing at sections we have already taken offline. Pages
// matching these prefixes also return 410 Gone via src/proxy.ts, so even
// if the CMS sync lags, the user never sees a dead link in the footer.
// Add new entries here when you decommission another section.
const REMOVED_PATH_PREFIXES = [
  '/what-science-can-do',
] as const

function isRemovedPath(href: unknown): boolean {
  if (typeof href !== 'string') return false
  // Strip query/hash and trim, then strip an optional 2-letter locale
  // prefix so "/what-science-can-do" and "/en/what-science-can-do" both
  // match. We intentionally only check the path component.
  const path = href.split(/[?#]/, 1)[0].trim()
  const stripped = path.replace(/^\/[a-z]{2}(?=\/|$)/i, '')
  return REMOVED_PATH_PREFIXES.some(
    (prefix) => stripped === prefix || stripped.startsWith(`${prefix}/`),
  )
}

// Fallback data in case CMS is unavailable
const fallbackData = {
  siteName: 'Raysun Biopharma',
  siteDescription: 'A leading pharmaceutical manufacturer committed to advancing global healthcare through quality medicines and sustainable innovation.',
  contactEmail: 'info@raysunpharma.com',
  contactPhone: 'Available upon request',
  address: 'Vientiane, Laos',
  socialLinkedin: 'https://linkedin.com/company/raysunbiopharma',
  socialFacebook: 'https://facebook.com/raysunbiopharma',
  socialYoutube: 'https://youtube.com/@raysunbiopharma',
}

const fallbackQuickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Manufacturing', href: '/manufacturing' },
  { label: 'Products', href: '/products' },
  { label: 'News', href: '/news' },
  { label: 'Contact Us', href: '/contact' },
]

const fallbackProductLinks = [
  { label: 'Softgels', href: '/products?category=softgels' },
  { label: 'Tablets', href: '/products?category=tablets' },
  { label: 'Capsules', href: '/products?category=capsules' },
  { label: 'Creams & Ointments', href: '/products?category=creams' },
  { label: 'Injections', href: '/products?category=injections' },
  { label: 'Traditional Medicines', href: '/products?category=traditional' },
]

const fallbackBottomLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Sitemap', href: '/sitemap' },
]

export default function Footer() {
  const [global, setGlobal] = useState<StrapiGlobal | null>(null)

  useEffect(() => {
    fetch(`${STRAPI_URL}/api/global`)
      .then(res => res.json())
      .then(json => {
        if (json.data) setGlobal(json.data)
      })
      .catch(() => {})
  }, [])

  const data = global || fallbackData as any
  // Drop any CMS link that targets a decommissioned section before we use
  // the array; only fall back to the local list when the CMS produced no
  // usable links at all.
  const cmsQuickLinks = global?.footerQuickLinks?.filter((link) => !isRemovedPath(link?.href)) ?? []
  const cmsProductLinks = global?.footerProductLinks?.filter((link) => !isRemovedPath(link?.href)) ?? []
  const cmsBottomLinks = global?.footerBottomLinks?.filter((link) => !isRemovedPath(link?.href)) ?? []
  const quickLinks = cmsQuickLinks.length > 0 ? cmsQuickLinks : fallbackQuickLinks
  const productLinks = cmsProductLinks.length > 0 ? cmsProductLinks : fallbackProductLinks
  const bottomLinks = cmsBottomLinks.length > 0 ? cmsBottomLinks : fallbackBottomLinks
  const quickLinksTitle = global?.footerQuickLinksTitle || 'Quick Links'
  const productsTitle = global?.footerProductsTitle || 'Products'
  const contactTitle = global?.footerContactTitle || 'Contact'
  const copyright = global?.footerCopyright || `© ${new Date().getFullYear()} Raysun Biopharma. All rights reserved`

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-blue-400">Raysun</span>Biopharma
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              <AutoText text={data.siteDescription || fallbackData.siteDescription} />
            </p>
            <div className="flex gap-3">
              {data.socialLinkedin && (
                <a href={data.socialLinkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              )}
              {data.socialFacebook && (
                <a href={data.socialFacebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              )}
              {data.socialYoutube && (
                <a href={data.socialYoutube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4"><AutoText text={quickLinksTitle} /></h4>
            <ul className="space-y-2">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors">
                    <AutoText text={link.label} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4"><AutoText text={productsTitle} /></h4>
            <ul className="space-y-2">
              {productLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors">
                    <AutoText text={link.label} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4"><AutoText text={contactTitle} /></h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0" />
                {data.contactEmail || fallbackData.contactEmail}
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" />
                {data.contactPhone || fallbackData.contactPhone}
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                {data.address || fallbackData.address}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            <AutoText text={copyright} />
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            {bottomLinks.map((link, idx) => (
              <Link key={idx} href={link.href} className="hover:text-white transition-colors">
                <AutoText text={link.label} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
