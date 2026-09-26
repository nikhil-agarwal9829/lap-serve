import { useState, useRef, useEffect, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  X,
  Send,
  Paperclip,
  Calendar,
  IndianRupee,
  Package,
  Shield,
  Headphones,
  Sparkles,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAriaChat } from '@/context/AriaChatContext'
import { getAriaResponse, ARIA_QUICK_REPLY } from '@/lib/aria-responses'
import { cn } from '@/lib/utils'

const AriaScene = lazy(() =>
  import('./AriaScene').then((m) => ({ default: m.AriaScene }))
)

type Message = { role: 'user' | 'assistant'; content: string }

const QUICK_ACTIONS = [
  { label: 'Book Repair', icon: Calendar, href: '/booking', inChat: false },
  { label: 'Repair Estimate', icon: IndianRupee, inChat: true },
  { label: 'Track Repair', icon: Package, inChat: true },
  { label: 'Warranty Help', icon: Shield, inChat: true },
  { label: 'Human Support', icon: Headphones, inChat: true },
]

const FAQ_SUGGESTIONS = [
  'How much does screen replacement cost?',
  'Do you repair MacBooks?',
  'Is doorstep repair available in my city?',
  'How long does a repair take?',
  'Is my data safe?',
]

function lockBodyScroll(lock: boolean) {
  if (lock) {
    document.body.dataset.ariaChatOpen = 'true'
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
  } else {
    delete document.body.dataset.ariaChatOpen
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
  }
}

