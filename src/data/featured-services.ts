import {
  Monitor,
  Battery,
  HardDrive,
  MemoryStick,
  Cpu,
  Keyboard,
  Database,
  Droplets,
  type LucideIcon,
} from 'lucide-react'

export interface FeaturedService {
  title: string
  slug: string
  description: string
  time: string
  priceFrom: number
  icon: LucideIcon
}

/** Homepage preview — exactly 8 services */
export const FEATURED_SERVICES: FeaturedService[] = [
  {
    title: 'Screen Repair',
    slug: 'cracked-screen',
    description: 'OEM displays with color calibration and warranty.',
    time: '2–4 hrs',
    priceFrom: 2999,
    icon: Monitor,
  },
  {
    title: 'Battery Replacement',
    slug: 'battery-replacement',
    description: 'Genuine batteries with health verification.',
    time: '1–2 hrs',
    priceFrom: 1499,
    icon: Battery,
  },
  {
    title: 'SSD Upgrade',
    slug: 'ssd-upgrade',
    description: 'NVMe installs with data migration included.',
    time: '1–3 hrs',
    priceFrom: 1999,
    icon: HardDrive,
  },
  {
    title: 'RAM Upgrade',
    slug: 'ram-upgrade',
    description: 'Performance boost with compatible modules.',
    time: '1–2 hrs',
    priceFrom: 999,
    icon: MemoryStick,
  },
  {
    title: 'Keyboard Repair',
    slug: 'laptop-keyboard',
    description: 'Full keyboard replacement or key fix.',
    time: '1–2 hrs',
    priceFrom: 1299,
    icon: Keyboard,
  },
  {
    title: 'Motherboard Repair',
    slug: 'motherboard-repair',
    description: 'Chip-level diagnostics and component repair.',
    time: '4–8 hrs',
    priceFrom: 3499,
    icon: Cpu,
  },
  {
    title: 'Data Recovery',
    slug: 'data-recovery',
    description: 'Secure recovery with chain-of-custody.',
    time: '24–48 hrs',
    priceFrom: 1999,
    icon: Database,
  },
  {
    title: 'Water Damage Repair',
    slug: 'water-damage-repair',
    description: 'Ultrasonic cleaning and board restoration.',
    time: '4–24 hrs',
    priceFrom: 2499,
    icon: Droplets,
  },
]
