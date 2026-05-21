import { useStore } from '@nanostores/react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { isCartOpen } from '../lib/stores/cartStore'
import type { CartItem } from '../types/Cart'

import CartButton from './CartButton'

vi.mock('@nanostores/react', () => ({ useStore: vi.fn() }))
vi.mock('../lib/stores/cartStore', () => ({
  isCartOpen: { set: vi.fn() },
  cartStore: {}
}))

describe('Cart Button', () => {
  const product = {
    id: '1',
    name: 'Ratchet & Clank: Rift Apart - PlayStation 5',
    price: 750,
    currency: 'MXN',
    image: 'images/Ratchet.webp',
    description: 'Únete al equipo doble ...',
    quantity: 1,
    loading: 'eager'
  } as CartItem

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('muestra el número de items', () => {
    vi.mocked(useStore)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce({ items: [product] })

    render(<CartButton />)

    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('abre el carrito al hacer clic', async () => {
    vi.mocked(useStore).mockReturnValueOnce(false).mockReturnValueOnce({ items: [] })

    render(<CartButton />)

    const functionMockedSetCartOpen = vi.mocked(isCartOpen).set
    await userEvent.click(screen.getByRole('button'))

    expect(functionMockedSetCartOpen).toHaveBeenCalledWith(true)
  })
})
