export const PRODUCTS = [
  'Laptop',
  'Desktop',
  'Gaming Laptop',
  'MacBook',
  'Mini PC',
  'Workstation',
  'Monitor',
] as const

export const SERVICE_CATEGORIES_WIZARD = [
  'Hardware Repair',
  'Software Repair',
  'Upgrade',
  'Maintenance',
  'Data Recovery',
  'Motherboard',
  'Display',
  'Battery',
  'Keyboard',
  'SSD Upgrade',
  'RAM Upgrade',
  'Virus Removal',
  'Water Damage',
  'Fan Cleaning',
  'Heating Issues',
  'Hinge Repair',
  'Speaker Repair',
  'Charging Port Repair',
  'Touchpad Repair',
  'OS Installation',
  'Performance Optimization',
  'Graphics Issue',
  'Network Issue',
  'BIOS Issue',
] as const

export type WizardCategory = (typeof SERVICE_CATEGORIES_WIZARD)[number]

export const DYNAMIC_OPTIONS: Record<string, string[]> = {
  'RAM Upgrade': ['8GB', '16GB', '32GB', '64GB'],
  'SSD Upgrade': ['256GB', '512GB', '1TB', '2TB'],
  Display: ['Standard Screen', 'FHD', 'OLED', 'Touch Display'],
  Battery: ['OEM Battery', 'Genuine Battery'],
}

export const PRICE_ESTIMATES: Record<string, { min: number; max: number; time: string; warranty: string }> = {
  'RAM Upgrade': { min: 1500, max: 3500, time: '1–2 hrs', warranty: '1 Year' },
  'SSD Upgrade': { min: 2500, max: 8500, time: '1–3 hrs', warranty: '1 Year' },
  Display: { min: 4000, max: 18000, time: '2–4 hrs', warranty: '1 Year' },
  Battery: { min: 2500, max: 7000, time: '1–2 hrs', warranty: '1 Year' },
  'Hardware Repair': { min: 999, max: 5000, time: '1–3 hrs', warranty: '6 Months' },
  'Water Damage': { min: 2499, max: 12000, time: '4–24 hrs', warranty: '3 Months' },
  Motherboard: { min: 3499, max: 15000, time: '4–8 hrs', warranty: '6 Months' },
  default: { min: 499, max: 3500, time: '1–3 hrs', warranty: '6 Months' },
}

export function getEstimate(category: string) {
  return PRICE_ESTIMATES[category] ?? PRICE_ESTIMATES.default
}
