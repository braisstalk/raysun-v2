import type { MetadataRoute } from 'next'
import { i18n } from '@/i18n/config'
import {
  getAllProducts,
  getAllNewsArticles,
  getAllResources,
  getAllJobPostings,
} from '@/lib/content'

const BASE_URL = 'https://www.raysunpharma.com'

// Top-level static pages that exist for every locale.
const STATIC_PATHS: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }> = [
  { path: '', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/manufacturing', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/rd-innovation', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/quality-compliance', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/products', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/news', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/resources', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/verify', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/order-now', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/ai-assistant', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/careers', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/sitemap', changeFrequency: 'monthly', priority: 0.3 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
]

function buildAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {}
  for (const loc of i18n.locales) {
    languages[loc] = `${BASE_URL}/${loc}${path}`
  }
  languages['x-default'] = `${BASE_URL}/${i18n.defaultLocale}${path}`
  return languages
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  // Static pages × all locales
  for (const { path, changeFrequency, priority } of STATIC_PATHS) {
    for (const locale of i18n.locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: { languages: buildAlternates(path) },
      })
    }
  }

  // Dynamic detail pages — products, news, resources, careers
  const productSlugs = getAllProducts()
    .map((p) => p.slug || p.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))
    .filter(Boolean)
  for (const slug of productSlugs) {
    const path = `/products/${slug}`
    for (const locale of i18n.locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: { languages: buildAlternates(path) },
      })
    }
  }

  for (const article of getAllNewsArticles()) {
    if (!article.slug) continue
    const path = `/news/${article.slug}`
    for (const locale of i18n.locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.5,
        alternates: { languages: buildAlternates(path) },
      })
    }
  }

  for (const resource of getAllResources()) {
    if (!resource.slug) continue
    const path = `/resources/${resource.slug}`
    for (const locale of i18n.locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.4,
        alternates: { languages: buildAlternates(path) },
      })
    }
  }

  for (const job of getAllJobPostings()) {
    if (!job.slug) continue
    const path = `/careers/${job.slug}`
    for (const locale of i18n.locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.5,
        alternates: { languages: buildAlternates(path) },
      })
    }
  }

  return entries
}
