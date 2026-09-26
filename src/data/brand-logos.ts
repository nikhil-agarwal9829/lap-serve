export interface BrandLogo {
  name: string
  slug: string
  abbr: string
  color: string
  displayName?: string
}

export const BRAND_LOGOS: BrandLogo[] = [
  { name: 'HP', slug: 'hp', abbr: 'HP', color: '#0096D6' },
  { name: 'Dell', slug: 'dell', abbr: 'DELL', color: '#007DB8' },
  { name: 'Lenovo', slug: 'lenovo', abbr: 'LEN', color: '#E2231A' },
  { name: 'Apple', slug: 'apple', abbr: '', color: '#1d1d1f' },
  { name: 'Asus', slug: 'asus', abbr: 'ASUS', color: '#00539F' },
  { name: 'Acer', slug: 'acer', abbr: 'acer', color: '#83B81A' },
  { name: 'MSI', slug: 'msi', abbr: 'MSI', color: '#FF0000' },
  { name: 'Samsung', slug: 'samsung', abbr: 'SAM', color: '#1428A0' },
  { name: 'LG', slug: 'lg', abbr: 'LG', color: '#A50034' },
  { name: 'Huawei', slug: 'huawei', abbr: 'HW', color: '#CF0A2C' },
  { name: 'Microsoft Surface', slug: 'microsoft-surface', abbr: 'MS', color: '#00A4EF', displayName: 'Microsoft Surface' },
  { name: 'Alienware', slug: 'alienware', abbr: 'AW', color: '#00C0FF' },
  { name: 'Razer', slug: 'razer', abbr: 'RZ', color: '#00C853' },
  { name: 'Gigabyte', slug: 'gigabyte', abbr: 'GBT', color: '#F47920' },
  { name: 'Toshiba', slug: 'toshiba', abbr: 'TOS', color: '#FF0000' },
  { name: 'Sony', slug: 'sony', abbr: 'SONY', color: '#000000' },
  { name: 'Fujitsu', slug: 'fujitsu', abbr: 'FUJ', color: '#E60012' },
  { name: 'Panasonic', slug: 'panasonic', abbr: 'PAN', color: '#0041C0' },
  { name: 'Avita', slug: 'avita', abbr: 'AV', color: '#6B4EE6' },
  { name: 'Chuwi', slug: 'chuwi', abbr: 'CH', color: '#FF6B00' },
  { name: 'Infinix', slug: 'infinix', abbr: 'INF', color: '#00B140' },
  { name: 'Honor', slug: 'honor', abbr: 'HON', color: '#00AEEF' },
  { name: 'Xiaomi', slug: 'xiaomi', abbr: 'MI', color: '#FF6900' },
  { name: 'Realme', slug: 'realme', abbr: 'RM', color: '#FFC915' },
  { name: 'Vaio', slug: 'vaio', abbr: 'VAIO', color: '#4B0082' },
  { name: 'Dynabook', slug: 'dynabook', abbr: 'DY', color: '#003DA5' },
]

/** Homepage preview — 4×2 grid */
export const HOME_BRAND_SLUGS = ['hp', 'dell', 'lenovo', 'apple', 'asus', 'acer', 'msi', 'samsung'] as const

export function getBrandsBySlugs(slugs: readonly string[]) {
  return slugs.map((s) => BRAND_LOGOS.find((b) => b.slug === s)).filter(Boolean) as BrandLogo[]
}

export function findBrandLogo(slug: string) {
  return BRAND_LOGOS.find((b) => b.slug === slug)
}
