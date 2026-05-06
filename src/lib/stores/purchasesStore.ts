import { persistentAtom } from '@nanostores/persistent'

import type { Cart } from '../../types/Cart'
import type { Purchases } from '../../types/Purchases'

export const purchasesStore = persistentAtom<Purchases>(
  'purchases',
  { purchases: [] },
  { encode: JSON.stringify, decode: JSON.parse }
)

export function addPurchaseFromPaypal(purchase: Cart) {
  const { purchases } = purchasesStore.get()
  const newPurchases = [...purchases, purchase]

  purchasesStore.set({ purchases: newPurchases })
}

export function clearPurchases() {
  purchasesStore.set({ purchases: [] })
}
