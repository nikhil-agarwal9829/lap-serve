import { useEffect } from 'react'

interface SEOProps {
  title: string
  description: string
  path?: string
}

export function SEO({ title, description, path = '' }: SEOProps) {
  useEffect(() => {
    document.title = `${title} | LapServe`
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', description)

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = `https://lapserve.in${path}`
  }, [title, description, path])

  return null
}

export function OrganizationSchema() {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'LapServe',
      description: "India's Most Trusted Doorstep Laptop Repair Platform",
      url: 'https://lapserve.in',
      telephone: '+91-98765-43210',
      areaServed: ['Hyderabad', 'Bangalore', 'Chennai', 'Mumbai', 'Delhi', 'Pune'],
      priceRange: '₹₹',
      slogan: 'WE BUILD TRUST',
    })
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return null
}
