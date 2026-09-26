/**
 * HERO — DO NOT MODIFY layout, colors, background, typography, spacing, CTAs.
 * A.R.I.A. column is interactive (opens right-side chat drawer).
 */
import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { ParticlesBackground } from '@/components/layout/ParticlesBackground'
import { MagneticButton } from '@/components/layout/MagneticButton'
import { BookRepairButton } from '@/components/booking/BookRepairButton'
import { TRUST_STATS } from '@/lib/constants'
import { useAriaChat } from '@/context/AriaChatContext'

const AriaScene = lazy(() =>
  import('@/components/aria/AriaScene').then((m) => ({ default: m.AriaScene }))
)

export function HeroSection() {
  const { openChat } = useAriaChat()

  return (
    <section className="hero-section relative min-h-screen overflow-hidden pt-28 pb-20 md:pt-32">
      <div className="gradient-mesh absolute inset-0" />
      <ParticlesBackground />
      <div className="container-lapserve relative grid grid-cols-12 items-center gap-12 lg:gap-8">
        <motion.div
          className="col-span-12 lg:col-span-6"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-white/80 uppercase">
            WE BUILD TRUST
          </p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
            India&apos;s Most Trusted{' '}
            <span className="text-white">Doorstep Laptop Repair</span> Service
          </h1>
          <p className="prose-narrow mt-6 text-lg leading-relaxed text-white/85">
            Certified engineers repair your laptop directly in front of you using genuine OEM
            parts and enterprise-grade diagnostics.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <BookRepairButton size="lg">
              Book Repair
            </BookRepairButton>
            <MagneticButton to="/services" variant="secondary" size="lg">
              Explore Services
            </MagneticButton>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {TRUST_STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-white md:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs text-white/75 md:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="col-span-12 lg:col-span-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <button
            type="button"
            onClick={openChat}
            className="group relative w-full cursor-pointer rounded-[28px] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            aria-label="Click to chat with A.R.I.A."
          >
            <Suspense fallback={<div className="h-[420px] animate-pulse rounded-[28px] bg-elevated/50" />}>
              <AriaScene state="idle" showLabels interactive />
            </Suspense>
            <p className="mt-4 text-center text-sm font-medium text-primary opacity-80 transition-opacity group-hover:opacity-100">
              Click to Chat →
            </p>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
