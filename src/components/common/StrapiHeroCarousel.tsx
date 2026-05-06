'use client'

import { useState, useEffect } from 'react'
import HeroCarousel from './HeroCarousel'
import type { HeroCarouselSlide } from './HeroCarousel'
import { STRAPI_URL } from '@/lib/strapi/client'
import type { StrapiHeroSlide } from '@/lib/strapi/api'

// Import all fallback data
import {
  homeHeroSlides,
  productsHeroSlides,
  verifyHeroSlides,
  orderHeroSlides,
  aiAssistantHeroSlides,
} from '@/config/heroSlides'

// Map page names to fallback slides
const fallbackMap: Record<string, HeroCarouselSlide[]> = {
  'home': homeHeroSlides,
  'about': homeHeroSlides,
  'manufacturing': homeHeroSlides,
  'rd-innovation': homeHeroSlides,
  'quality-compliance': homeHeroSlides,
  'news': homeHeroSlides,
  'resources': homeHeroSlides,
  'contact': homeHeroSlides,
  'careers': homeHeroSlides,
  'products': productsHeroSlides,
  'verify': verifyHeroSlides,
  'order-now': orderHeroSlides,
  'ai-assistant': aiAssistantHeroSlides,
}

function mapStrapiSlide(s: StrapiHeroSlide): HeroCarouselSlide {
  return {
    id: s.documentId || `slide-${s.id}`,
    title: s.title || '',
    subtitle: s.subtitle || '',
    gradient: s.gradientClass || 'from-slate-900 via-slate-800 to-blue-900',
  }
}

interface StrapiHeroCarouselProps {
  page: string
  badge?: string
  badgeColor?: string
  heading: string
  description: string
  interval?: number
  children?: React.ReactNode
  icon?: React.ReactNode
  align?: 'left' | 'center'
}

export default function StrapiHeroCarousel({
  page,
  badge,
  badgeColor = 'text-blue-300',
  heading,
  description,
  interval = 6000,
  children,
  icon,
  align = 'left',
}: StrapiHeroCarouselProps) {
  const fallback = fallbackMap[page] || homeHeroSlides
  const [slides, setSlides] = useState<HeroCarouselSlide[]>(fallback)

  useEffect(() => {
    const url = `${STRAPI_URL}/api/hero-slides?filters[page][$eq]=${encodeURIComponent(page)}&filters[isActive][$eq]=true&sort=sortOrder:asc&pagination[pageSize]=20`

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(json => {
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          const mapped = json.data.map(mapStrapiSlide)
          setSlides(mapped)
        }
        // If no data from CMS, keep fallback — no action needed
      })
      .catch(err => {
        console.warn(`[StrapiHeroCarousel] Failed to fetch slides for "${page}", using fallback:`, err.message)
        // Keep fallback slides — no action needed
      })
  }, [page])

  return (
    <HeroCarousel
      badge={badge}
      badgeColor={badgeColor}
      heading={heading}
      description={description}
      slides={slides}
      interval={interval}
      icon={icon}
      align={align}
    >
      {children}
    </HeroCarousel>
  )
}
