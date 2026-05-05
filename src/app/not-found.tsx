import Link from 'next/link'

export default function NotFound() {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-[#1E6F5C]">
          <div className="text-center px-4">
            <h1 className="text-9xl font-bold text-white mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
            <p className="text-slate-300 mb-8 max-w-md mx-auto">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. The page may have been moved or doesn&apos;t exist.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-[#1E6F5C] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Go to Homepage
              </Link>
              <Link
                href="/contact"
                className="inline-block px-6 py-3 border border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
