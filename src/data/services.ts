export interface ServiceItem {
  name: string
  slug: string
  description?: string
}

export interface ServiceCategory {
  id: string
  title: string
  slug: string
  items: ServiceItem[]
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'power',
    title: 'Power & Charging',
    slug: 'power-charging',
    items: [
      { name: "Won't Power On", slug: 'wont-power-on' },
      { name: 'Battery Replacement', slug: 'battery-replacement' },
      { name: 'Battery Drains Fast', slug: 'battery-drains-fast' },
      { name: 'Laptop Charger', slug: 'laptop-charger' },
      { name: 'MacBook Charger', slug: 'macbook-charger' },
      { name: 'Charger Not Working', slug: 'charger-not-working' },
      { name: 'Power Jack Repair', slug: 'power-jack-repair' },
      { name: 'Power Button', slug: 'power-button' },
      { name: 'Battery Not Charging', slug: 'battery-not-charging' },
    ],
  },
  {
    id: 'boot',
    title: 'Boot & Performance',
    slug: 'boot-performance',
    items: [
      { name: 'Stuck On Logo', slug: 'stuck-on-logo' },
      { name: 'Random Shutdowns', slug: 'random-shutdowns' },
      { name: 'Slow Performance', slug: 'slow-performance' },
      { name: 'Overheating', slug: 'overheating' },
      { name: 'Cooling Fan', slug: 'cooling-fan' },
      { name: 'BIOS Repair', slug: 'bios-repair' },
      { name: 'OS Installation', slug: 'os-installation' },
      { name: 'Internal Cleaning', slug: 'internal-cleaning' },
      { name: 'RAM Upgrade', slug: 'ram-upgrade' },
      { name: 'SSD Upgrade', slug: 'ssd-upgrade' },
      { name: 'Hard Disk Upgrade', slug: 'hard-disk-upgrade' },
      { name: 'Auto Shutdown', slug: 'auto-shutdown' },
    ],
  },
  {
    id: 'screen',
    title: 'Screen, Input & Body',
    slug: 'screen-input-body',
    items: [
      { name: 'Cracked Screen', slug: 'cracked-screen' },
      { name: 'Touch Screen Repair', slug: 'touch-screen-repair' },
      { name: 'Laptop Keyboard', slug: 'laptop-keyboard' },
      { name: 'Repeating Keys', slug: 'repeating-keys' },
      { name: 'Touchpad Not Working', slug: 'touchpad-not-working' },
      { name: 'Hinge Repair', slug: 'hinge-repair' },
      { name: 'Base Repair', slug: 'base-repair' },
      { name: 'Webcam', slug: 'webcam' },
      { name: 'Speaker', slug: 'speaker' },
      { name: 'No Display', slug: 'no-display' },
      { name: 'Touchpad Repair', slug: 'touchpad-repair' },
      { name: 'Body Lid', slug: 'body-lid' },
    ],
  },
  {
    id: 'specialist',
    title: 'Specialist Repair',
    slug: 'specialist-repair',
    items: [
      { name: 'Motherboard Repair', slug: 'motherboard-repair' },
      { name: 'Chip Level Repair', slug: 'chip-level-repair' },
      { name: 'Water Damage Repair', slug: 'water-damage-repair' },
      { name: 'Physical Damage Repair', slug: 'physical-damage-repair' },
      { name: 'Data Recovery', slug: 'data-recovery' },
      { name: 'LTO Tape Repair', slug: 'lto-tape-repair' },
      { name: 'AMC Plans', slug: 'amc-plans' },
      { name: 'General Service', slug: 'general-service' },
    ],
  },
  {
    id: 'beyond',
    title: 'Beyond Laptops',
    slug: 'beyond-laptops',
    items: [
      { name: 'Desktop Repair', slug: 'desktop-repair' },
      { name: 'Workstation Repair', slug: 'workstation-repair' },
      { name: 'Projector Repair', slug: 'projector-repair' },
      { name: 'Laptop Rental', slug: 'laptop-rental' },
    ],
  },
]

export function getAllServices(): ServiceItem[] {
  return SERVICE_CATEGORIES.flatMap((c) => c.items)
}

export function findService(slug: string) {
  for (const cat of SERVICE_CATEGORIES) {
    const item = cat.items.find((i) => i.slug === slug)
    if (item) return { category: cat, item }
  }
  return null
}
