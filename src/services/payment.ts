import type { OnApproveDataOneTimePayments } from '@paypal/react-paypal-js/sdk-v6'
import { toast } from 'react-toastify'

import type { Cart } from '../types/Cart'

interface CreatePaypalOrderProps {
  cart: Cart
  currency?: string
}

export async function createPaypalOrder({
  cart,
  currency
}: CreatePaypalOrderProps): Promise<{ orderId: string }> {
  try {
    const res = await fetch('/api/payments/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart, currency })
    })
    const { orderId } = await res.json()

    return { orderId }
  } catch (e) {
    console.error(e)
    throw new Error('Error creating order')
  }
}

export async function approvePaypalOrder({ orderId }: OnApproveDataOneTimePayments) {
  try {
    const res = await fetch('/api/payments/capture-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId })
    })
    const data = await res.json()

    return data
  } catch (e) {
    console.error(e)
    toast.error(`Error al aprobar la orden desde PayPal ${e}`)
    throw new Error('Error approving order')
  }
}
