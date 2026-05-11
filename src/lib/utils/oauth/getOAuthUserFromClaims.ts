import type { AuthResponse, OAuthSessionPayload } from '../../../types/Auth'

export function getOAuthUserFromClaims(claims: OAuthSessionPayload): AuthResponse['user'] {
  const { email, name, picture } = claims
  return {
    email,
    name: name,
    id: '1',
    role: 'admin',
    avatar: picture ?? 'https://i.pinimg.com/736x/7e/54/70/7e54709b93abd9cdde22ae125b313ea8.jpg'
  }
}
