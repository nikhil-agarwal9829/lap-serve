export const BRAND_REPAIR_TYPES = [
  { name: 'Screen Repair', slug: 'cracked-screen' },
  { name: 'Battery Repair', slug: 'battery-replacement' },
  { name: 'Keyboard Repair', slug: 'laptop-keyboard' },
  { name: 'SSD Upgrade', slug: 'ssd-upgrade' },
  { name: 'Motherboard Repair', slug: 'motherboard-repair' },
  { name: 'Data Recovery', slug: 'data-recovery' },
] as const

export function getBrandServiceLabel(brandName: string, repairName: string) {
  return `${brandName} ${repairName}`
}
