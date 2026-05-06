import type { Cart } from './Cart'

export interface PaypalAccessTokenResponse {
  scope: string
  access_token: string
  token_type: string
  app_id: string
  expires_in: number
  nonce: string
}

interface PayPalOrderStatus {
  status:
    | 'CREATED'
    | 'SAVED'
    | 'APPROVED'
    | 'VOIDED'
    | 'COMPLETED'
    | 'PAYER_ACTION_REQUIRED'
    | 'FAILED'
}

interface PaypalCreatedOrderLinks {
  href: string
  rel: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'CONNECT' | 'OPTIONS' | 'PATCH'
}

export interface PaypalCreateOrderResponse {
  id: string
  status: PayPalOrderStatus
  links: PaypalCreatedOrderLinks[]
}

export interface PaypalCaptureOrderResponse {
  id: string
  status: PayPalOrderStatus
}

export interface CreateOrderPayload {
  cart: Cart
  currency?: string
}
