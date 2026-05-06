import type { LucideIcon } from 'lucide-react'

// Branded fill that replaces the slate-on-slate gradients used as image
// placeholders site-wide. Same component for hero blocks, list cards, and
// detail thumbnails — the variant prop controls icon/typography size.
//
// Visual recipe:
//   - dark slate base, brand teal accent in the bottom-right diagonal
//   - subtle dot pattern overlay so it reads as "designed", not flat color
//   - centered icon + optional caption
// Together this gives the site a consistent professional look while we
// wait for real photography.

export type BrandPlaceholderVariant = 'card' | 'compact' | 'hero'
export type BrandPlaceholderTone = 'teal' | 'slate' | 'mixed'

interface BrandPlaceholderProps {
  icon?: LucideIcon
  label?: string
  variant?: BrandPlaceholderVariant
  tone?: BrandPlaceholderTone
  className?: string
  rounded?: 'none' | 'md' | 'lg' | 'xl' | '2xl'
}

const ROUNDED_CLASSES: Record<NonNullable<BrandPlaceholderProps['rounded']>, string> = {
  none: '',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
}

function toneToBackground(tone: BrandPlaceholderTone): string {
  switch (tone) {
    case 'teal':
      return 'linear-gradient(135deg, #0f172a 0%, #134e4a 60%, #1E6F5C 100%)'
    case 'slate':
      return 'linear-gradient(135deg, #1e293b 0%, #334155 60%, #475569 100%)'
    case 'mixed':
    default:
      return 'linear-gradient(135deg, #0b1320 0%, #1f3a3a 50%, #1E6F5C 100%)'
  }
}

export default function BrandPlaceholder({
  icon: Icon,
  label,
  variant = 'card',
  tone = 'mixed',
  className = '',
  rounded = 'xl',
}: BrandPlaceholderProps) {
  const iconSize =
    variant === 'hero' ? 'w-16 h-16' : variant === 'compact' ? 'w-7 h-7' : 'w-10 h-10'
  const labelSize =
    variant === 'hero' ? 'text-sm' : variant === 'compact' ? 'text-[10px]' : 'text-xs'

  const roundedClass = ROUNDED_CLASSES[rounded]

  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center ${roundedClass} ${className}`.trim()}
      style={{ background: toneToBackground(tone) }}
      aria-hidden="true"
    >
      {/* Soft accent glow in the upper-right — gives the gradient depth */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-20%',
          right: '-15%',
          width: '60%',
          height: '120%',
          background:
            'radial-gradient(circle, rgba(52,211,153,0.18) 0%, rgba(52,211,153,0) 70%)',
        }}
      />
      {/* Subtle dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      {/* Centered content */}
      <div className="relative flex flex-col items-center gap-2 text-white/85 select-none">
        {Icon && <Icon className={`${iconSize} text-white/85`} aria-hidden="true" />}
        {label && (
          <span className={`uppercase tracking-[0.18em] ${labelSize} text-white/65 font-medium`}>
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
