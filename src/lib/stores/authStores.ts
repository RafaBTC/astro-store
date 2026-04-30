import { atom, computed } from 'nanostores'

import type { User } from '../../types/Auth'

function getUserFromCookie(): User | null {
  if (typeof document === 'undefined') return null

  const match = document.cookie.match(/auth-user=([^;]+)/)

  if (!match) return null

  try {
    return JSON.parse(decodeURIComponent(match[1]))
  } catch {
    return null
  }
}

export const userStore = atom<User | null>(getUserFromCookie())

export const isAuthStore = computed(userStore, user => user !== null)
export const isAdminStore = computed(userStore, user => user?.role === 'admin')

export async function login(email: string, password: string) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })

  if (!res.ok) throw new Error('Credenciales Inválidas')

  //recarga el user desde la cookie recien seteada al igual que lo setea en los locals para Astro XD entonces ya no ocupa aquí el atom
  userStore.set(getUserFromCookie())
}

export async function logout() {
  await fetch('/api/auth/logout', { method: 'POST' })
  userStore.set(null)
  window.location.href = '/'
}
