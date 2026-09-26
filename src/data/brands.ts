export interface Brand {
  name: string
  slug: string
  models?: string[]
}

export const BRANDS: Brand[] = [
  { name: 'HP', slug: 'hp', models: ['Pavilion', 'EliteBook', 'ProBook', 'Envy', 'Omen'] },
  { name: 'Dell', slug: 'dell', models: ['XPS', 'Inspiron', 'Latitude', 'Vostro', 'Alienware'] },
  { name: 'Lenovo', slug: 'lenovo', models: ['ThinkPad', 'IdeaPad', 'Legion', 'Yoga'] },
  { name: 'Asus', slug: 'asus', models: ['ZenBook', 'VivoBook', 'ROG', 'TUF'] },
  { name: 'Acer', slug: 'acer', models: ['Aspire', 'Predator', 'Swift', 'Nitro'] },
  { name: 'MSI', slug: 'msi', models: ['GF Series', 'Stealth', 'Creator', 'Pulse'] },
  { name: 'Samsung', slug: 'samsung', models: ['Galaxy Book', 'Notebook'] },
  { name: 'Apple', slug: 'apple', models: ['MacBook Air', 'MacBook Pro', 'MacBook'] },
  { name: 'Alienware', slug: 'alienware', models: ['m15', 'm17', 'x14', 'x16'] },
  { name: 'Gigabyte', slug: 'gigabyte', models: ['Aorus', 'Gaming', 'Aero'] },
  { name: 'Razer', slug: 'razer', models: ['Blade 14', 'Blade 15', 'Blade 16'] },
  { name: 'Microsoft Surface', slug: 'microsoft-surface', models: ['Surface Laptop', 'Surface Pro', 'Surface Book'] },
  { name: 'Huawei', slug: 'huawei', models: ['MateBook', 'MagicBook'] },
  { name: 'LG', slug: 'lg', models: ['Gram', 'Ultra'] },
  { name: 'Sony', slug: 'sony', models: ['VAIO'] },
  { name: 'Honor', slug: 'honor', models: ['MagicBook'] },
  { name: 'Xiaomi', slug: 'xiaomi', models: ['Mi Notebook', 'RedmiBook'] },
  { name: 'Toshiba', slug: 'toshiba', models: ['Satellite', 'Portégé', 'Tecra'] },
]

export const POPULAR_BRAND_SLUGS = [
  'hp', 'dell', 'lenovo', 'asus', 'acer', 'msi', 'samsung', 'apple',
  'alienware', 'gigabyte', 'razer', 'microsoft-surface', 'huawei', 'lg',
]

export function findBrand(slug: string) {
  return BRANDS.find((b) => b.slug === slug)
}
