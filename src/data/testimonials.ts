export interface Testimonial {
  id: string
  name: string
  role: string
  company?: string
  location: string
  quote: string
  rating: number
  image?: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    role: 'Product Manager',
    company: 'Razorpay',
    location: 'Bangalore',
    quote: 'The engineer fixed my MacBook Pro screen at my home office in under 2 hours. Transparent pricing, genuine parts, zero stress.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Arjun Mehta',
    role: 'Founder',
    company: 'Stealth Startup',
    location: 'Mumbai',
    quote: 'LapServe saved our sprint. Same-day SSD upgrade for the entire team. This is how enterprise repair should work.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Dr. Kavitha Reddy',
    role: 'Professor',
    company: 'IIIT Hyderabad',
    location: 'Hyderabad',
    quote: 'Data integrity was my biggest concern. They repaired in front of me and never asked to take the laptop away. Exceptional trust.',
    rating: 5,
  },
  {
    id: '4',
    name: 'Rahul Verma',
    role: 'Software Engineer',
    company: 'Microsoft',
    location: 'Delhi NCR',
    quote: 'Dell XPS hinge repair done at my doorstep. Clear quote upfront, 1 year warranty documented. Highly recommend.',
    rating: 5,
  },
  {
    id: '5',
    name: 'Ananya Iyer',
    role: 'Design Lead',
    location: 'Chennai',
    quote: 'Water damage on my ThinkPad — I thought it was gone. LapServe recovered it with chip-level repair. Incredible.',
    rating: 5,
  },
  {
    id: '6',
    name: 'Vikram Patel',
    role: 'CTO',
    company: 'FinTech Co',
    location: 'Pune',
    quote: 'We use their AMC for 40+ laptops. Consistent quality, background-verified engineers, and real accountability.',
    rating: 5,
  },
]

export const TRUSTED_LOGOS = [
  'Razorpay', 'Swiggy', 'Zerodha', 'Freshworks', 'IIIT Hyderabad', 'ISB',
  'Flipkart', 'PhonePe', 'CRED', 'Meesho', 'Delhivery', 'Postman',
] as const
