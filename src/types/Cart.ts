export interface Product {
  id: string
  name: string
  price: number
  currency: string
  image: string
  description: string
}

export type CartItem = Product & {
  quantity: number
  loading?: 'lazy' | 'eager'
}

export interface Cart {
  items: CartItem[]
  total: number
}
