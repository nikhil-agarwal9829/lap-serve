import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { AriaAssistant } from '@/components/aria/AriaAssistant'
import { AriaChatProvider } from '@/context/AriaChatContext'
import { OrganizationSchema } from '@/components/SEO'

export function Layout() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.replace('#', '')
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }, [location.pathname, location.hash])

  return (
    <AriaChatProvider>
      <div className="relative min-h-screen">
        <OrganizationSchema />
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
        <WhatsAppButton />
        <AriaAssistant />
      </div>
    </AriaChatProvider>
  )
}
