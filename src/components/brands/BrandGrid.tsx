import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { BRAND_LOGOS, getBrandsBySlugs, HOME_BRAND_SLUGS, type BrandLogo } from '@/data/brand-logos'
import { bookingUrl } from '@/lib/booking-url'
import { BookRepairButton } from '@/components/booking/BookRepairButton'

function AppleIcon() {
  return (
    <svg className="h-9 w-9 text-slate-800" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

function BrandCard({ brand }: { brand: BrandLogo }) {
  return (
    <Link
      to={bookingUrl({ brand: brand.name })}
      className="flex h-[80px] flex-col items-center justify-center gap-1.5 rounded-xl border border-[rgba(15,23,42,0.08)] bg-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-[#4fd1ff]/40 hover:shadow-[0_0_20px_rgba(79,209,255,0.12)] md:h-[88px]"
    >
      {brand.slug === 'apple' ? (
        <AppleIcon />
      ) : (
        <span
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[9px] font-black tracking-tight text-white md:h-10 md:w-10 md:text-[10px]"
          style={{ backgroundColor: brand.color }}
        >
          {brand.abbr}
        </span>
      )}
      <span className="text-[10px] font-semibold text-slate-700 md:text-xs">
        {brand.displayName ?? brand.name}
      </span>
    </Link>
  )
}

interface BrandGridProps {
  /** Subset of brands (homepage preview) */
  previewOnly?: boolean
  showViewAll?: boolean
  showCantFindCard?: boolean
}

export function BrandGrid({
  previewOnly = false,
  showViewAll = false,
  showCantFindCard = false,
}: BrandGridProps) {
  const brands = previewOnly ? getBrandsBySlugs(HOME_BRAND_SLUGS) : BRAND_LOGOS

  return (
    <div>
      <div
        className={
          previewOnly
            ? 'grid grid-cols-4 gap-2 md:gap-3'
            : 'grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6 md:gap-3'
        }
      >
        {brands.map((brand, i) => (
          <motion.div
            key={brand.slug}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.02 }}
          >
            <BrandCard brand={brand} />
          </motion.div>
        ))}
      </div>

      {showViewAll && (
        <div className="mt-8 text-center">
          <Link
            to="/brands"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#38bdf8] transition-colors hover:text-[#0ea5e9]"
          >
            View All Brands
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      {showCantFindCard && (
        <div className="mt-10 rounded-[28px] border border-slate-200/80 bg-white p-8 text-center shadow-sm md:p-10">
          <h3 className="text-xl font-bold text-slate-900 md:text-2xl">Can&apos;t Find Your Brand?</h3>
          <p className="mx-auto mt-3 max-w-md text-slate-500">
            Don&apos;t worry. We repair hundreds of laptop models not listed here.
          </p>
          <div className="mt-6 flex justify-center">
            <BookRepairButton size="lg">Book Repair</BookRepairButton>
          </div>
        </div>
      )}
    </div>
  )
}
