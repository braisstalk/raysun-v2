'use client'

import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import Link from 'next/link'
import { SearchX, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { useProducts, type MappedProduct } from '@/lib/strapi'
import { getProductsContent, getAllProducts, getCurrentSource } from '@/lib/content'
import { useTranslation } from '@/i18n/useTranslation'
import { getContentTranslation } from '@/i18n/content'
import StrapiHeroCarousel from '@/components/common/StrapiHeroCarousel'
import ProductsSearchBar from '@/components/products/ProductsSearchBar'
import { useRfqCart } from '@/contexts/RfqCartContext'
import AutoText from '@/components/common/AutoText'

function generateSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

// Fallback to local config if CMS fails
function useProductsWithFallback() {
  const [activeTab, setActiveTab] = useState('all')
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const { products: cmsProducts, pagination, loading, error } = useProducts({
    category: activeCategory,
    type: activeTab === 'brand' || activeTab === 'generic' ? activeTab : undefined,
    search: search || undefined,
    page,
    pageSize: 12,
  })

  // Get local products as fallback
  const localConfig = getProductsContent()
  const localProducts = getAllProducts()

  // Determine which source to use
  const useCMS = !error && cmsProducts.length > 0
  const products = useCMS ? cmsProducts : localProducts.map(p => ({
    id: p.id,
    name: p.name,
    slug: p.slug || generateSlug(p.name),
    category: p.category,
    dosageForm: p.dosageForm,
    description: p.description,
    indication: p.indications?.join(', ') || '',
    tags: p.tags || [],
    type: p.type || 'generic',
    strength: null,
    packaging: null,
    shelfLife: null,
    storageConditions: null,
    images: [],
    documents: { dataSheet: null, coa: null },
  } as MappedProduct))

  const totalItems = useCMS ? pagination.total : localProducts.length
  const totalPages = useCMS ? pagination.pageCount : Math.ceil(localProducts.length / localConfig.perPage)
  const isLoading = loading

  return {
    products,
    totalItems,
    totalPages,
    isLoading,
    useCMS,
    activeTab,
    setActiveTab,
    activeCategory,
    setActiveCategory,
    search,
    setSearch,
    page,
    setPage,
    localConfig,
  }
}

export default function Products() {
  const {
    products,
    totalItems,
    totalPages,
    isLoading,
    useCMS,
    activeTab,
    setActiveTab,
    activeCategory,
    setActiveCategory,
    search,
    setSearch,
    page,
    setPage,
    localConfig,
  } = useProductsWithFallback()

  const { t, locale } = useTranslation()
  const { addItem } = useRfqCart()
  const contentTrans = getContentTranslation(locale || 'en')
  
  const { hero, tabs, categories, perPage } = localConfig

  // Helper to get translated category name
  const getCategoryName = (catId: string, fallbackName: string) => {
    return contentTrans?.products?.categories?.[catId] || fallbackName
  }

  const scrollRef = useRef<HTMLDivElement>(null)

  // Filter products locally for non-CMS mode
  const filtered = useMemo(() => {
    if (useCMS) return products
    
    const q = search.toLowerCase().trim()
    return products.filter((p) => {
      if (activeTab === 'brand' && p.type !== 'brand') return false
      if (activeTab === 'generic' && p.type !== 'generic') return false
      if (activeCategory !== 'all' && p.category !== activeCategory) return false
      if (q) {
        return (
          p.name.toLowerCase().includes(q) ||
          p.dosageForm.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
        )
      }
      return true
    })
  }, [products, activeTab, activeCategory, search, useCMS])

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: useCMS ? totalItems : filtered.length }
    for (const p of products) {
      counts[p.category] = (counts[p.category] || 0) + 1
    }
    return counts
  }, [products, filtered.length, useCMS, totalItems])

  // Pagination
  const paged = useMemo(() => {
    if (useCMS) return products // CMS already paginates
    const start = (page - 1) * perPage
    return filtered.slice(start, start + perPage)
  }, [filtered, page, perPage, useCMS, products])

  // Reset page on filter change
  useEffect(() => {
    setPage(1)
  }, [activeTab, activeCategory, search, setPage])

  // Scroll to top on page change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [page])

  const isSearching = search.trim().length > 0

  return (
    <>
      <StrapiHeroCarousel
        page="products"
        badge="200+ Products Available"
        badgeColor="text-emerald-400"
        heading={hero.title}
        description={hero.subtitle}
        align="center"
      >
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-2xl blur-xl" />
          <div className="relative">
            <ProductsSearchBar
              placeholder={contentTrans?.products?.searchPlaceholder || hero.searchPlaceholder}
              value={search}
              onChange={setSearch}
            />
          </div>
        </div>
      </StrapiHeroCarousel>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" ref={scrollRef}>
        
        {/* Tab Bar - Now at TOP, full width */}
        <div className="bg-white rounded-xl border border-slate-200 p-2 mb-4 shadow-sm">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#1E6F5C] text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <AutoText text={tab.label} />
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Layout - Sidebar + Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Quick Navigate */}
          <aside className="w-full lg:w-60 shrink-0">
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm lg:sticky lg:top-24">
              <h3 className="font-semibold text-slate-900 mb-4">{t.products.quickNavigate}</h3>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                    activeCategory === 'all'
                      ? 'bg-[#1E6F5C] text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {t.products.allProducts}
                  <span className="float-right text-xs opacity-70">{categoryCounts.all}</span>
                </button>
                {categories.map((cat) => {
                  const count = categoryCounts[cat.id] ?? 0
                  if (count === 0 && activeCategory !== cat.id) return null
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                        activeCategory === cat.id
                          ? 'bg-[#1E6F5C] text-white'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <AutoText text={getCategoryName(cat.id, cat.name)} />
                      <span className="float-right text-xs opacity-70">{count}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Results count */}
            <div className="mb-4">
              <p className="text-sm text-slate-500">
                {t.common.showing} <span className="font-semibold text-slate-700">{paged.length}</span> {t.common.of} <span className="font-semibold text-slate-700">{useCMS ? totalItems : filtered.length}</span> {t.common.results}
                {isSearching && (
                  <span className="ml-2">
                    for "<span className="text-[#1E6F5C]">{search}</span>"
                  </span>
                )}
                {!useCMS && (
                  <span className="ml-2 text-xs text-amber-600"><AutoText text="(Using local data)" as="span" /></span>
                )}
              </p>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                <div className="animate-spin w-8 h-8 border-2 border-[#1E6F5C] border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-slate-600"><AutoText text="Loading products..." as="span" /></p>
              </div>
            )}

            {/* Product Grid */}
            {!isLoading && paged.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                <SearchX className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{t.common.noResults}</h3>
                <p className="text-slate-600 mb-4"><AutoText text="Try adjusting your search or filters" as="span" /></p>
                <button
                  onClick={() => { setSearch(''); setActiveTab('all'); setActiveCategory('all') }}
                  className="text-[#1E6F5C] font-medium hover:underline"
                >
                  <AutoText text="Clear all filters" as="span" />
                </button>
              </div>
            ) : (
              !isLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {paged.map((product) => {
                    const hue = (parseInt(product.id.replace(/\D/g, ''), 10) * 37) % 360
                    return (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        className="group bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg hover:border-[#1E6F5C]/30 transition-all"
                      >
                        <div
                          className="h-24 rounded-lg mb-4 flex items-center justify-center"
                          style={{ background: `hsl(${hue}, 60%, 95%)` }}
                        >
                          {product.images && product.images.length > 0 ? (
                            <img 
                              src={product.images[0].thumbnail || product.images[0].url} 
                              alt={product.images[0].alt}
                              className="h-20 w-20 object-contain"
                            />
                          ) : (
                            <span className="text-2xl">💊</span>
                          )}
                        </div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-semibold text-slate-900 group-hover:text-[#1E6F5C] line-clamp-2 text-sm">
                            <AutoText text={product.name} />
                          </h3>
                        </div>
                        <p className="text-xs text-slate-500 mb-2"><AutoText text={product.dosageForm} /></p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                            {product.type === 'brand' ? t.products.brands : t.products.generics}
                          </span>
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              addItem({ productId: product.id, productName: product.name, slug: product.slug })
                            }}
                            className="text-xs bg-emerald-50 text-emerald-600 px-2 py-1 rounded font-medium hover:bg-emerald-100 transition-colors"
                          >
                            <AutoText text="+ RFQ" as="span" />
                          </button>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )
            )}

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum: number
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (page <= 3) {
                      pageNum = i + 1
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = page - 2 + i
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium ${
                          page === pageNum
                            ? 'bg-[#1E6F5C] text-white'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                </div>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  )
}
