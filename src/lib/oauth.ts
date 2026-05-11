import { Discord, Google, LinkedIn, MicrosoftEntraId } from 'arctic'

const URL_DOMAIN = import.meta.env.PUBLIC_URL_DOMAIN

const google = new Google(
  import.meta.env.GOOGLE_CLIENT_ID,
  import.meta.env.GOOGLE_CLIENT_SECRET,
  `${URL_DOMAIN}/api/auth/google/callback`
)

const linkedin = new LinkedIn(
  import.meta.env.LINKEDIN_CLIENT_ID,
  import.meta.env.LINKEDIN_CLIENT_SECRET,
  `${URL_DOMAIN}/api/auth/linkedin/callback`
)

const microsoft = new MicrosoftEntraId(
  import.meta.env.MICROSOFT_TENANT_ID,
  import.meta.env.MICROSOFT_CLIENT_ID,
  import.meta.env.MICROSOFT_CLIENT_SECRET,
  `${URL_DOMAIN}/api/auth/microsoft/callback`
)

const discord = new Discord(
  import.meta.env.DISCORD_CLIENT_ID,
  import.meta.env.DISCORD_CLIENT_SECRET,
  `${URL_DOMAIN}/api/auth/discord/callback`
)

export const oauthProviders = {
  google,
  linkedin,
  microsoft,
  discord
}

export const oauthProvidersScopes = {
  google: ['openid', 'profile', 'email'],
  linkedin: ['openid', 'profile', 'email'],
  microsoft: ['openid', 'profile', 'email'],
  discord: ['identify', 'email']
}
export type ProvidersName = 'google' | 'linkedin' | 'microsoft' | 'discord'
