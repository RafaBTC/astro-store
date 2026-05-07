import { toast } from 'react-toastify'

import { addCartItem, isCartOpen } from '../lib/stores/cartStore'
import { products } from '../mocks/products.json'
import type { CartItem } from '../types/Cart'

const PRODUCTS = products as CartItem[]

export default function Products() {
  const addToCart = (product: CartItem) => {
    isCartOpen.set(true)
    addCartItem(product)
  }

  return PRODUCTS.map(product => {
    const { id, image, name, price, currency, description, loading } = product
    return (
      <article key={id} className='rounded-2xl bg-slate-700 p-4'>
        <img
          loading={loading}
          src={image}
          alt={`Cover del juego ${name}`}
          className='mx-auto h-48 w-full object-contain sm:h-72 md:h-96'
        />
        <div className='mt-4 flex flex-col'>
          <div className='md:min-h-87.5'>
            <p className='text-2xl font-bold'>{name}</p>
            <span className='text-xl font-medium text-indigo-300'>
              ${price} {currency}
            </span>
            <p className='my-4 text-sm'>{description}</p>
          </div>

          <div className='flex justify-center'>
            <button
              onClick={() => {
                addToCart({ ...product, quantity: 1 })
                toast.success('Producto añadido al carrito')
              }}
              className='w-fit rounded-lg bg-violet-600 px-4 py-2 transition hover:bg-violet-700'
            >
              ¡Añadir al carrito!
            </button>
          </div>
        </div>
      </article>
    )
  })
}
