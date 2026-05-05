import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, FileText, Download, ExternalLink, Calendar, BookOpen, Search, Filter } from 'lucide-react'
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
    path: '/what-science-can-do/publications',
    title: 'Publications',
  })
}

const publications = [
  {
    title: 'Quality Assurance in GMP Pharmaceutical Manufacturing: Best Practices for Emerging Markets',
    authors: 'Dr. Somchai Pholsena, Dr. Amy Chen',
    journal: 'International Journal of Pharmaceutical Sciences',
    date: '2025',
    type: 'Research Paper',
    abstract: 'This paper examines quality assurance methodologies suitable for emerging pharmaceutical markets in Southeast Asia, proposing frameworks that balance regulatory compliance with operational efficiency.',
    downloads: 245
  },
  {
    title: 'Advances in Softgel Technology for Improved Bioavailability',
    authors: 'Research Team at Raysun Biopharma',
    journal: 'Journal of Pharmaceutical Technology',
    date: '2025',
    type: 'Technical Review',
    abstract: 'A comprehensive review of recent advances in softgel encapsulation technology, focusing on formulations that enhance drug bioavailability and patient compliance.',
    downloads: 189
  },
  {
    title: 'Sustainable Pharmaceutical Manufacturing: Reducing Environmental Impact',
    authors: 'Dr. Keo Souvannakhot',
    journal: 'Green Chemistry in Pharmacy',
    date: '2024',
    type: 'Sustainability Report',
    abstract: 'Strategies for implementing sustainable manufacturing practices in pharmaceutical production, with case studies from ASEAN-based manufacturers.',
    downloads: 156
  },
  {
    title: 'Pediatric Formulations: Challenges and Solutions in Drug Development',
    authors: 'Dr. Sarah Chen, Dr.Phonekeo Thongsavanh',
    journal: 'Pediatric Pharmaceuticals',
    date: '2024',
    type: 'Research Paper',
    abstract: 'Addressing the unique challenges of developing child-friendly pharmaceutical formulations, including taste masking, dosing accuracy, and acceptability.',
    downloads: 312
  },
  {
    title: 'Regulatory Pathways for Pharmaceutical Products in ASEAN Markets',
    authors: 'Regulatory Affairs Team',
    journal: 'Pharmaceutical Regulatory Journal',
    date: '2024',
    type: 'Guide',
    abstract: 'A practical guide for navigating regulatory requirements across ASEAN member states, facilitating market access for pharmaceutical manufacturers.',
    downloads: 428
  },
  {
    title: 'Antibiotic Stewardship in Manufacturing: Quality Control Perspectives',
    authors: 'Quality Assurance Team',
    journal: 'International Journal of Antimicrobial Agents',
    date: '2024',
    type: 'Research Paper',
    abstract: 'Quality control approaches to ensure antibiotic potency and safety while supporting global efforts to combat antimicrobial resistance.',
    downloads: 178
  },
  {
    title: 'Stability Studies for Tropical Climate Pharmaceutical Storage',
    authors: 'Dr. Vongphachanh Khamsay',
    journal: 'Pharmaceutical Stability',
    date: '2023',
    type: 'Technical Report',
    abstract: 'Guidelines for conducting stability studies appropriate for products destined for tropical climates, addressing temperature and humidity challenges.',
    downloads: 134
  },
  {
    title: 'Building Pharmaceutical Manufacturing Capacity in Least Developed Countries',
    authors: 'Executive Team',
    journal: 'Global Health: Science and Practice',
    date: '2023',
    type: 'Perspective',
    abstract: 'A perspective on building sustainable pharmaceutical manufacturing capabilities in LDCs, drawing from our experience in Laos.',
    downloads: 267
  }
]

const categories = ['All', 'Research Paper', 'Technical Review', 'Sustainability Report', 'Guide', 'Technical Report', 'Perspective']

export default function Publications() {
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
            <p className="text-blue-300 font-medium mb-2"><AutoText>PUBLICATIONS</AutoText></p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <AutoText>Scientific Publications & Research</AutoText>
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl">
              <AutoText>Explore our contributions to pharmaceutical science through peer-reviewed publications, technical reviews, and research papers. Our team is committed to advancing knowledge in pharmaceutical manufacturing and healthcare.</AutoText>
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="bg-slate-50 py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search publications..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                    idx === 0
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <AutoText>{cat}</AutoText>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Publications List */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {publications.map((pub, idx) => (
              <article key={idx} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                        <AutoText>{pub.type}</AutoText>
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Calendar className="w-3 h-3" />
                        <AutoText>{pub.date}</AutoText>
                      </span>
                      <span className="text-xs text-slate-500">
                        <AutoText>{pub.journal}</AutoText>
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2 hover:text-blue-600 transition-colors">
                      <AutoText>{pub.title}</AutoText>
                    </h3>

                    <p className="text-sm text-slate-600 mb-3">
                      <span className="font-medium"><AutoText>{pub.authors}</AutoText></span>
                    </p>

                    <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                      <AutoText>{pub.abstract}</AutoText>
                    </p>

                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                        <Download className="w-4 h-4" />
                        <AutoText>PDF ({pub.downloads})</AutoText>
                      </button>
                      <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
                        <ExternalLink className="w-4 h-4" />
                        <AutoText>View Online</AutoText>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* More Publications CTA */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4"><AutoText>Stay Informed</AutoText></h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            <AutoText>Subscribe to our newsletter to receive updates on new publications and research breakthroughs.</AutoText>
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            <AutoText>Contact for Subscriptions</AutoText> <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
