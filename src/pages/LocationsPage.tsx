import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { SEO } from '@/components/SEO'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { MagneticButton } from '@/components/layout/MagneticButton'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { LOCATIONS, findLocation } from '@/data/locations'
import { FAQ_ITEMS } from '@/data/faq'
import { TESTIMONIALS } from '@/data/testimonials'

export function LocationsPage() {
  return (
    <>
      <SEO
        title="Service Locations"
        description="Doorstep laptop repair in Hyderabad, Bangalore, Chennai, Mumbai, Delhi, and Pune."
        path="/locations"
      />
      <section className="section-gap pt-28">
        <div className="container-lapserve">
          <SectionHeading
            title="Serving India's leading cities"
            description="Certified engineers across major metros and tech hubs."
          />
          <div className="grid grid-cols-12 gap-6">
            {LOCATIONS.map((loc, i) => (
              <motion.div
                key={loc.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="col-span-12 sm:col-span-6 lg:col-span-4"
              >
                <Link
                  to={`/locations/${loc.slug}`}
                  className="group block h-full rounded-[28px] border border-white/10 bg-elevated/40 p-8 transition-all hover:border-primary/30 hover:bg-elevated"
                >
                  <MapPin className="h-6 w-6 text-primary" />
                  <h3 className="mt-4 text-2xl font-bold">{loc.name}</h3>
                  <p className="mt-2 text-sm text-muted line-clamp-2">{loc.description}</p>
                  <span className="mt-4 inline-block text-sm text-primary group-hover:underline">
                    View service areas →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export function LocationDetailPage() {
  const { slug } = useParams()
  const location = slug ? findLocation(slug) : null

  if (!location) {
    return (
      <section className="section-gap pt-28 text-center">
        <div className="container-lapserve">
          <h1 className="text-3xl font-bold">Location not found</h1>
          <MagneticButton to="/locations" className="mt-6">All locations</MagneticButton>
        </div>
      </section>
    )
  }

  const localTestimonials = TESTIMONIALS.filter(
    (t) => t.location.toLowerCase().includes(location.name.toLowerCase().slice(0, 4))
  )

  return (
    <>
      <SEO
        title={`Laptop Repair ${location.name}`}
        description={location.description}
        path={`/locations/${location.slug}`}
      />
      <section className="section-gap pt-28">
        <div className="container-lapserve">
          <SectionHeading
            align="left"
            eyebrow="Location"
            title={`Doorstep Laptop Repair in ${location.name}`}
            description={location.description}
          />

          <div className="grid grid-cols-12 gap-12">
            <div className="col-span-12 lg:col-span-7">
              <h3 className="text-lg font-bold">Service Areas</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {location.areas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-white/10 bg-elevated px-4 py-2 text-sm text-muted"
                  >
                    {area}
                  </span>
                ))}
              </div>

              <h3 className="mt-12 text-lg font-bold">FAQ</h3>
              <Accordion type="single" collapsible className="mt-4">
                {FAQ_ITEMS.slice(0, 5).map((item, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="col-span-12 lg:col-span-5">
              <div className="rounded-[28px] border border-white/10 bg-elevated/50 p-8 lg:sticky lg:top-28">
                <h3 className="text-xl font-bold">Book in {location.name}</h3>
                <p className="mt-2 text-sm text-muted">Free diagnostic · Same-day slots available</p>
                <MagneticButton to="/booking" className="mt-6 w-full">
                  Book Free Diagnostic
                </MagneticButton>
              </div>

              {localTestimonials.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-bold">Local Reviews</h3>
                  {localTestimonials.map((t) => (
                    <div key={t.id} className="mt-4 rounded-[28px] border border-white/10 p-6">
                      <p className="text-sm text-muted">"{t.quote}"</p>
                      <p className="mt-2 text-sm font-semibold">{t.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
