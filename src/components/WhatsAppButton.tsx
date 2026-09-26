import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/constants'

export function WhatsAppButton() {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-5 bottom-5 z-50 flex items-center gap-3 overflow-hidden rounded-full border border-success/30 bg-[#25D366]/90 text-white shadow-lg shadow-success/20 backdrop-blur-sm md:right-8 md:bottom-8"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label="Chat on WhatsApp"
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-success/40"
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span className="relative flex h-14 w-14 items-center justify-center">
        <MessageCircle className="h-6 w-6" />
      </span>
      <motion.span
        className="relative hidden overflow-hidden whitespace-nowrap pr-5 md:block"
        animate={{ width: hovered ? 'auto' : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      >
        <span className="block text-xs font-medium opacity-90">Need Help?</span>
        <span className="block text-sm font-semibold">Chat on WhatsApp</span>
      </motion.span>
    </motion.a>
  )
}
