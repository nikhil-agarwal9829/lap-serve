import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { AriaState } from '@/components/aria/AriaMonitorHead'

interface AriaChatContextValue {
  isOpen: boolean
  openChat: () => void
  closeChat: () => void
  ariaState: AriaState
  setAriaState: (state: AriaState) => void
}

const AriaChatContext = createContext<AriaChatContextValue | null>(null)

export function AriaChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [ariaState, setAriaState] = useState<AriaState>('idle')

  const openChat = useCallback(() => {
    setIsOpen(true)
    setAriaState('listening')
  }, [])

  const closeChat = useCallback(() => {
    setIsOpen(false)
    setAriaState('idle')
  }, [])

  return (
    <AriaChatContext.Provider value={{ isOpen, openChat, closeChat, ariaState, setAriaState }}>
      {children}
    </AriaChatContext.Provider>
  )
}

export function useAriaChat() {
  const ctx = useContext(AriaChatContext)
  if (!ctx) throw new Error('useAriaChat must be used within AriaChatProvider')
  return ctx
}
