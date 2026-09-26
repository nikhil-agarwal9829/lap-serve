import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Calendar, IndianRupee, Package, Shield, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const AriaScene = lazy(() =>
  import('@/components/aria/AriaScene').then((m) => ({ default: m.AriaScene }))
)
import type { AriaState } from '@/components/aria/AriaMonitorHead'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const QUICK_ACTIONS = [
  { label: 'Book Repair', icon: Calendar, href: '/booking' },
  { label: 'Check Price', icon: IndianRupee, href: '/pricing' },
  { label: 'Track Booking', icon: Package, href: '/contact' },
  { label: 'Warranty Info', icon: Shield, href: '/faq' },
  { label: 'Talk To Human', icon: User, href: '/contact' },
]

const RESPONSES: Record<string, string> = {
  book: 'Book a free diagnostic in under 60 seconds. Our certified engineer will arrive at your doorstep with OEM parts and enterprise diagnostics.',
  price: 'Transparent pricing starts from ₹499 for general service. Screen replacements from ₹2,999. MacBook repairs from ₹2,499. No hidden charges — ever.',
  track: 'Share your booking phone number on WhatsApp and our team will share real-time engineer ETA and repair status.',
  warranty: 'Every LapServe repair includes up to 1 year warranty on parts and labor. Coverage details are provided in writing upon completion.',
  human: 'Our support team is available Mon–Sat 9 AM–8 PM. Connect instantly via WhatsApp or call +91 98765 43210.',
  default:
    "I'm A.R.I.A., your Adaptive Repair Intelligence Assistant. I can help you book repairs, check pricing, understand warranty, or connect you with our team. What would you like to do?",
}

function useTypewriter(text: string, active: boolean) {
  const [display, setDisplay] = useState('')

  useEffect(() => {
    if (!active) {
      setDisplay(text)
      return
    }
    setDisplay('')
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplay(text.slice(0, i))
      if (i >= text.length) clearInterval(interval)
    }, 18)
    return () => clearInterval(interval)
  }, [text, active])

  return display
}

export function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [ariaState, setAriaState] = useState<AriaState>('idle')
  const [typing, setTyping] = useState(false)
  const [lastReply, setLastReply] = useState(RESPONSES.default)
  const [animateReply, setAnimateReply] = useState(false)

  const displayedReply = useTypewriter(lastReply, animateReply)

  const reply = useCallback((key: string) => {
    const text = RESPONSES[key] ?? RESPONSES.default
    setAriaState('thinking')
    setTyping(true)
    setTimeout(() => {
      setLastReply(text)
      setAnimateReply(true)
      setMessages((m) => [...m, { role: 'assistant', content: text }])
      setAriaState('speaking')
      setTyping(false)
      setTimeout(() => setAriaState('idle'), 2000)
    }, 800)
  }, [])

  const handleAction = (label: string, _href: string) => {
    const key = label.toLowerCase().includes('book')
      ? 'book'
      : label.toLowerCase().includes('price')
        ? 'price'
        : label.toLowerCase().includes('track')
          ? 'track'
          : label.toLowerCase().includes('warranty')
            ? 'warranty'
            : label.toLowerCase().includes('human')
              ? 'human'
              : 'default'

    setMessages((m) => [...m, { role: 'user', content: label }])
    setAriaState('listening')
    reply(key)

    if (label === 'Talk To Human') return
    setTimeout(() => setOpen(false), 2500)
  }

  const handleSend = () => {
    if (!input.trim()) return
    setMessages((m) => [...m, { role: 'user', content: input }])
    setInput('')
    setAriaState('listening')
    const lower = input.toLowerCase()
    const key = lower.includes('book')
      ? 'book'
      : lower.includes('price') || lower.includes('cost')
        ? 'price'
        : lower.includes('warranty')
          ? 'warranty'
          : lower.includes('track')
            ? 'track'
            : 'default'
    reply(key)
  }

  return (
    <>
      <motion.button
        type="button"
        className={cn(
          'fixed bottom-5 left-5 z-50 flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-xl md:bottom-8 md:left-8',
          open ? 'h-0 w-0 opacity-0' : 'h-16 w-16 opacity-100'
        )}
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open ARIA assistant"
      >
        <div className="h-14 w-14 overflow-hidden rounded-xl bg-elevated">
          <Suspense fallback={<div className="h-full w-full bg-elevated" />}>
            <AriaScene compact state="idle" className="pointer-events-none scale-150" />
          </Suspense>
        </div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-5 left-5 z-50 flex w-[calc(100vw-2.5rem)] max-w-[420px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-surface shadow-2xl md:bottom-8 md:left-8"
            style={{ height: 'min(600px, 80vh)' }}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-lg bg-elevated">
                  <Suspense fallback={null}>
                    <AriaScene compact state={ariaState} className="pointer-events-none scale-[2]" />
                  </Suspense>
                </div>
                <div>
                  <p className="text-sm font-semibold">A.R.I.A.</p>
                  <p className="text-xs text-muted">
                    {typing ? 'Thinking...' : ariaState === 'speaking' ? 'Speaking' : 'Online'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 hover:bg-white/5"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="rounded-2xl border border-white/10 bg-elevated/50 p-4">
                <p className="text-sm leading-relaxed text-muted">
                  {displayedReply}
                  {animateReply && displayedReply.length < lastReply.length && (
                    <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-primary" />
                  )}
                </p>
              </div>

              {messages.length > 0 && (
                <div className="mt-4 space-y-3">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={cn(
                        'max-w-[85%] rounded-2xl px-4 py-2 text-sm',
                        msg.role === 'user'
                          ? 'ml-auto bg-primary/20 text-foreground'
                          : 'bg-elevated text-muted'
                      )}
                    >
                      {msg.content}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 grid grid-cols-2 gap-2">
                {QUICK_ACTIONS.map((action) => (
                  <Link
                    key={action.label}
                    to={action.href}
                    onClick={() => handleAction(action.label, action.href)}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-elevated/30 px-3 py-2.5 text-xs font-medium transition-colors hover:border-primary/30 hover:bg-primary/5"
                  >
                    <action.icon className="h-3.5 w-3.5 text-primary" />
                    {action.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 p-3">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask A.R.I.A. anything..."
                  className="flex-1 rounded-xl border border-white/10 bg-elevated/50 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none"
                />
                <Button size="icon" onClick={handleSend} aria-label="Send">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
