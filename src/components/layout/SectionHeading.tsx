import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  theme?: 'dark' | 'light'
  /** Tighter spacing for compact homepage sections */
  compact?: boolean
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  theme = 'light',
  compact = false,
  className,
}: SectionHeadingProps) {
  const isDark = theme === 'dark'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className={cn(
        compact ? 'mb-6 md:mb-8' : 'mb-10 md:mb-12',
        align === 'center' && 'mx-auto max-w-2xl text-center',
        align === 'left' && 'max-w-xl text-left',
        className
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold tracking-[0.28em] text-[#4fd1ff] uppercase">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.75rem]',
          isDark ? 'text-white' : 'text-slate-900'
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'prose-narrow mt-4 text-base leading-relaxed md:text-lg',
            isDark ? 'text-slate-400' : 'text-slate-500'
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  )
}