export function AriaChatDrawer() {
  const { isOpen, closeChat, ariaState, setAriaState } = useAriaChat()
  const [input, setInput] = useState('')
  const [attached, setAttached] = useState<File | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesScrollRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    lockBodyScroll(isOpen)
    return () => lockBodyScroll(false)
  }, [isOpen])

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior, block: 'end' })
    })
  }

  useEffect(() => {
    if (isOpen) scrollToBottom('auto')
  }, [isOpen])

  useEffect(() => {
    scrollToBottom()
  }, [messages, ariaState])

  useEffect(() => {
    if (messages.length > 0) setShowSuggestions(false)
  }, [messages.length])

  const containScroll = (e: React.WheelEvent | React.TouchEvent) => {
    e.stopPropagation()
  }

  const sendReply = (userText: string) => {
    const answer = getAriaResponse(userText)
    setAriaState('thinking')
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'assistant', content: answer }])
      setAriaState('speaking')
      setTimeout(() => setAriaState('idle'), 1800)
    }, 500)
  }

  const handleUserMessage = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setMessages((m) => [...m, { role: 'user', content: trimmed }])
    sendReply(trimmed)
  }

  const handleSend = () => {
    if (!input.trim() && !attached) return
    const text = attached
      ? `${input.trim()}${input.trim() ? ' ' : ''}(attached: ${attached.name})`
      : input.trim()
    handleUserMessage(text)
    setInput('')
    setAttached(null)
  }

  const handleQuickAction = (label: string, inChat: boolean, href?: string) => {
    if (inChat) {
      setMessages((m) => [...m, { role: 'user', content: label }])
      const answer = ARIA_QUICK_REPLY[label] ?? getAriaResponse(label)
      setAriaState('thinking')
      setTimeout(() => {
        setMessages((m) => [...m, { role: 'assistant', content: answer }])
        setAriaState('speaking')
        setTimeout(() => setAriaState('idle'), 1800)
      }, 500)
      return
    }
    if (href) closeChat()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm"
            onClick={closeChat}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 z-[80] flex h-[100dvh] max-h-[100dvh] w-full flex-col overflow-hidden border-l border-white/[0.08] bg-[#020817] shadow-2xl md:max-w-[380px] lg:max-w-[420px]"
            role="dialog"
            aria-label="A.R.I.A. assistant"
            onClick={(e) => e.stopPropagation()}
            onWheel={containScroll}
            onTouchMove={containScroll}
          >
            {/* Header */}
            <div className="relative shrink-0 border-b border-white/[0.06] px-5 py-4">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#4fd1ff]/5 to-transparent" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 overflow-hidden rounded-xl border border-[#4fd1ff]/20 bg-[#0f172a]">
                    <Suspense fallback={null}>
                      <AriaScene compact state={ariaState} className="scale-[2]" />
                    </Suspense>
                  </div>
                  <div>
                    <p className="flex items-center gap-1.5 font-semibold text-white">
                      A.R.I.A.
                      <Sparkles className="h-3.5 w-3.5 text-[#4fd1ff]" />
                    </p>
                    <p className="flex items-center gap-1.5 text-xs text-slate-400">
                      <span className="h-2 w-2 rounded-full bg-[#22c55e] shadow-[0_0_8px_#22c55e]" />
                      Online · Adaptive Repair Intelligence
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeChat}
                  className="rounded-full p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Messages — dedicated scroll region */}
            <div
              ref={messagesScrollRef}
              className="aria-chat-messages min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4"
              onWheel={containScroll}
              onTouchMove={containScroll}
            >
              {messages.length === 0 && (
                <div className="mb-4 rounded-2xl border border-[#4fd1ff]/20 bg-gradient-to-br from-[#4fd1ff]/10 via-[#0f172a] to-transparent p-5">
                  <p className="text-sm leading-relaxed text-slate-200">
                    Hi, I&apos;m <span className="font-semibold text-[#4fd1ff]">A.R.I.A.</span> 👋
                    <br />
                    Ask a question or pick a suggestion below.
                  </p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={`${msg.role}-${i}-${msg.content.slice(0, 12)}`}
                  className={cn('mb-4 flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                >
                  <div
                    className={cn(
                      'max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                      msg.role === 'user'
                        ? 'border border-[#4fd1ff]/25 bg-[#4fd1ff]/15 text-white'
                        : 'border border-white/[0.06] bg-[#0f172a] text-slate-100'
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {ariaState === 'thinking' && (
                <div className="mb-4 flex justify-start">
                  <div className="rounded-2xl border border-white/[0.06] bg-[#0f172a] px-4 py-3">
                    <p className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="flex gap-1">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#4fd1ff] [animation-delay:0ms]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#4fd1ff] [animation-delay:150ms]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#4fd1ff] [animation-delay:300ms]" />
                      </span>
                      A.R.I.A. is typing…
                    </p>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} className="h-px shrink-0" aria-hidden />
            </div>

            {/* Suggestions — separate scroll, hidden after chat starts unless toggled */}
            {(messages.length === 0 || showSuggestions) && (
              <div
                className="aria-chat-suggestions max-h-[38vh] shrink-0 overflow-y-auto overscroll-contain border-t border-white/[0.06] bg-[#071224]/80 px-5 py-3"
                onWheel={containScroll}
                onTouchMove={containScroll}
              >
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowSuggestions(false)}
                    className="mb-2 flex w-full items-center justify-center gap-1 text-[10px] font-medium text-slate-500 hover:text-slate-300"
                  >
                    Hide suggestions
                    <ChevronDown className="h-3 w-3 rotate-180" />
                  </button>
                )}

                <p className="mb-2 text-[10px] font-bold tracking-[0.2em] text-[#4fd1ff] uppercase">
                  Quick Actions
                </p>
                <div className="grid gap-2">
                  {QUICK_ACTIONS.map((a) =>
                    a.inChat ? (
                      <button
                        key={a.label}
                        type="button"
                        onClick={() => handleQuickAction(a.label, true)}
                        className="flex w-full items-center gap-3 rounded-xl border border-white/[0.06] bg-[#0f172a]/80 px-4 py-3 text-left text-sm font-medium text-slate-200 transition-all hover:border-[#4fd1ff]/30 hover:bg-[#4fd1ff]/5"
                      >
                        <a.icon className="h-4 w-4 shrink-0 text-[#4fd1ff]" />
                        {a.label}
                      </button>
                    ) : (
                      <Link
                        key={a.label}
                        to={a.href!}
                        onClick={() => handleQuickAction(a.label, false, a.href)}
                        className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-[#0f172a]/80 px-4 py-3 text-sm font-medium text-slate-200 transition-all hover:border-[#4fd1ff]/30"
                      >
                        <a.icon className="h-4 w-4 text-[#4fd1ff]" />
                        {a.label}
                      </Link>
                    )
                  )}
                </div>

                <p className="mt-4 mb-2 text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                  Ask me
                </p>
                <div className="space-y-2 pb-1">
                  {FAQ_SUGGESTIONS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => handleUserMessage(q)}
                      className="w-full rounded-xl border border-white/[0.04] bg-[#0f172a]/60 px-4 py-2.5 text-left text-xs leading-relaxed text-slate-400 transition-colors hover:border-[#4fd1ff]/20 hover:text-slate-200"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.length > 0 && !showSuggestions && (
              <button
                type="button"
                onClick={() => setShowSuggestions(true)}
                className="shrink-0 border-t border-white/[0.06] py-2 text-center text-[10px] font-medium text-[#4fd1ff]/80 hover:text-[#4fd1ff]"
              >
                Show quick actions & suggestions
              </button>
            )}

            {/* Input */}
            <div className="shrink-0 border-t border-white/[0.06] bg-[#071224] p-4">
              {attached && (
                <p className="mb-2 truncate text-xs text-[#4fd1ff]">📎 {attached.name}</p>
              )}
              <div className="flex gap-2">
                <label className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-[#0f172a] text-slate-400 transition-colors hover:border-[#4fd1ff]/40 hover:text-[#4fd1ff]">
                  <Paperclip className="h-4 w-4" />
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => setAttached(e.target.files?.[0] ?? null)}
                  />
                </label>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask A.R.I.A..."
                  className="flex-1 rounded-xl border border-white/10 bg-[#0f172a] px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-[#4fd1ff]/50 focus:outline-none"
                />
                <Button size="icon" className="h-11 w-11 shrink-0" onClick={handleSend}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
