import { useStore } from '@nanostores/react'

import { cartStore } from '../../lib/stores/cartStore'
import type { User } from '../../types/Auth'

import ProductsSummary from './ProductsSummary'

interface OrderSummaryProps {
  user: User | null
  location?: string
  readOnly?: boolean
}

export default function OrderSummary({ user, location, readOnly = false }: OrderSummaryProps) {
  const $cart = useStore(cartStore)
  const totalProducts = $cart.items.reduce((acc, curr) => acc + curr.quantity, 0)
  const currency = $cart?.items[0]?.currency

  return $cart.items.length > 0 ? (
    <div className='lg:min-w-100 h-fit rounded-3xl bg-violet-900 p-8'>
      <h5 className='mb-4 text-xl font-bold'>Resumen de la orden</h5>
      <div className='border-t-2 border-violet-500'>
        {location === '/checkout' && <ProductsSummary readOnly={readOnly} />}

        <ul
          className={`space-y-2 border-violet-500 py-4 ${readOnly ? 'border-b-0' : 'border-b-2'}`}
        >
          <li className='flex justify-between text-2xl font-bold'>
            <p>Subtotal:</p>
            <span>
              ${$cart.total} {currency && currency}
            </span>
          </li>

          <li className='flex justify-between font-medium'>
            <p>Productos:</p>
            <span>{totalProducts}</span>
          </li>

          <li className='text-xs italic'>
            <p>Impuestos calculados al momento de pagar</p>
          </li>
        </ul>

        {location !== '/checkout' ? (
          user ? (
            <>
              <a
                href='/checkout'
                className='my-4 block rounded-lg bg-violet-600 px-4 py-2 text-center text-lg font-bold transition hover:bg-violet-700'
              >
                Finalizar compra
              </a>
              <a
                href='/#productos'
                className='block rounded-lg border-2 border-violet-600 px-4 py-2 text-center text-lg transition hover:bg-violet-600'
              >
                Seguir comprando
              </a>
            </>
          ) : (
            <a
              href='/login?redirect=/cart'
              className='my-4 block rounded-lg bg-violet-600 px-4 py-2 text-center text-lg font-bold transition hover:bg-violet-700'
            >
              Iniciar sesión para finalizar compra
            </a>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  ) : (
    <></>
  )
}
