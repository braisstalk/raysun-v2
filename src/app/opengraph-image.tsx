import { ImageResponse } from 'next/og'

// Next.js metadata file convention. When this file exists, every page under
// `app/` automatically gets `og:image` (and `twitter:image`, since we don't
// override that) pointing here. Per-page metadata can still override by
// setting `openGraph.images` explicitly.
//
// Rendered through @vercel/og at request time and cached at the edge — there
// is no separate PNG checked into the repo. Keeping the design as JSX makes
// brand tweaks a quick code change instead of a Photoshop/Illustrator pass.

export const alt = 'Raysun Biopharma — GMP-Certified Pharmaceutical Manufacturer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0b132b 0%, #1c2a3a 35%, #145246 72%, #1E6F5C 100%)',
          color: 'white',
          padding: '64px 88px',
          justifyContent: 'space-between',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Soft accent glow in the top-right corner — gives the gradient
            depth without needing an external image. */}
        <div
          style={{
            position: 'absolute',
            top: -180,
            right: -180,
            width: 520,
            height: 520,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(52,211,153,0.25) 0%, rgba(52,211,153,0.05) 55%, rgba(52,211,153,0) 75%)',
          }}
        />

        {/* Top row: brand wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: 'linear-gradient(135deg, #34d399 0%, #1E6F5C 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 800,
              fontSize: 38,
              boxShadow: '0 12px 40px rgba(30,111,92,0.45)',
            }}
          >
            R
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontSize: 28, fontWeight: 600, opacity: 0.92 }}>Raysun</span>
            <span style={{ fontSize: 20, fontWeight: 500, opacity: 0.7, marginTop: 4 }}>
              Biopharma
            </span>
          </div>
        </div>

        {/* Center: brand title + tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            Raysun Biopharma
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 500,
              opacity: 0.85,
              letterSpacing: -0.4,
            }}
          >
            Quality • Innovation • Global Healthcare
          </div>
        </div>

        {/* Bottom row: tagline + URL */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 22,
            opacity: 0.75,
            fontWeight: 500,
          }}
        >
          <span>GMP-Certified Pharmaceutical Manufacturer</span>
          <span style={{ opacity: 0.9 }}>www.raysunpharma.com</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
