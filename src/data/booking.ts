import { findBrandLogo } from '@/data/brand-logos'

export const DEVICE_TYPES = [
  { id: 'laptop', label: 'Laptop', emoji: '💻' },
  { id: 'desktop', label: 'Desktop', emoji: '🖥' },
  { id: 'gaming-laptop', label: 'Gaming Laptop', emoji: '🎮' },
  { id: 'macbook', label: 'MacBook', emoji: '🍎' },
  { id: 'monitor', label: 'Monitor', emoji: '🖥' },
] as const

export type DeviceTypeId = (typeof DEVICE_TYPES)[number]['id']

export const BOOKING_BRANDS = [
  'HP',
  'Dell',
  'Lenovo',
  'Asus',
  'Acer',
  'Apple',
  'MSI',
  'Samsung',
  'LG',
  'Razer',
  'Alienware',
  'Huawei',
  'Gigabyte',
  'Microsoft Surface',
  'Other Brand',
] as const

export const SUPPORTED_BRANDS_LIST = [
  'HP',
  'Dell',
  'Lenovo',
  'Asus',
  'Acer',
  'Apple',
  'MSI',
  'Samsung',
  'LG',
  'Huawei',
  'Razer',
  'Alienware',
  'Gigabyte',
  'Microsoft Surface',
] as const

export const REPAIR_ISSUES = [
  'Screen Broken',
  'Battery Issue',
  'Keyboard Issue',
  'Touchpad Issue',
  'Not Turning On',
  'No Display',
  'Overheating',
  'Slow Performance',
  'SSD Upgrade',
  'RAM Upgrade',
  'Motherboard Repair',
  'Water Damage',
  'Charging Issue',
  'Fan Noise',
  'Speaker Problem',
  'Software Issue',
  'Virus Issue',
  'Data Recovery',
  'Hinge Repair',
  'Webcam Issue',
  'Auto Shutdown',
  'Other',
] as const

export type RepairIssue = (typeof REPAIR_ISSUES)[number]

export interface IssueEstimate {
  label: string
  priceMin: number
  priceMax: number
  lineLabel?: string
}

export const ISSUE_ESTIMATES: Record<RepairIssue, IssueEstimate> = {
  'Screen Broken': { label: 'Screen Repair', priceMin: 2999, priceMax: 18000 },
  'Battery Issue': { label: 'Battery Replacement', priceMin: 2500, priceMax: 6000 },
  'Keyboard Issue': { label: 'Keyboard Repair', priceMin: 500, priceMax: 2000 },
  'Touchpad Issue': { label: 'Touchpad Repair', priceMin: 500, priceMax: 2000 },
  'Not Turning On': { label: 'Power / Boot Repair', priceMin: 999, priceMax: 5000 },
  'No Display': { label: 'Display Repair', priceMin: 1999, priceMax: 8000 },
  'Overheating': { label: 'Heating Service', priceMin: 500, priceMax: 1500 },
  'Slow Performance': { label: 'Performance Tune-up', priceMin: 499, priceMax: 2500 },
  'SSD Upgrade': { label: 'SSD Upgrade', priceMin: 2500, priceMax: 9000 },
  'RAM Upgrade': { label: 'RAM Upgrade', priceMin: 999, priceMax: 3500 },
  'Motherboard Repair': { label: 'Motherboard Repair', priceMin: 3499, priceMax: 15000 },
  'Water Damage': { label: 'Water Damage Repair', priceMin: 2499, priceMax: 12000 },
  'Charging Issue': { label: 'Charging Port Repair', priceMin: 799, priceMax: 3500 },
  'Fan Noise': { label: 'Fan Service', priceMin: 699, priceMax: 2000 },
  'Speaker Problem': { label: 'Speaker Repair', priceMin: 699, priceMax: 2000 },
  'Software Issue': { label: 'Software Service', priceMin: 499, priceMax: 1500 },
  'Virus Issue': { label: 'Virus Removal', priceMin: 599, priceMax: 1200 },
  'Data Recovery': { label: 'Data Recovery', priceMin: 1999, priceMax: 15000 },
  'Hinge Repair': { label: 'Hinge Repair', priceMin: 1499, priceMax: 5000 },
  'Webcam Issue': { label: 'Webcam Repair', priceMin: 799, priceMax: 2500 },
  'Auto Shutdown': { label: 'Shutdown Diagnosis', priceMin: 799, priceMax: 3500 },
  Other: { label: 'General Repair', priceMin: 499, priceMax: 3000 },
}

