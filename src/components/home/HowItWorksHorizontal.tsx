import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Calendar,
  UserCheck,
  MapPin,
  Wrench,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { SectionHeading } from '@/components/layout/SectionHeading'

const STEPS = [
  { icon: Calendar, title: 'Book Diagnostic', desc: 'Schedule in 60 seconds via A.R.I.A. or web.' },
  { icon: UserCheck, title: 'Engineer Assigned', desc: 'Certified expert matched to your device.' },
  { icon: MapPin, title: 'Doorstep Visit', desc: 'Engineer arrives with OEM toolkit.' },
  { icon: Wrench, title: 'Repair In Front Of You', desc: 'Watch every step. Approve before work.' },
  { icon: ShieldCheck, title: 'Testing & Warranty', desc: 'QC check and warranty activated.' },
]

export function HowItWorksHorizontal() {
  const [active, setActive] = useState(0)
  const [mobileIndex, setMobileIndex] = useState(0)

  return (
    <section id="how-it-works" className="section-dark-secondary section-pad-compact">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4fd1ff]/5 blur-[100px]"
        aria-hidden
      />

      <div className="container-lapserve relative z-[1]">
        <SectionHeading
          theme="dark"
          eyebrow="Powered by A.R.I.A."
          title="A futuristic repair workflow"
          description="Five transparent steps — engineered for trust, speed, and zero surprises."
        />

        <div className="relative hidden lg:block">
          <div className="absolute top-[52px] right-[6%] left-[6%] h-px overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-[#4fd1ff] to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            />
          </div>
          <div className="flex justify-between gap-2">
            {STEPS.map((step, i) => (
              <motion.button
                key={step.title}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onMouseEnter={() => setActive(i)}
                className="group flex max-w-[200px] flex-1 flex-col items-center text-center"
              >
                <div
                  className={`relative z-10 flex h-[104px] w-[104px] items-center justify-center rounded-2xl border transition-all duration-300 ${
                    active === i
                      ? 'border-[#4fd1ff]/60 bg-[#4fd1ff]/10 shadow-[0_0_40px_rgba(79,209,255,0.25)]'
                      : 'glass-dark border-white/10'
                  }`}
                >
                  <step.icon
                    className={`h-9 w-9 transition-all ${
                      active === i ? 'text-[#4fd1ff]' : 'text-white/60 group-hover:text-[#4fd1ff]'
                    }`}
                  />
                </div>
                <h3 className="mt-4 text-sm font-bold text-white">{step.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{step.desc}</p>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="lg:hidden">
          <motion.div
            key={mobileIndex}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-dark glow-accent rounded-2xl p-8 text-center"
          >
            {(() => {
              const step = STEPS[mobileIndex]
              const Icon = step.icon
              return (
                <>
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-[#4fd1ff]/40 bg-[#4fd1ff]/10">
                    <Icon className="h-10 w-10 text-[#4fd1ff]" />
                  </div>
                  <p className="mt-4 text-xs font-bold tracking-wider text-[#4fd1ff]">
                    STEP {mobileIndex + 1} OF {STEPS.length}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{step.desc}</p>
                </>
              )
            })()}
          </motion.div>
          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setMobileIndex((i) => Math.max(0, i - 1))}
              disabled={mobileIndex === 0}
              className="glass-dark rounded-full p-2 disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setMobileIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === mobileIndex ? 'w-8 bg-[#4fd1ff]' : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setMobileIndex((i) => Math.min(STEPS.length - 1, i + 1))}
              disabled={mobileIndex === STEPS.length - 1}
              className="glass-dark rounded-full p-2 disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
