export function bookingUrl(params: {
  device?: string
  brand?: string
  issue?: string
  service?: string
}) {
  const q = new URLSearchParams()
  if (params.device) q.set('device', params.device)
  if (params.brand) q.set('brand', params.brand)
  if (params.issue) q.set('issue', params.issue)
  if (params.service) q.set('service', params.service)
  const s = q.toString()
  return s ? `/booking?${s}` : '/booking'
}

export function buildWhatsAppMessage(data: {
  name: string
  mobile: string
  deviceType: string
  brand: string
  issues: string[]
  notes: string
  address: string
  city: string
  pincode: string
  estimateMin: number
  estimateMax: number
}) {
  const issueLines = data.issues
    .filter(Boolean)
    .map((issue, i) => `${i + 1}. ${issue}`)
    .join('\n')

  const addressBlock = [data.address, data.city, data.pincode].filter(Boolean).join('\n')

  return `Hello LapServe,

I would like to book a repair.

Name: ${data.name}
Mobile: ${data.mobile}
Device Type: ${data.deviceType}
Brand: ${data.brand}

Issues:
${issueLines || '1. (not specified)'}

Additional Notes:
${data.notes || '—'}

Address:
${addressBlock || '—'}

Estimated Cost:
${formatEstimateRange(data.estimateMin, data.estimateMax)}

Please contact me to schedule a diagnostic visit.`
}

function formatEstimateRange(min: number, max: number) {
  const fmt = (n: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
  return `${fmt(min)} - ${fmt(max)}`
}

export function whatsAppBookingUrl(message: string, phone = '919785836544') {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}
