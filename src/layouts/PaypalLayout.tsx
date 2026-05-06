import { PayPalProvider } from '@paypal/react-paypal-js/sdk-v6'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PaypalLayout({ children }: Props) {
  return (
    <PayPalProvider
      clientId={import.meta.env.PUBLIC_PAYPAL_PAYMENT_CLIENT_ID}
      components={['paypal-payments', 'venmo-payments', 'paypal-guest-payments', 'card-fields']}
      pageType='checkout'
    >
      {children}
    </PayPalProvider>
  )
}
