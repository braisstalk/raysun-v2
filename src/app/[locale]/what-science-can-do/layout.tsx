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
    path: '/what-science-can-do',
    title: 'What Science Can Do',
  })
}

export default function WhatScienceCanDoLayout({ children }: { children: React.ReactNode }) {
  return children
}
