import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, BadgeCheck, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Button } from '@/components/ui/button'
import { TESTIMONIALS } from '@/data/testimonials'

export function TestimonialsSlider() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 6000)
    return () => clearInterval(t)
  }, [])

  const current = TESTIMONIALS[index]

  return (
    <section id="testimonials" className="section-dark-secondary section-pad-compact">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[500px] rounded-full bg-[#4fd1ff]/6 blur-[120px]"
        aria-hidden
      />

      <div className="container-lapserve relative z-[1]">
        <SectionHeading
          theme="dark"
          eyebrow="Testimonials"
          title="Trusted by thousands nationwide"
          description="Real stories from professionals who chose transparency over uncertainty."
        />

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                className="glass-dark glow-accent rounded-2xl p-8 md:p-10"
              >
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#f59e0b] text-[#f59e0b]" />
                  ))}
                </div>
                <p className="mt-6 text-lg leading-relaxed text-slate-300 md:text-xl">
                  &ldquo;{current.quote}&rdquo;
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#4fd1ff]/30 bg-[#4fd1ff]/10 text-xl font-bold text-[#4fd1ff]">
                    {current.name.charAt(0)}
                  </div>
                  <div>
                    <p className="flex items-center gap-2 font-semibold text-white">
                      {current.name}
                      <BadgeCheck className="h-4 w-4 text-[#4fd1ff]" />
                      <span className="text-xs font-normal text-[#4fd1ff]">Verified</span>
                    </p>
                    <p className="text-sm text-slate-400">
                      {current.role}
                      {current.company ? ` · ${current.company}` : ''} · {current.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="mt-4 flex justify-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? 'w-8 bg-[#4fd1ff]' : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="col-span-12 grid gap-4 sm:grid-cols-2 lg:col-span-5">
            <div className="glass-dark flex aspect-video flex-col items-center justify-center rounded-2xl border border-[#4fd1ff]/20 p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#4fd1ff]/15">
                <Play className="h-8 w-8 text-[#4fd1ff]" />
              </div>
              <p className="mt-4 font-semibold text-white">Video Reviews</p>
              <p className="text-sm text-slate-400">Customer stories</p>
            </div>
            {TESTIMONIALS.slice(0, 2).map((t) => (
              <div key={t.id} className="glass-dark rounded-2xl p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.location}</p>
                  </div>
                </div>
                <p className="mt-3 line-clamp-3 text-sm text-slate-400">&ldquo;{t.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button variant="secondary" asChild>
            <Link to="/testimonials">All Testimonials</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
