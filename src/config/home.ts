import { HomeContent } from '@/types/home'

// Mock content config for CMS future integration
// All content can be replaced via CMS without code changes

export const homeContent: HomeContent = {
  hero: {
    videoUrl: '/videos/hero-bg.mp4',
    posterImage: '/images/hero-poster.jpg',
    title: 'Your Trusted Pharmaceutical Manufacturing Partner',
    subtitle: 'Advancing the future of healthcare through breakthrough science, sustainable innovation, and a relentless commitment to improving lives worldwide.',
    primaryCta: {
      label: 'Explore Our Products',
      href: '/products'
    },
    secondaryCta: {
      label: 'Contact Us',
      href: '/contact'
    }
  },
  
  videoSection: {
    type: 'youtube',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    localVideoUrl: '/videos/feature.mp4',
    posterImage: '/images/video-poster.jpg',
    title: 'Manufacturing Excellence',
    description: 'Our state-of-the-art facility combines advanced technology with rigorous quality standards to deliver pharmaceutical products that meet global healthcare needs.',
    cta: {
      label: 'Learn More About Our Science',
      href: '/about'
    }
  },

  stats: [
    { value: '10+', label: 'Years of Experience' },
    { value: '200+', label: 'Products' },
    { value: '6+', label: 'Global Markets' },
    { value: '50+', label: 'Industry Partners' },
  ],

  about: {
    title: 'About Us',
    description: 'At Raysun Biopharma, science is more than research—it is our purpose. We combine cutting-edge technology with deep expertise to develop medicines that make a real difference in patients\' lives.',
    cta: {
      label: 'Our Story',
      href: '/about'
    }
  },

  capabilities: {
    title: 'Our Scientific Focus',
    items: [
      {
        title: 'Research & Development',
        description: 'State-of-the-art R&D driving breakthrough therapeutics',
        icon: 'FlaskConical'
      },
      {
        title: 'Manufacturing Excellence',
        description: 'GMP-certified production meeting global standards',
        icon: 'Factory'
      },
      {
        title: 'Global Health Access',
        description: 'Expanding access to quality medicines worldwide',
        icon: 'Shield'
      },
      {
        title: 'Sustainable Innovation',
        description: 'Committed to environmental responsibility',
        icon: 'Award'
      }
    ]
  },

  products: {
    title: 'Our Product Portfolio',
    categories: [
      { name: 'Softgels', description: 'Advanced encapsulation for enhanced bioavailability', count: 45, href: '/products?category=softgels' },
      { name: 'Tablets', description: 'Precision tablet manufacturing at scale', count: 62, href: '/products?category=tablets' },
      { name: 'Creams & Ointments', description: 'Topical formulations for diverse therapeutic areas', count: 28, href: '/products?category=creams' },
      { name: 'Injections', description: 'Sterile manufacturing for injectable solutions', count: 15, href: '/products?category=injections' },
    ]
  },

  cta: {
    verify: {
      title: 'Product Verification',
      description: 'Ensure product authenticity with our verification system.',
      cta: {
        label: 'Verify Products',
        href: '/verify'
      }
    },
    order: {
      title: 'Partner With Us',
      description: 'Explore distribution opportunities or request a quote.',
      cta: {
        label: 'Order Now',
        href: '/order-now'
      }
    }
  },

  aiAssistant: {
    title: 'AI Assistant',
    description: 'Have questions about our products or science? Our AI assistant can help.',
    cta: {
      label: 'Chat With Us',
      href: '/ai-assistant'
    }
  },

  news: {
    title: 'Latest Updates',
    items: [
      { date: 'Mar 2026', title: 'GMP Re-certification Success', category: 'Quality' },
      { date: 'Feb 2026', title: 'New ASEAN Distribution Partnership', category: 'Business' },
      { date: 'Jan 2026', title: 'R&D Facility Expansion', category: 'Innovation' },
    ]
  },

  resources: {
    title: 'Resources',
    items: [
      { title: 'Company Overview', type: 'PDF', size: '2.4 MB' },
      { title: 'Product Catalog', type: 'PDF', size: '5.8 MB' },
      { title: 'Quality Certifications', type: 'PDF', size: '1.2 MB' },
      { title: 'Sustainability Report', type: 'PDF', size: '3.5 MB' },
    ]
  },

  contact: {
    title: 'Ready to Collaborate?',
    ctas: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Careers', href: '/careers' },
    ]
  }
}
