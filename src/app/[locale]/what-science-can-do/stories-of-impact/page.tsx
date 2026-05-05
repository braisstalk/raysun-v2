import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Heart, Users, Globe, Award, MapPin, Calendar } from 'lucide-react'
import AutoText from '@/components/common/AutoText'
import { buildPageMetadata } from '@/lib/seo/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata({
    locale,
    path: '/what-science-can-do/stories-of-impact',
    title: 'Stories of Impact',
  })
}

const stories = [
  {
    title: 'Expanding Access to Essential Medicines in Rural Laos',
    category: 'Healthcare Access',
    date: 'December 2025',
    excerpt: 'How our partnership with local distributors is bringing life-saving medicines to remote communities across Laos, improving health outcomes for thousands of families.',
    impact: '50,000+ patients reached',
    location: 'Laos',
    image: 'bg-gradient-to-br from-green-600 to-teal-600'
  },
  {
    title: 'Fighting Antibiotic Resistance Through Quality Manufacturing',
    category: 'Quality & Safety',
    date: 'November 2025',
    excerpt: 'Our commitment to WHO GMP standards ensures that every antibiotic we produce meets the highest quality benchmarks, helping combat the global challenge of resistance.',
    impact: '25+ antibiotic products',
    location: 'Regional',
    image: 'bg-gradient-to-br from-blue-600 to-indigo-600'
  },
  {
    title: 'Pediatric Formulations: Making Medicine Child-Friendly',
    category: 'Innovation',
    date: 'October 2025',
    excerpt: 'Developing child-appropriate formulations that improve adherence and reduce the struggle of giving medicine to children, from flavored syrups to easy-to-swallow tablets.',
    impact: '20+ pediatric products',
    location: 'ASEAN Region',
    image: 'bg-gradient-to-br from-pink-500 to-rose-500'
  },
  {
    title: 'Supporting Healthcare Workers Through Training Programs',
    category: 'Capacity Building',
    date: 'September 2025',
    excerpt: 'Our educational initiatives for healthcare professionals ensure proper handling, storage, and administration of pharmaceutical products across the supply chain.',
    impact: '500+ healthcare workers trained',
    location: 'Multiple Countries',
    image: 'bg-gradient-to-br from-amber-500 to-orange-500'
  },
  {
    title: 'Sustainable Manufacturing: Reducing Our Environmental Footprint',
    category: 'Sustainability',
    date: 'August 2025',
    excerpt: 'Implementing green manufacturing practices that minimize waste and reduce energy consumption while maintaining the highest quality standards.',
    impact: '30% energy reduction',
    location: 'Laos',
    image: 'bg-gradient-to-br from-emerald-600 to-green-600'
  },
  {
    title: 'Women in Science: Empowering Our Research Team',
    category: 'People & Culture',
    date: 'July 2025',
    excerpt: 'Highlighting the contributions of our female scientists and researchers who drive innovation in our R&D laboratories.',
    impact: '45% women in R&D',
    location: 'Vientiane',
    image: 'bg-gradient-to-br from-purple-600 to-violet-600'
  }
]

const categories = ['All', 'Healthcare Access', 'Quality & Safety', 'Innovation', 'Capacity Building', 'Sustainability', 'People & Culture']

export default function StoriesOfImpact() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Link href="/what-science-can-do" className="text-blue-300 hover:text-blue-200 mb-4 inline-flex items-center">
              <AutoText>← Back to What Science Can Do</AutoText>
            </Link>
            <p className="text-blue-300 font-medium mb-2"><AutoText>STORIES OF IMPACT</AutoText></p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <AutoText>Real Stories, Real Impact</AutoText>
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl">
              <AutoText>Discover how Raysun Biopharma is transforming healthcare across Southeast Asia and beyond. Each story represents our commitment to improving lives through pharmaceutical science.</AutoText>
            </p>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story, idx) => (
              <article key={idx} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100">
                {/* Image Placeholder */}
                <div className={`h-48 ${story.image} relative`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                      <AutoText>{story.category}</AutoText>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <AutoText>{story.date}</AutoText>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <AutoText>{story.location}</AutoText>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    <AutoText>{story.title}</AutoText>
                  </h3>

                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                    <AutoText>{story.excerpt}</AutoText>
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-600"><AutoText>{story.impact}</AutoText></span>
                    </div>
                    <Link
                      href="#"
                      className="text-sm text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
                    >
                      <AutoText>Read more</AutoText> <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4"><AutoText>Share Your Story</AutoText></h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            <AutoText>Are you a patient, healthcare provider, or partner who wants to share how our medicines have made a difference? We&apos;d love to hear from you.</AutoText>
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            <AutoText>Contact Us</AutoText> <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
