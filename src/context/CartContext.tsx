import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { StoreProduct } from '@/data/store'

export interface CartItem {
  product: StoreProduct
  quantity: number
}

interface CartContextValue {
  items: CartItem[]
  addItem: (product: StoreProduct, qty?: number) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clear: () => void
  total: number
  count: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = useCallback((product: StoreProduct, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i
        )
      }
      return [...prev, { product, quantity: qty }]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== id))
  }, [])

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty < 1) {
      removeItem(id)
      return
    }
    setItems((prev) => prev.map((i) => (i.product.id === id ? { ...i, quantity: qty } : i)))
  }, [removeItem])

  const clear = useCallback(() => setItems([]), [])

  const total = items.reduce((s, i) => s + i.product.price * i.quantity, 0)
  const count = items.reduce((s, i) => s + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clear, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
