export const prerender = false
import type { APIRoute } from 'astro'

import type { AuthResponse, LoginCredentials } from '../../../types/Auth'

export const POST: APIRoute = async ({ request, cookies }) => {
  const body: LoginCredentials = await request.json()
  console.log('LLAMADA EN API POST DE /API/AUTH/LOGIN, EL BODY ES:', body)
  //aquí se llama al backend externo
  /*const res = await fetch('https://url-del-backend.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    return new Response(JSON.stringify({ error: 'Credenciales inválidas' }), { status: 401 })
  }

  const data: AuthResponse = await res.json()
  */
  const data: AuthResponse = {
    token: 'token fake',
    user: {
      email: '123@gmail.com',
      name: 'rafa',
      id: '1',
      role: 'admin',
      avatar: 'https://i.pinimg.com/736x/7e/54/70/7e54709b93abd9cdde22ae125b313ea8.jpg'
    }
  }
  //aquí se guuarda el token en cookie httpOnly
  cookies.set('auth-token', data.token, {
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 7 días
  })

  cookies.set('auth-user', JSON.stringify(data.user), {
    httpOnly: false,
    secure: import.meta.env.PROD,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 7 días
  })

  return new Response(JSON.stringify({ ok: true }), { status: 200 })
}
