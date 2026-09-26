import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SOCIAL_LINKS } from '@/components/icons/SocialIcons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const FOOTER_COLS = [
  {
    title: 'Services',
    links: [
      { label: 'All Services', href: '/services' },
      { label: 'Screen Repair', href: '/services/cracked-screen' },
      { label: 'Battery', href: '/services/battery-replacement' },
      { label: 'Data Recovery', href: '/services/data-recovery' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Locations', href: '/locations' },
      { label: 'Careers', href: '/contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Book Repair', href: '/booking' },
      { label: 'Track Repair', href: '/track' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Store',
    links: [
      { label: 'Shop Hardware', href: '/store' },
      { label: 'RAM', href: '/store' },
      { label: 'SSD', href: '/store' },
      { label: 'Accessories', href: '/store' },
    ],
  },
]

export function Footer() {
  const [email, setEmail] = useState('')

  return (
    <footer className="border-t border-white/[0.06] bg-[#020817]">
      <div className="container-lapserve py-16 md:py-20">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-4">
            <img
              src="/logo.png"
              alt="LapServe — We Build Trust"
              className="h-12 w-auto max-w-[240px] object-contain object-left md:h-14"
              width={240}
              height={56}
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              India&apos;s most trusted doorstep laptop repair — powered by A.R.I.A.
            </p>
            <p className="mt-3 text-xs font-semibold tracking-widest text-[#4fd1ff]">
              WE BUILD TRUST
            </p>
            <div className="mt-6 flex gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] text-slate-500 transition-colors hover:border-[#4fd1ff]/30 hover:text-[#4fd1ff]"
                  aria-label={s.label}
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.title} className="col-span-6 sm:col-span-3 lg:col-span-2">
              <h4 className="text-sm font-semibold text-white">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-slate-500 transition-colors hover:text-[#4fd1ff]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/[0.06] pt-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-white">Stay updated</p>
            <p className="mt-1 text-xs text-slate-500">Repair tips & exclusive offers</p>
          </div>
          <form
            className="flex max-w-md flex-1 gap-2 md:justify-end"
            onSubmit={(e) => {
              e.preventDefault()
              setEmail('')
            }}
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="max-w-xs border-white/10 bg-[#0f172a]"
              required
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>

        <div className="mt-10 flex flex-col gap-3 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} LapServe. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <Link to="/legal/privacy" className="hover:text-slate-400">
              Privacy
            </Link>
            <Link to="/legal/terms" className="hover:text-slate-400">
              Terms
            </Link>
            <Link to="/legal/refund" className="hover:text-slate-400">
              Refund
            </Link>
            <Link to="/legal/warranty" className="hover:text-slate-400">
              Warranty
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
