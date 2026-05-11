import { describe, it, expect, beforeEach, vi } from 'vitest'

import { addCartItem, cartStore, clearCart, removeCartItem, removeOneItem } from './cartStore'

//para todo lo relacionado con el cartStore
describe('cartStore', () => {
  //antes de cada test...
  beforeEach(() => {
    clearCart() //limpia el carrito
  })

  //"sé" inicia vacío
  it('initiates empty', () => {
    expect(cartStore.get().items).toHaveLength(0)
    expect(cartStore.get().total).toBe(0)
  })

  //"sé" agrega un item de manera correcta
  it('adds an item properly', () => {
    addCartItem({
      id: '1',
      name: 'Ratchet & Clank: Rift Apart - PlayStation 5',
      price: 750,
      currency: 'MXN',
      image: 'images/Ratchet.jpg',
      description: 'Únete al equipo doble ...',
      loading: 'eager'
    })

    expect(cartStore.get().items).toHaveLength(1)
    expect(cartStore.get().total).toBe(750)
  })

  //"sé" elimina un item completo
  it('deletes and item properly', () => {
    addCartItem({
      id: '1',
      name: 'Ratchet & Clank: Rift Apart - PlayStation 5',
      price: 750,
      currency: 'MXN',
      image: 'images/Ratchet.jpg',
      description: 'Únete al equipo doble ...',
      loading: 'eager'
    })

    removeCartItem('1')

    expect(cartStore.get().items).toHaveLength(0)
    expect(cartStore.get().total).toBe(0)
  })

  //"sé" elimina una unidad de un item
  it('deletes one from an item properly', () => {
    addCartItem({
      id: '1',
      name: 'Ratchet & Clank: Rift Apart - PlayStation 5',
      price: 750,
      currency: 'MXN',
      image: 'images/Ratchet.jpg',
      description: 'Únete al equipo doble ...',
      loading: 'eager'
    })

    addCartItem({
      id: '1',
      name: 'Ratchet & Clank: Rift Apart - PlayStation 5',
      price: 750,
      currency: 'MXN',
      image: 'images/Ratchet.jpg',
      description: 'Únete al equipo doble ...',
      loading: 'eager'
    })

    removeOneItem('1')

    expect(cartStore.get().items).toHaveLength(1)
    expect(cartStore.get().total).toBe(750)
  })
})
