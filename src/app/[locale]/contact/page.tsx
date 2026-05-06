'use client'
import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Mail, Phone, Clock, Send, CheckCircle, AlertCircle, Briefcase, Handshake, Truck, Users, Globe, ArrowRight } from 'lucide-react'
import { useTranslation } from '@/i18n/useTranslation'
import StrapiHeroCarousel from '@/components/common/StrapiHeroCarousel'
import AutoText from '@/components/common/AutoText'
import BrandPlaceholder from '@/components/common/BrandPlaceholder'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function Contact() {
  const { t } = useTranslation()

  // Inquiry types with specific labels
  const inquiryTypes = [
    { id: 'business', label: t.contact.businessEnquiry, icon: Briefcase, description: <AutoText>Product inquiries, pricing, distribution</AutoText> },
    { id: 'partnership', label: t.contact.partnership, icon: Handshake, description: <AutoText>Joint ventures, licensing, strategic alliances</AutoText> },
    { id: 'supplier', label: t.contact.supplier, icon: Truck, description: <AutoText>Raw materials, packaging, services</AutoText> },
    { id: 'general', label: t.contact.generalContact, icon: Users, description: <AutoText>General inquiries, media, other</AutoText> },
  ]

  const countries = [
    'Laos', 'Thailand', 'Vietnam', 'Cambodia', 'Myanmar', 'Malaysia', 'Singapore', 
    'Indonesia', 'Philippines', 'UAE', 'Saudi Arabia', 'Egypt', 'Other'
  ]

  const [form, setForm] = useState({ 
    name: '', 
    company: '',
    email: '', 
    phone: '',
    country: '',
    inquiryType: 'business',
    message: '' 
  })
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [mailtoLink, setMailtoLink] = useState<string | null>(null)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!form.name.trim()) newErrors.name = t.common.required
    if (!form.email.trim()) newErrors.email = t.common.required
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email'
    if (!form.country) newErrors.country = t.common.required
    if (!form.message.trim()) newErrors.message = t.common.required
    if (!consent) newErrors.consent = t.common.required
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    
    setStatus('submitting')
    setMailtoLink(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          phone: form.phone,
          country: form.country,
          inquiryType: form.inquiryType,
          message: form.message,
          formSource: 'contact',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        if (data.mailto) setMailtoLink(data.mailto)
        setForm({ name: '', company: '', email: '', phone: '', country: '', inquiryType: 'business', message: '' })
        setConsent(false)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleInquiryTypeChange = (typeId: string) => {
    setForm(prev => ({ ...prev, inquiryType: typeId }))
  }

  const selectedInquiry = inquiryTypes.find(i => i.id === form.inquiryType)

  return (
    <>
      {/* Hero Carousel */}
      <StrapiHeroCarousel
        page="contact"
        badge="CONTACT"
        badgeColor="text-emerald-400"
        heading={t.hero.contactTitle}
        description={t.hero.contactSubtitle}
      />

      {/* Contact Overview */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Briefcase, title: t.contact.businessEnquiry, desc: 'Product information, pricing, distribution partnerships' },
              { icon: Handshake, title: t.contact.partnership, desc: 'Joint ventures, licensing, technology transfer' },
              { icon: Globe, title: t.contact.globalOperations, desc: t.contact.globalOperationsDesc },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4">
                <item.icon className="w-6 h-6 text-[#1E6F5C] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900"><AutoText>{item.title}</AutoText></h3>
                  <p className="text-sm text-slate-600"><AutoText>{item.desc}</AutoText></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-slate-900 mb-6"><AutoText>{t.contact.contactInfo}</AutoText></h2>

              {/* Office Info */}
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-[#1E6F5C] mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900"><AutoText>{t.contact.headquarters}</AutoText></h3>
                    <p className="text-slate-600"><AutoText>{t.contact.address}</AutoText></p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-[#1E6F5C] mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900"><AutoText>{t.contact.email}</AutoText></h3>
                    <p className="text-slate-600"><AutoText>{t.contact.emailAddresses}</AutoText></p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-[#1E6F5C] mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900"><AutoText>{t.contact.phone}</AutoText></h3>
                    <p className="text-slate-600"><AutoText>{t.contact.phoneAvailable}</AutoText></p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-[#1E6F5C] mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900"><AutoText>{t.contact.businessHours}</AutoText></h3>
                    <p className="text-slate-600"><AutoText>{t.contact.businessHoursTime}</AutoText></p>
                  </div>
                </div>
              </div>

              {/* Related Links */}
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 mb-4"><AutoText>{t.contact.quickLinks}</AutoText></h3>
                <div className="space-y-2">
                  {[
                    { label: t.pages.products, href: '/products' },
                    { label: t.pages.verify, href: '/verify' },
                    { label: t.pages.resources, href: '/resources' },
                    { label: t.pages.careers, href: '/careers' },
                  ].map((link, idx) => (
                    <Link key={idx} href={link.href} className="flex items-center gap-2 text-[#1E6F5C] hover:underline">
                      <ArrowRight className="w-4 h-4" /> <AutoText>{link.label}</AutoText>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">{t.contact.sendMessage}</h2>
              
              {/* Inquiry Type Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.contact.inquiryType}</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {inquiryTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => handleInquiryTypeChange(type.id)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        form.inquiryType === type.id 
                          ? 'border-[#1E6F5C] bg-[#1E6F5C]/5' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <type.icon className={`w-5 h-5 mb-1 ${form.inquiryType === type.id ? 'text-[#1E6F5C]' : 'text-slate-400'}`} />
                      <p className={`text-sm font-medium ${form.inquiryType === type.id ? 'text-[#1E6F5C]' : 'text-slate-700'}`}>{type.label}</p>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Success Message */}
              {status === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-3 text-green-800">
                    <CheckCircle className="w-6 h-6" />
                    <div>
                      <p className="font-semibold">{t.contact.messageSent}</p>
                      <p className="text-sm">{t.common.success}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-4 text-sm text-green-700 hover:underline"
                  >
                    {t.contact.submitAnother}
                  </button>
                </div>
              )}

              {/* Error Message */}
              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-3 text-red-800">
                    <AlertCircle className="w-6 h-6" />
                    <div>
                      <p className="font-semibold">{t.common.error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form */}
              {status !== 'success' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">{t.contact.name} *</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-lg border ${errors.name ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-[#1E6F5C]'} focus:outline-none focus:ring-2 focus:ring-[#1E6F5C]/20 transition-colors`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">{t.contact.company}</label>
                      <input
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E6F5C] focus:outline-none focus:ring-2 focus:ring-[#1E6F5C]/20 transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">{t.contact.email} *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-[#1E6F5C]'} focus:outline-none focus:ring-2 focus:ring-[#1E6F5C]/20 transition-colors`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">{t.contact.phone}</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#1E6F5C] focus:outline-none focus:ring-2 focus:ring-[#1E6F5C]/20 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t.contact.country} *</label>
                    <select
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-lg border ${errors.country ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-[#1E6F5C]'} focus:outline-none focus:ring-2 focus:ring-[#1E6F5C]/20 transition-colors bg-white`}
                    >
                      <option value="">{t.contact.selectCountry}</option>
                      {countries.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t.contact.message} *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder={`Tell us about your ${selectedInquiry?.label.toLowerCase()}...`}
                      className={`w-full px-4 py-2.5 rounded-lg border ${errors.message ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-[#1E6F5C]'} focus:outline-none focus:ring-2 focus:ring-[#1E6F5C]/20 transition-colors resize-none`}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-slate-300 text-[#1E6F5C] focus:ring-[#1E6F5C]"
                    />
                    <label htmlFor="consent" className="text-sm text-slate-600">
                      {t.contact.consent}
                    </label>
                  </div>
                  {errors.consent && <p className="text-red-500 text-xs">{errors.consent}</p>}
                  
                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="w-full bg-[#1E6F5C] text-white py-3 rounded-lg font-medium hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                  >
                    {status === 'submitting' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t.contact.sending}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> {t.common.send}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BrandPlaceholder
            icon={MapPin}
            label={t.contact.mapLocation}
            variant="hero"
            tone="slate"
            rounded="2xl"
            className="h-64"
          />
        </div>
      </section>
    </>
  )
}
