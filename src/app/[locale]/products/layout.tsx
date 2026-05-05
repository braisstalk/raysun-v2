import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata({
    locale,
    path: '/products',
    title: 'Products',
  })
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children
}
