import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { ServiceDirectoryCategory } from '@/data/services-directory'
import { ServiceDirectoryCard } from './ServiceDirectoryCard'

interface ServicesDirectoryProps {
  categories: ServiceDirectoryCategory[]
  variant?: 'light' | 'dark'
}

export function ServicesDirectory({ categories, variant = 'light' }: ServicesDirectoryProps) {
  const isLight = variant === 'light'

  if (categories.length === 0) {
    return (
      <p className={`py-12 text-center ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
        No services match your search. Try &quot;screen&quot;, &quot;battery&quot;, or &quot;ssd&quot;.
      </p>
    )
  }

  return (
    <Accordion
      type="multiple"
      defaultValue={categories.map((c) => c.id)}
      className={`rounded-[24px] border px-4 md:px-6 ${
        isLight ? 'border-slate-200/80 bg-white' : 'border-white/10 bg-white/[0.03]'
      }`}
    >
      {categories.map((cat) => (
        <AccordionItem
          key={cat.id}
          value={cat.id}
          className={isLight ? 'border-slate-100' : 'border-white/10'}
        >
          <AccordionTrigger
            className={`text-lg font-bold hover:no-underline ${
              isLight ? 'text-slate-900 hover:text-[#38bdf8]' : 'text-white hover:text-[#59d8ff]'
            }`}
          >
            {cat.title}
            <span className="ml-2 text-sm font-normal text-slate-400">
              ({cat.services.length})
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-4 pb-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.services.map((service) => (
                <ServiceDirectoryCard key={`${cat.id}-${service.name}`} service={service} variant={variant} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
