export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  avatar?: string
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
