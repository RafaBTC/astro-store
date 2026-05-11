export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  avatar: string
}

export interface AuthSession {
  user: User
  token: string
  expiresAt: number
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: User
}

//junté las props del payload de oauth, puse como opcional los que no coinciden entre todos xd
export interface OAuthSessionPayload {
  iss: string
  azp?: string
  aud: string
  sub: string
  email: string
  email_verified?: boolean
  at_hash?: string
  name: string
  picture?: string
  given_name?: string
  family_name?: string
  iat: number
  exp: number
  nbf?: number
  oid?: string
  preferred_username?: string
  rh?: string
  sid?: string
  tid?: string
  uti?: string
  auth_time?: number
}

export interface OAuthDiscordUserPayload {
  id: string
  username: string
  avatar: string | null
  banner: string | null
  discriminator: string | null
  global_name: string
  banner_color: string
  email: string
  verified: boolean
}
