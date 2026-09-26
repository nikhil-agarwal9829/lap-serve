export interface Location {
  name: string
  slug: string
  areas: string[]
  description: string
}

export const LOCATIONS: Location[] = [
  {
    name: 'Hyderabad',
    slug: 'hyderabad',
    areas: ['Hitech City', 'Gachibowli', 'Banjara Hills', 'Jubilee Hills', 'Madhapur', 'Kondapur'],
    description: 'Doorstep laptop repair across Hyderabad with certified engineers and OEM parts.',
  },
  {
    name: 'Bangalore',
    slug: 'bangalore',
    areas: ['Koramangala', 'Indiranagar', 'Whitefield', 'HSR Layout', 'Electronic City', 'MG Road'],
    description: "India's tech capital deserves premium repair. LapServe delivers at your doorstep.",
  },
  {
    name: 'Chennai',
    slug: 'chennai',
    areas: ['T Nagar', 'Adyar', 'OMR', 'Anna Nagar', 'Velachery', 'Nungambakkam'],
    description: 'Expert laptop repair across Chennai with transparent pricing and warranty.',
  },
  {
    name: 'Mumbai',
    slug: 'mumbai',
    areas: ['Andheri', 'Bandra', 'Powai', 'Lower Parel', 'Worli', 'Thane'],
    description: 'Fast, trusted doorstep repair for Mumbai professionals and businesses.',
  },
  {
    name: 'Delhi',
    slug: 'delhi',
    areas: ['Gurgaon', 'Noida', 'Connaught Place', 'Saket', 'Dwarka', 'Cyber City'],
    description: 'NCR-wide coverage with enterprise-grade diagnostics and genuine parts.',
  },
  {
    name: 'Pune',
    slug: 'pune',
    areas: ['Hinjewadi', 'Koregaon Park', 'Baner', 'Wakad', 'Kharadi', 'Viman Nagar'],
    description: 'Pune\'s trusted doorstep laptop repair platform for homes and offices.',
  },
]

export function findLocation(slug: string) {
  return LOCATIONS.find((l) => l.slug === slug)
}
