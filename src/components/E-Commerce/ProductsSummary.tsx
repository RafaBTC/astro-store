import { useStore } from '@nanostores/react'

import { cartStore } from '../../lib/stores/cartStore'

import ProductInfo from './ProductInfo'

interface ProductsSummaryProps {
  readOnly?: boolean
  className?: string
}

export default function ProductsSummary({ readOnly = false, className }: ProductsSummaryProps) {
  const $cart = useStore(cartStore)
  return $cart.items.length > 0 ? (
    <div className='w-full space-y-5'>
      {$cart.items.map(product => (
        <ProductInfo key={product.id} product={product} readOnly={readOnly} className={className} />
      ))}
    </div>
  ) : (
    <div className='flex min-h-[60vh] w-full flex-col items-center justify-center gap-6'>
      <p className='text-center text-2xl font-medium'>¡No hay productos en su carrito!</p>

      <a
        href='/#productos'
        className='w-full rounded-lg border-2 border-violet-600 px-4 py-2 text-center text-lg transition hover:bg-violet-600 md:w-[50%]'
      >
        Continuar comprando
      </a>
    </div>
  )
}
