import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, CheckCircle } from 'lucide-react'
import { SEO } from '@/components/SEO'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCart } from '@/context/CartContext'
import { formatINR } from '@/data/store'

const STEPS = ['Cart', 'Shipping', 'Payment', 'Confirmation']

export function CartPage() {
  const { items, updateQty, removeItem, total, clear } = useCart()
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  if (done) {
    return (
      <section className="section-gap section-light pt-28">
        <div className="container-lapserve max-w-lg text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-success" />
          <h1 className="mt-6 text-3xl font-bold text-slate-900">Order Confirmed!</h1>
          <p className="mt-4 text-slate-600">Thank you for shopping at LapServe Store.</p>
          <Button className="mt-8" asChild>
            <Link to="/store">Continue Shopping</Link>
          </Button>
        </div>
      </section>
    )
  }

  return (
    <>
      <SEO title="Cart" description="Your LapServe Store cart" path="/store/cart" />
      <section className="section-gap section-light pt-28">
        <div className="container-lapserve max-w-4xl">
          <div className="mb-10 flex justify-between gap-2">
            {STEPS.map((s, i) => (
              <div
                key={s}
                className={`flex-1 rounded-full py-2 text-center text-xs font-semibold md:text-sm ${
                  i <= step ? 'bg-primary text-slate-900' : 'bg-slate-200 text-slate-500'
                }`}
              >
                {s}
              </div>
            ))}
          </div>

          {items.length === 0 ? (
            <div className="card-light p-12 text-center">
              <p className="text-slate-600">Your cart is empty</p>
              <Button className="mt-6" asChild>
                <Link to="/store">Browse Store</Link>
              </Button>
            </div>
          ) : (
            <>
              {step === 0 && (
                <div className="space-y-4">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="card-light flex gap-4 p-4">
                      <img
                        src={product.image}
                        alt=""
                        className="h-24 w-24 rounded-xl object-cover"
                        loading="lazy"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900">{product.name}</h3>
                        <p className="text-sm text-slate-500">{product.brand}</p>
                        <p className="mt-2 font-bold text-primary">{formatINR(product.price)}</p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button type="button" onClick={() => removeItem(product.id)} aria-label="Remove">
                          <Trash2 className="h-4 w-4 text-danger" />
                        </button>
                        <div className="flex items-center gap-2 rounded-full border border-slate-200">
                          <button type="button" onClick={() => updateQty(product.id, quantity - 1)}>
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-6 text-center text-sm">{quantity}</span>
                          <button type="button" onClick={() => updateQty(product.id, quantity + 1)}>
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="card-light flex justify-between p-6">
                    <span className="font-bold text-slate-900">Total</span>
                    <span className="text-xl font-bold text-primary">{formatINR(total)}</span>
                  </div>
                  <Button className="w-full" size="lg" onClick={() => setStep(1)}>
                    Continue to Shipping
                  </Button>
                </div>
              )}

              {step === 1 && (
                <div className="card-light space-y-4 p-8">
                  <h2 className="text-xl font-bold text-slate-900">Shipping Details</h2>
                  <Input placeholder="Full name" />
                  <Input placeholder="Phone" type="tel" />
                  <Input placeholder="Address" />
                  <Input placeholder="City" />
                  <Button className="w-full" onClick={() => setStep(2)}>
                    Continue to Payment
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="card-light space-y-4 p-8">
                  <h2 className="text-xl font-bold text-slate-900">Payment</h2>
                  <p className="text-slate-600">Pay {formatINR(total)} via UPI, card, or COD.</p>
                  <Input placeholder="Card / UPI ID (demo)" />
                  <Button
                    className="w-full"
                    onClick={() => {
                      setStep(3)
                      clear()
                      setDone(true)
                    }}
                  >
                    Place Order
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
