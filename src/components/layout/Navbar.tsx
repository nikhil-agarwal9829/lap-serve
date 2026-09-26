import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, MessageCircle, ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/button'
import { NAV_LINKS, WHATSAPP_URL } from '@/lib/constants'
import { SERVICE_CATEGORIES } from '@/data/services'
import { BookRepairNavButton } from '@/components/booking/BookRepairButton'
import { bookingUrl } from '@/lib/booking-url'
import { SERVICE_SLUG_TO_ISSUE } from '@/data/booking'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { count } = useCart()

  const navClick = (href: string, e: React.MouseEvent) => {
    if (!href.includes('#')) return
    e.preventDefault()
    const [path, hash] = href.split('#')
    const target = path || '/'
    if (location.pathname !== target) {
      navigate(`${target}#${hash}`)
      setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 400)
    } else {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileOpen(false)
  }

  const isActive = (href: string) => {
    const path = href.split('#')[0] || '/'
    return location.pathname === path
  }

  useEffect(() => {
    setMobileOpen(false)
    setMegaOpen(false)
  }, [location.pathname])

  return (
    <header className="navbar-premium fixed top-0 right-0 left-0 z-50 py-2.5 md:py-3">
      <nav className="container-lapserve flex h-14 items-center justify-between gap-4 md:h-16">
        <Link to="/" className="relative z-10 flex shrink-0 items-center">
          <img
            src="/logo.png"
            alt="LapServe — We Build Trust"
            className="h-10 w-auto max-w-[min(200px,48vw)] object-contain object-left sm:h-11 md:h-12 lg:h-[52px] lg:max-w-[220px]"
            width={220}
            height={52}
            fetchPriority="high"
          />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li
              key={link.href}
              className="relative"
              onMouseEnter={() => link.mega && setMegaOpen(true)}
              onMouseLeave={() => link.mega && setMegaOpen(false)}
            >
              <Link
                to={link.href}
                onClick={(e) => navClick(link.href, e)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  isActive(link.href)
                    ? 'text-[#4fd1ff]'
                    : 'text-white/75 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/store/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/80 transition-colors hover:border-[#4fd1ff]/40 hover:text-white"
            aria-label="Cart"
          >
            <ShoppingCart className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#4fd1ff] text-[10px] font-bold text-[#020817]">
                {count}
              </span>
            )}
          </Link>
          <Button variant="ghost" size="sm" className="text-white/80 hover:bg-white/5 hover:text-white" asChild>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </Button>
          <BookRepairNavButton />
        </div>

        <button
          type="button"
          className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {megaOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="navbar-premium absolute top-full right-0 left-0 hidden border-t border-white/[0.06] lg:block"
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <div className="container-lapserve grid grid-cols-12 gap-8 py-8">
              {SERVICE_CATEGORIES.map((cat) => (
                <div key={cat.id} className="col-span-2">
                  <Link
                    to={`/services#${cat.slug}`}
                    className="mb-3 block text-xs font-bold tracking-wider text-[#4fd1ff] uppercase"
                  >
                    {cat.title}
                  </Link>
                  <ul className="space-y-2">
                    {cat.items.slice(0, 6).map((item) => (
                      <li key={item.slug}>
                        <Link
                          to={bookingUrl({
                            service: item.slug,
                            issue: SERVICE_SLUG_TO_ISSUE[item.slug] ?? item.name,
                          })}
                          className="text-sm text-white/60 transition-colors hover:text-white"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="col-span-2 flex flex-col justify-center rounded-[28px] border border-[#4fd1ff]/20 bg-[#4fd1ff]/5 p-6">
                <p className="text-sm font-semibold text-white">Need help choosing?</p>
                <p className="mt-2 text-xs text-white/60">Ask A.R.I.A. or book a free diagnostic.</p>
                <BookRepairNavButton className="mt-4" size="sm">
                  Book Free Diagnostic
                </BookRepairNavButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="navbar-premium fixed inset-0 top-0 z-40 flex flex-col lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-white/[0.06] p-5">
              <img
                src="/logo.png"
                alt="LapServe"
                className="h-11 w-auto max-w-[200px] object-contain object-left"
                width={200}
                height={48}
              />
              <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close" className="text-white">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={(e) => navClick(link.href, e)}
                  className={cn(
                    'block border-b border-white/[0.06] py-4 text-lg font-medium',
                    isActive(link.href) ? 'text-[#4fd1ff]' : 'text-white'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-8 space-y-3">
                <BookRepairNavButton className="w-full" />
                <Button variant="secondary" className="w-full" asChild>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
