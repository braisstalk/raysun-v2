'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ShoppingCart, Search, Plus, Minus, Trash2, Send, CheckCircle, AlertCircle, Package, ArrowLeft, X } from 'lucide-react'
import { useTranslation } from '@/i18n/useTranslation'
import { useRfqCart } from '@/contexts/RfqCartContext'
import { useProducts, type MappedProduct } from '@/lib/strapi/useProducts'
import { productsPageConfig } from '@/config/products'
import StrapiHeroCarousel from '@/components/common/StrapiHeroCarousel'
import AutoText from '@/components/common/AutoText'

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

const CATEGORY_LABELS: Record<string, string> = {
  antibiotics: 'Antibiotics',
  cardiovascular: 'Cardiovascular',
  pain: 'Pain & Inflammation',
  dermatology: 'Dermatology',
  vitamins: 'Vitamins & Supplements',
  gastrointestinal: 'Gastrointestinal',
  respiratory: 'Respiratory',
  traditional: 'Traditional / Herbal',
  other: 'Other',
}

// Translated category labels for each locale
const getCategoryLabels = (t: any): Record<string, string> => ({
  antibiotics: t.products?.categories?.antibiotics || 'Antibiotics',
  cardiovascular: t.products?.categories?.cardiovascular || 'Cardiovascular',
  pain: t.products?.categories?.pain || 'Pain & Inflammation',
  dermatology: t.products?.categories?.dermatology || 'Dermatology',
  vitamins: t.products?.categories?.vitamins || 'Vitamins & Supplements',
  gastrointestinal: t.products?.categories?.gastrointestinal || 'Gastrointestinal',
  respiratory: t.products?.categories?.respiratory || 'Respiratory',
  traditional: t.products?.categories?.traditional || 'Traditional / Herbal',
  other: t.products?.categories?.other || 'Other',
})

function mapLocalProducts(): MappedProduct[] {
  return productsPageConfig.products.map(p => ({
    id: p.id,
    name: p.name,
    slug: p.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    category: p.category,
    dosageForm: p.dosageForm,
    description: p.description,
    indication: p.indication || '',
    type: (p.type as 'brand' | 'generic') || 'generic',
    tags: p.tags || [],
    strength: null,
    packaging: null,
    shelfLife: null,
    storageConditions: null,
    images: [],
    documents: { dataSheet: null, coa: null },
  }))
}

