import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { FEATURED_SERVICES } from '@/data/featured-services'
import { bookingUrl } from '@/lib/booking-url'
import { SERVICE_NAME_TO_ISSUE } from '@/data/booking'
import { formatINR } from '@/data/service-catalog'

export function ServicesShowcase() {
  return (
    <section id="services" className="section-light-premium section-pad-compact">
      <div className="container-lapserve">
        <SectionHeading
          theme="light"
          compact
          eyebrow="Services"
          title="Popular repair services"
          description="Book in two clicks — choose a service and we handle the rest."
        />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {FEATURED_SERVICES.map((service, i) => {
            const issue = SERVICE_NAME_TO_ISSUE[service.title] ?? service.title
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
              >
                <Link
                  to={bookingUrl({ service: service.slug, issue })}
                  className="card-premium group flex h-full flex-col p-4 md:p-5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f1f7ff] text-[#38bdf8] transition-colors group-hover:bg-[#4fd1ff]/10 group-hover:text-[#4fd1ff]">
                    <service.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-slate-900 md:text-base">{service.title}</h3>
                  <p className="mt-1 text-xs font-semibold text-[#38bdf8]">
                    From {formatINR(service.priceFrom)}
                  </p>
                  <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-slate-500">
                    {service.description}
                  </p>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#38bdf8] transition-colors hover:text-[#0ea5e9]"
          >
            View All Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
