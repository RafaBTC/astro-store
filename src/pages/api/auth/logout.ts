export const prerender = false
import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete('auth-token', { path: '/' })
  cookies.delete('auth-user', { path: '/' })
  redirect('/login')
  return new Response(JSON.stringify({ ok: true }), { status: 200 })
}
