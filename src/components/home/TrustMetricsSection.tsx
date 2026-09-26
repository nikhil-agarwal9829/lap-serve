import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionHeading } from '@/components/layout/SectionHeading'

const METRICS = [
  { value: 10000, suffix: '+', label: 'Repairs Completed' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate' },
  { value: 50, suffix: '+', label: 'Certified Engineers' },
  { value: 1, suffix: ' Year', label: 'Warranty' },
  { value: 100, suffix: '%', label: 'Genuine Parts' },
  { value: 0, suffix: '', label: 'Doorstep Repair', text: '100%' },
  { value: 0, suffix: '', label: 'Background Verified', text: 'All Staff' },
  { value: 0, suffix: '', label: 'Real-Time Updates', text: 'Live' },
]

function CountUp({ target, suffix, text }: { target: number; suffix: string; text?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (text) return
    const duration = 1500
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      setN(Math.floor(target * p))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target, text])

  return (
    <span ref={ref} className="text-3xl font-bold text-primary md:text-4xl">
      {text ?? `${n.toLocaleString()}${suffix}`}
    </span>
  )
}

export function TrustMetricsSection() {
  return (
    <section id="trust" className="section-gap section-flow-blue">
      <div className="container-lapserve">
        <SectionHeading title="Numbers that build trust" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
                className="card-light p-6 text-center"
            >
              <CountUp target={m.value} suffix={m.suffix} text={m.text} />
              <p className="mt-2 text-sm text-muted">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
