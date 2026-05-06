'use client'

import Link from 'next/link'
import { FlaskConical, Lightbulb, ArrowRight, CheckCircle, Microscope, Atom, BookOpen, Users, Target, Beaker, Layers, FileText, Award, Handshake, Rocket, Globe } from 'lucide-react'
import { useTranslation } from '@/i18n/useTranslation'
import StrapiHeroCarousel from '@/components/common/StrapiHeroCarousel'
import { usePageContent } from '@/lib/strapi/usePageContent'
import AutoText from '@/components/common/AutoText'
import BrandPlaceholder from '@/components/common/BrandPlaceholder'

const iconMap: Record<string, React.ElementType> = {
  FlaskConical, Lightbulb, Microscope, Atom, BookOpen, Users, Target, Beaker, Layers, FileText, Award, Handshake, Rocket, Globe,
}

export default function RdInnovation() {
  const { t } = useTranslation()
  const cms = usePageContent('rd-innovation')

  const rdStats = cms?.stats || [
    { value: '15+', label: 'R&D Scientists' },
    { value: '30+', label: 'Products in Pipeline' },
    { value: '8', label: 'Dosage Forms' },
    { value: '5+', label: 'Research Partnerships' },
  ]

  const rdCapabilities = cms?.focusAreas || [
    { icon: 'FlaskConical', title: 'Generic Drug Development', description: 'Full-cycle development of generic pharmaceuticals from formulation screening through bioequivalence studies.' },
    { icon: 'Layers', title: 'Formulation Innovation', description: 'Development of novel drug delivery systems including sustained-release formulations.' },
    { icon: 'Beaker', title: 'Analytical Method Development', description: 'Development and validation of analytical methods for quality control testing.' },
    { icon: 'Microscope', title: 'Stability Studies', description: 'ICH-compliant stability programs supporting product registrations across climatic zones.' },
    { icon: 'Atom', title: 'Process Optimization', description: 'Continuous improvement through Design of Experiments (DoE) and process analytical technology.' },
    { icon: 'BookOpen', title: 'Regulatory Dossier Preparation', description: 'Complete registration dossiers in CTD/eCTD format for multi-market submissions.' },
  ]

  const pipeline = cms?.pipeline || [
    { phase: 'Registration', count: 8, description: 'Products in active registration across target markets' },
    { phase: 'Stability Studies', count: 6, description: 'Products undergoing stability studies' },
    { phase: 'Formulation', count: 10, description: 'Products in formulation development' },
  ]

  const capabilities = cms?.capabilities || [
    'HPLC & UPLC Analysis', 'Dissolution Testing', 'Stability Chambers (ICH zones)',
    'Microbiological Testing', 'Particle Size Analysis', 'Karl Fischer Moisture Analysis',
  ]

  return (
    <>
      <StrapiHeroCarousel
        page="rd-innovation"
        badge="R&D"
        badgeColor="text-blue-300"
        heading={t.hero.rdTitle}
        description={t.hero.rdSubtitle}
      />

      {/* R&D Stats */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {rdStats.map((stat: any, idx: number) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#1E6F5C]">{stat.value}</div>
                <div className="text-sm text-slate-600 mt-1"><AutoText>{stat.label}</AutoText></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* R&D Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#1E6F5C] font-medium mb-2"><AutoText>OUR R&D VISION</AutoText></p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"><AutoText>Innovation for Accessible Healthcare</AutoText></h2>
              <p className="text-slate-600 mb-4"><AutoText>Our research and development strategy is anchored in a clear mission: to develop high-quality, affordable pharmaceutical products that address unmet healthcare needs in emerging markets.</AutoText></p>
              <p className="text-slate-600 mb-6"><AutoText>We focus on adapting proven active pharmaceutical ingredients into improved formulations — better bioavailability, improved stability in tropical climates, and patient-friendly dosage forms.</AutoText></p>
              <div className="space-y-3">
                {['Affordable access to essential medicines', 'Climate-adapted formulations for tropical markets', 'Patient-centric dosage form innovation', 'WHO Essential Medicines List alignment'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#1E6F5C] shrink-0" />
                    <span className="text-slate-700"><AutoText>{item}</AutoText></span>
                  </div>
                ))}
              </div>
            </div>
            <BrandPlaceholder
              icon={FlaskConical}
              label="R&D Laboratory"
              variant="hero"
              tone="teal"
              rounded="2xl"
              className="h-80"
            />
          </div>
        </div>
      </section>

      {/* R&D Capabilities */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2"><AutoText>R&D CAPABILITIES</AutoText></p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"><AutoText>Full-Spectrum Development Services</AutoText></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rdCapabilities.map((cap: any, idx: number) => {
              const CapIcon = iconMap[cap.icon] || FlaskConical
              return (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <CapIcon className="w-10 h-10 text-[#1E6F5C] mb-4" />
                  <h3 className="font-bold text-slate-900 mb-2"><AutoText>{cap.title}</AutoText></h3>
                  <p className="text-sm text-slate-600"><AutoText>{cap.description}</AutoText></p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pipeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2"><AutoText>PRODUCT PIPELINE</AutoText></p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"><AutoText>Development Pipeline</AutoText></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pipeline.map((item: any, idx: number) => (
              <div key={idx} className="bg-slate-50 rounded-xl p-8 text-center">
                <div className="text-4xl font-bold text-[#1E6F5C] mb-2">{item.count}</div>
                <h3 className="font-bold text-slate-900 mb-2"><AutoText>{item.phase}</AutoText></h3>
                <p className="text-sm text-slate-600"><AutoText>{item.description}</AutoText></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab Capabilities */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2"><AutoText>LABORATORY</AutoText></p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"><AutoText>Analytical Capabilities</AutoText></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {capabilities.map((cap: string, idx: number) => (
              <div key={idx} className="flex items-center gap-2 bg-white rounded-lg p-4">
                <CheckCircle className="w-5 h-5 text-[#1E6F5C] shrink-0" />
                <span className="text-sm text-slate-700"><AutoText>{cap}</AutoText></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#1E6F5C] to-[#165B46]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4"><AutoText>Let&apos;s Innovate Together</AutoText></h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8"><AutoText>Whether you need contract development services, technology transfer support, or a research collaboration partner — our R&D team is ready to help.</AutoText></p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#1E6F5C] px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition-colors"><AutoText>{t.cta.contact}</AutoText> <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/manufacturing" className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"><AutoText>View Manufacturing</AutoText></Link>
          </div>
        </div>
      </section>
    </>
  )
}
