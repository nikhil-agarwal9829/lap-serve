export interface PricingItem {
  name: string
  slug: string
  startingPrice: number
  warranty: string
  category: string
}

export const PRICING_ITEMS: PricingItem[] = [
  { name: 'Battery Replacement', slug: 'battery-replacement', startingPrice: 1499, warranty: '1 Year', category: 'Power & Charging' },
  { name: 'Screen Replacement', slug: 'cracked-screen', startingPrice: 2999, warranty: '1 Year', category: 'Screen & Display' },
  { name: 'Keyboard Replacement', slug: 'laptop-keyboard', startingPrice: 1299, warranty: '6 Months', category: 'Input' },
  { name: 'SSD Upgrade', slug: 'ssd-upgrade', startingPrice: 1999, warranty: '1 Year', category: 'Performance' },
  { name: 'RAM Upgrade', slug: 'ram-upgrade', startingPrice: 999, warranty: '1 Year', category: 'Performance' },
  { name: 'OS Installation', slug: 'os-installation', startingPrice: 799, warranty: '30 Days', category: 'Software' },
  { name: 'Internal Cleaning', slug: 'internal-cleaning', startingPrice: 999, warranty: '30 Days', category: 'Maintenance' },
  { name: 'Motherboard Repair', slug: 'motherboard-repair', startingPrice: 3499, warranty: '6 Months', category: 'Specialist' },
  { name: 'Water Damage Repair', slug: 'water-damage-repair', startingPrice: 2499, warranty: '3 Months', category: 'Specialist' },
  { name: 'MacBook Battery', slug: 'macbook-battery', startingPrice: 3999, warranty: '1 Year', category: 'Apple' },
  { name: 'Data Recovery', slug: 'data-recovery', startingPrice: 1999, warranty: 'N/A', category: 'Specialist' },
  { name: 'General Service', slug: 'general-service', startingPrice: 499, warranty: '30 Days', category: 'Maintenance' },
]

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}
