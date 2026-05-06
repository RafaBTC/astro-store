import { useStore } from '@nanostores/react'

import { purchasesStore } from '../lib/stores/purchasesStore'

export default function Purchases() {
  const $purchases = useStore(purchasesStore)
  console.log($purchases.purchases)
  return <div>PURCHASES MADE UWU</div>
}
