import { useState, useEffect, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAriaChat } from '@/context/AriaChatContext'

const AriaScene = lazy(() =>
  import('./AriaScene').then((m) => ({ default: m.AriaScene }))
)

export function AriaFloatingButton() {
  const { openChat, ariaState } = useAriaChat()
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector('.hero-section')
      if (!hero) {
        setVisible(window.scrollY > 500)
        return
      }
      setVisible(hero.getBoundingClientRect().bottom < 80)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          className="fixed right-5 z-[55] md:right-8"
          style={{ bottom: 'calc(1.25rem + 3.5rem + 1.5rem)' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                className="absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl border border-white/10 bg-[#0f172a]/95 px-4 py-3 shadow-xl backdrop-blur-xl"
              >
                <p className="text-xs font-medium text-slate-400">Need Help?</p>
                <p className="text-sm font-bold text-[#4fd1ff]">Chat with A.R.I.A.</p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="button"
            onClick={openChat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-[#4fd1ff]/25 bg-[#0f172a] shadow-[0_0_30px_rgba(79,209,255,0.25)]"
            aria-label="Chat with A.R.I.A."
          >
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#4fd1ff]/10 to-transparent" />
            <Suspense fallback={<div className="h-8 w-8 rounded-lg bg-[#4fd1ff]/20" />}>
              <AriaScene compact state={ariaState} className="relative h-11 w-11 scale-[1.4] pointer-events-none" />
            </Suspense>
            <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0f172a] bg-[#22c55e]" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
