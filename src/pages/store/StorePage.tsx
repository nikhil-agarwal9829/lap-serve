import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react'
import { SEO } from '@/components/SEO'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Button } from '@/components/ui/button'
import { STORE_CATEGORIES, STORE_PRODUCTS, formatINR } from '@/data/store'
import { useCart } from '@/context/CartContext'
import { cn } from '@/lib/utils'

export function StorePage() {
  const [category, setCategory] = useState<string | null>(null)
  const { addItem } = useCart()

  const filtered = category
    ? STORE_PRODUCTS.filter((p) => p.category === category)
    : STORE_PRODUCTS

  return (
    <>
      <SEO title="Hardware Store" description="Shop RAM, SSD, keyboards, accessories and more from LapServe." path="/store" />
      <section className="section-gap section-light pt-28">
        <div className="container-lapserve">
          <SectionHeading
            title="LapServe Store"
            description="Premium hardware — RAM, SSD, peripherals, and accessories with fast delivery."
          />

          <div className="mb-10 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCategory(null)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-all',
                !category ? 'bg-primary text-slate-900' : 'bg-white border border-slate-200 text-slate-600'
              )}
            >
              All
            </button>
            {STORE_CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-all',
                  category === c.id ? 'bg-primary text-slate-900' : 'bg-white border border-slate-200 text-slate-600'
                )}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-12 gap-6">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3"
              >
                <div className="card-light group overflow-hidden p-0">
                  <div className="relative aspect-square overflow-hidden bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.originalPrice && (
                      <span className="absolute top-3 left-3 rounded-full bg-danger px-2 py-1 text-xs font-bold text-white">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                      </span>
                    )}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <button type="button" className="rounded-full bg-white p-2 shadow" aria-label="Wishlist">
                        <Heart className="h-4 w-4" />
                      </button>
                      <Link
                        to={`/store/${product.id}`}
                        className="rounded-full bg-white p-2 shadow"
                        aria-label="Quick view"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-slate-500">{product.brand}</p>
                    <h3 className="mt-1 font-bold text-slate-900 line-clamp-2">{product.name}</h3>
                    <div className="mt-2 flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                      <span className="text-xs text-slate-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-lg font-bold text-slate-900">{formatINR(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-slate-400 line-through">
                          {formatINR(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1"
                        disabled={!product.inStock}
                        onClick={() => addItem(product)}
                      >
                        <ShoppingCart className="mr-1 h-3.5 w-3.5" />
                        Add to Cart
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-300" asChild>
                        <Link to={`/store/${product.id}`}>Buy</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
