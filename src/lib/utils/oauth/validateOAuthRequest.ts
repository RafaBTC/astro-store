import type { AstroCookies } from 'astro'

import type { ProvidersName } from '../../oauth'

export function validateOAuthRequest(
  url: URL,
  cookies: AstroCookies,
  oauthProvider: ProvidersName
): { code: string; codeVerifier: string } | null {
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const savedState = cookies.get(`${oauthProvider}_state`)?.value
  const codeVerifier = cookies.get(`${oauthProvider}_verifier`)?.value

  if (!code || !state || !savedState || !codeVerifier || state !== savedState) return null

  return { code, codeVerifier }
}
