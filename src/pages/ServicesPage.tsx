import { useState, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SEO } from '@/components/SEO'
import { PageHero } from '@/components/layout/PageHero'
import { MagneticButton } from '@/components/layout/MagneticButton'
import { ServicesHero } from '@/components/services/ServicesHero'
import { ServicesDirectory } from '@/components/services/ServicesDirectory'
import {
  ServicesFeaturedStrip,
  ServicesFaqSection,
  ServicesCtaSection,
} from '@/components/services/ServicesPageSections'
import { filterDirectory } from '@/data/services-directory'
import { findCatalogService } from '@/data/service-catalog'
import { SERVICE_NAME_TO_ISSUE } from '@/data/booking'
import { bookingUrl } from '@/lib/booking-url'
import { findService } from '@/data/services'

export function ServicesPage() {
  const [search, setSearch] = useState('')
  const filtered = useMemo(() => filterDirectory(search), [search])

  return (
    <>
      <SEO
        title="Laptop Repair Services"
        description="Search and book laptop repairs — screen, battery, SSD, motherboard, data recovery and more."
        path="/services"
      />

      <ServicesHero search={search} onSearchChange={setSearch} />

      <section className="section-light-premium section-pad-compact">
        <div className="container-lapserve">
          <ServicesDirectory categories={filtered} variant="light" />
        </div>
      </section>

      <ServicesFeaturedStrip />
      <ServicesFaqSection />
      <ServicesCtaSection />
    </>
  )
}

export function ServiceDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const catalog = slug ? findCatalogService(slug) : null
  const legacy = slug ? findService(slug) : null
  const name = catalog?.name ?? legacy?.item.name

  if (!name || !slug) {
    return (
      <>
        <PageHero title="Service not found" subtitle="Browse our full catalog of repair services." />
        <section className="section-pad-compact text-center section-dark-deep">
          <div className="container-lapserve">
            <MagneticButton to="/services">View all services</MagneticButton>
          </div>
        </section>
      </>
    )
  }

  const issue = SERVICE_NAME_TO_ISSUE[name]

  return (
    <>
      <SEO title={`${name} Repair`} description={`Professional ${name.toLowerCase()} repair.`} path={`/services/${slug}`} />
      <PageHero eyebrow="Service" title={name} subtitle="Certified engineers, genuine parts, free diagnostic at your doorstep." />
      <section className="section-pad-compact text-center section-dark-deep">
        <div className="container-lapserve max-w-xl">
          <MagneticButton
            size="lg"
            onClick={() =>
              navigate(
                bookingUrl({
                  service: slug,
                  issue: issue ?? name,
                })
              )
            }
          >
            Book {name}
          </MagneticButton>
        </div>
      </section>
    </>
  )
}
