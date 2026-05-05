import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowLeft, MapPin, Briefcase, Clock, ArrowRight, Send, CheckCircle } from 'lucide-react'
import { getJobBySlug, getRelatedJobs, getAllJobPostings } from '@/lib/content'
import AutoText from '@/components/common/AutoText'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateStaticParams() {
  const jobs = getAllJobPostings()
  return jobs.map((job) => ({
    slug: job.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const job = getJobBySlug(slug)
  
  if (!job) {
    return { title: 'Job Not Found - Careers - Raysun Biopharma' }
  }
  
  return {
    title: `${job.title} - ${job.department} - Careers - Raysun Biopharma`,
    description: job.summary,
  }
}

export default async function JobDetail({ params }: Props) {
  const { slug } = await params
  const job = getJobBySlug(slug)
  
  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4"><AutoText>Job Not Found</AutoText></h1>
          <Link href="/careers" className="text-[#1E6F5C] hover:underline">
            <AutoText>← Back to Careers</AutoText>
          </Link>
        </div>
      </div>
    )
  }
  
  const relatedJobs = getRelatedJobs(job.id)

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/careers" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-[#1E6F5C]">
            <ArrowLeft className="w-4 h-4" /> <AutoText>Back to Careers</AutoText>
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-3">
            <span><AutoText>{job.department}</AutoText></span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4"><AutoText>{job.title}</AutoText></h1>
          <div className="flex flex-wrap gap-6 text-slate-300">
            <span className="flex items-center gap-2">
              <MapPin className="w-5 h-5" /><AutoText>{job.location}</AutoText>
            </span>
            <span className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" /><AutoText>{job.department}</AutoText>
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5" /><AutoText>{job.type}</AutoText>
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Summary */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4"><AutoText>Overview</AutoText></h2>
              <p className="text-slate-600 leading-relaxed"><AutoText>{job.summary}</AutoText></p>
            </div>

            {/* Responsibilities */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4"><AutoText>Responsibilities</AutoText></h2>
              <ul className="space-y-3">
                {job.responsibilities.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#1E6F5C] flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700"><AutoText>{item}</AutoText></span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4"><AutoText>Requirements</AutoText></h2>
              <ul className="space-y-3">
                {job.requirements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#1E6F5C] flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700"><AutoText>{item}</AutoText></span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Preferred Qualifications */}
            {job.preferred && job.preferred.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-4"><AutoText>Preferred Qualifications</AutoText></h2>
                <ul className="space-y-3">
                  {job.preferred.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs text-slate-500">{idx + 1}</span>
                      </div>
                      <span className="text-slate-700"><AutoText>{item}</AutoText></span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h3 className="font-semibold text-slate-900 mb-4"><AutoText>Apply for this Position</AutoText></h3>
              <p className="text-sm text-slate-600 mb-4">
                <AutoText>Interested in this role? Submit your application and we&apos;ll be in touch.</AutoText>
              </p>
              <button className="w-full bg-[#1E6F5C] text-white py-3 rounded-lg font-medium hover:bg-[#165a4a] flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> <AutoText>Apply Now</AutoText>
              </button>
              <p className="text-xs text-slate-500 mt-4 text-center">
                <AutoText>Or email your CV to</AutoText><br />
                <a href="mailto:info@raysunpharma.com" className="text-[#1E6F5C] hover:underline">
                  info@raysunpharma.com
                </a>
              </p>
            </div>

            {/* Job Details */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-4"><AutoText>Job Details</AutoText></h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500"><AutoText>Department</AutoText></span>
                  <span className="text-slate-900 font-medium"><AutoText>{job.department}</AutoText></span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500"><AutoText>Location</AutoText></span>
                  <span className="text-slate-900 font-medium"><AutoText>{job.location}</AutoText></span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500"><AutoText>Job Type</AutoText></span>
                  <span className="text-slate-900 font-medium"><AutoText>{job.type}</AutoText></span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500"><AutoText>Posted</AutoText></span>
                  <span className="text-slate-900 font-medium">{new Date(job.postedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Jobs */}
        {relatedJobs.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6"><AutoText>Related Positions</AutoText></h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedJobs.map((relatedJob) => (
                <Link
                  key={relatedJob.id}
                  href={`/careers/${relatedJob.slug}`}
                  className="bg-slate-50 rounded-xl p-5 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-slate-900 mb-2"><AutoText>{relatedJob.title}</AutoText></h3>
                  <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                    <span><AutoText>{relatedJob.department}</AutoText></span>
                    <span>•</span>
                    <span><AutoText>{relatedJob.location}</AutoText></span>
                  </div>
                  <div className="mt-3 text-[#1E6F5C] text-sm font-medium flex items-center gap-1">
                    <AutoText>View Details</AutoText> <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-600 mb-4"><AutoText>Interested in other opportunities?</AutoText></p>
          <Link href="/careers" className="text-[#1E6F5C] font-medium hover:underline flex items-center justify-center gap-2">
            <AutoText>View All Open Positions</AutoText> <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
