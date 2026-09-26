import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FAQ_ITEMS } from '@/data/faq'
import { FEATURED_SERVICES } from '@/data/featured-services'
import { BookRepairButton } from '@/components/booking/BookRepairButton'
import { ServiceDirectoryCard } from './ServiceDirectoryCard'
export function ServicesFeaturedStrip() {
  return (
    <section className="section-dark-primary section-pad-compact">
      <div className="container-lapserve">
        <div className="mb-8 text-center md:mb-10">
          <h2 className="text-2xl font-bold text-white md:text-3xl">Popular repairs</h2>
          <p className="mt-2 text-slate-400">Most booked services this month</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_SERVICES.slice(0, 4).map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <ServiceDirectoryCard
                service={{
                  name: s.title,
                  slug: s.slug,
                  priceMin: s.priceFrom,
                  time: s.time,
                  icon: s.icon,
                  keywords: [],
                }}
                variant="dark"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ServicesFaqSection() {
  return (
    <section className="section-light-premium section-pad-compact">
      <div className="container-lapserve max-w-3xl">
        <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 md:text-3xl">
          Service FAQs
        </h2>
        <Accordion type="single" collapsible className="rounded-2xl border border-slate-200/80 bg-white px-4">
          {FAQ_ITEMS.slice(0, 5).map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-slate-100">
              <AccordionTrigger className="text-left text-slate-900 hover:text-[#38bdf8]">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-6 text-center">
          <Link to="/faq" className="text-sm font-semibold text-[#38bdf8] hover:underline">
            View all FAQs →
          </Link>
        </p>
      </div>
    </section>
  )
}

export function ServicesCtaSection() {
  return (
    <section className="section-dark-deep section-pad-compact">
      <div className="container-lapserve text-center">
        <h2 className="text-2xl font-bold text-white md:text-3xl">Ready for a free diagnostic?</h2>
        <p className="mx-auto mt-3 max-w-lg text-slate-400">
          A certified engineer will visit your doorstep with OEM parts and enterprise diagnostics.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <BookRepairButton size="lg">Book Free Diagnostic</BookRepairButton>
          <Link
            to="/contact"
            className="inline-flex h-12 items-center rounded-full border border-white/15 px-8 text-sm font-semibold text-white transition-colors hover:border-white/30"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}
