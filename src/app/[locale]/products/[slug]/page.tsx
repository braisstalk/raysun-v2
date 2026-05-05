import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowLeft, Shield, FileText, ArrowRight, Check } from 'lucide-react'
import { getProductBySlug, getAllProducts } from '@/lib/content'
import { productsPageConfig } from '@/config/products'
import AutoText from '@/components/common/AutoText'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateStaticParams() {
  const products = getAllProducts()
  return products.map((product) => ({
    slug: product.slug || product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return { title: 'Product Not Found - Products - Raysun Biopharma' }
  }

  return {
    title: `${product.name} - Products - Raysun Biopharma`,
    description: product.description,
  }
}

export default async function ProductDetail({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-2xl font-bold text-slate-900 mb-4"><AutoText text="Product Not Found" as="span" /></h1>
          <p className="text-slate-600 mb-6"><AutoText text="The product you are looking for does not exist." as="span" /></p>
          <Link href="/products" className="inline-flex items-center gap-2 text-[#1E6F5C] font-medium hover:underline">
            <ArrowLeft className="w-4 h-4" /> <AutoText text="Back to Products" as="span" />
          </Link>
        </div>
      </div>
    )
  }

  const category = productsPageConfig.categories.find(c => c.id === product.category)

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-slate-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-slate-500 hover:text-[#1E6F5C]"><AutoText text="Home" as="span" /></Link>
            <span className="text-slate-400">/</span>
            <Link href="/products" className="text-slate-500 hover:text-[#1E6F5C]"><AutoText text="Products" as="span" /></Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-[#1E6F5C] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-[#1E6F5C] mb-4">
            <span className="bg-white/10 px-3 py-1 rounded-full">{category?.name || product.category}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{product.name}</h1>
          <p className="text-lg text-slate-300 max-w-2xl">{product.description}</p>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div>
              {product.documents?.sheet ? (
                <div className="rounded-xl overflow-hidden bg-slate-100 h-96">
                  <img src={product.documents.sheet} alt={product.name} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl h-96 flex items-center justify-center">
                  <div className="text-center text-slate-400">
                    <FileText className="w-16 h-16 mx-auto mb-2" />
                    <p><AutoText text="Product Image" as="span" /></p>
                  </div>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{product.name}</h2>
              <p className="text-slate-600 mb-6">{product.description}</p>

              {/* Specifications */}
              {product.features && product.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4"><AutoText text="Specifications" as="span" /></h3>
                  <ul className="space-y-2">
                    {product.features.map((spec, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-[#1E6F5C] mt-0.5" />
                        <span className="text-slate-600">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Certifications */}
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
                <Shield className="w-4 h-4 text-[#1E6F5C]" />
                <span><AutoText text="WHO GMP Certified" as="span" /></span>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#1E6F5C] hover:bg-[#289c76] text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <AutoText text="Contact Us" as="span" /> <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/order-now"
                  className="inline-flex items-center gap-2 border-2 border-[#1E6F5C] text-[#1E6F5C] hover:bg-[#1E6F5C] hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <AutoText text="Request Quote" as="span" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Products */}
      <section className="py-8 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/products" className="inline-flex items-center gap-2 text-[#1E6F5C] font-medium hover:gap-3 transition-all">
            <ArrowLeft className="w-4 h-4" /> <AutoText text="Back to Products" as="span" />
          </Link>
        </div>
      </section>
    </>
  )
}
