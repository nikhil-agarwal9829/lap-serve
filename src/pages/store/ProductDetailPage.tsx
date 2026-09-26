import { useParams, Link } from 'react-router-dom'
import { Star, ShoppingCart, Truck, Shield } from 'lucide-react'
import { SEO } from '@/components/SEO'
import { Button } from '@/components/ui/button'
import { getProduct, STORE_PRODUCTS, formatINR } from '@/data/store'
import { useCart } from '@/context/CartContext'
import { MagneticButton } from '@/components/layout/MagneticButton'

export function ProductDetailPage() {
  const { id } = useParams()
  const product = id ? getProduct(id) : null
  const { addItem } = useCart()

  if (!product) {
    return (
      <section className="section-gap section-light pt-28 text-center">
        <div className="container-lapserve">
          <h1 className="text-2xl font-bold text-slate-900">Product not found</h1>
          <MagneticButton to="/store" className="mt-6">Back to store</MagneticButton>
        </div>
      </section>
    )
  }

  const related = STORE_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4)

  return (
    <>
      <SEO title={product.name} description={`Buy ${product.name} from LapServe Store`} path={`/store/${product.id}`} />
      <section className="section-gap section-light pt-28">
        <div className="container-lapserve">
          <div className="grid grid-cols-12 gap-12">
            <div className="col-span-12 lg:col-span-6">
              <div className="overflow-hidden rounded-[28px] bg-slate-100">
                <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <p className="text-sm text-slate-500">{product.brand}</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">{product.name}</h1>
              <div className="mt-4 flex items-center gap-2">
                <Star className="h-5 w-5 fill-[#f59e0b] text-[#f59e0b]" />
                <span className="text-slate-600">
                  {product.rating} · {product.reviews} reviews
                </span>
              </div>
              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-slate-900">{formatINR(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-slate-400 line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
              </div>
              <p className={`mt-2 text-sm font-medium ${product.inStock ? 'text-success' : 'text-danger'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-600">
                <span className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-primary" />
                  {product.deliveryDays} day delivery
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  {product.warranty} warranty
                </span>
              </div>
              <div className="mt-8 flex gap-3">
                <Button size="lg" disabled={!product.inStock} onClick={() => addItem(product)}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="border-slate-300" asChild>
                  <Link to="/store/cart">Buy Now</Link>
                </Button>
              </div>
              <div className="mt-10">
                <h3 className="font-bold text-slate-900">Specifications</h3>
                <dl className="mt-4 space-y-2">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-slate-100 py-2 text-sm">
                      <dt className="text-slate-500">{k}</dt>
                      <dd className="font-medium text-slate-800">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl font-bold text-slate-900">Related Products</h2>
              <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                {related.map((p) => (
                  <Link key={p.id} to={`/store/${p.id}`} className="card-light p-4">
                    <img src={p.image} alt="" className="aspect-square rounded-xl object-cover" loading="lazy" />
                    <p className="mt-2 text-sm font-semibold text-slate-900 line-clamp-1">{p.name}</p>
                    <p className="text-sm text-primary">{formatINR(p.price)}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
