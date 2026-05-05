'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Globe, ChevronDown, Search, Shield, ArrowRight } from 'lucide-react'
import { navigationConfig, getNavLabel } from '@/config/navigation'
import { Locale } from '@/i18n/config'
import { useTranslation } from '@/i18n/useTranslation'
import { STRAPI_URL } from '@/lib/strapi/client'
import AutoText from '@/components/common/AutoText'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const { t, locale, setLocale } = useTranslation()

  // CMS navigation data
  const [cmsMenuItems, setCmsMenuItems] = useState<typeof navigationConfig.items | null>(null)
  const [cmsCtaButtons, setCmsCtaButtons] = useState<typeof navigationConfig.ctaButtons | null>(null)

  useEffect(() => {
    fetch(`${STRAPI_URL}/api/global`)
      .then(res => res.ok ? res.json() : null)
      .then(json => {
        if (json?.data) {
          if (json.data.navMenuItems && Array.isArray(json.data.navMenuItems) && json.data.navMenuItems.length > 0) {
            setCmsMenuItems(json.data.navMenuItems)
          }
          if (json.data.navCtaButtons) {
            setCmsCtaButtons(json.data.navCtaButtons)
          }
        }
      })
      .catch(() => {})
  }, [])

  const menuItems = cmsMenuItems || navigationConfig.items
  const ctaButtons = cmsCtaButtons || navigationConfig.ctaButtons

  // Get current locale
  const currentLocale = locale || 'en'

  const handleLangClick = (code: string) => {
    setLocale(code as Locale)
    setIsLangOpen(false)
  }

  // Get label for nav item using translations
  const getLabel = (key: string): string => {
    return getNavLabel(key, currentLocale)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null)
    if (openDropdown) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [openDropdown])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <img
              src="/images/raysun-logo.png"
              alt="Raysun Biopharma"
              className="hidden lg:block h-11 w-auto max-w-[240px] object-contain"
            />
            <img
              src="/images/raysun-logo.png"
              alt="Raysun Biopharma"
              className="block lg:hidden h-9 w-auto max-w-[160px] object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {menuItems.map((item, idx) => (
              <div key={idx} className="relative">
                {item.hasDropdown ? (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setOpenDropdown(openDropdown === item.label ? null : item.label)
                      }}
                      className={`flex items-center gap-1 px-3 py-2 text-[12px] font-medium tracking-wide transition-colors whitespace-nowrap ${
                        openDropdown === item.label ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
                      }`}
                    >
                      {getLabel(item.label)}
                      <ChevronDown className={`w-3 h-3 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === item.label && (
                      <div className="absolute top-full left-0 pt-2 z-50">
                        <div className="bg-white rounded-xl shadow-2xl border border-slate-100 py-3 min-w-[220px]">
                          {item.items?.map((subItem, sIdx) => (
                            <Link
                              key={sIdx}
                              href={subItem.href}
                              onClick={() => setOpenDropdown(null)}
                              className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            >
                              <span>{getLabel(subItem.label)}</span>
                              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="px-3 py-2 text-[12px] font-medium text-slate-600 hover:text-blue-600 transition-colors whitespace-nowrap"
                  >
                    {getLabel(item.label)}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button className="p-2 text-slate-500 hover:text-blue-600 transition-colors">
              <Search className="w-4 h-4" />
            </button>

            {/* Verify */}
            <Link
              href={ctaButtons.verify.href}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-600 text-xs font-medium rounded-md hover:border-blue-600 hover:text-blue-600 transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden lg:inline"><AutoText text={ctaButtons.verify.label} as="span" /></span>
            </Link>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsLangOpen(!isLangOpen)
                }}
                className="flex items-center gap-1 px-2 py-1.5 text-[11px] font-medium text-slate-600 hover:text-blue-600"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="hidden lg:inline uppercase">{locale}</span>
              </button>
              {isLangOpen && (
                <div className="absolute top-full right-0 mt-1 w-40 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50">
                  {navigationConfig.language.options.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLangClick(lang.code)}
                      className={`w-full px-4 py-2.5 text-left text-sm transition-colors flex items-center justify-between ${
                        locale === lang.code 
                          ? 'bg-blue-50 text-blue-600 font-medium' 
                          : 'text-slate-600 hover:bg-blue-50'
                      }`}
                    >
                      {lang.label}
                      {locale === lang.code && (
                        <span className="w-2 h-2 bg-blue-600 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="xl:hidden p-2 text-slate-600"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-100">
          <div className="px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
            {menuItems.map((item, idx) => (
              <div key={idx}>
                {item.hasDropdown ? (
                  <>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      className="flex items-center justify-between w-full px-3 py-3 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <span>{getNavLabel(item.label)}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === item.label && item.items && (
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-slate-100 pl-4">
                        {item.items.map((subItem, sIdx) => (
                          <Link
                            key={sIdx}
                            href={subItem.href}
                            onClick={() => {
                              setIsMenuOpen(false)
                              setOpenDropdown(null)
                            }}
                            className="block px-3 py-2 text-sm text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            {getLabel(subItem.label)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-3 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    {getLabel(item.label)}
                  </Link>
                )}
              </div>
            ))}
            <hr className="my-2" />
            <Link
              href={ctaButtons.verify.href}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-3 text-sm font-medium text-slate-600 hover:bg-blue-50 rounded-lg"
            >
              <Shield className="w-4 h-4" />
              <AutoText text={ctaButtons.verify.label} as="span" />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
