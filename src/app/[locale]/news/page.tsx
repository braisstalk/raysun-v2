'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Calendar, ArrowRight, Newspaper } from 'lucide-react'
import { useTranslation } from '@/i18n/useTranslation'
import StrapiHeroCarousel from '@/components/common/StrapiHeroCarousel'
import { useNews, type MappedNewsArticle } from '@/lib/strapi/useNews'
import { getNewsContent } from '@/lib/content'
import AutoText from '@/components/common/AutoText'
import BrandPlaceholder from '@/components/common/BrandPlaceholder'

const CATEGORIES = [
  { id: 'All', label: 'All' },
  { id: 'Quality', label: 'Quality' },
  { id: 'Business', label: 'Business' },
  { id: 'Innovation', label: 'Innovation' },
  { id: 'Products', label: 'Products' },
  { id: 'Recognition', label: 'Recognition' },
]

function mapLocalNews(): MappedNewsArticle[] {
  const content = getNewsContent()
  return content.items.map((item, idx) => ({
    id: String(idx + 1),
    documentId: String(idx + 1),
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    content: '',
    date: item.date,
    category: item.category,
  }))
}

export default function News() {
  const { t } = useTranslation()
  const { articles: cmsArticles, loading, error } = useNews()
  // Always show local fallback while CMS is in flight — local data is sync
  // and avoids a visible "Loading news..." in server-rendered HTML.
  const articles = cmsArticles.length > 0 ? cmsArticles : mapLocalNews()

  const hero = { title: 'Latest News & Updates', subtitle: 'Stay informed about our latest developments, partnerships, and achievements.' }

  const [activeCat, setActiveCat] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return articles.filter(n => {
      const matchCat = activeCat === 'All' || n.category === activeCat
      const matchSearch = !search || n.title.toLowerCase().includes(search.toLowerCase()) || n.excerpt.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [articles, activeCat, search])

  return (
    <>
      <StrapiHeroCarousel
        page="news"
        badge="NEWS"
        badgeColor="text-blue-300"
        heading={hero.title}
        description={hero.subtitle}
      />

      {/* Filter bar */}
      <section className="py-4 md:py-8 bg-slate-50 sticky top-[60px] md:top-16 z-30 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCat(cat.id)}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap shrink-0 ${
                    activeCat === cat.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={t.news.searchNews}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-8 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500">{t.news.noNewsFound}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <article key={item.id} className="bg-slate-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                  {item.image ? (
                    <div className="h-40 overflow-hidden bg-slate-100">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  ) : (
                    <BrandPlaceholder
                      icon={Newspaper}
                      variant="card"
                      tone="mixed"
                      rounded="none"
                      className="h-40"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-blue-600 mb-2">
                      <Calendar className="w-3 h-3" />
                      <span>{item.date}</span>
                      <span>•</span>
                      <span>{item.category}</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2"><AutoText text={item.title} /></h3>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-3"><AutoText text={item.excerpt} /></p>
                    <Link href={`/news/${item.slug}`} className="inline-flex items-center gap-1 text-blue-600 text-sm font-medium hover:gap-2 transition-all">
                      {t.news.readMore} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {error && !loading && process.env.NODE_ENV === 'development' && (
            <p className="text-center text-xs text-amber-500 mt-4">(offline data)</p>
          )}
        </div>
      </section>
    </>
  )
}
