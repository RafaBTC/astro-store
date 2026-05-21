import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { addCartItem, isCartOpen } from '../lib/stores/cartStore'
import { getProducts } from '../services/e-commerce'
import type { CartItem } from '../types/Cart'

export default function Products() {
  const [products, setProducts] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  const handleGetProducts = async () => {
    try {
      const data = await getProducts()
      setProducts(data)
    } catch (e) {
      toast.error(`Error al crear orden desde PayPal ${e}`)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = (product: CartItem) => {
    isCartOpen.set(true)
    addCartItem(product)
  }

  useEffect(() => {
    handleGetProducts()
  }, [])

  if (loading)
    return (
      <p className='flex min-h-[50vh] items-center justify-center text-center text-xl font-semibold'>
        Cargando productos...
      </p>
    )

  return (
    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
      {products.map(product => {
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
                  name='add_product'
                  onClick={() => {
                    addToCart(product)
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
      })}
    </div>
  )
}
