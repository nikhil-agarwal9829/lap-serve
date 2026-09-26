import { SectionHeading } from '@/components/layout/SectionHeading'
import { BrandGrid } from '@/components/brands/BrandGrid'

export function BrandsSection() {
  return (
    <section className="section-light-blue section-pad-compact">
      <div className="container-lapserve">
        <SectionHeading
          theme="light"
          compact
          title="We repair every major brand"
          description="Select your brand and book a free diagnostic in seconds."
        />
        <BrandGrid previewOnly showViewAll />
      </div>
    </section>
  )
}
