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

//aquí deberían de ir los tipos de cada una de los oauth al momento de obtener la info del token
export interface OAuthSession {
  iss: string
  azp: string
  aud: string
  sub: string
  email: string
  email_verified: boolean
  at_hash: string
  name: string
  picture: string
  given_name: string
  family_name: string
  iat: number
  exp: number
}

export interface OAuthMicrosoftPayload {
  aud: string
  iss: string
  iat: number
  nbf: number
  exp: number
  email: string
  name: string
  oid: string
  preferred_username: string
  rh: string
  sid: string
  sub: string
  tid: string
  uti: string
  ver: string
}
