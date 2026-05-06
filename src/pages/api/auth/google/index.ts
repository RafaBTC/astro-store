import { generateCodeVerifier, generateState } from 'arctic'
import type { APIRoute } from 'astro'

import { google } from '../../../../lib/oauth'

export const GET: APIRoute = async ({ cookies, redirect }) => {
  const state = generateState()
  const codeVerifier = generateCodeVerifier()
  const url = google.createAuthorizationURL(state, codeVerifier, ['openid', 'profile', 'email'])

  //guardar state y verifier para validarlos en el callback
  cookies.set('google_state', state, { httpOnly: true, maxAge: 600, path: '/' })
  cookies.set('google_verifier', codeVerifier, { httpOnly: true, maxAge: 600, path: '/' })

  return redirect(url.toString())
}
