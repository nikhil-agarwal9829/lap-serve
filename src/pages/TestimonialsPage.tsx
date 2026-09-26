import { motion } from 'framer-motion'
import { Star, Award } from 'lucide-react'
import { SEO } from '@/components/SEO'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { TESTIMONIALS } from '@/data/testimonials'

export function TestimonialsPage() {
  return (
    <>
      <SEO
        title="Customer Reviews"
        description="Read reviews from 10,000+ satisfied LapServe customers across India."
        path="/testimonials"
      />
      <section className="section-gap pt-28">
        <div className="container-lapserve">
          <SectionHeading
            title="Trusted by thousands"
            description="Real stories from professionals, founders, and families who chose transparency."
          />

          <div className="mb-16 flex flex-wrap justify-center gap-8">
            {[
              { icon: Award, label: '98% Satisfaction' },
              { icon: Star, label: '4.9 Average Rating' },
              { icon: Award, label: '10,000+ Repairs' },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-3 rounded-full border border-white/10 bg-elevated/50 px-6 py-3"
              >
                <badge.icon className="h-5 w-5 text-gold" />
                <span className="font-semibold">{badge.label}</span>
              </div>
            ))}
          </div>

          {/* Marquee row 1 */}
          <div className="relative mb-6 overflow-hidden">
            <div className="flex animate-marquee gap-6">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <div
                  key={`${t.id}-${i}`}
                  className="w-[360px] shrink-0 rounded-[28px] border border-white/10 bg-elevated/60 p-8 backdrop-blur-xl"
                >
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted">"{t.quote}"</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted">
                        {t.role}
                        {t.company ? ` · ${t.company}` : ''} · {t.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Marquee row 2 reverse */}
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee-reverse gap-6">
              {[...TESTIMONIALS].reverse().concat([...TESTIMONIALS].reverse()).map((t, i) => (
                <motion.div
                  key={`rev-${t.id}-${i}`}
                  className="w-[360px] shrink-0 rounded-[28px] border border-white/10 glass p-8"
                >
                  <p className="text-sm leading-relaxed text-muted">"{t.quote}"</p>
                  <p className="mt-4 text-sm font-semibold">{t.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
