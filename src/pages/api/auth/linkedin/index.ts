import { generateCodeVerifier, generateState } from 'arctic'
import type { APIRoute } from 'astro'

import { linkedin } from '../../../../lib/oauth'

export const GET: APIRoute = async ({ cookies, redirect }) => {
  const state = generateState()
  const codeVerifier = generateCodeVerifier()
  const url = linkedin.createAuthorizationURL(state, ['openid', 'profile', 'email'])
  console.log(url)
  //guardar state y verifier para validarlos en el callback
  cookies.set('linkedin_state', state, { httpOnly: true, maxAge: 600, path: '/' })
  cookies.set('linkedin_verifier', codeVerifier, { httpOnly: true, maxAge: 600, path: '/' })

  return redirect(url.toString())
}
