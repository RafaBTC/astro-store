import { generateCodeVerifier, generateState } from 'arctic'
import type { APIRoute } from 'astro'

import { oauthProviders, oauthProvidersScopes } from '../../../../lib/oauth'
import { validateProvider } from '../../../../lib/utils/oauth/validateProvider'

export const GET: APIRoute = async ({ cookies, redirect, params }) => {
  const providerName = validateProvider(params.oauthprovider)
  if (!providerName) return new Response('Provider inválido', { status: 400 })
  const state = generateState()
  const codeVerifier = generateCodeVerifier()
  const providerScopes = oauthProvidersScopes[providerName]
  let url: URL

  if (providerName === 'linkedin') {
    url = oauthProviders[providerName].createAuthorizationURL(state, providerScopes)
  } else {
    url = oauthProviders[providerName].createAuthorizationURL(state, codeVerifier, providerScopes)
  }

  cookies.set(`${providerName}_state`, state, { httpOnly: true, maxAge: 600, path: '/' })
  cookies.set(`${providerName}_verifier`, codeVerifier, { httpOnly: true, maxAge: 600, path: '/' })

  return redirect(url.toString())
}
