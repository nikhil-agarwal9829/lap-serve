import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
} from 'lucide-react'
import { SOCIAL_LINKS } from '@/components/icons/SocialIcons'
import { SEO } from '@/components/SEO'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { WHATSAPP_URL, PHONE_NUMBER, EMAIL } from '@/lib/constants'

export function ContactPage() {
  return (
    <>
      <SEO title="Contact" description="Contact LapServe — phone, WhatsApp, email, and office hours." path="/contact" />
      <section className="section-gap section-light pt-28">
        <div className="container-lapserve">
          <SectionHeading title="Contact LapServe" description="We're available 7 days a week for repairs and support." />

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-12 flex flex-col items-center justify-center rounded-[28px] border border-success/30 bg-gradient-to-br from-[#dcfce7] to-white p-12 text-center shadow-lg transition-transform hover:-translate-y-1 md:p-16"
          >
            <MessageCircle className="h-14 w-14 text-success" />
            <h2 className="mt-4 text-2xl font-bold text-slate-900 md:text-3xl">Chat on WhatsApp</h2>
            <p className="mt-2 text-slate-600">Fastest response — typically under 5 minutes</p>
            <Button className="mt-6 bg-[#25D366] hover:bg-[#25D366]/90" size="lg">
              Open WhatsApp
            </Button>
          </a>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 space-y-4 lg:col-span-5">
              {[
                { icon: Phone, label: 'Phone', value: PHONE_NUMBER, href: `tel:${PHONE_NUMBER.replace(/\s/g, '')}` },
                { icon: Mail, label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
                {
                  icon: MapPin,
                  label: 'Address',
                  value: 'Hyderabad · Bangalore · Chennai · Mumbai · Delhi · Pune',
                },
                {
                  icon: Clock,
                  label: 'Working Hours',
                  value: 'Mon–Sat 9 AM – 8 PM · Sun 10 AM – 6 PM',
                },
              ].map((item) => (
                <div key={item.label} className="card-light flex gap-4 p-6">
                  <item.icon className="h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm text-slate-500">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="font-semibold text-slate-900 hover:text-primary">
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-semibold text-slate-900">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="card-light p-6">
                <p className="mb-4 font-semibold text-slate-900">Follow us</p>
                <div className="flex flex-wrap gap-3">
                  {SOCIAL_LINKS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:border-primary hover:bg-primary/5 hover:text-primary hover:shadow-md"
                      aria-label={s.label}
                    >
                      <s.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7">
              <form
                className="card-light space-y-6 p-8 md:p-10"
                onSubmit={(e) => e.preventDefault()}
              >
                <h3 className="text-xl font-bold text-slate-900">Send a message</h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name" className="text-slate-700">Name</Label>
                    <Input id="name" className="mt-2 border-slate-200 bg-white" placeholder="Your name" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-slate-700">Email</Label>
                    <Input id="email" type="email" className="mt-2 border-slate-200 bg-white" placeholder="you@email.com" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject" className="text-slate-700">Subject</Label>
                  <Input id="subject" className="mt-2 border-slate-200 bg-white" placeholder="How can we help?" />
                </div>
                <div>
                  <Label htmlFor="message" className="text-slate-700">Message</Label>
                  <Textarea id="message" className="mt-2 border-slate-200 bg-white" placeholder="Your message..." />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>

              <div className="mt-8 overflow-hidden rounded-[28px] border border-slate-200 shadow-lg">
                <iframe
                  title="LapServe Hyderabad"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.3522!2d78.3915!3d17.4487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI2JzU1LjMiTiA3OMKwMjMnMjkuNCJF!5e0!3m2!1sen!2sin!4v1"
                  className="h-72 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
