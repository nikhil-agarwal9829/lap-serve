import { useState } from 'react'
import { Search } from 'lucide-react'
import { ParticlesBackground } from '@/components/layout/ParticlesBackground'
import { SERVICE_SEARCH_HINTS } from '@/data/services-directory'

interface ServicesHeroProps {
  search: string
  onSearchChange: (value: string) => void
}

export function ServicesHero({ search, onSearchChange }: ServicesHeroProps) {
  const [focused, setFocused] = useState(false)

  return (
    <section className="relative overflow-hidden pt-28 pb-12 md:pb-16">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, #020817 0%, #020817 45%, #071224 70%, #0a1a2e 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 100% 20%, rgba(89, 216, 255, 0.2), transparent 55%), radial-gradient(ellipse 40% 50% at 0% 100%, rgba(124, 140, 255, 0.08), transparent)',
        }}
      />
      <ParticlesBackground />

      <div className="container-lapserve relative z-[1] max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.28em] text-[#59d8ff] uppercase">Services</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
          Laptop Repair Services
        </h1>
        <p className="mt-4 text-lg text-[#a7b2c8]">
          Choose your issue and get a free doorstep diagnostic.
        </p>

        <div className="mt-8">
          <div
            className={`flex items-center gap-3 rounded-2xl border bg-white/[0.06] px-4 py-3 transition-all ${
              focused ? 'border-[#59d8ff]/50 shadow-[0_0_32px_rgba(89,216,255,0.15)]' : 'border-white/10'
            }`}
          >
            <Search className="h-5 w-5 shrink-0 text-[#59d8ff]" />
            <input
              type="search"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Search your issue..."
              className="w-full bg-transparent text-white placeholder:text-slate-500 focus:outline-none"
            />
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Try: {SERVICE_SEARCH_HINTS.join(' · ')}
          </p>
        </div>
      </div>
    </section>
  )
}
