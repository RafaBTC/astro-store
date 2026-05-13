import { toast } from 'react-toastify'

import type { CartItem } from '../types/Cart'

export async function getProducts(): Promise<CartItem[]> {
  try {
    const res = await fetch('/api/e-commerce/products', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await res.json()
    return data
  } catch (e) {
    console.error(e)
    toast.error(`Error al obtener los productos${e}`)
    throw new Error('Error approving order')
  }
}
