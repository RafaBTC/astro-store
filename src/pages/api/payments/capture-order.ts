import type { APIRoute } from 'astro'

import type { PaypalCaptureOrderResponse } from '../../../types/Paypal'

import { getPaypalAccessToken } from './create-order'

const PAYPAL_BASE_URL = import.meta.env.PAYPAL_BASE_URL

export const POST: APIRoute = async ({ request }) => {
  const { orderId } = await request.json()

  const accessToken = await getPaypalAccessToken()
  const res = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`Paypal capture order error: ${error}`)
  }

  const capture = (await res.json()) as PaypalCaptureOrderResponse
  console.log(capture)

  return new Response(
    JSON.stringify({
      status: capture.status,
      orderId: capture.id
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  )
}
