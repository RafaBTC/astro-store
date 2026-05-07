import { Google, LinkedIn, MicrosoftEntraId } from 'arctic'

const URL_DOMAIN = import.meta.env.PUBLIC_URL_DOMAIN

export const google = new Google(
  import.meta.env.GOOGLE_CLIENT_ID,
  import.meta.env.GOOGLE_CLIENT_SECRET,
  `${URL_DOMAIN}/api/auth/google/callback`
)

export const linkedin = new LinkedIn(
  import.meta.env.LINKEDIN_CLIENT_ID,
  import.meta.env.LINKEDIN_CLIENT_SECRET,
  `${URL_DOMAIN}/api/auth/linkedin/callback`
)

export const microsoft = new MicrosoftEntraId(
  import.meta.env.MICROSOFT_TENANT_ID,
  import.meta.env.MICROSOFT_CLIENT_ID,
  import.meta.env.MICROSOFT_CLIENT_SECRET,
  `${URL_DOMAIN}/api/auth/microsoft/callback`
)
