import { ArcticFetchError, decodeIdToken, OAuth2RequestError } from 'arctic'
import type { APIRoute } from 'astro'

import { oauthProviders } from '../../../../lib/oauth'
import { getDiscordUser } from '../../../../lib/utils/oauth/getDiscordUser'
import { getOAuthUserFromClaims } from '../../../../lib/utils/oauth/getOAuthUserFromClaims'
import { validateOAuthRequest } from '../../../../lib/utils/oauth/validateOAuthRequest'
import { validateProvider } from '../../../../lib/utils/oauth/validateProvider'
import type { AuthResponse, OAuthSessionPayload } from '../../../../types/Auth'

export const GET: APIRoute = async ({ url, cookies, redirect, params }) => {
  const providerName = validateProvider(params.oauthprovider)
  if (!providerName) return new Response('Provider inválido', { status: 400 })

  const oauthData = validateOAuthRequest(url, cookies, providerName)
  if (!oauthData) return new Response('OAuth inválido', { status: 400 })

  try {
    const { code, codeVerifier } = oauthData
    const provider = oauthProviders[providerName]
    const tokens = await provider.validateAuthorizationCode(code, codeVerifier)

    const user =
      providerName === 'discord'
        ? await getDiscordUser(tokens.accessToken())
        : getOAuthUserFromClaims(decodeIdToken(tokens.idToken()) as OAuthSessionPayload)

    const data: AuthResponse = {
      token: 'token_fake',
      user
    }

    //TODO EL MANEJO DE COOKIES, AL MENOS LA CONFIG DEBERÍA DE ESTAR EN UTILS
    cookies.set('auth-token', data.token, {
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })
    //peligroso xd
    cookies.set('auth-user', JSON.stringify(data.user), {
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })
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
    console.error(e)
    return new Response('Error de OAuth', { status: 500 })
  }
}
