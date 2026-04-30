import { persistentAtom, persistentBoolean } from '@nanostores/persistent'

import type { Cart, CartItem } from '../../types/Cart'

export const isCartOpen = persistentBoolean('cart-open')
export const cartStore = persistentAtom<Cart>(
  'cart',
  { items: [], total: 0 },
  { encode: JSON.stringify, decode: JSON.parse }
)

//Funciones para manejar los stores (HELPERS)
export function addCartItem(product: Omit<CartItem, 'quantity'>) {
  const { items, total } = cartStore.get()

  const existingEntry = items.find(i => i.id === product.id)

  const updatedItems: CartItem[] = existingEntry
    ? //si existe el producto, lo buscamos y le añadimos uno
      items.map(i => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i))
    : //sino, lo agrega al array
      [...items, { ...product, quantity: 1 }]

  cartStore.set({
    items: updatedItems,
    total: total + product.price
  })
}

export function removeCartItem(productId: CartItem['id']) {
  const { items, total } = cartStore.get()
  const existingItem = items.find(i => i.id === productId)
  if (!existingItem) return

  cartStore.set({
    items: items.filter(i => i.id !== productId),
    total: total - existingItem.price * existingItem.quantity
  })
}

export function removeOneItem(productId: CartItem['id']) {
  const { items, total } = cartStore.get()
  const existingItem = items.find(i => i.id === productId)

  if (!existingItem || existingItem.quantity < 2) {
    return
  }

  const updatedCart: CartItem[] = items.map(i =>
    i.id === productId ? { ...i, quantity: i.quantity - 1 } : i
  )

  cartStore.set({
    items: updatedCart,
    total: total - existingItem.price
  })
}

export function clearCart() {
  cartStore.set({ items: [], total: 0 })
}
