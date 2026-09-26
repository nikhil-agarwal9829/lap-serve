import { SEO } from '@/components/SEO'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { MagneticButton } from '@/components/layout/MagneticButton'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FAQ_ITEMS } from '@/data/faq'

export function FaqPage() {
  return (
    <>
      <SEO
        title="FAQ"
        description="Frequently asked questions about LapServe doorstep laptop repair, warranty, pricing, and scheduling."
        path="/faq"
      />
      <section className="section-gap pt-28">
        <div className="container-lapserve max-w-3xl">
          <SectionHeading
            title="Frequently asked questions"
            description="Everything you need to know about our repair process, warranty, and policies."
          />
          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-16 text-center">
            <p className="text-muted">Still have questions?</p>
            <MagneticButton to="/contact" className="mt-4">
              Contact Us
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  )
}
