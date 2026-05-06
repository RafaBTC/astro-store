import { useStore } from '@nanostores/react'
import type { ReactNode } from 'react'

import { cartStore, isCartOpen } from '../lib/stores/cartStore'

interface Props {
  children: ReactNode
}

export default function CartButton({ children }: Props) {
  const $isCartOpen = useStore(isCartOpen)
  const $cart = useStore(cartStore)
  return (
    <div className='relative'>
      <button
        onClick={() => isCartOpen.set(!$isCartOpen)}
        aria-label='cart'
        name='cart'
        className='rounded-full bg-violet-600 p-3 text-xl transition hover:bg-violet-800'
      >
        {children}
      </button>
      {$cart.items.length > 0 && (
        <div className='absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 pb-px text-center text-xs'>
          {$cart.items.length}
        </div>
      )}
    </div>
  )
}
