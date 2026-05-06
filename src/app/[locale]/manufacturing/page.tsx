'use client'

import Link from 'next/link'
import { Factory, Shield, Award, Gauge, FlaskConical, Package, Droplets, Syringe, Pill, CheckCircle, ArrowRight, Thermometer, Wind, Eye } from 'lucide-react'
import { useTranslation } from '@/i18n/useTranslation'
import StrapiHeroCarousel from '@/components/common/StrapiHeroCarousel'
import { usePageContent } from '@/lib/strapi/usePageContent'
import AutoText from '@/components/common/AutoText'
import BrandPlaceholder from '@/components/common/BrandPlaceholder'

const iconMap: Record<string, React.ElementType> = {
  Factory, Shield, Award, Gauge, FlaskConical, Package, Droplets, Syringe, Pill, Thermometer, Wind, Eye,
}

export default function Manufacturing() {
  const { t } = useTranslation()
  const cms = usePageContent('manufacturing')

  const facilityStats = cms?.facilityStats || [
    { value: '12,000', unit: 'm²', label: 'Total Facility Area' },
    { value: '6', unit: '', label: 'Production Lines' },
    { value: '50+', unit: '', label: 'Products Manufactured' },
    { value: '24/7', unit: '', label: 'Operational Capability' },
  ]

  const productionLines = cms?.productionLines || [
    { icon: 'Pill', title: 'Tablets & Film-Coated Tablets', description: 'High-speed tablet compression and film-coating lines.', specs: ['Capacity: 200 million tablets/year', 'Compression: rotary press technology', 'Coating: fully automated film-coating system'] },
    { icon: 'Droplets', title: 'Softgel Capsules', description: 'State-of-the-art rotary die softgel encapsulation.', specs: ['Capacity: 100 million capsules/year', 'Fill range: 100mg - 1500mg', 'Gelatin and vegetarian options'] },
    { icon: 'Package', title: 'Hard Capsules', description: 'Automatic capsule filling lines for powder and pellet formulations.', specs: ['Capacity: 150 million capsules/year', 'Sizes: 00 to 4', 'Powder and pellet filling'] },
    { icon: 'Syringe', title: 'Sterile Injectables', description: 'Dedicated sterile manufacturing area with laminar flow isolators.', specs: ['ISO Class 5 cleanroom', 'Ampoules and vials', 'Terminal sterilization & aseptic fill'] },
    { icon: 'Droplets', title: 'Creams & Ointments', description: 'Semi-solid manufacturing with vacuum homogenizers.', specs: ['Batch size: 50-500 kg', 'Vacuum homogenization', 'Automated tube/jar filling'] },
    { icon: 'FlaskConical', title: 'Oral Liquids & Syrups', description: 'Liquid manufacturing and filling lines for oral solutions.', specs: ['Batch size: 500-5000 L', 'In-line filtration', 'Automatic bottle filling & capping'] },
  ]

  const facilityFeatures = cms?.facilityFeatures || [
    { icon: 'Wind', title: 'HVAC Systems', description: 'Centralized HVAC with HEPA filtration maintaining ISO Class 7/8 cleanroom environments.' },
    { icon: 'Thermometer', title: 'Environmental Monitoring', description: 'Continuous temperature, humidity, and differential pressure monitoring.' },
    { icon: 'Eye', title: 'Water Systems', description: 'Purified Water and Water for Injection generation systems.' },
    { icon: 'Gauge', title: 'Utilities Infrastructure', description: 'Dedicated pharmaceutical-grade utilities including compressed air and steam systems.' },
  ]

  const certifications = cms?.certifications || [
    { title: 'WHO GMP', description: 'World Health Organization Good Manufacturing Practice certification for all production lines', year: '2017' },
    { title: 'ISO 9001:2015', description: 'Quality Management System certification ensuring consistent quality standards', year: '2021' },
    { title: 'ISO 14001', description: 'Environmental Management System certification for sustainable manufacturing', year: '2024' },
  ]

  const qcSteps = cms?.qcSteps || [
    { step: '01', title: 'Raw Material Testing', description: 'Identity, purity, and potency testing of all incoming materials' },
    { step: '02', title: 'In-Process Controls', description: 'Real-time monitoring of critical process parameters during production' },
    { step: '03', title: 'Finished Product Testing', description: 'Comprehensive testing including dissolution, assay, and stability' },
    { step: '04', title: 'Packaging & Labeling', description: 'Automated inspection systems for packaging integrity and label accuracy' },
    { step: '05', title: 'Batch Release', description: 'QA review and batch release by qualified persons before distribution' },
  ]

  const facilityOverview = cms?.facilityOverview || {
    title: 'World-Class Manufacturing Facility',
    description: 'Our 12,000 m² manufacturing facility in Vientiane, Laos is designed and built to international pharmaceutical standards. The facility houses multiple production lines for diverse dosage forms, supported by comprehensive quality control laboratories and warehousing infrastructure.',
    tags: ['WHO GMP Certified', 'ISO 9001:2015', 'ISO Class 7/8 Cleanrooms'],
  }

  return (
    <>
      <StrapiHeroCarousel
        page="manufacturing"
        badge="MANUFACTURING"
        badgeColor="text-blue-300"
        heading={t.hero.manufacturingTitle}
        description={t.hero.manufacturingSubtitle}
      />

      {/* Facility Stats */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {facilityStats.map((stat: any, idx: number) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#1E6F5C]">{stat.value}<span className="text-lg font-normal text-slate-500">{stat.unit}</span></div>
                <div className="text-sm text-slate-600 mt-1"><AutoText>{stat.label}</AutoText></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#1E6F5C] font-medium mb-2"><AutoText>OUR FACILITY</AutoText></p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6"><AutoText>{facilityOverview.title}</AutoText></h2>
              <p className="text-slate-600 mb-6"><AutoText>{facilityOverview.description}</AutoText></p>
              <div className="flex flex-wrap gap-3">
                {facilityOverview.tags.map((tag: string) => (
                  <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1E6F5C]/10 text-[#1E6F5C] rounded-full text-sm font-medium">
                    <CheckCircle className="w-3.5 h-3.5" /> <AutoText>{tag}</AutoText>
                  </span>
                ))}
              </div>
            </div>
            <BrandPlaceholder
              icon={Factory}
              label="Manufacturing Facility"
              variant="hero"
              tone="mixed"
              rounded="2xl"
              className="h-80"
            />
          </div>
        </div>
      </section>

      {/* Production Lines */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2"><AutoText>PRODUCTION CAPABILITIES</AutoText></p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"><AutoText>Our Production Lines</AutoText></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productionLines.map((line: any, idx: number) => {
              const LineIcon = iconMap[line.icon] || Factory
              return (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <LineIcon className="w-10 h-10 text-[#1E6F5C] mb-4" />
                  <h3 className="font-bold text-slate-900 mb-2"><AutoText>{line.title}</AutoText></h3>
                  <p className="text-sm text-slate-600 mb-4"><AutoText>{line.description}</AutoText></p>
                  <ul className="space-y-1.5">
                    {(line.specs || []).map((spec: string, sIdx: number) => (
                      <li key={sIdx} className="flex items-start gap-2 text-xs text-slate-500">
                        <CheckCircle className="w-3.5 h-3.5 text-[#1E6F5C] mt-0.5 shrink-0" /> <AutoText>{spec}</AutoText>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Facility Infrastructure */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2"><AutoText>INFRASTRUCTURE</AutoText></p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"><AutoText>Pharmaceutical-Grade Infrastructure</AutoText></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilityFeatures.map((feature: any, idx: number) => {
              const FIcon = iconMap[feature.icon] || Shield
              return (
                <div key={idx} className="bg-slate-50 rounded-xl p-6">
                  <FIcon className="w-10 h-10 text-[#1E6F5C] mb-4" />
                  <h3 className="font-semibold text-slate-900 mb-2"><AutoText>{feature.title}</AutoText></h3>
                  <p className="text-sm text-slate-600"><AutoText>{feature.description}</AutoText></p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2"><AutoText>CERTIFICATIONS</AutoText></p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"><AutoText>Manufacturing Certifications</AutoText></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert: any, idx: number) => (
              <div key={idx} className="bg-white rounded-xl p-8 shadow-sm text-center">
                <Award className="w-12 h-12 text-[#1E6F5C] mx-auto mb-4" />
                <h3 className="font-bold text-xl text-slate-900 mb-2"><AutoText>{cert.title}</AutoText></h3>
                <p className="text-sm text-slate-600 mb-3"><AutoText>{cert.description}</AutoText></p>
                <span className="text-xs text-[#1E6F5C] font-medium bg-[#1E6F5C]/10 px-3 py-1 rounded-full"><AutoText>Since {cert.year}</AutoText></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Control Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#1E6F5C] font-medium mb-2"><AutoText>QUALITY CONTROL</AutoText></p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"><AutoText>From Raw Material to Finished Product</AutoText></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {qcSteps.map((item: any, idx: number) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 bg-[#1E6F5C] text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-3">{item.step}</div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1"><AutoText>{item.title}</AutoText></h3>
                <p className="text-xs text-slate-500"><AutoText>{item.description || item.desc}</AutoText></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#1E6F5C] to-[#165B46]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4"><AutoText>Partner With Us</AutoText></h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8"><AutoText>Leverage our manufacturing capabilities for your pharmaceutical products.</AutoText></p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#1E6F5C] px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition-colors"><AutoText>{t.cta.contact}</AutoText> <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/products" className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"><AutoText>{t.cta.viewProducts}</AutoText></Link>
          </div>
        </div>
      </section>
    </>
  )
}
