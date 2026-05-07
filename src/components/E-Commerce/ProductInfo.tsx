import { cn } from '../../lib/cn'
import { removeCartItem, removeOneItem, addCartItem } from '../../lib/stores/cartStore'
import type { CartItem } from '../../types/Cart'
interface ProductInfoProps {
  product: CartItem
  readOnly?: boolean
  className?: string
}

export default function ProductInfo({ product, readOnly = false, className }: ProductInfoProps) {
  const { image, name, price, currency, quantity, id } = product
  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center gap-8 rounded-3xl bg-slate-700 p-4 lg:flex-row lg:items-start lg:justify-start',
        readOnly ? 'mt-4' : '',
        className
      )}
    >
      <img
        src={image}
        alt={`Portada del juego ${name}`}
        className='mx-auto h-auto w-24 object-contain lg:mx-0'
      />

      <div className='space-y-2 text-center lg:text-left'>
        <h5 className={`max-w-lg text-lg font-semibold ${readOnly ? 'sm:text-xl' : 'sm:text-2xl'}`}>
          {name}
        </h5>
        <span className='text-sm font-medium text-violet-400 sm:text-base'>
          ${price} {currency} c/u
        </span>

        {!readOnly ? (
          <div className='mt-4 flex items-center justify-center gap-2 lg:justify-start'>
            <button
              disabled={quantity < 2}
              onClick={() => removeOneItem(id)}
              className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-violet-500 pb-1 text-center transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:border-violet-500/40 disabled:bg-transparent disabled:text-white/40'
            >
              -
            </button>
            <p className='w-8 text-center'>{quantity}</p>
            <button
              onClick={() => addCartItem(product)}
              className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-violet-500 pb-1 text-center transition hover:bg-violet-500'
            >
              +
            </button>
          </div>
        ) : (
          <p className='font.medium'>Cantidad: {quantity}</p>
        )}
      </div>

      {!readOnly && (
        <div className='absolute right-4 top-4'>
          <button
            onClick={() => removeCartItem(id)}
            className='h-8 w-8 rounded-full pb-1 text-center transition hover:bg-indigo-900'
          >
            x
          </button>
        </div>
      )}

      <div className='bottom-6 right-8 text-end lg:absolute'>
        <span className='text-violet-280 text-lg font-medium text-violet-500'>
          ${price * quantity} {currency}
        </span>
      </div>
    </div>
  )
}
