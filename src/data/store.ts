export interface StoreProduct {
  id: string
  name: string
  brand: string
  category: string
  subcategory?: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  inStock: boolean
  deliveryDays: number
  warranty: string
  specs: Record<string, string>
}

export const STORE_CATEGORIES = [
  {
    id: 'ram',
    name: 'RAM',
    sub: ['DDR4', 'DDR5', 'Laptop RAM', 'Desktop RAM'],
  },
  {
    id: 'ssd',
    name: 'SSD',
    sub: ['SATA SSD', 'NVMe SSD', 'PCIe Gen4 SSD'],
  },
  {
    id: 'processors',
    name: 'Processors',
    sub: ['Intel', 'AMD'],
  },
  {
    id: 'keyboards',
    name: 'Keyboards',
    sub: ['Laptop Keyboard', 'Mechanical Keyboard', 'Wireless Keyboard'],
  },
  {
    id: 'mouse',
    name: 'Mouse',
    sub: ['Gaming Mouse', 'Wireless Mouse', 'Office Mouse'],
  },
  {
    id: 'accessories',
    name: 'Accessories',
    sub: ['Cooling Pads', 'Chargers', 'USB Hubs', 'Laptop Stands', 'Adapters', 'Cables'],
  },
] as const

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    id: 'ram-16-ddr5',
    name: '16GB DDR5 Laptop RAM',
    brand: 'Crucial',
    category: 'ram',
    subcategory: 'DDR5',
    price: 4299,
    originalPrice: 5499,
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop',
    inStock: true,
    deliveryDays: 2,
    warranty: '3 Years',
    specs: { Capacity: '16GB', Type: 'DDR5', Speed: '4800MHz' },
  },
  {
    id: 'ssd-1tb-nvme',
    name: '1TB NVMe Gen4 SSD',
    brand: 'Samsung',
    category: 'ssd',
    subcategory: 'NVMe SSD',
    price: 7499,
    originalPrice: 8999,
    rating: 4.9,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1531492746076-161ca978cb84?w=400&h=400&fit=crop',
    inStock: true,
    deliveryDays: 1,
    warranty: '5 Years',
    specs: { Capacity: '1TB', Interface: 'NVMe PCIe 4.0', Read: '7000 MB/s' },
  },
  {
    id: 'kb-mechanical',
    name: 'Mechanical Gaming Keyboard',
    brand: 'Logitech',
    category: 'keyboards',
    subcategory: 'Mechanical Keyboard',
    price: 5999,
    originalPrice: 7499,
    rating: 4.7,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1511467687853-23d96c481e48?w=400&h=400&fit=crop',
    inStock: true,
    deliveryDays: 2,
    warranty: '2 Years',
    specs: { Switch: 'GX Blue', Layout: 'Full', Backlit: 'RGB' },
  },
  {
    id: 'mouse-gaming',
    name: 'Wireless Gaming Mouse',
    brand: 'Razer',
    category: 'mouse',
    subcategory: 'Gaming Mouse',
    price: 4499,
    rating: 4.6,
    reviews: 201,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
    inStock: true,
    deliveryDays: 2,
    warranty: '2 Years',
    specs: { DPI: '26000', Wireless: 'Yes', Weight: '68g' },
  },
  {
    id: 'cooling-pad',
    name: 'RGB Laptop Cooling Pad',
    brand: 'LapServe',
    category: 'accessories',
    subcategory: 'Cooling Pads',
    price: 1999,
    originalPrice: 2499,
    rating: 4.5,
    reviews: 56,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f155344?w=400&h=400&fit=crop',
    inStock: true,
    deliveryDays: 3,
    warranty: '1 Year',
    specs: { Fans: '6', Size: '15-17"', RGB: 'Yes' },
  },
  {
    id: 'charger-65w',
    name: '65W USB-C Laptop Charger',
    brand: 'Anker',
    category: 'accessories',
    subcategory: 'Chargers',
    price: 2799,
    rating: 4.8,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1591290619762-d2d69f84f1fb?w=400&h=400&fit=crop',
    inStock: true,
    deliveryDays: 1,
    warranty: '18 Months',
    specs: { Wattage: '65W', Ports: 'USB-C + USB-A', GaN: 'Yes' },
  },
  {
    id: 'ram-32-ddr4',
    name: '32GB DDR4 Desktop RAM',
    brand: 'Kingston',
    category: 'ram',
    subcategory: 'DDR4',
    price: 6999,
    originalPrice: 7999,
    rating: 4.7,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1562976540-1502c2143006?w=400&h=400&fit=crop',
    inStock: true,
    deliveryDays: 2,
    warranty: 'Lifetime',
    specs: { Capacity: '32GB', Type: 'DDR4', Speed: '3200MHz' },
  },
  {
    id: 'intel-i7',
    name: 'Intel Core i7-13700H',
    brand: 'Intel',
    category: 'processors',
    subcategory: 'Intel',
    price: 28999,
    rating: 4.9,
    reviews: 34,
    image: 'https://images.unsplash.com/photo-1555617981-dac3880b52f8?w=400&h=400&fit=crop',
    inStock: false,
    deliveryDays: 5,
    warranty: '3 Years',
    specs: { Cores: '14', Threads: '20', Base: '2.4 GHz' },
  },
]

export function getProduct(id: string) {
  return STORE_PRODUCTS.find((p) => p.id === id)
}

export function formatINR(n: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
}
