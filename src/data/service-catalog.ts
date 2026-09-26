export interface CatalogService {
  name: string
  slug: string
  priceMin: number
  priceMax: number
  time: string
  warranty: string
}

export interface ServiceGroup {
  id: string
  title: string
  services: CatalogService[]
}

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    id: 'hardware',
    title: 'Hardware Upgrades',
    services: [
      { name: 'RAM Upgrade', slug: 'ram-upgrade', priceMin: 999, priceMax: 3500, time: '1–2 hrs', warranty: '1 Year' },
      { name: 'SSD Upgrade', slug: 'ssd-upgrade', priceMin: 2500, priceMax: 9000, time: '1–3 hrs', warranty: '1 Year' },
      { name: 'Hard Disk Upgrade', slug: 'hard-disk-upgrade', priceMin: 1999, priceMax: 6000, time: '1–3 hrs', warranty: '1 Year' },
      { name: 'Battery Upgrade', slug: 'battery-replacement', priceMin: 1499, priceMax: 7000, time: '1–2 hrs', warranty: '1 Year' },
    ],
  },
  {
    id: 'display',
    title: 'Display & Input',
    services: [
      { name: 'Cracked Screen', slug: 'cracked-screen', priceMin: 2999, priceMax: 18000, time: '2–4 hrs', warranty: '1 Year' },
      { name: 'Touchscreen Repair', slug: 'touch-screen-repair', priceMin: 3499, priceMax: 15000, time: '2–4 hrs', warranty: '1 Year' },
      { name: 'Keyboard Repair', slug: 'laptop-keyboard', priceMin: 1299, priceMax: 4500, time: '1–2 hrs', warranty: '6 Months' },
      { name: 'Touchpad Repair', slug: 'touchpad-repair', priceMin: 999, priceMax: 3500, time: '1–2 hrs', warranty: '6 Months' },
      { name: 'Webcam', slug: 'webcam', priceMin: 799, priceMax: 2500, time: '1–2 hrs', warranty: '6 Months' },
      { name: 'Speaker', slug: 'speaker', priceMin: 699, priceMax: 2000, time: '1–2 hrs', warranty: '6 Months' },
      { name: 'Hinge Repair', slug: 'hinge-repair', priceMin: 1499, priceMax: 5000, time: '2–3 hrs', warranty: '6 Months' },
    ],
  },
  {
    id: 'specialist',
    title: 'Specialist Repairs',
    services: [
      { name: 'Motherboard Repair', slug: 'motherboard-repair', priceMin: 3499, priceMax: 15000, time: '4–8 hrs', warranty: '6 Months' },
      { name: 'Chip Level Repair', slug: 'chip-level-repair', priceMin: 2999, priceMax: 12000, time: '4–24 hrs', warranty: '3 Months' },
      { name: 'Water Damage', slug: 'water-damage-repair', priceMin: 2499, priceMax: 12000, time: '4–24 hrs', warranty: '3 Months' },
      { name: 'Physical Damage', slug: 'physical-damage-repair', priceMin: 1999, priceMax: 10000, time: '2–6 hrs', warranty: '6 Months' },
      { name: 'No Display', slug: 'no-display', priceMin: 1999, priceMax: 8000, time: '2–4 hrs', warranty: '6 Months' },
    ],
  },
  {
    id: 'performance',
    title: 'Performance & Software',
    services: [
      { name: 'Slow Laptop', slug: 'slow-performance', priceMin: 499, priceMax: 2500, time: '1–3 hrs', warranty: '30 Days' },
      { name: 'Windows Installation', slug: 'os-installation', priceMin: 799, priceMax: 1500, time: '1–3 hrs', warranty: '30 Days' },
      { name: 'Virus Removal', slug: 'virus-removal', priceMin: 599, priceMax: 1200, time: '1–2 hrs', warranty: '30 Days' },
      { name: 'Auto Shutdown', slug: 'auto-shutdown', priceMin: 799, priceMax: 3500, time: '1–3 hrs', warranty: '30 Days' },
      { name: 'Overheating', slug: 'overheating', priceMin: 999, priceMax: 2500, time: '1–2 hrs', warranty: '30 Days' },
      { name: 'Driver Issues', slug: 'driver-issues', priceMin: 499, priceMax: 999, time: '1 hr', warranty: '30 Days' },
    ],
  },
  {
    id: 'data',
    title: 'Data Recovery',
    services: [
      { name: 'Data Recovery', slug: 'data-recovery', priceMin: 1999, priceMax: 15000, time: '24–48 hrs', warranty: 'N/A' },
    ],
  },
]

export const ADDITIONAL_ISSUES = [
  'Battery Issue',
  'Heating',
  'Keyboard Problem',
  'Screen Problem',
  'Charging Problem',
  'Fan Noise',
  'Slow Performance',
  'Other',
] as const

export const DEVICE_BRANDS = ['HP', 'Dell', 'Lenovo', 'Asus', 'Apple', 'Other'] as const

export const VISIT_TIMES = [
  'Today — Morning',
  'Today — Afternoon',
  'Today — Evening',
  'Tomorrow — Morning',
  'Tomorrow — Afternoon',
  'Flexible',
] as const

export function findCatalogService(slug: string): CatalogService | undefined {
  for (const group of SERVICE_GROUPS) {
    const s = group.services.find((x) => x.slug === slug)
    if (s) return s
  }
  return undefined
}

export function formatINR(n: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
}
