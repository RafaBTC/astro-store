import { useStore } from '@nanostores/react'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { CartItem } from '../types/Cart'

import Purchases from './Purchases'

vi.mock('@nanostores/react', () => ({ useStore: vi.fn() }))

describe('Purchases', () => {
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

  it('muestra mensaje y botón si no hay compras realizadas', async () => {
    vi.mocked(useStore).mockReturnValueOnce({ purchases: [] })

    render(<Purchases />)

    expect(await screen.findByText(/¡No has realizado ninguna compra!/i)).toBeInTheDocument()
    expect(await screen.findByRole('link', { name: /Explorar productos/i })).toBeInTheDocument()
  })

  it('muestra compras realizadas', async () => {
    vi.mocked(useStore).mockReturnValueOnce({
      purchases: [{ items: [product], total: product.price * product.quantity }]
    })

    render(<Purchases />)
    expect(await screen.findByText(/Pedido 1/i)).toBeInTheDocument()
    expect(await screen.findByText(`${product.name}`)).toBeInTheDocument()
    expect(await screen.findByText(`$${product.price} ${product.currency} c/u`)).toBeInTheDocument()
    expect(await screen.findByText(`Cantidad: ${product.quantity}`)).toBeInTheDocument()
    expect(
      await screen.findByText(`Subtotal: $${product.price * product.quantity} ${product.currency}`)
    ).toBeInTheDocument()
    expect(
      await screen.findByText(
        (_, elemenent) =>
          elemenent?.textContent ===
          `Total del pedido: $${product.price * product.quantity} ${product.currency}`
      )
    ).toBeInTheDocument()
  })
})
