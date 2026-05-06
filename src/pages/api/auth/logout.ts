import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete('auth-token', { path: '/' })
  cookies.delete('auth-user', { path: '/' })

  cookies.delete('google_state', { path: '/' })
  cookies.delete('google_verifier', { path: '/' })

  cookies.delete('linkedin_state', { path: '/' })
  cookies.delete('linkedin_verifier', { path: '/' })

  cookies.delete('microsoft_state', { path: '/' })
  cookies.delete('microsoft_verifier', { path: '/' })

  redirect('/login')
  return new Response(JSON.stringify({ ok: true }), { status: 200 })
}
