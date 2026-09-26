import { useState } from 'react'
import { cn } from '@/lib/utils'

interface BrandLogoImageProps {
  name: string
  logoUrl: string
  className?: string
  /** Dark backgrounds use inverted logos; light cards use full-color */
  theme?: 'dark' | 'light'
}

export function BrandLogoImage({ name, logoUrl, className, theme = 'dark' }: BrandLogoImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span
        className={cn(
          'flex h-12 w-full items-center justify-center text-lg font-bold tracking-tight',
          theme === 'light' ? 'text-slate-800' : 'text-white/90',
          className
        )}
      >
        {name.slice(0, 2).toUpperCase()}
      </span>
    )
  }

  return (
    <img
      src={logoUrl}
      alt={`${name} logo`}
      className={cn(
        'h-10 w-auto max-w-[120px] object-contain',
        theme === 'dark' && 'brightness-0 invert',
        className
      )}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}
