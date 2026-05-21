import { useStore } from '@nanostores/react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { removeCartItem } from '../lib/stores/cartStore'
import type { CartItem } from '../types/Cart'

import Cart from './Cart'

vi.mock('@nanostores/react', () => ({ useStore: vi.fn() }))
vi.mock('../lib/stores/cartStore', () => ({
  isCartOpen: { set: vi.fn() },
  cartStore: {},
  removeCartItem: vi.fn()
}))

describe('Cart component', () => {
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

  it('muestra el carrito vacío', () => {
    //SETEAS VALORES DEL USESTORE EN EL ORDEN EN EL QUE SE LLAMAN EN EL COMPONENTE XD
    vi.mocked(useStore).mockReturnValueOnce(true).mockReturnValueOnce({ items: [] })
    render(<Cart />)
    expect(screen.getByText('¡No hay productos en su carrito!')).toBeInTheDocument()
  })

  it('se muestra el producto en el carrito', () => {
    vi.mocked(useStore)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce({ items: [product] })
    render(<Cart />)

    expect(screen.getByText(product.name)).toBeInTheDocument()
    expect(screen.getByText(`$${product.price} ${product.currency}`)).toBeInTheDocument()
    expect(screen.getByText(`Quantity: ${product.quantity}`)).toBeInTheDocument()
  })

  it('se puede eliminar un producto por id', async () => {
    //hacemos o "seteamos" data en mocked
    vi.mocked(useStore)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce({ items: [product] })

    const removeCartItemFunctionMock = vi.mocked(removeCartItem)
    render(<Cart />)

    const deleteButton = await screen.findByRole('button', { name: /x/i })
    await userEvent.click(deleteButton)

    expect(removeCartItemFunctionMock).toHaveBeenCalledWith(product.id)
  })
})
