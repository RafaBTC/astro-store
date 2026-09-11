import { describe, expect, it } from 'vitest'

import { PRODUCTS } from './products'

describe('PRODUCTS data source', () => {
  it('contains exactly 9 product entries', () => {
    expect(PRODUCTS).toHaveLength(9)
  })

  it('has unique ids for every product', () => {
    const ids = PRODUCTS.map(product => product.id)

    expect(new Set(ids).size).toBe(ids.length)
  })

  it('does not carry cart-line fields (quantity/loading) on any entry', () => {
    for (const product of PRODUCTS) {
      expect(product).not.toHaveProperty('quantity')
      expect(product).not.toHaveProperty('loading')
    }
  })

  it('exposes the expected product shape for a known entry', () => {
    const marioKart = PRODUCTS.find(product => product.id === '1')

    expect(marioKart).toMatchObject({
      id: '1',
      name: 'Mario Kart 64',
      price: 989,
      currency: 'MXN',
      image: 'images/MK64.jpg'
    })
  })
})
