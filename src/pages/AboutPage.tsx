import { SEO } from '@/components/SEO'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { MagneticButton } from '@/components/layout/MagneticButton'
import { TRUST_STATS } from '@/lib/constants'

export function AboutPage() {
  return (
    <>
      <SEO
        title="About LapServe"
        description="LapServe is India's most trusted doorstep laptop repair platform. WE BUILD TRUST."
        path="/about"
      />
      <section className="section-gap pt-28">
        <div className="container-lapserve">
          <SectionHeading
            align="left"
            eyebrow="About"
            title="We build trust — one repair at a time"
            description="LapServe was founded on a simple belief: laptop repair should be transparent, professional, and done in front of you."
          />

          <div className="grid grid-cols-12 gap-12 lg:gap-20">
            <div className="col-span-12 lg:col-span-7 prose-narrow space-y-6 text-muted leading-relaxed">
              <p>
                We're not a local repair shop. We're a premium technology company that brings
                enterprise-grade diagnostics and certified engineers to your doorstep — whether
                that's your home, office, or co-working space.
              </p>
              <p>
                Every LapServe engineer is background-verified, brand-trained, and equipped with
                genuine OEM parts. We never take your device away without explicit consent. We
                never use counterfeit components. We never surprise you with hidden charges.
              </p>
              <p>
                Our mission is to become India's most trusted repair platform — the one professionals,
                startups, and families choose when their work depends on their devices.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5">
              <div className="grid grid-cols-2 gap-4">
                {TRUST_STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[28px] border border-white/10 bg-elevated/50 p-6 text-center"
                  >
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="mt-2 text-xs text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-12 gap-6">
            {[
              { title: 'No Hidden Charges', desc: 'Quote upfront. Pay only what you approve.' },
              { title: 'No Fake Parts', desc: 'Genuine OEM with serial verification.' },
              { title: 'No Data Theft', desc: 'Repair in your presence. Always.' },
              { title: 'No Waiting Days', desc: 'Most fixes in 1–3 hours at your location.' },
            ].map((item) => (
              <div key={item.title} className="col-span-12 sm:col-span-6 lg:col-span-3">
                <div className="h-full rounded-[28px] border border-white/10 bg-surface p-8">
                  <h3 className="font-bold text-gold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <MagneticButton to="/booking" size="lg">
              Experience LapServe
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  )
}
