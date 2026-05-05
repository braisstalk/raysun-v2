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
    path: '/order-now',
    title: 'Order Now',
  })
}

export default function OrderNowLayout({ children }: { children: React.ReactNode }) {
  return children
}
