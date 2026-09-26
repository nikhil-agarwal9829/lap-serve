import { lazy, Suspense, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ParticlesBackground } from './ParticlesBackground'
import { Button } from '@/components/ui/button'

const AriaScene = lazy(() =>
  import('@/components/aria/AriaScene').then((m) => ({ default: m.AriaScene }))
)

interface PageHeroProps {
  eyebrow?: string
  title: string
  subtitle: string
  cta?: { label: string; href: string }
  showAria?: boolean
  children?: ReactNode
}

export function PageHero({ eyebrow, title, subtitle, cta, showAria = false, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pb-20">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #060b14 0%, #020817 40%, #071224 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(89, 216, 255, 0.14), transparent), radial-gradient(ellipse 50% 40% at 100% 30%, rgba(124, 140, 255, 0.08), transparent)',
        }}
      />
      <ParticlesBackground />
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />

      <div className="container-lapserve relative z-[1] grid grid-cols-12 items-center gap-10">
        <motion.div
          className={showAria ? 'col-span-12 lg:col-span-7' : 'col-span-12 max-w-3xl'}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {eyebrow && (
            <p className="mb-4 text-xs font-semibold tracking-[0.28em] text-[#59d8ff] uppercase">
              {eyebrow}
            </p>
          )}
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="prose-narrow mt-6 text-lg leading-relaxed text-[#a7b2c8]">{subtitle}</p>
          {cta && (
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link to={cta.href}>{cta.label}</Link>
              </Button>
            </div>
          )}
          {children}
        </motion.div>

        {showAria && (
          <motion.div
            className="col-span-12 flex justify-center lg:col-span-5 lg:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="h-[220px] w-[220px] md:h-[260px] md:w-[260px]">
              <Suspense fallback={<div className="h-full w-full animate-pulse rounded-3xl bg-white/5" />}>
                <AriaScene state="idle" showLabels compact className="scale-100" />
              </Suspense>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
