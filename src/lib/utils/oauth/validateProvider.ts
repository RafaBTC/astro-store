import { oauthProviders, type ProvidersName } from '../../oauth'

export function validateProvider(provider: string | undefined): ProvidersName | null {
  if (!provider) return null

  return provider in oauthProviders ? (provider as ProvidersName) : null
}
