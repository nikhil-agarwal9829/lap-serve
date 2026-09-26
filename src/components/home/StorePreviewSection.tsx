import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, ShoppingCart, Eye, ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Button } from '@/components/ui/button'
import { STORE_PRODUCTS, formatINR } from '@/data/store'
import { useCart } from '@/context/CartContext'

const FEATURED_CATEGORIES = ['SSD', 'RAM', 'Keyboards', 'Accessories'] as const

export function StorePreviewSection() {
  const { addItem } = useCart()
  const featured = STORE_PRODUCTS.slice(0, 4)

  return (
    <section id="store" className="section-light-premium section-pad-compact">
      <div className="container-lapserve">
        <SectionHeading
          theme="light"
          eyebrow="LapServe Store"
          title="Premium hardware, delivered fast"
          description="Curated upgrades and accessories — Apple Store quality, doorstep convenience."
        />

        <div className="mb-8 flex flex-wrap gap-2">
          {FEATURED_CATEGORIES.map((cat) => (
            <span
              key={cat}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600"
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-6">
          {featured.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="col-span-12 sm:col-span-6 lg:col-span-3"
            >
              <div className="card-premium group overflow-hidden p-0">
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <Link
                      to={`/store/${p.id}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md"
                      aria-label="Quick view"
                    >
                      <Eye className="h-4 w-4 text-slate-700" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => addItem(p)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#071224] text-white shadow-md"
                      aria-label="Add to cart"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs text-slate-500">
                      {p.rating} ({p.reviews})
                    </span>
                  </div>
                  <h3 className="mt-2 line-clamp-2 font-bold text-slate-900">{p.name}</h3>
                  <p className="mt-2 text-lg font-bold text-slate-900">{formatINR(p.price)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="light" size="lg" asChild>
            <Link to="/store">
              Visit Store
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
