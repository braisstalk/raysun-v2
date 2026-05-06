'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Shield, Factory, FlaskConical, Award, FileText, Users, Globe, MapPin, CheckCircle, ArrowUpRight } from 'lucide-react'
import { getHomeContent } from '@/lib/content'
import { useLocale } from '@/i18n/LocaleContext'
import { getContentTranslation } from '@/i18n/content'
import StrapiHeroCarousel from '@/components/common/StrapiHeroCarousel'
import { useHomeData } from '@/lib/strapi/useHomeData'
import HomeVideoFeature from '@/components/home/HomeVideoFeature'
import AutoText from '@/components/common/AutoText'
import BrandPlaceholder from '@/components/common/BrandPlaceholder'

export default function Home() {
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { locale, t, isLoading: localeLoading } = useLocale()
  const cmsHome = useHomeData()
  
  // Get translations for current locale - this will update when locale changes
  const contentTrans = getContentTranslation(locale)

  // Load content on mount
  useEffect(() => {
    const homeData = getHomeContent()
    setContent(homeData)
    setLoading(false)
  }, [])

  // Show loading while either content or locale is loading
  if (loading || localeLoading || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#1E6F5C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">{t.common.loading}</p>
        </div>
      </div>
    )
  }

  const { hero, stats, about, videoSection, capabilities, products } = content

  // Merge content with translations - use contentTrans which updates when locale changes
  const heroConfig = {
    ...hero,
    title: cmsHome?.heroTitle || contentTrans.home.hero.title,
    subtitle: cmsHome?.heroSubtitle || contentTrans.home.hero.subtitle,
    primaryCta: {
      label: cmsHome?.heroPrimaryCtaLabel || contentTrans.home.hero.primaryCta,
      href: cmsHome?.heroPrimaryCtaLink || hero?.primaryCta?.href || '/products',
    },
    secondaryCta: {
      label: cmsHome?.heroSecondaryCtaLabel || contentTrans.home.hero.secondaryCta,
      href: cmsHome?.heroSecondaryCtaLink || hero?.secondaryCta?.href || '/contact',
    },
  }
  const videoConfig = videoSection || { title: 'Video', description: '', cta: { label: 'Watch', href: '/' } }
  const statsData = stats || []
  const aboutData = about || { title: contentTrans.home.about.title, description: '', cta: { label: t.common.learnMore, href: '/about' } }
  // Use CMS data for 6 sections with fallback to local content
  const capabilitiesData = cmsHome?.capabilities || capabilities || { title: contentTrans.home.capabilities.title, items: [] }
  const productsData = cmsHome?.productCategories || products || { title: contentTrans.home.products.title, categories: [] }
  const qualityData = cmsHome?.quality || {
    title: t.hero.qualityTitle,
    description: t.content?.qualityDesc || 'Our manufacturing facility operates under strict quality management systems to ensure every product meets international standards.',
    features: [
      { title: t.content?.whoGmpCertified || 'WHO GMP Certified Manufacturing', description: '' },
      { title: t.content?.isoCertified || 'ISO 9001:2015 Quality Management', description: '' },
      { title: t.content?.comprehensiveQA || 'Comprehensive Quality Assurance', description: '' },
    ]
  }
  const globalMarketsData = cmsHome?.globalMarkets || {
    title: contentTrans.home.global.title,
    subtitle: t.content?.globalDesc || 'Our manufacturing capabilities support pharmaceutical companies and healthcare providers across multiple regions with reliable supply and regulatory compliance.',
    markets: [
      { name: t.content?.southeastAsia || 'Southeast Asia', description: t.content?.southeastAsiaDesc || 'Primary market focus with established distribution networks in Thailand, Cambodia, Myanmar, Vietnam, and Laos.', icon: 'Globe' },
      { name: t.content?.middleEast || 'Middle East', description: t.content?.middleEastDesc || 'Growing presence in UAE, Saudi Arabia, and neighboring markets with regulatory-aligned products.', icon: 'MapPin' },
      { name: t.content?.africaBeyond || 'Africa & Beyond', description: t.content?.africaBeyondDesc || 'Partnership opportunities for quality generic medicines targeting underserved healthcare markets.', icon: 'Users' },
    ]
  }
  const newsData = cmsHome?.news || {
    title: t.hero.newsTitle,
    items: [
      { date: 'Mar 2026', title: 'GMP Re-certification Success', category: 'Quality', href: '/news/gmp-re-certification-success' },
      { date: 'Mar 2026', title: 'ASEAN Distribution Partnership', category: 'Business', href: '/news/new-asean-distribution-partnership' },
      { date: 'Feb 2026', title: 'R&D Facility Expansion', category: 'Innovation', href: '/news/rd-facility-expansion' },
    ]
  }
  const resourcesData = cmsHome?.resources || {
    title: t.hero.resourcesTitle,
    items: [
      { title: t.content?.companyOverview || 'Company Overview', type: 'PDF', size: '2.4 MB', href: '/resources/company-brochure' },
      { title: t.content?.productCatalog || 'Product Catalog', type: 'PDF', size: '5.8 MB', href: '/resources/product-catalog' },
      { title: t.content?.qualityCertifications || 'Quality Certifications', type: 'PDF', size: '1.2 MB', href: '/resources/quality-certifications' },
      { title: t.content?.sustainabilityReport || 'Sustainability Report', type: 'PDF', size: '3.5 MB', href: '/resources/iso-9001-certificate' },
    ]
  }

  return (
    <div key={locale}> {/* Force full re-render when locale changes */}
      {/* Hero Section with Carousel */}
      <StrapiHeroCarousel
        page="home"
        badge="Raysun Biopharma"
        badgeColor="text-blue-300"
        heading={heroConfig.title}
        description={heroConfig.subtitle}
      >
        <div className="flex flex-wrap gap-4">
          <Link href={heroConfig.primaryCta.href} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium text-white transition-colors">
            <AutoText>{heroConfig.primaryCta.label}</AutoText> <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href={heroConfig.secondaryCta.href} className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white px-6 py-3 rounded-lg font-medium text-white transition-colors">
            <AutoText>{heroConfig.secondaryCta.label}</AutoText>
          </Link>
        </div>
      </StrapiHeroCarousel>

      {/* Video Feature Section - Below Hero */}
      <HomeVideoFeature config={videoConfig} />

      {/* Stats */}
      <section className="bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {(cmsHome?.stats || statsData).map((stat: any, idx: number) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#1E6F5C]">{stat.value}</div>
                <div className="text-sm text-slate-600 mt-1"><AutoText text={stat.label} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Snapshot */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#1E6F5C] font-medium mb-2">{t.pages.about.toUpperCase()}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                {t.hero.aboutTitle}
              </h2>
              <p className="text-slate-600 mb-4">
                <AutoText>{cmsHome?.aboutDesc1 || t.content?.aboutDesc1 || 'Headquartered in Vientiane, Laos, Raysun Biopharma is a leading GMP-certified pharmaceutical manufacturer with a commitment to quality, innovation, and accessibility.'}</AutoText>
              </p>
              <p className="text-slate-600 mb-8">
                <AutoText>{cmsHome?.aboutDesc2 || t.content?.aboutDesc2 || 'Our state-of-the-art manufacturing facility produces a wide range of pharmaceutical products, serving healthcare needs across Southeast Asia, the Middle East, and Africa.'}</AutoText>
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 text-[#1E6F5C] font-medium hover:gap-3 transition-all">
                {t.common.learnMore} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <BrandPlaceholder
              icon={Factory}
              label={t.content?.manufacturingFacility || 'Manufacturing Facility'}
              variant="hero"
              tone="mixed"
              rounded="2xl"
              className="h-64 md:h-80"
            />
          </div>
        </div>
      </section>

      {/* Capabilities */}
      {capabilitiesData?.items?.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-[#1E6F5C] font-medium mb-2">{t.content?.capabilities || 'OUR CAPABILITIES'}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900"><AutoText text={capabilitiesData.title} /></h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {capabilitiesData.items.map((cap: any, idx: number) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  {cap.icon === 'Factory' && <Factory className="w-10 h-10 text-[#1E6F5C] mb-4" />}
                  {cap.icon === 'FlaskConical' && <FlaskConical className="w-10 h-10 text-[#1E6F5C] mb-4" />}
                  {cap.icon === 'Shield' && <Shield className="w-10 h-10 text-[#1E6F5C] mb-4" />}
                  {cap.icon === 'Award' && <Award className="w-10 h-10 text-[#1E6F5C] mb-4" />}
                  <h3 className="font-semibold text-slate-900 mb-2"><AutoText text={cap.title} /></h3>
                  <p className="text-sm text-slate-600"><AutoText text={cap.description} /></p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      {productsData?.categories?.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <p className="text-[#1E6F5C] font-medium mb-2">{t.pages.products.toUpperCase()}</p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900"><AutoText text={productsData.title} /></h2>
              </div>
              <Link href="/products" className="hidden md:inline-flex items-center gap-2 text-[#1E6F5C] font-medium hover:gap-3 transition-all">
                {contentTrans.home.products.viewAll} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {productsData.categories.slice(0, 4).map((cat: any, idx: number) => (
                <Link key={idx} href={cat.href || '/products'} className="group">
                  <div className="bg-slate-50 rounded-xl p-6 hover:bg-blue-50 transition-colors h-full">
                    <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-[#1E6F5C]"><AutoText text={cat.name} /></h3>
                    <p className="text-sm text-slate-600 mb-4"><AutoText text={cat.description} /></p>
                    <p className="text-xs text-[#1E6F5C] font-medium">{cat.count || '0'}+ Products</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quality & Compliance */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#1E6F5C] font-medium mb-2">{t.pages.qualityCompliance.toUpperCase()}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                <AutoText text={qualityData.title} />
              </h2>
              <p className="text-slate-600 mb-6">
                <AutoText text={qualityData.description} />
              </p>
              <div className="space-y-3 mb-8">
                {qualityData.features?.map((feature: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#1E6F5C]" />
                    <span className="text-slate-700"><AutoText text={feature.title} /></span>
                  </div>
                ))}
              </div>
              <Link href="/quality-compliance" className="inline-flex items-center gap-2 text-[#1E6F5C] font-medium hover:gap-3 transition-all">
                {t.common.learnMore} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-6 text-center">
                <Shield className="w-10 h-10 text-[#1E6F5C] mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 mb-1">{t.content?.gmpStandards || 'GMP Standards'}</h3>
                <p className="text-xs text-slate-500">{t.content?.whoGmpCertifiedShort || 'WHO-GMP Certified'}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 text-center">
                <Award className="w-10 h-10 text-[#1E6F5C] mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 mb-1">{t.content?.isoCertified || 'ISO Certified'}</h3>
                <p className="text-xs text-slate-500">{t.content?.qualityManagement || 'Quality Management'}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 text-center">
                <FileText className="w-10 h-10 text-[#1E6F5C] mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 mb-1">{t.content?.documentation || 'Documentation'}</h3>
                <p className="text-xs text-slate-500">{t.content?.completeRecords || 'Complete Records'}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 text-center">
                <FlaskConical className="w-10 h-10 text-[#1E6F5C] mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 mb-1">{t.content?.qcTesting || 'QC Testing'}</h3>
                <p className="text-xs text-slate-500">{t.content?.rigorousStandards || 'Rigorous Standards'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Markets */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2">{contentTrans.home.global.title.toUpperCase()}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              <AutoText text={globalMarketsData.title} />
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              <AutoText text={globalMarketsData.subtitle} />
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {globalMarketsData.markets?.map((market: any, idx: number) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm">
                {market.icon === 'Globe' && <Globe className="w-10 h-10 text-[#1E6F5C] mb-4" />}
                {market.icon === 'MapPin' && <MapPin className="w-10 h-10 text-[#1E6F5C] mb-4" />}
                {market.icon === 'Users' && <Users className="w-10 h-10 text-[#1E6F5C] mb-4" />}
                <h3 className="font-semibold text-slate-900 mb-2"><AutoText text={market.name} /></h3>
                <p className="text-sm text-slate-600 mb-4"><AutoText text={market.description} /></p>
                <div className="flex items-center gap-2 text-xs text-[#1E6F5C] font-medium">
                  <ArrowUpRight className="w-3 h-3" /> {t.common.learnMore}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-[#1E6F5C] font-medium mb-2">{t.content?.latestNews || 'LATEST NEWS'}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900"><AutoText text={newsData.title} /></h2>
            </div>
            <Link href="/news" className="hidden md:inline-flex items-center gap-2 text-[#1E6F5C] font-medium hover:gap-3 transition-all">
              {contentTrans.home.products.viewAll} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {newsData.items?.map((item: any, idx: number) => (
              <Link key={idx} href={item.href || '#'} className="group">
                <div className="bg-slate-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                  <BrandPlaceholder
                    icon={FileText}
                    variant="card"
                    tone="slate"
                    rounded="none"
                    className="h-40"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-[#1E6F5C] mb-2">
                      <span>{item.date}</span>
                      <span>•</span>
                      <span>{item.category}</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-[#1E6F5C]"><AutoText text={item.title} /></h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Preview */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2">{t.content?.resources || 'RESOURCES'}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900"><AutoText text={resourcesData.title} /></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {resourcesData.items?.map((item: any, idx: number) => (
              <Link key={idx} href={item.href || '#'} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-left">
                <FileText className="w-8 h-8 text-[#1E6F5C] mb-4" />
                <h3 className="font-medium text-slate-900 mb-1"><AutoText text={item.title} /></h3>
                <p className="text-xs text-slate-500">{item.type} • {item.size}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
