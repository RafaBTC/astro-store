import type { APIRoute } from 'astro'

import { PRODUCTS } from '../../../data/products'

export const prerender = true
export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(PRODUCTS), { status: 200 })
}
