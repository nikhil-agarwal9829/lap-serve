import { FAQ_ITEMS } from '@/data/faq'

const SUGGESTED_QA: Record<string, string> = {
  'How much does screen replacement cost?':
    'Screen replacement typically starts from ₹2,999 depending on your laptop model and panel type. Book a free doorstep diagnostic for an exact quote — no hidden charges.',
  'Do you repair MacBooks?':
    'Yes. We repair all MacBook Air and MacBook Pro models with trained technicians and quality parts. MacBook repairs start from ₹2,499 for common issues.',
  'Is doorstep repair available in my city?':
    'We currently serve Hyderabad, Bangalore, and expanding cities. Enter your city when booking — if we are not live yet, our team will contact you with the nearest option.',
  'How long does a repair take?':
    'Most repairs finish in 1–3 hours at your location. Complex jobs like motherboard or water damage may need longer — we confirm the timeline before starting.',
  'Is my data safe?':
    'Yes. Repairs are done in front of you whenever possible. We never access personal files without permission, and you can watch the entire process.',
}

const KEYWORD_REPLIES: { keys: string[]; reply: string }[] = [
  {
    keys: ['book', 'schedule', 'appointment', 'diagnostic'],
    reply:
      'You can book a free doorstep diagnostic in under a minute. Tap Book Repair below or visit our booking page — a certified engineer will come to you.',
  },
  {
    keys: ['price', 'cost', 'charge', 'estimate', 'how much'],
    reply:
      'Pricing is transparent: general service from ₹499, screens from ₹2,999, batteries from ₹1,499, SSD upgrades from ₹1,999. Exact quotes follow a free diagnostic.',
  },
  {
    keys: ['warranty', 'guarantee'],
    reply:
      'Every LapServe repair includes up to 1 year warranty on parts and labor. You receive written warranty details when the job is completed.',
  },
  {
    keys: ['track', 'status', 'where is'],
    reply:
      'Share your booking mobile number on WhatsApp and we will send engineer ETA and live repair status updates.',
  },
  {
    keys: ['screen', 'display', 'cracked', 'broken glass'],
    reply:
      'We replace laptop screens with quality panels, often same-day. Starting around ₹2,999 — book a free diagnostic for your exact model.',
  },
  {
    keys: ['battery', 'charging', 'drain'],
    reply:
      'Battery replacement starts from ₹1,499 with health checks included. If charging is the issue, we also diagnose ports and adapters.',
  },
  {
    keys: ['macbook', 'apple', 'imac'],
    reply:
      'Yes — MacBook Air, MacBook Pro, and other Apple notebooks are supported. Repairs start from ₹2,499 with specialist engineers.',
  },
  {
    keys: ['water', 'liquid', 'spill'],
    reply:
      'Act fast after liquid damage. We offer ultrasonic cleaning and board-level repair. Success depends on severity — book a diagnostic immediately.',
  },
  {
    keys: ['data', 'recovery', 'files'],
    reply:
      'We offer secure data recovery when drives fail or OS issues block access. Evaluation is done before any recovery attempt.',
  },
  {
    keys: ['human', 'call', 'speak', 'agent', 'support'],
    reply:
      'Our team is available Mon–Sat 9 AM–8 PM and Sun 10 AM–6 PM. Use Contact on the site or continue on WhatsApp for a human agent.',
  },
]

export function getAriaResponse(input: string): string {
  const trimmed = input.trim()
  const lower = trimmed.toLowerCase()

  if (!lower) {
    return "I'm here to help with repairs, pricing, warranty, and booking. What would you like to know?"
  }

  const exact = SUGGESTED_QA[trimmed]
  if (exact) return exact

  for (const item of FAQ_ITEMS) {
    if (lower === item.question.toLowerCase()) return item.answer
    const q = item.question.toLowerCase()
    if (lower.includes(q.slice(0, 20)) || q.includes(lower.slice(0, 24))) return item.answer
  }

  for (const { keys, reply } of KEYWORD_REPLIES) {
    if (keys.some((k) => lower.includes(k))) return reply
  }

  return "I can help with repair pricing, booking a free diagnostic, warranty, and common laptop issues. Try asking about screen cost, battery, MacBook repair, or doorstep service in your city."
}

export const ARIA_QUICK_REPLY: Record<string, string> = {
  'Book Repair':
    'Tap the booking form to choose your device and issue — or say "book repair" and I will guide you. Free diagnostic included.',
  'Repair Estimate':
    'Screen from ₹2,999 · Battery from ₹1,499 · SSD from ₹1,999 · General service from ₹499. Share your issue for a closer estimate.',
  'Track Repair':
    'Message us on WhatsApp with the mobile number used when booking. We share engineer ETA and repair status in real time.',
  'Warranty Help':
    'All repairs include up to 1 year warranty on parts and labor. Written coverage is provided when your repair is completed.',
  'Human Support':
    'Our team is available Mon–Sat 9 AM–8 PM. Visit Contact or WhatsApp us — a human agent will assist you promptly.',
}
