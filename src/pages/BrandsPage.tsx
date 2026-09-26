import { useParams, Navigate } from 'react-router-dom'
import { ParticlesBackground } from '@/components/layout/ParticlesBackground'
import { SEO } from '@/components/SEO'
import { BrandGrid } from '@/components/brands/BrandGrid'
import { findBrandLogo } from '@/data/brand-logos'
import { bookingUrl } from '@/lib/booking-url'

export function BrandsPage() {
  return (
    <>
      <SEO
        title="Supported Laptop Brands"
        description="Certified repair for HP, Dell, Lenovo, Apple, Asus, Acer, MSI, Samsung and dozens more."
        path="/brands"
      />

      <section className="relative overflow-hidden pt-28 pb-12 md:pb-14">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, #060b14 0%, #020817 50%, #071224 100%)' }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(89, 216, 255, 0.14), transparent)',
          }}
        />
        <ParticlesBackground />
        <div className="container-lapserve relative z-[1] max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.28em] text-[#59d8ff] uppercase">Brands</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Supported Laptop Brands
          </h1>
          <p className="mt-4 text-lg text-[#a7b2c8]">
            Certified repair services for all major manufacturers.
          </p>
        </div>
      </section>

      <section className="section-light-blue section-pad-compact pb-20">
        <div className="container-lapserve">
          <BrandGrid showCantFindCard />
        </div>
      </section>
    </>
  )
}

export function BrandDetailPage() {
  const { slug } = useParams()
  const brand = slug ? findBrandLogo(slug) : null

  if (!brand) {
    return <Navigate to="/brands" replace />
  }

  return <Navigate to={bookingUrl({ brand: brand.name })} replace />
}