export default function OrderNow() {
  const { t } = useTranslation()
  const { items, itemCount, addItem, removeItem, updateQuantity, clearCart } = useRfqCart()
  const { products: cmsProducts } = useProducts()
  // Always show local fallback while CMS is in flight so first paint has
  // real product data instead of a "Loading..." spinner.
  const products = cmsProducts.length > 0 ? cmsProducts : mapLocalProducts()

  const [search, setSearch] = useState('')
  const [activeCat, setActiveCat] = useState('all')
  const [showCheckout, setShowCheckout] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const [form, setForm] = useState({ name: '', email: '', company: '', country: '', message: '' })

  // 从产品数据动态生成分类列表
  const categoryLabels = useMemo(() => getCategoryLabels(t), [t])
  const CATEGORIES = useMemo(() => {
    const cats = [...new Set(products.map(p => p.category))].filter(Boolean)
    return [
      { id: 'all', label: t.order.allProducts },
      ...cats.map(id => ({ id, label: categoryLabels[id] || id })),
    ]
  }, [products, t, categoryLabels])

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return products.filter(p => {
      if (activeCat !== 'all' && p.category !== activeCat) return false
      if (q) {
        return p.name.toLowerCase().includes(q) || p.dosageForm.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      }
      return true
    })
  }, [products, activeCat, search])

  const isInCart = (productId: string) => items.some(i => i.productId === productId)
  const getCartQty = (productId: string) => items.find(i => i.productId === productId)?.quantity || 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) return
    setSubmitStatus('submitting')

    const productLines = items.map(i => `- ${i.productName} x ${i.quantity}`).join('\n')
    const message = `Order Inquiry\n\nProducts:\n${productLines}\n\nTotal items: ${itemCount}\n\n${form.message ? `Notes:\n${form.message}` : ''}`

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          country: form.country,
          message,
          formSource: 'order',
          inquiryType: 'Order Inquiry',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitStatus('success')
        clearCart()
        setForm({ name: '', email: '', company: '', country: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    }
  }

  return (
    <>
      {/* Hero */}
      <StrapiHeroCarousel
        page="order-now"
        badge="ORDER CENTER"
        badgeColor="text-emerald-400"
        heading={t.order.orderNow}
        description={t.order.browseCatalog}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT: Product Catalog */}
          <div className="flex-1 min-w-0">
            {/* Search + Category Filter */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 shadow-sm">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder={t.order.searchProducts}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                />
              </div>
              <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCat(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                      activeCat === cat.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-slate-500">
                <Package className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p>{t.order.noProducts}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {filtered.map(product => {
                  const inCart = isInCart(product.id)
                  const qty = getCartQty(product.id)
                  return (
                    <div key={product.id} className={`bg-white rounded-xl border p-4 transition-all ${inCart ? 'border-emerald-300 bg-emerald-50/30' : 'border-slate-200 hover:border-slate-300'}`}>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <Link href={`/products/${product.slug}`} className="font-medium text-sm text-slate-900 hover:text-emerald-600 line-clamp-2 flex-1">
                          {product.name}
                        </Link>
                      </div>
                      <p className="text-xs text-slate-500 mb-3">{product.dosageForm}</p>

                      {inCart ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <button onClick={() => updateQuantity(product.id, qty - 1)} className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-bold text-emerald-700">{qty}</span>
                            <button onClick={() => updateQuantity(product.id, qty + 1)} className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button onClick={() => removeItem(product.id)} className="text-xs text-red-400 hover:text-red-600">{t.order.remove}</button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addItem({ productId: product.id, productName: product.name, slug: product.slug })}
                          className="w-full py-2 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" /> {t.order.addToOrder}
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* RIGHT: Cart Sidebar */}
          <div className="w-full lg:w-80 xl:w-96 shrink-0">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm sticky top-24">
              {/* Cart Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-emerald-600" />
                  <h2 className="font-bold text-slate-900">{t.order.yourOrder}</h2>
                  {itemCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">{itemCount}</span>
                  )}
                </div>
                {items.length > 0 && !showCheckout && (
                  <button onClick={clearCart} className="text-xs text-slate-400 hover:text-red-500">{t.order.clearAll}</button>
                )}
              </div>

              {/* Cart Content */}
              <div className="max-h-[60vh] overflow-y-auto">
                {submitStatus === 'success' ? (
                  <div className="p-8 text-center">
                    <CheckCircle className="w-14 h-14 text-emerald-500 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{t.order.orderSubmitted}</h3>
                    <p className="text-sm text-slate-600 mb-4">{t.order.orderResponse}</p>
                    <button onClick={() => { setSubmitStatus('idle'); setShowCheckout(false) }} className="px-5 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700">
                      {t.order.newOrder}
                    </button>
                  </div>
                ) : items.length === 0 ? (
                  <div className="p-8 text-center">
                    <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-sm font-medium text-slate-900 mb-1">{t.order.cartEmpty}</p>
                    <p className="text-xs text-slate-500">{t.order.addProducts}</p>
                  </div>
                ) : !showCheckout ? (
                  <div className="p-4">
                    <div className="space-y-2 mb-4">
                      {items.map(item => (
                        <div key={item.productId} className="flex items-center gap-2 bg-slate-50 rounded-lg p-2.5">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 line-clamp-1">{item.productName}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button onClick={() => removeItem(item.productId)} className="text-slate-400 hover:text-red-500 ml-1">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setShowCheckout(true)}
                      className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" /> {t.order.proceedSubmit} ({itemCount})
                    </button>
                  </div>
                ) : (
                  <div className="p-4">
                    <button onClick={() => setShowCheckout(false)} className="text-xs text-slate-500 hover:text-slate-700 mb-3 flex items-center gap-1">
                      <ArrowLeft className="w-3 h-3" /> {t.order.backToCart}
                    </button>

                    {submitStatus === 'error' && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-2.5 mb-3 flex items-center gap-2 text-xs text-red-700">
                        <AlertCircle className="w-4 h-4 shrink-0" /> {t.order.somethingWrong}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-2.5">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">{t.order.fullName} *</label>
                        <input type="text" required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">{t.order.email} *</label>
                        <input type="email" required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">{t.order.company}</label>
                        <input type="text" value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">{t.order.country}</label>
                        <input type="text" value={form.country} onChange={e => setForm(p => ({ ...p, country: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">{t.order.notes}</label>
                        <textarea rows={2} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm resize-none" />
                      </div>
                      <button type="submit" disabled={submitStatus === 'submitting'}
                        className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 disabled:opacity-50 flex items-center justify-center gap-2">
                        {submitStatus === 'submitting' ? (
                          <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {t.order.submitting}</>
                        ) : (
                          <><Send className="w-4 h-4" /> {t.order.submitOrder}</>
                        )}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
