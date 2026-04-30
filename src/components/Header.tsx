import { useStore } from '@nanostores/react'
import type { ReactNode } from 'react'

import { isAuthStore, userStore } from '../lib/stores/authStores'
import { isCartOpen } from '../lib/stores/cartStore'

interface Props {
  children: ReactNode
}

export default function Header({ children }: Props) {
  const $isCartOpen = useStore(isCartOpen)
  const $isAuthStore = useStore(isAuthStore)
  const $userStore = useStore(userStore)
  console.log($isAuthStore)
  console.log($userStore?.name.charAt(0))
  return (
    <header className='fixed top-0 flex h-16 w-full items-center justify-between bg-indigo-900 px-4'>
      <a href='/' className='text-center text-4xl font-bold'>
        Retro Store
      </a>
      <div className='flex items-center gap-4'>
        {$isAuthStore ? (
          <a
            href='/dashboard'
            className='flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 pb-1 text-center text-xl transition hover:bg-violet-800'
          >
            {$userStore?.name.charAt(0).toUpperCase()}
          </a>
        ) : (
          <a
            href='/login'
            className='rounded-full bg-violet-600 px-4 py-2 transition hover:bg-violet-800'
          >
            Iniciar sesión
          </a>
        )}
        <button
          onClick={() => isCartOpen.set(!$isCartOpen)}
          className='rounded-full bg-violet-600 p-3 text-xl transition hover:bg-violet-800'
        >
          {children}
        </button>
      </div>
    </header>
  )
}
