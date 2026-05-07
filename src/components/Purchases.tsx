import { useStore } from '@nanostores/react'

import { purchasesStore } from '../lib/stores/purchasesStore'

import NoItemsCTA from './E-Commerce/NoItemsCTA'

export default function Purchases() {
  const { purchases } = useStore(purchasesStore)

  return (
    <section className='border-t-2 border-violet-600 py-4'>
      <h5 className='text-center text-3xl font-semibold'>Compras realizadas</h5>
      <p className='mt-4 text-center italic'>
        Aquí puedes ver un resumen de las compras realizadas.
      </p>

      <div className='flex flex-col items-center'>
        {purchases.length > 0 ? (
          purchases.map(({ items, total }, index) => (
            <div
              key={index}
              className='mt-4 w-full max-w-2xl divide-y-2 divide-violet-500 rounded-3xl bg-slate-700'
            >
              {/*Iteramos los items de la compra realizada */}
              <div className='p-4'>
                <span className='text-2xl font-medium text-violet-400'>Pedido {index + 1}</span>
              </div>

              <div className='divide-y-2 divide-violet-500 bg-slate-600'>
                {items.map(({ id, image, name, price, currency, quantity }) => (
                  <div key={id} className='flex flex-col gap-6 p-4 sm:flex-row'>
                    <img
                      src={image}
                      alt={`Portada del juego ${name}`}
                      className='mx-auto h-auto w-16 object-contain lg:mx-0'
                    />
                    <div className='w-full'>
                      <p className='text-lg'>{name}</p>
                      <p className='text-sm text-gray-400'>
                        ${price} {currency} c/u
                      </p>
                      <span className='text-sm text-gray-400'>Cantidad: {quantity}</span>
                      <p className='text-end text-lg font-medium text-violet-400'>
                        Subtotal: ${price * quantity} {currency}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <footer className='flex items-center justify-between p-4'>
                <p>Total del pedido: </p>
                <span className='text-lg font-bold text-violet-400 lg:text-2xl '>
                  ${total} {items[0].currency}
                </span>
              </footer>
            </div>
          ))
        ) : (
          <NoItemsCTA
            className='mt-20 min-h-full'
            message='¡No has realizado ninguna compra!'
            cta='Explorar productos'
          />
        )}
      </div>
    </section>
  )
}
