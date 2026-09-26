import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Plus, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  BOOKING_BRANDS,
  DEVICE_TYPES,
  REPAIR_ISSUES,
  SERVICE_NAME_TO_ISSUE,
  SERVICE_SLUG_TO_ISSUE,
  computeEstimate,
  deviceIdToLabel,
  formatINR,
  type RepairIssue,
} from '@/data/booking'
import { buildWhatsAppMessage, whatsAppBookingUrl } from '@/lib/booking-url'

const fieldClass =
  'mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white focus:border-[#59d8ff]/50 focus:outline-none'

export function BookingForm() {
  const [searchParams] = useSearchParams()

  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [deviceType, setDeviceType] = useState('')
  const [brand, setBrand] = useState('')
  const [issues, setIssues] = useState<string[]>([''])
  const [notes, setNotes] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [pincode, setPincode] = useState('')

  useEffect(() => {
    const device = searchParams.get('device')
    const brandParam = searchParams.get('brand')
    const issueParam = searchParams.get('issue')
    const serviceSlug = searchParams.get('service')

    if (device) {
      setDeviceType(deviceIdToLabel(device))
      if (device === 'macbook' && !brandParam) setBrand('Apple')
    } else if (serviceSlug || issueParam) {
      setDeviceType((prev) => prev || 'Laptop')
    }
    if (brandParam) setBrand(decodeURIComponent(brandParam))

    let primaryIssue = ''
    if (issueParam) {
      const decoded = decodeURIComponent(issueParam)
      primaryIssue =
        SERVICE_NAME_TO_ISSUE[decoded] ??
        (REPAIR_ISSUES.includes(decoded as RepairIssue) ? decoded : '')
    } else if (serviceSlug) {
      primaryIssue = SERVICE_SLUG_TO_ISSUE[serviceSlug] ?? ''
    }

    if (primaryIssue && REPAIR_ISSUES.includes(primaryIssue as RepairIssue)) {
      setIssues([primaryIssue])
    }
  }, [searchParams])

  const estimate = useMemo(
    () => computeEstimate(issues.filter(Boolean)),
    [issues]
  )

  const deviceLabel = deviceType || 'Laptop'

  const addIssue = () => {
    if (issues.length < 5) setIssues((prev) => [...prev, ''])
  }

  const updateIssue = (index: number, value: string) => {
    setIssues((prev) => prev.map((item, i) => (i === index ? value : item)))
  }

  const removeIssue = (index: number) => {
    if (issues.length <= 1) {
      setIssues([''])
      return
    }
    setIssues((prev) => prev.filter((_, i) => i !== index))
  }

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault()
    const filledIssues = issues.filter(Boolean)
    const est = computeEstimate(filledIssues)

    const message = buildWhatsAppMessage({
      name,
      mobile,
      deviceType: deviceLabel,
      brand: brand || 'Not specified',
      issues: filledIssues,
      notes,
      address,
      city,
      pincode,
      estimateMin: est?.totalMin ?? 0,
      estimateMax: est?.totalMax ?? 0,
    })

    window.open(whatsAppBookingUrl(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={handleWhatsApp} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" className="text-slate-300">
            Name
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={fieldClass}
          />
        </div>
        <div>
          <Label htmlFor="mobile" className="text-slate-300">
            Mobile Number
          </Label>
          <Input
            id="mobile"
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            placeholder="10-digit mobile"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="deviceType" className="text-slate-300">
          Device Type
        </Label>
        <select
          id="deviceType"
          value={deviceType}
          onChange={(e) => setDeviceType(e.target.value)}
          className={fieldClass}
          required
        >
          <option value="" className="bg-[#071224]">
            Select device
          </option>
          {DEVICE_TYPES.map((d) => (
            <option key={d.id} value={d.label} className="bg-[#071224]">
              {d.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="brand" className="text-slate-300">
          Device Brand
        </Label>
        <select
          id="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className={fieldClass}
          required
        >
          <option value="" className="bg-[#071224]">
            Select brand
          </option>
          {BOOKING_BRANDS.map((b) => (
            <option key={b} value={b} className="bg-[#071224]">
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        <Label className="text-slate-300">Primary Issue</Label>
        {issues.map((issue, index) => (
          <div key={index} className="flex gap-2">
            <select
              value={issue}
              onChange={(e) => updateIssue(index, e.target.value)}
              className={`${fieldClass} mt-0 flex-1`}
              required={index === 0}
            >
              <option value="" className="bg-[#071224]">
                {index === 0 ? 'Select primary issue' : 'Select issue'}
              </option>
              {REPAIR_ISSUES.map((opt) => (
                <option key={opt} value={opt} className="bg-[#071224]">
                  {opt}
                </option>
              ))}
            </select>
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeIssue(index)}
                className="shrink-0 rounded-xl border border-white/10 px-3 text-sm text-slate-400 hover:text-white"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        {issues.length < 5 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addIssue}
            className="border-white/15 bg-transparent text-[#59d8ff] hover:bg-white/5"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Another Issue
          </Button>
        )}
      </div>

      <div>
        <Label htmlFor="notes" className="text-slate-300">
          Additional Notes
        </Label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="Describe your issue in detail."
          className={`${fieldClass} resize-none`}
        />
      </div>

      <div>
        <Label htmlFor="address" className="text-slate-300">
          Address
        </Label>
        <textarea
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={2}
          required
          placeholder="Full address for doorstep visit"
          className={`${fieldClass} resize-none`}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="city" className="text-slate-300">
            City
          </Label>
          <Input
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            placeholder="e.g. Hyderabad"
            className={fieldClass}
          />
        </div>
        <div>
          <Label htmlFor="pincode" className="text-slate-300">
            Pincode
          </Label>
          <Input
            id="pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            required
            placeholder="e.g. 500081"
            className={fieldClass}
          />
        </div>
      </div>

      {estimate && issues.some(Boolean) && (
        <div className="rounded-2xl border border-[#59d8ff]/20 bg-[#59d8ff]/[0.06] p-6">
          <h3 className="text-lg font-bold text-white">Repair Summary</h3>
          <p className="mt-3 text-sm text-slate-400">
            Device:{' '}
            <span className="text-white">
              {brand ? `${brand} ` : ''}
              {deviceLabel}
            </span>
          </p>
          <p className="mt-2 text-sm text-slate-400">Issues:</p>
          <ul className="mt-1 list-inside list-disc text-sm text-slate-300">
            {issues.filter(Boolean).map((issue) => (
              <li key={issue}>{issue}</li>
            ))}
          </ul>
          <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
            <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
              Approximate Cost
            </p>
            {estimate.lines.map((line) => (
              <div key={line.issue} className="flex justify-between text-sm">
                <span className="text-slate-400">{line.label}:</span>
                <span className="text-white">
                  {formatINR(line.priceMin)} - {formatINR(line.priceMax)}
                </span>
              </div>
            ))}
            <div className="flex justify-between border-t border-white/10 pt-3 font-semibold text-white">
              <span>Estimated Total</span>
              <span>
                {formatINR(estimate.totalMin)} - {formatINR(estimate.totalMax)}
              </span>
            </div>
          </div>
          <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            <p className="text-slate-400">
              Estimated Time: <span className="text-white">1–3 Hours</span>
            </p>
            <p className="text-slate-400">
              Warranty: <span className="text-white">Up to 1 Year</span>
            </p>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-slate-500">
            This is an approximate estimate. Final quote will be confirmed after diagnosis.
          </p>
        </div>
      )}

      <Button type="submit" size="lg" className="w-full gap-2">
        <MessageCircle className="h-5 w-5" />
        Continue on WhatsApp
      </Button>
    </form>
  )
}
