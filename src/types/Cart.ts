export interface CartItem {
  id: string
  name: string
  price: number
  currency: string
  image: string
  description: string
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
}
