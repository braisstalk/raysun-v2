'use client'

import Link from 'next/link'
import { Shield, Award, CheckCircle, ArrowRight, FileText, FlaskConical, Eye, ClipboardCheck, BarChart3, RefreshCw, Lock, Globe, BookOpen, Microscope, Leaf } from 'lucide-react'
import { useTranslation } from '@/i18n/useTranslation'
import StrapiHeroCarousel from '@/components/common/StrapiHeroCarousel'
import { usePageContent } from '@/lib/strapi/usePageContent'
import AutoText from '@/components/common/AutoText'
import BrandPlaceholder from '@/components/common/BrandPlaceholder'

const iconMap: Record<string, React.ElementType> = {
  Shield, Award, FileText, FlaskConical, Eye, ClipboardCheck, BarChart3, RefreshCw, Lock, Globe, BookOpen, Microscope, Leaf,
}

export default function QualityCompliance() {
  const { t } = useTranslation()
  const cms = usePageContent('quality-compliance')

  // CMS 使用 qualityPhilosophy，提供 fallback
  const philosophy = (cms?.qualityPhilosophy || cms?.philosophy || {
    title: 'Built on Quality, Driven by Compliance',
    description: 'At Raysun Biopharma, quality is not a department — it is embedded in every aspect of our operations. From facility design to final product release, our quality management system ensures that every product meets the highest standards of safety, efficacy, and purity.',
    checklist: ['Zero tolerance for quality deviations', 'Continuous improvement culture', 'Data-driven decision making', 'Regulatory-first mindset'],
  }) as any

  const certifications = cms?.certifications || [
    { icon: 'Award', title: 'WHO GMP', subtitle: 'Good Manufacturing Practice', description: 'All production lines certified to World Health Organization GMP standards.', year: '2017' },
    { icon: 'Shield', title: 'ISO 9001:2015', subtitle: 'Quality Management System', description: 'Systematic approach to quality management covering all processes.', year: '2021' },
    { icon: 'Leaf', title: 'ISO 14001', subtitle: 'Environmental Management', description: 'Commitment to environmentally responsible manufacturing.', year: '2024' },
  ]

  // CMS 使用 qaActivities，但代码期望 qmsFramework，进行转换
  const qmsFramework = (cms?.qmsFramework || (cms?.qaActivities as any[])?.map((qa: any) => ({
    title: qa.title,
    description: qa.description,
    icon: qa.icon,
  })) || [
    { title: 'Document Control', description: 'Comprehensive SOP management with version control and electronic approval workflows' },
    { title: 'Change Control', description: 'Structured change management process for facilities, processes, and documentation' },
    { title: 'CAPA System', description: 'Corrective and Preventive Action system for continuous quality improvement' },
    { title: 'Training Management', description: 'Competency-based training program for all manufacturing and quality personnel' },
    { title: 'Supplier Qualification', description: 'Rigorous supplier audit and qualification program for raw materials and packaging' },
    { title: 'Batch Record Review', description: '100% review of batch manufacturing records prior to product release' },
  ])

  // CMS 数据是对象数组 {title, items}，fallback 也使用相同结构
  const qcCapabilities = cms?.qcCapabilities || [
    { title: 'Chemical Analysis', items: ['HPLC & UPLC Systems', 'UV-Vis Spectrophotometry', 'Dissolution Testing (USP)', 'Karl Fischer titration'] },
    { title: 'Physical Testing', items: ['Friability & Hardness Testing', 'Particle Size Analysis', 'Disintegration testing'] },
    { title: 'Microbiological Testing', items: ['Bioburden testing', 'Sterility testing', 'Endotoxin (LAL) testing'] },
    { title: 'Stability Studies', items: ['ICH-compliant stability chambers', 'Accelerated stability', 'Photostability testing'] },
  ]

  const regulatoryMarkets = cms?.regulatoryMarkets || [
    { region: 'Laos (FDA)', status: 'Registered', products: 'Full portfolio' },
    { region: 'Thailand (FDA)', status: 'In Progress', products: 'Selected products' },
    { region: 'Cambodia (MOH)', status: 'Registered', products: 'Essential medicines' },
    { region: 'Vietnam (DAV)', status: 'Planned', products: 'Generic portfolio' },
    { region: 'Myanmar (FDA)', status: 'In Progress', products: 'Selected products' },
  ]

  return (
    <>
      <StrapiHeroCarousel
        page="quality-compliance"
        badge="QUALITY"
        badgeColor="text-emerald-400"
        heading={t.hero.qualityTitle}
        description={t.hero.qualitySubtitle}
      />

      {/* Quality Philosophy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#1E6F5C] font-medium mb-2"><AutoText>QUALITY PHILOSOPHY</AutoText></p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"><AutoText>{philosophy.title}</AutoText></h2>
              <p className="text-slate-600 mb-6"><AutoText>{philosophy.description}</AutoText></p>
              <div className="space-y-3">
                {(philosophy.checklist || ['Zero tolerance for quality deviations', 'Continuous improvement culture', 'Data-driven decision making', 'Regulatory-first mindset']).map((item: string) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#1E6F5C] shrink-0" />
                    <span className="text-slate-700"><AutoText>{item}</AutoText></span>
                  </div>
                ))}
              </div>
            </div>
            <BrandPlaceholder
              icon={Shield}
              label="Quality Control Laboratory"
              variant="hero"
              tone="mixed"
              rounded="2xl"
              className="h-80"
            />
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2"><AutoText>CERTIFICATIONS & ACCREDITATIONS</AutoText></p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"><AutoText>Internationally Recognized Standards</AutoText></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert: any, idx: number) => {
              const CertIcon = iconMap[cert.icon] || Award
              return (
                <div key={idx} className="bg-white rounded-xl p-8 shadow-sm">
                  <CertIcon className="w-12 h-12 text-[#1E6F5C] mb-4" />
                  <h3 className="font-bold text-xl text-slate-900 mb-1"><AutoText>{cert.title}</AutoText></h3>
                  <p className="text-sm text-[#1E6F5C] font-medium mb-3"><AutoText>{cert.subtitle}</AutoText></p>
                  <p className="text-sm text-slate-600 mb-4"><AutoText>{cert.description}</AutoText></p>
                  <span className="text-xs text-[#1E6F5C] font-medium bg-[#1E6F5C]/10 px-3 py-1 rounded-full"><AutoText>Since {cert.year}</AutoText></span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* QMS Framework */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2"><AutoText>QUALITY MANAGEMENT SYSTEM</AutoText></p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"><AutoText>Comprehensive QA Framework</AutoText></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {qmsFramework.map((item: any, idx: number) => (
              <div key={idx} className="bg-slate-50 rounded-xl p-6">
                <CheckCircle className="w-10 h-10 text-[#1E6F5C] mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2"><AutoText>{item.title}</AutoText></h3>
                <p className="text-sm text-slate-600"><AutoText>{item.description}</AutoText></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QC Capabilities */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2"><AutoText>QUALITY CONTROL LABORATORY</AutoText></p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"><AutoText>Advanced Analytical Capabilities</AutoText></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(qcCapabilities as any[]).map((cap: any, idx: number) => (
              <div key={idx} className="bg-white rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 mb-4"><AutoText>{cap.title}</AutoText></h3>
                <ul className="space-y-2">
                  {(cap.items || []).map((item: string, itemIdx: number) => (
                    <li key={itemIdx} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-[#1E6F5C] shrink-0 mt-0.5" />
                      <span><AutoText>{item}</AutoText></span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Markets */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2"><AutoText>REGULATORY AFFAIRS</AutoText></p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"><AutoText>Multi-Market Registration</AutoText></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {regulatoryMarkets.map((market: any, idx: number) => (
              <div key={idx} className="bg-slate-50 rounded-xl p-6 text-center">
                <Globe className="w-8 h-8 text-[#1E6F5C] mx-auto mb-3" />
                <h3 className="font-bold text-slate-900 text-sm mb-1"><AutoText>{market.region}</AutoText></h3>
                <span className="text-xs text-[#1E6F5C] font-medium"><AutoText>{market.status}</AutoText></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#1E6F5C] to-[#165B46]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4"><AutoText>Quality You Can Trust</AutoText></h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8"><AutoText>Download our quality certifications or contact our regulatory affairs team.</AutoText></p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/resources" className="inline-flex items-center gap-2 bg-white text-[#1E6F5C] px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition-colors">
              <FileText className="w-4 h-4" /> <AutoText>Download Certifications</AutoText>
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
              <AutoText>{t.cta.contact}</AutoText> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
