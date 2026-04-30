import { addCartItem, isCartOpen } from '../lib/stores/cartStore'
import { products } from '../mocks/products.json'
import type { CartItem } from '../types/Cart'

export default function Products() {
  const addToCart = (product: CartItem) => {
    isCartOpen.set(true)
    addCartItem(product)
  }

  return products.map(product => {
    const { id, image, name, price, currency, description } = product
    return (
      <article key={id} className='rounded-2xl bg-slate-700 p-4'>
        <img
          src={image}
          alt={`Cover del juego ${name}`}
          className='h-100 mx-auto w-full object-contain'
        />
        <div className='mt-4 flex flex-col'>
          <div className='min-h-96'>
            <h4 className='text-2xl font-bold'>{name}</h4>
            <span className='text-xl font-medium text-indigo-300'>
              ${price} {currency}
            </span>
            <p className='my-4 text-sm'>{description}</p>
          </div>

          <div className='flex justify-center'>
            <button
              onClick={() => addToCart({ ...product, quantity: 1 })}
              className='w-fit rounded-lg bg-violet-600 px-4 py-2 transition hover:bg-violet-800'
            >
              ¡Añadir al carrito!
            </button>
          </div>
        </div>
      </article>
    )
  })
}
