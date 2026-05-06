import type { Metadata } from 'next'
import Link from 'next/link'
import { Map, ChevronRight } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata({
    locale,
    path: '/sitemap',
    title: 'Sitemap',
  })
}

const siteMap = {
  main: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Manufacturing', href: '/manufacturing' },
    { label: 'R&D Innovation', href: '/rd-innovation' },
    { label: 'Quality & Compliance', href: '/quality-compliance' },
  ],
  products: [
    { label: 'All Products', href: '/products' },
    { label: 'Softgels', href: '/products?category=softgels' },
    { label: 'Tablets', href: '/products?category=tablets' },
    { label: 'Creams & Ointments', href: '/products?category=creams' },
    { label: 'Injections', href: '/products?category=injections' },
    { label: 'Traditional Medicines', href: '/products?category=traditional' },
  ],
  business: [
    { label: 'Verify Products', href: '/verify' },
    { label: 'Order Now', href: '/order-now' },
    { label: 'AI Assistant', href: '/ai-assistant' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Careers', href: '/careers' },
    { label: 'News', href: '/news' },
    { label: 'Resources', href: '/resources' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Use', href: '/terms' },
  ]
}

export default function Sitemap() {
  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-blue-300 font-medium mb-2">SITEMAP</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Site Map</h1>
          <p className="text-lg text-slate-300">
            Find all pages on the Raysun Biopharma website.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Main Navigation */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Map className="w-5 h-5 text-blue-600" />
                Main
              </h2>
              <ul className="space-y-2">
                {siteMap.main.map((item, idx) => (
                  <li key={idx}>
                    <Link href={item.href} className="text-slate-600 hover:text-blue-600 flex items-center gap-1">
                      <ChevronRight className="w-3 h-3" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Map className="w-5 h-5 text-blue-600" />
                Products
              </h2>
              <ul className="space-y-2">
                {siteMap.products.map((item, idx) => (
                  <li key={idx}>
                    <Link href={item.href} className="text-slate-600 hover:text-blue-600 flex items-center gap-1">
                      <ChevronRight className="w-3 h-3" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Business */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Map className="w-5 h-5 text-blue-600" />
                Business
              </h2>
              <ul className="space-y-2">
                {siteMap.business.map((item, idx) => (
                  <li key={idx}>
                    <Link href={item.href} className="text-slate-600 hover:text-blue-600 flex items-center gap-1">
                      <ChevronRight className="w-3 h-3" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Map className="w-5 h-5 text-blue-600" />
                Legal
              </h2>
              <ul className="space-y-2">
                {siteMap.legal.map((item, idx) => (
                  <li key={idx}>
                    <Link href={item.href} className="text-slate-600 hover:text-blue-600 flex items-center gap-1">
                      <ChevronRight className="w-3 h-3" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
