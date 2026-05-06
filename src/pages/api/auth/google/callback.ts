import { ArcticFetchError, decodeIdToken, OAuth2RequestError } from 'arctic'
import type { APIRoute } from 'astro'

import { google } from '../../../../lib/oauth'
import type { AuthResponse, OAuthSession } from '../../../../types/Auth'

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const savedState = cookies.get('google_state')?.value
  const codeVerifier = cookies.get('google_verifier')?.value

  //validar seguridad
  if (!code || !state || !savedState || !codeVerifier) {
    return new Response('OAuth inválido', { status: 400 })
  }

  //intercambiar tokens de google
  try {
    const tokens = await google.validateAuthorizationCode(code, codeVerifier)
    const googleToken = tokens.idToken()
    const claims = decodeIdToken(googleToken) as OAuthSession
    console.log(claims)
    const { name, email, picture } = claims
    console.log(picture)
    const data: AuthResponse = {
      token: 'token fake',
      user: {
        email: email,
        name: name,
        id: '1',
        role: 'admin',
        avatar: picture
      }
    }

    cookies.set('auth-token', data.token, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 7 })
    cookies.set('auth-user', JSON.stringify(data.user), { path: '/', maxAge: 60 * 60 * 24 * 7 })

    return redirect('/dashboard')
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      // Invalid authorization code, credentials, or redirect URI
      //const code = e.code
    }

    if (e instanceof ArcticFetchError) {
      // Failed to call `fetch()`
      //const cause = e.cause
    }

    return new Response('Error de OAuth', { status: 500 })
  }

  //punto de conexión con backend
  /*
    const res = await fetch('https://tu-backend.com/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_token: googleToken }),
    })

    if (!res.ok) return redirect('/login?error=oauth')

    const { token, user } = await res.json()

    // Guarda el JWT de tu backend (igual que el login normal) hacemos login normal
    
    */
}
