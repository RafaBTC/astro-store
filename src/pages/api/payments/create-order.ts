import type { APIRoute } from 'astro'

import type {
  CreateOrderPayload,
  PaypalAccessTokenResponse,
  PaypalCreateOrderResponse
} from '../../../types/Paypal'

const PAYPAL_BASE_URL = import.meta.env.PAYPAL_BASE_URL

export async function getPaypalAccessToken(): Promise<string> {
  const credentials = Buffer.from(
    `${import.meta.env.PUBLIC_PAYPAL_PAYMENT_CLIENT_ID}:${import.meta.env.PAYPAL_PAYMENT_SECRET}`
  ).toString('base64')

  const res = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`Paypal auth error: ${error}`)
  }

  const data = (await res.json()) as PaypalAccessTokenResponse

  if (!data.access_token) {
    throw new Error('No access token returned from paypal')
  }

  return data.access_token
}

export const POST: APIRoute = async ({ request }) => {
  const body: CreateOrderPayload = await request.json()
  const accessToken = await getPaypalAccessToken()

  console.log('BODY DE CREATE ORDER', body)
  const { items, total } = body.cart
  const res = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: body.currency ?? 'USD',
            value: total,
            breakdown: {
              item_total: { currency_code: body.currency ?? 'USD', value: total }
            }
          },
          items: items.map(item => ({
            name: item.name,
            quantity: String(item.quantity),
            unit_amount: {
              currency_code: body.currency ?? 'USD',
              value: item.price.toFixed(2)
            }
          }))
        }
      ]
    })
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`Paypal create order error: ${error}`)
  }

  const order = (await res.json()) as PaypalCreateOrderResponse
  console.log(order)
  return new Response(JSON.stringify({ orderId: order.id }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}
