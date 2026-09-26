import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { SEO } from '@/components/SEO'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { PRICING_TIERS } from '@/data/pricing-tiers'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function PricingPage() {
  return (
    <>
      <SEO
        title="Repair Pricing"
        description="Transparent laptop repair pricing — Diagnostic, Standard, Premium, Enterprise."
        path="/pricing"
      />
      <section className="section-white section-pad pt-28">
        <div className="container-lapserve">
          <SectionHeading
            theme="light"
            title="Plans for every repair need"
            description="Transparent pricing with A.R.I.A.-assisted diagnostics — no hidden fees."
          />
          <div className="grid grid-cols-12 gap-6">
            {PRICING_TIERS.map((tier, i) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="col-span-12 md:col-span-6 lg:col-span-3"
              >
                <div
                  className={cn(
                    'flex h-full flex-col rounded-2xl border p-8 transition-all hover:-translate-y-1',
                    tier.highlighted
                      ? 'border-[#4fd1ff] bg-gradient-to-b from-[#f1f7ff] to-white shadow-[0_0_48px_rgba(79,209,255,0.15)]'
                      : 'border-slate-200 bg-white shadow-lg hover:border-[#4fd1ff]/30'
                  )}
                >
                  {tier.highlighted && (
                    <span className="mb-4 w-fit rounded-full bg-[#4fd1ff] px-3 py-1 text-xs font-bold text-[#020817]">
                      Featured
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-slate-900">{tier.name}</h3>
                  <p className="mt-2 text-sm text-slate-500">{tier.description}</p>
                  <p className="mt-6">
                    <span className="text-4xl font-bold">{tier.price}</span>
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
                  <Button className="mt-6 w-full" variant={tier.highlighted ? 'default' : 'light'} asChild>
                    <Link to={tier.href}>{tier.cta}</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
