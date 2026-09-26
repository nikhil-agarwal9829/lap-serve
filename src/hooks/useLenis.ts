import { useEffect } from 'react'
import Lenis from 'lenis'

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    const onWheel = (e: WheelEvent) => {
      if (document.body.dataset.ariaChatOpen === 'true') {
        const target = e.target as HTMLElement | null
        if (target?.closest('.aria-chat-messages, .aria-chat-suggestions')) return
        e.preventDefault()
        e.stopPropagation()
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false, capture: true })

    function raf(time: number) {
      if (document.body.dataset.ariaChatOpen !== 'true') {
        lenis.raf(time)
      }
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      window.removeEventListener('wheel', onWheel, { capture: true })
      lenis.destroy()
    }
  }, [])
}
