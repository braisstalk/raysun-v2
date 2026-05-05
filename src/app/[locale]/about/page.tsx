'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle, Target, Eye, Users, Award, MapPin, Building2, Globe, Heart, Shield } from 'lucide-react'
import { useTranslation } from '@/i18n/useTranslation'
import StrapiHeroCarousel from '@/components/common/StrapiHeroCarousel'
import { usePageContent } from '@/lib/strapi'
import type { PageContent } from '@/lib/strapi'
import AutoText from '@/components/common/AutoText'

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield, Heart, Target, CheckCircle, Users, Award, MapPin, Building2, Globe,
  Eye, ArrowRight
}

// Resolve a dotted translation key (e.g. "stats.years", "about.ourMission")
// against the nested translations object. Falls back to the supplied string
// if any segment is missing — keeps the page readable rather than rendering
// the raw key when a translation hasn't landed yet.
function tr(t: unknown, path: string, fallback: string): string {
  const parts = path.split('.')
  let cur: unknown = t
  for (const p of parts) {
    if (cur && typeof cur === 'object' && p in (cur as Record<string, unknown>)) {
      cur = (cur as Record<string, unknown>)[p]
    } else {
      return fallback
    }
  }
  return typeof cur === 'string' ? cur : fallback
}

interface AboutContent extends PageContent {
  highlights?: Array<{ icon: string; value: string; labelKey: string }>
  mission?: { icon: string; titleKey: string; descKey: string }
  vision?: { icon: string; titleKey: string; descKey: string }
  values?: Array<{ icon: string; titleKey: string; descKey: string }>
  milestones?: Array<{ year: string; title: string; desc: string }>
  regions?: string[]
  ctaLinks?: Array<{ href: string; labelKey: string; variant?: string }>
}

