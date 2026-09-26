import { useNavigate } from 'react-router-dom'
import { Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { DirectoryService } from '@/data/services-directory'
import { SERVICE_NAME_TO_ISSUE } from '@/data/booking'
import { bookingUrl } from '@/lib/booking-url'
import { formatINR } from '@/data/service-catalog'

interface ServiceDirectoryCardProps {
  service: DirectoryService
  variant?: 'light' | 'dark'
}

export function ServiceDirectoryCard({ service, variant = 'light' }: ServiceDirectoryCardProps) {
  const navigate = useNavigate()
  const isDark = variant === 'dark'

  const book = () => {
    const issue = SERVICE_NAME_TO_ISSUE[service.name] ?? service.name
    navigate(bookingUrl({ service: service.slug, issue }))
  }

  return (
    <article
      className={`group flex flex-col rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(79,209,255,0.15)] ${
        isDark
          ? 'border-white/10 bg-white/[0.04] hover:border-[#59d8ff]/40'
          : 'border-slate-200/80 bg-white hover:border-[#4fd1ff]/40'
      }`}
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${
          isDark ? 'bg-[#59d8ff]/10 text-[#59d8ff]' : 'bg-[#f1f7ff] text-[#38bdf8]'
        }`}
      >
        <service.icon className="h-5 w-5" />
      </div>
      <h3 className={`mt-4 font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{service.name}</h3>
      <p className={`mt-1 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        From {formatINR(service.priceMin)}
      </p>
      <p className={`mt-2 flex items-center gap-1.5 text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
        <Clock className="h-3.5 w-3.5" />
        {service.time}
      </p>
      <Button
        type="button"
        size="sm"
        variant={isDark ? 'default' : 'light'}
        className="mt-4 w-full"
        onClick={book}
      >
        Book Repair
      </Button>
    </article>
  )
}
