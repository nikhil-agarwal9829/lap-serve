export const WHATSAPP_NUMBER = '919785836544'
export const PHONE_NUMBER = '+91 97858 36544'
export const EMAIL = 'hello@lapserve.in'

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hi LapServe, I need help with my laptop repair.'
)}`

export const TRUST_STATS = [
  { value: '10,000+', label: 'Repairs Completed' },
  { value: '98%', label: 'Customer Satisfaction' },
  { value: '50+', label: 'Certified Engineers' },
  { value: '1 Year', label: 'Warranty' },
] as const

export type NavLink = {
  label: string
  href: string
  mega?: boolean
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services', mega: true },
  { label: 'Brands', href: '/brands' },
  { label: 'Store', href: '/store' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Track', href: '/track' },
  { label: 'Contact', href: '/contact' },
]
