import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { addCartItem, isCartOpen } from '../lib/stores/cartStore'
import { getProducts } from '../services/e-commerce'
import type { CartItem } from '../types/Cart'

import Products from './Products'

vi.mock('../lib/stores/cartStore', () => ({ addCartItem: vi.fn(), isCartOpen: { set: vi.fn() } }))
vi.mock('../services/e-commerce', () => ({ getProducts: vi.fn() }))
vi.mock('react-toastify', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))

/**
 El componente hace:
 1. Mostrar loading
 2. Obtener productos
 3. Renderizar productos
 4. Añadir producto al carrito al hacer click
 */

describe('Products component', () => {
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

  it('Muestra el loading inicialmente', async () => {
    vi.mocked(getProducts).mockReturnValue(new Promise(() => {}))

    render(<Products />)

    expect(screen.getByText('Cargando productos...')).toBeInTheDocument()
  })

  it('Renderiza los productos obtenidos', async () => {
    vi.mocked(getProducts).mockResolvedValue([product])

    render(<Products />)

    expect(await screen.findByText(product.name)).toBeInTheDocument()
    expect(screen.getByText(`$${product.price} ${product.currency}`)).toBeInTheDocument()
  })

  it('añade un producto al carrito al hacer clic', async () => {
    vi.mocked(getProducts).mockResolvedValue([product])
    const addCartItemMock = vi.mocked(addCartItem)
    render(<Products />)

    const button = await screen.findByRole('button', { name: /añadir al carrito/i })

    await userEvent.click(button)
    expect(addCartItemMock).toHaveBeenCalledWith(product)
  })

  it('abre el carrito al añadir un producto', async () => {
    vi.mocked(getProducts).mockResolvedValue([product])

    const functionMockedSetCartOpen = vi.mocked(isCartOpen).set
    render(<Products />)

    const button = await screen.findByRole('button', { name: /añadir al carrito/i })
    await userEvent.click(button)
    expect(functionMockedSetCartOpen).toHaveBeenCalledWith(true)
  })
})