/** Map service catalog slug → primary issue for booking pre-fill */
export const SERVICE_SLUG_TO_ISSUE: Record<string, RepairIssue> = {
  'ram-upgrade': 'RAM Upgrade',
  'ssd-upgrade': 'SSD Upgrade',
  'hard-disk-upgrade': 'SSD Upgrade',
  'battery-replacement': 'Battery Issue',
  'cracked-screen': 'Screen Broken',
  'touch-screen-repair': 'Screen Broken',
  'laptop-keyboard': 'Keyboard Issue',
  'touchpad-repair': 'Touchpad Issue',
  'webcam': 'Webcam Issue',
  speaker: 'Speaker Problem',
  'hinge-repair': 'Hinge Repair',
  'motherboard-repair': 'Motherboard Repair',
  'chip-level-repair': 'Motherboard Repair',
  'water-damage-repair': 'Water Damage',
  'physical-damage-repair': 'Other',
  'no-display': 'No Display',
  'slow-performance': 'Slow Performance',
  'os-installation': 'Software Issue',
  'virus-removal': 'Virus Issue',
  'auto-shutdown': 'Auto Shutdown',
  overheating: 'Overheating',
  'driver-issues': 'Software Issue',
  'data-recovery': 'Data Recovery',
}

/** Map service display name → issue */
export const SERVICE_NAME_TO_ISSUE: Record<string, RepairIssue> = {
  'RAM Upgrade': 'RAM Upgrade',
  'SSD Upgrade': 'SSD Upgrade',
  'Hard Disk Upgrade': 'SSD Upgrade',
  'Battery Upgrade': 'Battery Issue',
  'Cracked Screen': 'Screen Broken',
  'Touchscreen Repair': 'Screen Broken',
  'Keyboard Repair': 'Keyboard Issue',
  'Touchpad Repair': 'Touchpad Issue',
  Webcam: 'Webcam Issue',
  Speaker: 'Speaker Problem',
  'Hinge Repair': 'Hinge Repair',
  'Motherboard Repair': 'Motherboard Repair',
  'Chip Level Repair': 'Motherboard Repair',
  'Water Damage': 'Water Damage',
  'Physical Damage': 'Other',
  'No Display': 'No Display',
  'Slow Laptop': 'Slow Performance',
  'Windows Installation': 'Software Issue',
  'Virus Removal': 'Virus Issue',
  'Auto Shutdown': 'Auto Shutdown',
  Overheating: 'Overheating',
  'Driver Issues': 'Software Issue',
  'Data Recovery': 'Data Recovery',
  'Webcam Repair': 'Webcam Issue',
  'Speaker Repair': 'Speaker Problem',
  'Power Failure': 'Not Turning On',
  'Lagging System': 'Slow Performance',
  'Driver Problems': 'Software Issue',
  'OS Corruption': 'Software Issue',
  'Software Crashes': 'Software Issue',
  'Fan Noise': 'Fan Noise',
}

export function slugToBrandName(slug: string): string | null {
  return findBrandLogo(slug.toLowerCase())?.name ?? null
}

export function deviceIdToLabel(id: string): string {
  return DEVICE_TYPES.find((d) => d.id === id)?.label ?? id
}

export function formatINR(n: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n)
}

export function computeEstimate(issues: string[]) {
  const valid = issues.filter((i): i is RepairIssue =>
    REPAIR_ISSUES.includes(i as RepairIssue)
  )
  if (valid.length === 0) return null

  const lines = valid.map((issue) => ({
    issue,
    ...ISSUE_ESTIMATES[issue],
  }))

  const totalMin = lines.reduce((s, l) => s + l.priceMin, 0)
  const totalMax = lines.reduce((s, l) => s + l.priceMax, 0)

  return { lines, totalMin, totalMax }
}
