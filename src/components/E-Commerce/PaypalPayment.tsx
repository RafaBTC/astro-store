import {
  PayPalGuestPaymentButton,
  PayPalOneTimePaymentButton,
  VenmoOneTimePaymentButton,
  type OnApproveDataOneTimePayments,
  type OnErrorData
} from '@paypal/react-paypal-js/sdk-v6'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import PaypalLayout from '../../layouts/PaypalLayout'
import { cartStore, clearCart } from '../../lib/stores/cartStore'
import { addPurchaseFromPaypal } from '../../lib/stores/purchasesStore'
import { throwConfetti } from '../../lib/throwConfetti'
import { approvePaypalOrder, createPaypalOrder } from '../../services/payment'

import NoItemsCTA from './NoItemsCTA'

interface Props {
  currency?: string
  onSuccess?: (orderId: string) => void
}

export default function PaypalPayment({ currency = 'MXN', onSuccess }: Props) {
  const $cartStore = cartStore.get()

  const handleCreateOrder = async () => {
    try {
      toast.success('CREANDO ORDEN...')
      const res = await createPaypalOrder({ cart: $cartStore, currency })
      console.log(res)
      return res
    } catch {
      toast.error('Error al crear la orden de paypal')
      throw new Error('Error creating order')
    }
  }

  const handleApprove = async ({ orderId }: OnApproveDataOneTimePayments) => {
    try {
      const data = await approvePaypalOrder({ orderId })

      if (data.status === 'COMPLETED') {
        toast.success('Pago completado exitosamente')
        onSuccess?.(orderId)
        //CELEBRAR, MOSTRAR MODAL DE PRODUCTOS ADQUIRIDOS, VACIAR CARRITO Y NAVEGAR AL DASHBOARD PARA QUE EN EL FUTURO SE MUESTREN LAS COMPRAS REALIZADAS
        //TO-DO LANZAR CONFETTI Y MODAL DE VENTA
        throwConfetti()
        addPurchaseFromPaypal($cartStore)
        clearCart()
        window.location.href = '/dashboard'
      }
    } catch {
      toast.error('El pago no pudo completarse, hubo un problema')
    }
  }

  const handleError = (data: OnErrorData) => {
    console.error('PAYPAL ERROR:', data)
    toast.error('Ocurrió un error con paypal')
  }

  return (
    <div className='h-fit w-full rounded-3xl bg-slate-700 p-8'>
      {$cartStore.items.length > 0 ? (
        <>
          <h5 className='text-xl font-bold'>Método de pago</h5>
          <p>Seleccione su método de pago preferido a continuación:</p>

          <div className='mt-8 flex flex-col items-center justify-center gap-4'>
            <PaypalLayout>
              <PayPalOneTimePaymentButton
                presentationMode='auto'
                createOrder={handleCreateOrder}
                onApprove={handleApprove}
                onCancel={() => toast.warning('Pago cancelado')}
                onError={handleError}
              />

              <VenmoOneTimePaymentButton
                presentationMode='auto'
                createOrder={handleCreateOrder}
                onApprove={handleApprove}
                onCancel={() => toast.warning('Pago cancelado')}
                onError={handleError}
              />

              <PayPalGuestPaymentButton
                createOrder={handleCreateOrder}
                onApprove={handleApprove}
                onCancel={() => toast.warning('Pago cancelado')}
                onError={handleError}
              />
            </PaypalLayout>
          </div>

          <a
            href='/cart'
            className='my-4 block w-full rounded-lg bg-violet-600 px-4 py-2 text-center text-lg font-bold transition hover:bg-violet-700'
          >
            Volver al carrito
          </a>
        </>
      ) : (
        <NoItemsCTA
          message='¡No hay productos para realizar una compra!'
          cta='Explorar productos'
        />
      )}
    </div>
  )
}
