import { useStore } from '@nanostores/react'

import { cartStore } from '../../lib/stores/cartStore'

import NoItemsCTA from './NoItemsCTA'
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
    <NoItemsCTA />
  )
}
