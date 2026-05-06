// Footer Configuration for CMS future integration

import { FooterConfig } from '@/types/footer'

export const footerConfig: FooterConfig = {
  brand: {
    name: 'Raysun Biopharma',
    description: 'A leading pharmaceutical manufacturer committed to advancing global healthcare through quality medicines and sustainable innovation.',
    socials: {
      linkedin: 'https://linkedin.com/company/raysunbiopharma',
      facebook: 'https://facebook.com/raysunbiopharma',
      youtube: 'https://youtube.com/@raysunbiopharma',
      x: 'https://x.com/raysunbiopharma',
      instagram: 'https://instagram.com/raysunbiopharma'
    }
  },
  columns: [
    {
      title: 'Quick Links',
      links: [
        { label: 'Home', href: '/' },
        { label: 'About Us', href: '/about' },
        { label: 'Manufacturing', href: '/manufacturing' },
        { label: 'Products', href: '/products' },
        { label: 'News', href: '/news' },
        { label: 'Contact Us', href: '/contact' },
      ]
    },
    {
      title: 'Our Products',
      links: [
        { label: 'Softgels', href: '/products?category=softgels' },
        { label: 'Tablets', href: '/products?category=tablets' },
        { label: 'Capsules', href: '/products?category=capsules' },
        { label: 'Creams & Ointments', href: '/products?category=creams' },
        { label: 'Injections', href: '/products?category=injections' },
        { label: 'Traditional Medicines', href: '/products?category=traditional' },
      ]
    }
  ],
  contact: {
    title: 'Get in Touch',
    email: 'info@raysunpharma.com',
    phone: '+856 21 XXX XXXX',
    mobile: '+856 20 XXX XXXX',
    address: 'Vientiane Capital, Lao PDR'
  },
  bottom: {
    copyright: '© Raysun Biopharma. All rights reserved.',
    privacy: '/privacy',
    terms: '/terms',
    sitemap: '/sitemap'
  }
}
