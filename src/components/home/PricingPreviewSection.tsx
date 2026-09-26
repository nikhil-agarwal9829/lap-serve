import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { PRICING_TIERS } from '@/data/pricing-tiers'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function PricingPreviewSection() {
  return (
    <section id="pricing" className="section-white section-pad-compact">
      <div className="container-lapserve">
        <SectionHeading
          theme="light"
          eyebrow="Pricing"
          title="Plans built for every repair need"
          description="Transparent SaaS-style pricing — no hidden fees, no surprises."
        />

        <div className="grid grid-cols-12 gap-6">
          {PRICING_TIERS.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="col-span-12 md:col-span-6 lg:col-span-3"
            >
              <div
                className={cn(
                  'flex h-full flex-col rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1',
                  tier.highlighted
                    ? 'border-[#4fd1ff] bg-gradient-to-b from-[#f1f7ff] to-white shadow-[0_0_48px_rgba(79,209,255,0.18)]'
                    : 'border-slate-200/80 bg-white shadow-lg shadow-slate-200/40 hover:border-[#4fd1ff]/30 hover:shadow-xl'
                )}
              >
                {tier.highlighted && (
                  <span className="mb-4 w-fit rounded-full bg-[#4fd1ff] px-3 py-1 text-xs font-bold text-[#020817]">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-slate-900">{tier.name}</h3>
                <p className="mt-2 text-sm text-slate-500">{tier.description}</p>
                <p className="mt-6">
                  <span className="text-4xl font-bold text-slate-900">{tier.price}</span>
                  <span className="text-slate-500">{tier.period}</span>
                </p>
                <ul className="mt-8 flex-1 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-slate-600">
                      <Check className="h-4 w-4 shrink-0 text-[#22c55e]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs text-slate-400">
                  {tier.responseTime} · Warranty {tier.warranty}
                </p>
                <Button
                  className={cn('mt-6 w-full', tier.highlighted ? '' : 'bg-[#071224] hover:bg-[#0f172a]')}
                  variant={tier.highlighted ? 'default' : 'light'}
                  asChild
                >
                  <Link to={tier.href}>{tier.cta}</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
