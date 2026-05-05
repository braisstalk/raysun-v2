import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowLeft, Calendar, User, FileText } from 'lucide-react'
import { getNewsArticleBySlug, getRelatedNews, getAllNewsArticles } from '@/lib/content'
import AutoText from '@/components/common/AutoText'
import { buildPageMetadata } from '@/lib/seo/metadata'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateStaticParams() {
  const articles = getAllNewsArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const article = getNewsArticleBySlug(slug)
  const path = `/news/${slug}`

  return buildPageMetadata({
    locale,
    path,
    title: article ? `${article.title} - News` : 'Article Not Found - News',
    description: article?.excerpt,
  })
}

export default async function NewsDetail({ params }: Props) {
  const { slug } = await params
  const article = getNewsArticleBySlug(slug)
  const relatedArticles = article ? getRelatedNews(article.id) : []

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-2xl font-bold text-slate-900 mb-4"><AutoText text="Article Not Found" as="span" /></h1>
          <p className="text-slate-600 mb-6"><AutoText text="The article you are looking for does not exist." as="span" /></p>
          <Link href="/news" className="inline-flex items-center gap-2 text-[#1E6F5C] font-medium hover:underline">
            <ArrowLeft className="w-4 h-4" /> <AutoText text="Back to News" as="span" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-slate-50 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-slate-500 hover:text-[#1E6F5C]"><AutoText text="Home" as="span" /></Link>
            <span className="text-slate-400">/</span>
            <Link href="/news" className="text-slate-500 hover:text-[#1E6F5C]"><AutoText text="News" as="span" /></Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 truncate max-w-[200px]">{article.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-[#1E6F5C] text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-[#1E6F5C] mb-4">
            <span className="bg-white/10 px-3 py-1 rounded-full">{article.category}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-slate-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{article.date}</span>
            </div>
            {article.author && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {article.image ? (
          <div className="rounded-xl overflow-hidden h-64 md:h-96 bg-slate-100">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl h-64 md:h-96 flex items-center justify-center">
            <div className="text-center text-slate-400">
              <FileText className="w-16 h-16 mx-auto mb-2" />
              <p><AutoText text="Article Image" as="span" /></p>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {article.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.includes('- ') || paragraph.includes('• ')) {
                const lines = paragraph.split('\n').filter(l => l.trim())
                return (
                  <div key={idx} className="my-6">
                    {lines.map((line, lineIdx) => {
                      const isBullet = line.trimStart().startsWith('- ') || line.trimStart().startsWith('• ')
                      const text = isBullet ? line.replace(/^\s*[-•]\s*/, '') : line
                      return (
                        <p key={lineIdx} className="text-slate-700 mb-2">
                          {isBullet && <span className="text-[#1E6F5C] mr-2">•</span>}
                          {text}
                        </p>
                      )
                    })}
                  </div>
                )
              }
              return (
                <p key={idx} className="text-slate-700 mb-6 leading-relaxed">
                  {paragraph}
                </p>
              )
            })}
          </div>

          <div className="mt-12 pt-8 border-t">
            <Link href="/news" className="inline-flex items-center gap-2 text-[#1E6F5C] font-medium hover:gap-3 transition-all">
              <ArrowLeft className="w-4 h-4" /> <AutoText text="Back to News" as="span" />
            </Link>
          </div>
        </div>
      </section>

      {/* Related News */}
      {relatedArticles.length > 0 && (
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8"><AutoText text="Related News" as="span" /></h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  href={`/news/${related.slug}`}
                  className="group bg-white rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                >
                  {related.image ? (
                    <div className="h-32 overflow-hidden bg-slate-100">
                      <img src={related.image} alt={related.title} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  ) : (
                    <div className="h-32 bg-gradient-to-br from-slate-200 to-slate-300" />
                  )}
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-xs text-[#1E6F5C] mb-2">
                      <span>{related.date}</span>
                      <span>•</span>
                      <span>{related.category}</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-[#1E6F5C] line-clamp-2">
                      {related.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
