import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, Plus, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  PRODUCTS,
  SERVICE_CATEGORIES_WIZARD,
  DYNAMIC_OPTIONS,
  getEstimate,
} from '@/data/booking-wizard'
import { formatPrice } from '@/data/pricing'
import { cn } from '@/lib/utils'

type PartMode = 'repair' | 'replace'

export function ServicesBookingWizard() {
  const [product, setProduct] = useState('')
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [dynamicChoice, setDynamicChoice] = useState<Record<string, string>>({})
  const [partMode, setPartMode] = useState<PartMode>('repair')
  const [images, setImages] = useState<{ file: File; preview: string }[]>([])

  const toggleService = (s: string) => {
    setSelectedServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    )
  }

  const estimates = useMemo(() => {
    return selectedServices.map((s) => ({ service: s, ...getEstimate(s) }))
  }, [selectedServices])

  const totalMin = estimates.reduce((a, e) => a + e.min, 0)
  const totalMax = estimates.reduce((a, e) => a + e.max, 0)

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      ['image/jpeg', 'image/png', 'image/webp'].includes(f.type)
    )
    files.forEach((file) => {
      const preview = URL.createObjectURL(file)
      setImages((prev) => [...prev, { file, preview }])
    })
  }, [])

  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    Array.from(files).forEach((file) => {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return
      setImages((prev) => [...prev, { file, preview: URL.createObjectURL(file) }])
    })
  }

  return (
    <section id="services-booking" className="section-gap section-light">
      <div className="container-lapserve">
        <SectionHeading
          eyebrow="Intelligent Booking"
          title="Book the right service in minutes"
          description="Select your device, choose services, get live estimates — then book your free diagnostic."
        />

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 space-y-8 xl:col-span-8">
            {/* Step 1 */}
            <div className="card-light p-6 md:p-8">
              <p className="text-xs font-bold tracking-wider text-primary uppercase">Step 1</p>
              <h3 className="mt-2 text-lg font-bold text-slate-900">Select Product</h3>
              <select
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="mt-4 flex h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Choose product type</option>
                {PRODUCTS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2 - multi select */}
            <div className="card-light p-6 md:p-8">
              <p className="text-xs font-bold tracking-wider text-primary uppercase">Step 2</p>
              <h3 className="mt-2 text-lg font-bold text-slate-900">Choose Service Categories</h3>
              <p className="mt-1 text-sm text-slate-500">Select all issues that apply</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {SERVICE_CATEGORIES_WIZARD.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleService(s)}
                    className={cn(
                      'flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all',
                      selectedServices.includes(s)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-primary/40'
                    )}
                  >
                    {selectedServices.includes(s) ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Plus className="h-3.5 w-3.5 opacity-50" />
                    )}
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3 - dynamic */}
            <AnimatePresence>
              {selectedServices.some((s) => DYNAMIC_OPTIONS[s]) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="card-light p-6 md:p-8"
                >
                  <p className="text-xs font-bold tracking-wider text-primary uppercase">Step 3</p>
                  <h3 className="mt-2 text-lg font-bold text-slate-900">Service Options</h3>
                  {selectedServices
                    .filter((s) => DYNAMIC_OPTIONS[s])
                    .map((s) => (
                      <div key={s} className="mt-4">
                        <Label className="text-slate-700">{s}</Label>
                        <select
                          value={dynamicChoice[s] ?? ''}
                          onChange={(e) =>
                            setDynamicChoice((d) => ({ ...d, [s]: e.target.value }))
                          }
                          className="mt-2 flex h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm"
                        >
                          <option value="">Select option</option>
                          {DYNAMIC_OPTIONS[s].map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 4 */}
            <div className="card-light p-6 md:p-8">
              <p className="text-xs font-bold tracking-wider text-primary uppercase">Step 4</p>
              <h3 className="mt-2 text-lg font-bold text-slate-900">Part Replacement</h3>
              <div className="mt-4 flex flex-wrap gap-4">
                {(['repair', 'replace'] as PartMode[]).map((m) => (
                  <label
                    key={m}
                    className={cn(
                      'flex cursor-pointer items-center gap-3 rounded-2xl border px-6 py-4 transition-all',
                      partMode === m
                        ? 'border-primary bg-primary/5'
                        : 'border-slate-200 bg-white'
                    )}
                  >
                    <input
                      type="radio"
                      name="partMode"
                      checked={partMode === m}
                      onChange={() => setPartMode(m)}
                      className="accent-primary"
                    />
                    <span className="font-medium text-slate-800 capitalize">
                      {m === 'repair' ? 'Repair Only' : 'Replace Part'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Image upload */}
            <div className="card-light p-6 md:p-8">
              <p className="text-xs font-bold tracking-wider text-primary uppercase">Upload Images</p>
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
                className="mt-4 flex min-h-[160px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/80 p-6 transition-colors hover:border-primary/50"
              >
                <Upload className="h-10 w-10 text-slate-400" />
                <p className="mt-2 text-sm font-medium text-slate-600">Drag & drop images here</p>
                <p className="text-xs text-slate-400">JPG, PNG, WebP</p>
                <label className="mt-4 cursor-pointer">
                  <span className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-slate-900">
                    Browse files
                  </span>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    multiple
                    className="hidden"
                    onChange={onFileInput}
                  />
                </label>
              </div>
              {images.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {images.map((img, i) => (
                    <div key={i} className="relative h-20 w-20 overflow-hidden rounded-xl">
                      <img src={img.preview} alt="" className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setImages((prev) => prev.filter((_, j) => j !== i))}
                        className="absolute top-1 right-1 rounded-full bg-black/60 p-0.5"
                      >
                        <X className="h-3 w-3 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Estimate sidebar */}
          <div className="col-span-12 xl:col-span-4">
            <div className="sticky top-28 card-light p-6 md:p-8">
              <p className="text-xs font-bold tracking-wider text-primary uppercase">Step 5</p>
              <h3 className="mt-2 text-xl font-bold text-slate-900">Live Estimate</h3>

              {selectedServices.length === 0 ? (
                <p className="mt-4 text-sm text-slate-500">Select services to see estimate</p>
              ) : (
                <>
                  <ul className="mt-4 space-y-3">
                    {selectedServices.map((s) => (
                      <li
                        key={s}
                        className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm"
                      >
                        <span className="font-medium text-slate-700">{s}</span>
                        {dynamicChoice[s] && (
                          <span className="text-xs text-slate-400">{dynamicChoice[s]}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                  {estimates.length > 0 && (
                    <div className="mt-6 border-t border-slate-200 pt-6">
                      <p className="text-2xl font-bold text-slate-900">
                        {formatPrice(totalMin)} – {formatPrice(totalMax)}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">Estimated cost range</p>
                      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                        <div className="rounded-xl bg-slate-50 p-3">
                          <p className="text-xs text-slate-500">Time</p>
                          <p className="font-semibold text-slate-800">{estimates[0]?.time}</p>
                        </div>
                        <div className="rounded-xl bg-slate-50 p-3">
                          <p className="text-xs text-slate-500">Warranty</p>
                          <p className="font-semibold text-slate-800">{estimates[0]?.warranty}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {product ? (
                <Button className="mt-8 w-full" size="lg" asChild>
                  <Link to="/booking">Book Free Diagnostic</Link>
                </Button>
              ) : (
                <Button className="mt-8 w-full" size="lg" disabled>
                  Book Free Diagnostic
                </Button>
              )}
              <Button variant="outline" className="mt-3 w-full border-slate-300 text-slate-800" asChild>
                <Link to="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
