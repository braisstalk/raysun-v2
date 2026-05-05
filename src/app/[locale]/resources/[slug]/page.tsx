import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowLeft, FileText, Download, Mail, Eye, Lock, Clock, CheckCircle } from 'lucide-react'
import { getResourceBySlug, getRelatedResources, getAllResources } from '@/lib/content'
import type { ResourceStatus } from '@/lib/content/types/content-resources'
import AutoText from '@/components/common/AutoText'
import { buildPageMetadata } from '@/lib/seo/metadata'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

const statusConfig: Record<ResourceStatus, { label: string; description: string; color: string }> = {
  public: {
    label: 'Public',
    description: 'Available for direct download',
    color: 'bg-green-100 text-green-700',
  },
  request: {
    label: 'Request Access',
    description: 'Submit a request to access this resource',
    color: 'bg-amber-100 text-amber-700',
  },
  restricted: {
    label: 'Restricted',
    description: 'Authorized personnel only',
    color: 'bg-red-100 text-red-700',
  },
  pending: {
    label: 'Pending',
    description: 'Awaiting approval',
    color: 'bg-gray-100 text-gray-700',
  },
}

export async function generateStaticParams() {
  const resources = getAllResources()
  return resources.map((resource) => ({
    slug: resource.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const resource = getResourceBySlug(slug)
  const path = `/resources/${slug}`

  return buildPageMetadata({
    locale,
    path,
    title: resource ? `${resource.title} - Resources` : 'Resource Not Found - Resources',
    description: resource?.description,
  })
}

export default async function ResourceDetail({ params }: Props) {
  const { slug } = await params
  const resource = getResourceBySlug(slug)
  const relatedResources = resource ? getRelatedResources(resource.id) : []

  if (!resource) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-2xl font-bold text-slate-900 mb-4"><AutoText text="Resource Not Found" as="span" /></h1>
          <p className="text-slate-600 mb-6"><AutoText text="The resource you are looking for does not exist." as="span" /></p>
          <Link href="/resources" className="inline-flex items-center gap-2 text-[#1E6F5C] font-medium hover:underline">
            <ArrowLeft className="w-4 h-4" /> <AutoText text="Back to Resources" as="span" />
          </Link>
        </div>
      </div>
    )
  }

  const status = statusConfig[resource.status]

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-slate-50 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-slate-500 hover:text-[#1E6F5C]"><AutoText text="Home" as="span" /></Link>
            <span className="text-slate-400">/</span>
            <Link href="/resources" className="text-slate-500 hover:text-[#1E6F5C]"><AutoText text="Resources" as="span" /></Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 truncate max-w-[200px]">{resource.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-[#1E6F5C] text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-[#1E6F5C] mb-4">
            <span className="bg-white/10 px-3 py-1 rounded-full">{resource.type}</span>
            <span className={`px-3 py-1 rounded-full text-xs ${status.color}`}>{status.label}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{resource.title}</h1>
          <p className="text-lg text-slate-300">{resource.description}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              <div className="prose prose-lg max-w-none">
                <p className="text-slate-700 mb-6">{resource.description}</p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4 mt-8">
                {resource.status === 'public' && resource.downloadUrl && (
                  <a
                    href={resource.downloadUrl}
                    className="inline-flex items-center gap-2 bg-[#1E6F5C] hover:bg-[#289c76] text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    <Download className="w-4 h-4" /> <AutoText text="Download" as="span" />
                  </a>
                )}
                {resource.status === 'request' && (
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    <Mail className="w-4 h-4" /> <AutoText text="Request Access" as="span" />
                  </Link>
                )}
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border-2 border-[#1E6F5C] text-[#1E6F5C] hover:bg-[#1E6F5C] hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <AutoText text="Contact Us" as="span" />
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status */}
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4"><AutoText text="Status" as="span" /></h3>
                <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${status.color}`}>
                  {resource.status === 'public' && <Eye className="w-4 h-4" />}
                  {resource.status === 'request' && <Mail className="w-4 h-4" />}
                  {resource.status === 'restricted' && <Lock className="w-4 h-4" />}
                  <span className="text-sm font-medium">{status.label}</span>
                </div>
                <p className="text-sm text-slate-500 mt-2">{status.description}</p>
              </div>

              {/* Details */}
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4"><AutoText text="Details" as="span" /></h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between">
                    <span className="text-slate-500"><AutoText text="Type" as="span" /></span>
                    <span className="text-slate-900">{resource.type}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-500"><AutoText text="Category" as="span" /></span>
                    <span className="text-slate-900">{resource.category}</span>
                  </li>
                  {resource.fileSize && (
                    <li className="flex justify-between">
                      <span className="text-slate-500"><AutoText text="Size" as="span" /></span>
                      <span className="text-slate-900">{resource.fileSize}</span>
                    </li>
                  )}
                  {resource.fileSize && (
                    <li className="flex justify-between">
                      <span className="text-slate-500"><AutoText text="File Size" as="span" /></span>
                      <span className="text-slate-900">{resource.fileSize}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t">
            <Link href="/resources" className="inline-flex items-center gap-2 text-[#1E6F5C] font-medium hover:gap-3 transition-all">
              <ArrowLeft className="w-4 h-4" /> <AutoText text="Back to Resources" as="span" />
            </Link>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      {relatedResources.length > 0 && (
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8"><AutoText text="Related Resources" as="span" /></h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedResources.map((related) => (
                <Link
                  key={related.id}
                  href={`/resources/${related.slug}`}
                  className="group bg-white rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-8 h-8 text-[#1E6F5C]" />
                    <span className={`text-xs px-2 py-1 rounded-full ${statusConfig[related.status].color}`}>
                      {statusConfig[related.status].label}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-[#1E6F5C] mb-2">
                    {related.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2">{related.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
