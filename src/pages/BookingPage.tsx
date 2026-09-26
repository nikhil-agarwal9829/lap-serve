import { SEO } from '@/components/SEO'
import { PageHero } from '@/components/layout/PageHero'
import { BookingForm } from '@/components/booking/BookingForm'

export function BookingPage() {
  return (
    <>
      <SEO
        title="Book Repair"
        description="Book a free doorstep laptop diagnostic. One form, instant estimate, confirm on WhatsApp."
        path="/booking"
      />
      <PageHero
        eyebrow="Booking"
        title="Book Your Repair"
        subtitle="Fill in your device details. Get an instant estimate and continue on WhatsApp to schedule your free diagnostic."
      />

      <section
        className="section-pad pb-24"
        style={{ background: 'linear-gradient(180deg, #071224 0%, #020817 100%)' }}
      >
        <div className="container-lapserve max-w-2xl">
          <div className="glass-dark rounded-[28px] border border-white/10 p-6 md:p-10">
            <BookingForm />
          </div>
        </div>
      </section>
    </>
  )
}
