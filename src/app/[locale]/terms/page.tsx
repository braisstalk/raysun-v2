import type { Metadata } from 'next'
import Link from 'next/link'
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
    path: '/terms',
    title: 'Terms of Service',
  })
}

export default function Terms() {
  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-blue-300 font-medium mb-2"><AutoText text="LEGAL" as="span" /></p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4"><AutoText text="Terms of Use" as="span" /></h1>
          <p className="text-lg text-slate-300">
            <AutoText text="Terms and conditions governing your use of this website." as="span" />
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-slate-600 mb-8">
              <AutoText text="Last updated: March 2026" as="span" />
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4"><AutoText text="1. Acceptance of Terms" as="span" /></h2>
            <p className="text-slate-600 mb-6">
              <AutoText text="By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement." as="span" />
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4"><AutoText text="2. Intellectual Property" as="span" /></h2>
            <p className="text-slate-600 mb-6">
              <AutoText text="All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Raysun Biopharma Co., Ltd. and is protected by international copyright laws." as="span" />
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4"><AutoText text="3. Use License" as="span" /></h2>
            <p className="text-slate-600 mb-4">
              <AutoText text="Permission is granted to temporarily use this website for personal, non-commercial viewing only. This is the grant of a license, not a transfer of title." as="span" />
            </p>
            <p className="text-slate-600 mb-6">
              <AutoText text="You may not: modify or copy the materials; use the materials for any commercial purpose; transfer the materials to another person; or attempt to reverse engineer any software contained on the website." as="span" />
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4"><AutoText text="4. Product Information" as="span" /></h2>
            <p className="text-slate-600 mb-6">
              <AutoText text="The information provided on this website is for general informational purposes only. Product specifications, availability, and pricing are subject to change without notice. Please contact us directly for the most current product information." as="span" />
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4"><AutoText text="5. Disclaimer" as="span" /></h2>
            <p className="text-slate-600 mb-6">
              <AutoText text="The materials on this website are provided 'as is.' Raysun Biopharma makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property." as="span" />
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4"><AutoText text="6. Limitation of Liability" as="span" /></h2>
            <p className="text-slate-600 mb-6">
              <AutoText text="In no event shall Raysun Biopharma be liable for any damages arising out of the use or inability to use the materials on this website." as="span" />
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4"><AutoText text="7. Contact Us" as="span" /></h2>
            <p className="text-slate-600 mb-6">
              <AutoText text="If you have any questions about these Terms of Use, please contact us at:" as="span" />
            </p>
            <div className="bg-slate-50 p-6 rounded-lg">
              <p className="text-slate-700 font-medium"><AutoText text="Raysun Biopharma Co., Ltd." as="span" /></p>
              <p className="text-slate-600"><AutoText text="Vientiane Capital, Lao PDR" as="span" /></p>
              <p className="text-slate-600"><AutoText text="Email: info@raysunpharma.com" as="span" /></p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
