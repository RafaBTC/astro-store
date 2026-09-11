import { useStore } from '@nanostores/react'
import { useEffect } from 'react'

import { cartStore, isCartOpen, removeCartItem } from '../lib/stores/cartStore'

export default function Cart() {
  const $isCartOpen = useStore(isCartOpen)
  const $cartStore = useStore(cartStore)

  useEffect(() => {
    if ($cartStore.items.length === 0 && window.location.pathname !== '/') {
      isCartOpen.set(false)
    }
  }, [$cartStore.items.length])

  return (
    <div
      className={`fixed rounded-2xl bg-slate-600 ${$isCartOpen ? 'block' : 'hidden'} top-20 right-8 z-999 flex h-80 max-h-80 w-72 scrollbar-thumb-neutral-400 scrollbar-track-slate-600 flex-col justify-between overflow-y-auto p-4 transition-all duration-300 lg:w-100`}
    >
      {$cartStore.items.length ? (
        <ul className='space-y-4'>
          {$cartStore.items.map(({ id, image, name, price, currency, quantity }) => (
            <li key={id} className='flex justify-between gap-4'>
              <div className='flex w-full gap-4'>
                <img
                  src={image}
                  alt={`Cover del juego ${name}`}
                  className='mx-auto h-auto w-16 object-contain'
                />

                <div className='flex w-full flex-col'>
                  <p className='text-sm leading-snug font-bold lg:text-lg'>{name}</p>
                  <div className='flex flex-col justify-center text-xs lg:flex-row lg:items-center lg:justify-between lg:text-base'>
                    <p>Quantity: {quantity}</p>
                    <span className='text-xs font-medium lg:text-sm'>
                      ${price} {currency}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <button
                  onClick={() => removeCartItem(id)}
                  className='h-8 w-8 rounded-full pb-1 text-center transition hover:bg-indigo-900'
                >
                  x
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <span className='flex h-full items-center justify-center text-center'>
          ¡No hay productos en su carrito!
        </span>
      )}

      <div className='mt-4 flex justify-center'>
        <a
          href='/cart'
          className='rounded-lg bg-violet-600 px-4 py-2 transition hover:bg-violet-800'
        >
          Finalizar compra
        </a>
      </div>
    </div>
  )
}
