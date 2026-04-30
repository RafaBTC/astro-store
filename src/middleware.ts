import { defineMiddleware } from 'astro:middleware'

import type { User } from './types/Auth'

const PROTECTED_ROUTES = ['/dashboard', '/profile']

export const onRequest = defineMiddleware(async (context, next) => {
  const token = context.cookies.get('auth-token')?.value
  const userCookie = context.cookies.get('auth-user')?.value

  const isProtected = PROTECTED_ROUTES.some(route => context.url.pathname.startsWith(route))

  if (isProtected && !token) {
    return context.redirect('/')
  }

  if (userCookie) {
    try {
      context.locals.user = JSON.parse(userCookie) as User
    } catch {
      context.locals.user = null
    }
  }

  return next()
})
