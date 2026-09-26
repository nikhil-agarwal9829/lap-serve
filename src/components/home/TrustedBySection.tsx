import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { TRUSTED_LOGOS } from '@/data/testimonials'

export function TrustedBySection() {
  return (
    <section className="section-dark-primary section-pad-compact">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-80" aria-hidden />
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[#4fd1ff]/8 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[300px] w-[400px] rounded-full bg-[#7c9dff]/6 blur-[100px]"
        aria-hidden
      />

      <div className="container-lapserve relative z-[1]">
        <SectionHeading
          theme="dark"
          eyebrow="Trusted By"
          title="Powering repairs for India's leading teams"
          description="Enterprises, startups, and institutions trust LapServe for transparent doorstep repair."
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {TRUSTED_LOGOS.map((logo, i) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -4 }}
              className="glass-dark group flex h-[72px] cursor-default items-center justify-center rounded-xl px-3 transition-all duration-300 md:h-20"
            >
              <span className="text-center text-xs font-bold tracking-wide text-white/70 transition-colors group-hover:text-[#4fd1ff] md:text-sm">
                {logo}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="relative mt-10 overflow-hidden rounded-xl border border-white/[0.06] glass-dark py-3">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#071224] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#071224] to-transparent" />
          <div className="flex animate-marquee gap-16 whitespace-nowrap">
            {[...TRUSTED_LOGOS, ...TRUSTED_LOGOS].map((logo, i) => (
              <span key={`m-${logo}-${i}`} className="text-sm font-semibold text-white/30">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
