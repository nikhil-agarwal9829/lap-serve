import { SEO } from '@/components/SEO'
import { HeroSection } from '@/components/hero/HeroSection'
import { HowItWorksHorizontal } from '@/components/home/HowItWorksHorizontal'
import { ServicesShowcase } from '@/components/home/ServicesShowcase'
import { BrandsSection } from '@/components/home/BrandsSection'
import { PricingPreviewSection } from '@/components/home/PricingPreviewSection'
import { TestimonialsSlider } from '@/components/home/TestimonialsSlider'
import { StorePreviewSection } from '@/components/home/StorePreviewSection'
import { ContactCtaSection } from '@/components/home/ContactCtaSection'

export function HomePage() {
  return (
    <>
      <SEO
        title="Doorstep Laptop Repair"
        description="India's most trusted doorstep laptop repair. Certified engineers, OEM parts, repairs in front of you. WE BUILD TRUST."
        path="/"
      />

      <HeroSection />
      <HowItWorksHorizontal />
      <ServicesShowcase />
      <BrandsSection />
      <PricingPreviewSection />
      <TestimonialsSlider />
      <StorePreviewSection />
      <ContactCtaSection />
    </>
  )
}
