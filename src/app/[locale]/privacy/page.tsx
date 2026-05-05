import Link from 'next/link'
import AutoText from '@/components/common/AutoText'

export default function Privacy() {
  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-blue-300 font-medium mb-2"><AutoText text="LEGAL" as="span" /></p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4"><AutoText text="Privacy Policy" as="span" /></h1>
          <p className="text-lg text-slate-300">
            <AutoText text="How we collect, use, and protect your personal information." as="span" />
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-slate-600 mb-8">
              <AutoText text="Last updated: March 2026" as="span" />
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4"><AutoText text="1. Introduction" as="span" /></h2>
            <p className="text-slate-600 mb-6">
              <AutoText text="Raysun Biopharma Co., Ltd. ('we,' 'our,' or 'us') is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website." as="span" />
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4"><AutoText text="2. Information We Collect" as="span" /></h2>
            <p className="text-slate-600 mb-4">
              <AutoText text="We may collect personal information that you voluntarily provide to us when you:" as="span" />
            </p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li><AutoText text="Fill out a contact form" as="span" /></li>
              <li><AutoText text="Request a quote or product information" as="span" /></li>
              <li><AutoText text="Submit a job application" as="span" /></li>
              <li><AutoText text="Subscribe to our newsletter" as="span" /></li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-4"><AutoText text="3. How We Use Your Information" as="span" /></h2>
            <p className="text-slate-600 mb-6">
              <AutoText text="We may use the information we collect to:" as="span" />
            </p>
            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
              <li><AutoText text="Respond to your inquiries and provide customer support" as="span" /></li>
              <li><AutoText text="Send you requested information about our products and services" as="span" /></li>
              <li><AutoText text="Process job applications" as="span" /></li>
              <li><AutoText text="Improve our website and user experience" as="span" /></li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-4"><AutoText text="4. Information Sharing" as="span" /></h2>
            <p className="text-slate-600 mb-6">
              <AutoText text="We do not sell, trade, or otherwise transfer your personal information to outside parties unless we provide you with advance notice. This does not include website hosting partners and other parties who assist us in operating our website." as="span" />
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4"><AutoText text="5. Contact Us" as="span" /></h2>
            <p className="text-slate-600 mb-6">
              <AutoText text="If you have any questions about this Privacy Policy, please contact us at:" as="span" />
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
