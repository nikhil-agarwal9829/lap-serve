import { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { motion } from 'framer-motion'
import { AriaMonitorHead, type AriaState } from './AriaMonitorHead'
import { cn } from '@/lib/utils'

interface AriaSceneProps {
  state?: AriaState
  className?: string
  compact?: boolean
  /** Show A.R.I.A. title under scene (hero only) */
  showLabels?: boolean
  /** Enable hover scale, glow boost, and tooltip */
  interactive?: boolean
}

export function AriaScene({
  state = 'idle',
  className = '',
  compact = false,
  showLabels = false,
  interactive = false,
}: AriaSceneProps) {
  const mouse = useRef({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (compact) return
    const handleMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      }
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [compact])

  return (
    <motion.div
      className={cn('relative', className)}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Radial glow behind A.R.I.A. */}
      {!compact && (
        <div
          className={cn(
            'aria-scene-glow pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-[45%] rounded-full transition-opacity duration-300',
            hovered && interactive ? 'opacity-100' : 'opacity-90'
          )}
          aria-hidden
        />
      )}

      <div
        className={cn(
          'aria-monitor-shell relative z-[1] w-full transition-all duration-300',
          compact ? 'h-[120px]' : 'h-[320px] md:h-[420px] lg:h-[480px]',
          interactive && 'cursor-pointer',
          interactive && (hovered ? 'aria-monitor-shell--hover' : '')
        )}
        title={interactive ? 'Click to chat with A.R.I.A.' : undefined}
        onMouseEnter={() => interactive && setHovered(true)}
        onMouseLeave={() => interactive && setHovered(false)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          mouse.current = {
            x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
            y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
          }
        }}
      >
        <Canvas
          camera={{ position: [0, 0.1, compact ? 2.2 : 1.8], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.45} />
            <directionalLight position={[3, 5, 2]} intensity={1.2} color="#ffffff" />
            <pointLight position={[-2, 1, 2]} intensity={0.55} color="#59d8ff" />
            <pointLight position={[2, -1, 1]} intensity={0.35} color="#7c8cff" />
            <pointLight position={[0, 0.2, -0.5]} intensity={0.25} color="#4fd1ff" />
            <AriaMonitorHead mouse={mouse} state={state} />
            <ContactShadows position={[0, -0.75, 0]} opacity={0.35} scale={2} blur={2.5} />
            <Environment preset="city" />
          </Suspense>
        </Canvas>

        {interactive && hovered && !compact && (
          <div
            className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-[#0f172a]/90 px-4 py-1.5 text-xs font-medium text-[#59d8ff] shadow-[0_0_24px_rgba(79,209,255,0.2)] backdrop-blur-sm"
            role="tooltip"
          >
            Click to chat with A.R.I.A.
          </div>
        )}
      </div>

      {!compact && showLabels && (
        <div className="aria-labels relative z-[1] mt-6 text-center pointer-events-none">
          <p className="text-xs font-bold tracking-[0.35em] text-[#59d8ff] uppercase">A.R.I.A.</p>
          <p className="mt-2 text-sm font-medium text-white/90">
            Adaptive Repair Intelligence Assistant
          </p>
          <p className="mt-1 text-xs tracking-wide text-[#59d8ff]/70">
            Powered by LapServe Diagnostics
          </p>
        </div>
      )}
    </motion.div>
  )
}
