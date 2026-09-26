import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { MagneticButton } from '@/components/layout/MagneticButton'
import { SOCIAL_LINKS } from '@/components/icons/SocialIcons'
import { WHATSAPP_URL, PHONE_NUMBER, EMAIL } from '@/lib/constants'

export function ContactCtaSection() {
  return (
    <section id="contact" className="section-dark-deep section-pad-compact">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" aria-hidden />

      <div className="container-lapserve relative z-[1]">
        <SectionHeading
          theme="dark"
          title="Get in touch"
          description="We're here seven days a week — powered by A.R.I.A. and human experts."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: MessageCircle,
                label: 'WhatsApp',
                value: 'Chat now',
                href: WHATSAPP_URL,
                external: true,
                accent: 'text-[#25D366]',
              },
              {
                icon: Phone,
                label: 'Phone',
                value: PHONE_NUMBER,
                href: `tel:${PHONE_NUMBER.replace(/\s/g, '')}`,
              },
              {
                icon: Mail,
                label: 'Email',
                value: EMAIL,
                href: `mailto:${EMAIL}`,
              },
              {
                icon: MapPin,
                label: 'Service Areas',
                value: '6 major cities',
                href: '/locations',
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="glass-dark group rounded-2xl p-6 transition-all hover:border-[#4fd1ff]/30"
              >
                <item.icon className={`h-8 w-8 ${item.accent ?? 'text-[#4fd1ff]'}`} />
                <p className="mt-4 text-sm text-slate-400">{item.label}</p>
                <p className="mt-1 font-semibold text-white group-hover:text-[#4fd1ff]">
                  {item.value}
                </p>
              </a>
            ))}
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold text-slate-400">Follow LapServe</p>
            <div className="mb-8 flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-dark flex h-11 w-11 items-center justify-center rounded-xl text-white/70 transition-all hover:border-[#4fd1ff]/40 hover:text-[#4fd1ff]"
                  aria-label={s.label}
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/[0.06]">
              <iframe
                title="LapServe location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3522!2d78.3915!3d17.4487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI2JzU1LjMiTiA3OMKwMjMnMjkuNCJF!5e0!3m2!1sen!2sin!4v1"
                className="h-56 w-full border-0 grayscale opacity-80 transition-opacity hover:opacity-100 md:h-64"
                loading="lazy"
              />
            </div>
            <div className="mt-8">
              <MagneticButton to="/contact" variant="secondary" size="lg">
                Full Contact Page
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
