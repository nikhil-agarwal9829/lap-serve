import {
  MemoryStick,
  HardDrive,
  Disc,
  Battery,
  Monitor,
  Keyboard,
  MousePointer2,
  Camera,
  Volume2,
  PanelTop,
  Gauge,
  Flame,
  Power,
  Wind,
  Activity,
  AppWindow,
  Bug,
  Settings,
  AlertTriangle,
  Cpu,
  Microchip,
  Droplets,
  Database,
  EyeOff,
  Zap,
  type LucideIcon,
} from 'lucide-react'

export interface DirectoryService {
  name: string
  slug: string
  priceMin: number
  time: string
  icon: LucideIcon
  keywords: string[]
}

export interface ServiceDirectoryCategory {
  id: string
  title: string
  services: DirectoryService[]
}

export const SERVICE_DIRECTORY: ServiceDirectoryCategory[] = [
  {
    id: 'hardware',
    title: 'Hardware Upgrades',
    services: [
      { name: 'RAM Upgrade', slug: 'ram-upgrade', priceMin: 999, time: '1–2 hrs', icon: MemoryStick, keywords: ['ram', 'memory'] },
      { name: 'SSD Upgrade', slug: 'ssd-upgrade', priceMin: 2500, time: '1–3 hrs', icon: HardDrive, keywords: ['ssd', 'storage'] },
      { name: 'Hard Disk Upgrade', slug: 'hard-disk-upgrade', priceMin: 1999, time: '1–3 hrs', icon: Disc, keywords: ['hdd', 'disk'] },
      { name: 'Battery Upgrade', slug: 'battery-replacement', priceMin: 1499, time: '1–2 hrs', icon: Battery, keywords: ['battery'] },
    ],
  },
  {
    id: 'display',
    title: 'Display & Input',
    services: [
      { name: 'Cracked Screen', slug: 'cracked-screen', priceMin: 2999, time: '2–4 hrs', icon: Monitor, keywords: ['screen', 'display', 'broken'] },
      { name: 'Keyboard Repair', slug: 'laptop-keyboard', priceMin: 1299, time: '1–2 hrs', icon: Keyboard, keywords: ['keyboard', 'keys'] },
      { name: 'Touchpad Repair', slug: 'touchpad-repair', priceMin: 999, time: '1–2 hrs', icon: MousePointer2, keywords: ['touchpad', 'trackpad'] },
      { name: 'Webcam Repair', slug: 'webcam', priceMin: 799, time: '1–2 hrs', icon: Camera, keywords: ['webcam', 'camera'] },
      { name: 'Speaker Repair', slug: 'speaker', priceMin: 699, time: '1–2 hrs', icon: Volume2, keywords: ['speaker', 'audio', 'sound'] },
      { name: 'Hinge Repair', slug: 'hinge-repair', priceMin: 1499, time: '2–3 hrs', icon: PanelTop, keywords: ['hinge', 'lid'] },
    ],
  },
  {
    id: 'performance',
    title: 'Performance Issues',
    services: [
      { name: 'Slow Laptop', slug: 'slow-performance', priceMin: 499, time: '1–3 hrs', icon: Gauge, keywords: ['slow', 'lag', 'performance'] },
      { name: 'Overheating', slug: 'overheating', priceMin: 999, time: '1–2 hrs', icon: Flame, keywords: ['heat', 'hot', 'thermal'] },
      { name: 'Auto Shutdown', slug: 'auto-shutdown', priceMin: 799, time: '1–3 hrs', icon: Power, keywords: ['shutdown', 'turns off'] },
      { name: 'Fan Noise', slug: 'overheating', priceMin: 999, time: '1–2 hrs', icon: Wind, keywords: ['fan', 'noise', 'loud'] },
      { name: 'Lagging System', slug: 'slow-performance', priceMin: 499, time: '1–3 hrs', icon: Activity, keywords: ['lag', 'freeze', 'stutter'] },
    ],
  },
  {
    id: 'software',
    title: 'Software Issues',
    services: [
      { name: 'Windows Installation', slug: 'os-installation', priceMin: 799, time: '1–3 hrs', icon: AppWindow, keywords: ['windows', 'os', 'install'] },
      { name: 'Virus Removal', slug: 'virus-removal', priceMin: 599, time: '1–2 hrs', icon: Bug, keywords: ['virus', 'malware'] },
      { name: 'Driver Problems', slug: 'driver-issues', priceMin: 499, time: '1 hr', icon: Settings, keywords: ['driver'] },
      { name: 'OS Corruption', slug: 'os-installation', priceMin: 799, time: '1–3 hrs', icon: AlertTriangle, keywords: ['corrupt', 'boot', 'os'] },
      { name: 'Software Crashes', slug: 'slow-performance', priceMin: 499, time: '1–3 hrs', icon: Zap, keywords: ['crash', 'software', 'app'] },
    ],
  },
  {
    id: 'advanced',
    title: 'Advanced Repairs',
    services: [
      { name: 'Motherboard Repair', slug: 'motherboard-repair', priceMin: 3499, time: '4–8 hrs', icon: Cpu, keywords: ['motherboard', 'logic board'] },
      { name: 'Chip Level Repair', slug: 'chip-level-repair', priceMin: 2999, time: '4–24 hrs', icon: Microchip, keywords: ['chip', 'bga'] },
      { name: 'Water Damage', slug: 'water-damage-repair', priceMin: 2499, time: '4–24 hrs', icon: Droplets, keywords: ['water', 'liquid', 'spill'] },
      { name: 'Data Recovery', slug: 'data-recovery', priceMin: 1999, time: '24–48 hrs', icon: Database, keywords: ['data', 'recovery', 'files'] },
      { name: 'No Display', slug: 'no-display', priceMin: 1999, time: '2–4 hrs', icon: EyeOff, keywords: ['no display', 'black screen'] },
      { name: 'Power Failure', slug: 'physical-damage-repair', priceMin: 1999, time: '2–6 hrs', icon: Zap, keywords: ['power', 'not turning on', 'dead'] },
    ],
  },
]

export const SERVICE_SEARCH_HINTS = [
  'Screen broken',
  'SSD upgrade',
  'Battery issue',
  'Laptop not turning on',
]

export function getAllDirectoryServices() {
  return SERVICE_DIRECTORY.flatMap((c) => c.services)
}

export function filterDirectory(query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return SERVICE_DIRECTORY

  return SERVICE_DIRECTORY.map((cat) => ({
    ...cat,
    services: cat.services.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.keywords.some((k) => k.includes(q)) ||
        s.slug.includes(q)
    ),
  })).filter((cat) => cat.services.length > 0)
}
