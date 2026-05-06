const STRAPI_URL = 'https://raysun-cms-production.up.railway.app'
const STRAPI_TOKEN = '92a1de40c5ee6a313f4159d14718c7b1d37f1b3593c4fe76837e54cac075c251886af26fd769f3f07f4d8748be59d1ac7b4f8b286c7066a4c5eb8e30d09d33e532c612f2a45ae9fa8374c6fcf8f3c32ae9df2e619ba0d66f8031fad94e70b8423324a831362213b79fbdd7dc2a93dd7e4214b542151423bca3aeb8131c7ab181'

const navMenuItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Manufacturing', href: '/manufacturing' },
  { label: 'R&D Innovation', href: '/rd-innovation' },
  { label: 'Quality & Compliance', href: '/quality-compliance' },
  {
    label: 'Products',
    href: '/products',
    hasDropdown: true,
    items: [
      { label: 'Overview', href: '/products' },
      { label: 'Softgels', href: '/products?category=softgels' },
      { label: 'Tablets', href: '/products?category=tablets' },
      { label: 'Creams & Ointments', href: '/products?category=creams' },
      { label: 'Injections', href: '/products?category=injections' },
    ],
  },
  { label: 'News', href: '/news' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
  { label: 'Resources', href: '/resources' },
]

const navCtaButtons = {
  verify: { label: 'Verify', href: '/verify' },
  orderNow: { label: 'Order Now', href: '/order-now' },
  aiAssistant: { label: 'AI Assistant', href: '/ai-assistant' },
}

async function main() {
  console.log('Fetching Global document...')
  const findRes = await fetch(`${STRAPI_URL}/api/global`, {
    headers: { 'Authorization': `Bearer ${STRAPI_TOKEN}` },
  })
  const findJson = await findRes.json()

  if (!findJson.data) {
    console.error('FAIL: Global not found')
    return
  }

  const docId = findJson.data.documentId
  console.log(`Found Global, documentId: ${docId}. Updating nav data...`)

  const updateRes = await fetch(`${STRAPI_URL}/api/global/${docId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify({
      data: {
        navMenuItems,
        navCtaButtons,
      },
    }),
  })

  const updateJson = await updateRes.json()
  if (updateRes.ok) {
    console.log('OK Updated nav data')
    const pubRes = await fetch(`${STRAPI_URL}/api/global/${docId}/actions/publish`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${STRAPI_TOKEN}` },
    })
    if (pubRes.ok) console.log('OK Published')
    else console.log('Note: may need manual publish')
  } else {
    console.error('FAIL:', updateJson.error?.message || updateJson)
  }
}

main().catch(console.error)