export default function About() {
  const { t } = useTranslation()
  const content = usePageContent('about') as AboutContent | null

  // Fallback data
  const highlights = content?.highlights ?? [
    { value: '10+', labelKey: 'stats.years', icon: 'Award' },
    { value: '12,000', labelKey: 'stats.sqm', icon: 'Building2' },
    { value: '6+', labelKey: 'stats.countries', icon: 'Globe' },
    { value: '100+', labelKey: 'stats.team', icon: 'Users' },
  ]

  const mission = content?.mission ?? {
    icon: 'Target',
    titleKey: 'about.ourMission',
    descKey: 'about.missionDesc'
  }

  const vision = content?.vision ?? {
    icon: 'Eye',
    titleKey: 'about.ourVision',
    descKey: 'about.visionDesc'
  }

  const values = content?.values ?? [
    { icon: 'Shield', titleKey: 'about.qualityFirst', descKey: 'about.qualityFirstDesc' },
    { icon: 'Heart', titleKey: 'about.patientCentric', descKey: 'about.patientCentricDesc' },
    { icon: 'Target', titleKey: 'about.continuousInnovation', descKey: 'about.continuousInnovationDesc' },
    { icon: 'CheckCircle', titleKey: 'about.regulatoryExcellence', descKey: 'about.regulatoryExcellenceDesc' },
  ]

  const milestones = content?.milestones ?? [
    { year: '2014', title: 'Company Founded', desc: 'Raysun Biopharma established in Vientiane, Laos' },
    { year: '2016', title: 'Factory Completed', desc: '12,000 sqm state-of-the-art manufacturing facility completed' },
    { year: '2017', title: 'GMP Certification', desc: 'Achieved WHO GMP certification for all production lines' },
    { year: '2019', title: 'Product Expansion', desc: 'Expanded softgel and tablet production capabilities' },
    { year: '2021', title: 'ISO Certification', desc: 'Quality Management System certified to ISO 9001:2015' },
    { year: '2023', title: 'Regional Expansion', desc: 'Expanded distribution to Thailand, Cambodia, and Myanmar' },
    { year: '2025', title: 'Global Presence', desc: 'Serving patients across multiple countries worldwide' },
  ]

  const regions = content?.regions ?? ['Laos', 'Thailand', 'Cambodia', 'Vietnam', 'Myanmar', 'Middle East', 'Africa']

  const ctaLinks = content?.ctaLinks ?? [
    { href: '/manufacturing', labelKey: 'nav.manufacturing' },
    { href: '/quality-compliance', labelKey: 'nav.qualityCompliance' },
    { href: '/rd-innovation', labelKey: 'nav.rdInnovation' },
    { href: '/contact', labelKey: 'common.contact', variant: 'outline' },
  ]

  const MissionIcon = iconMap[mission.icon] || Target
  const VisionIcon = iconMap[vision.icon] || Eye

  return (
    <>
      {/* Hero Carousel */}
      <StrapiHeroCarousel
        page="about"
        badge="ABOUT US"
        badgeColor="text-blue-300"
        heading={t.hero.aboutTitle}
        description={t.hero.aboutSubtitle}
      />

      {/* Company Highlights */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map((h, idx) => {
              const Icon = iconMap[h.icon] || Award
              return (
                <div key={idx} className="text-center">
                  <Icon className="w-8 h-8 text-[#1E6F5C] mx-auto mb-2" />
                  <div className="text-3xl font-bold text-slate-900"><AutoText text={h.value} as="span" /></div>
                  <div className="text-sm text-slate-600">{tr(t, h.labelKey, h.labelKey)}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gradient-to-br from-[#1E6F5C] to-[#289c76] text-white rounded-2xl p-8">
              <MissionIcon className="w-10 h-10 mb-4 opacity-90" />
              <h2 className="text-2xl font-bold mb-4">{tr(t, mission.titleKey, mission.titleKey)}</h2>
              <p className="text-blue-100 text-lg">
                {tr(t, mission.descKey, mission.descKey)}
              </p>
            </div>
            <div className="bg-slate-900 text-white rounded-2xl p-8">
              <VisionIcon className="w-10 h-10 mb-4" />
              <h2 className="text-2xl font-bold mb-4">{tr(t, vision.titleKey, vision.titleKey)}</h2>
              <p className="text-slate-300 text-lg">
                {tr(t, vision.descKey, vision.descKey)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2">{t.about.ourValues}</p>
            <h2 className="text-3xl font-bold text-slate-900">{t.about.whatDrivesUs}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => {
              const Icon = iconMap[v.icon] || CheckCircle
              return (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <Icon className="w-10 h-10 text-[#1E6F5C] mb-4" />
                  <h3 className="font-semibold text-slate-900 mb-2">{tr(t, v.titleKey, v.titleKey)}</h3>
                  <p className="text-sm text-slate-600">{tr(t, v.descKey, v.descKey)}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2">{t.about.ourJourney}</p>
            <h2 className="text-3xl font-bold text-slate-900">{t.about.milestones}</h2>
          </div>
          <div className="space-y-0">
            {milestones.map((m, idx) => (
              <div key={idx} className="flex gap-6 items-start relative">
                <div className="flex-shrink-0 w-32">
                  <span className="inline-block bg-[#1E6F5C] text-white text-sm font-bold px-4 py-2 rounded-full">
                    {m.year}
                  </span>
                </div>
                <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#1E6F5C] mt-2.5 relative z-10">
                </div>
                {idx < milestones.length - 1 && (
                  <div className="absolute left-16 top-5 w-0.5 h-full bg-slate-200" />
                )}
                <div className="pt-1 pb-8">
                  <h3 className="font-semibold text-slate-900"><AutoText text={m.title} as="span" /></h3>
                  <p className="text-sm text-slate-600"><AutoText text={m.desc} as="span" /></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2">{t.about.leadership}</p>
            <h2 className="text-3xl font-bold text-slate-900">{t.about.governance}</h2>
          </div>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-slate-600 mb-6">
              {t.about.leadershipInfo}
            </p>
            <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm">
              <Users className="w-4 h-4" />
              {t.about.leadershipAvailable}
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#1E6F5C] font-medium mb-2">{t.global.globalPresence}</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">{t.about.servingWorldwide}</h2>
              <p className="text-slate-600 mb-6">
                {t.about.globalPresenceDesc}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {regions.map((region, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#1E6F5C]" />
                    <span className="text-sm text-slate-700"><AutoText text={region} as="span" /></span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl h-80 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <Globe className="w-16 h-16 mx-auto mb-3" />
                <p className="text-lg font-medium"><AutoText text="Global Distribution Network" as="span" /></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#1E6F5C] to-[#289c76]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-8">
            <h2 className="text-3xl font-bold mb-4">{t.about.exploreCapabilities}</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              {t.about.capabilitiesDesc}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {ctaLinks.map((link, idx) => {
              const isOutline = link.variant === 'outline'
              return (
                <Link
                  key={idx}
                  href={link.href}
                  className={isOutline
                    ? "border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 flex items-center gap-2"
                    : "bg-white text-[#1E6F5C] px-6 py-3 rounded-lg font-medium hover:bg-blue-50 flex items-center gap-2"
                  }
                >
                  {tr(t, link.labelKey, link.labelKey)}
                  {!isOutline && <ArrowRight className="w-4 h-4" />}
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
