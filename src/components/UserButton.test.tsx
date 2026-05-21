import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import UserButton from './UserButton'

describe('User Button', () => {
  it('muestra el botón de login si no hay usuario', () => {
    render(<UserButton />)

    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument()
  })

  it('muestra foto del usuario si hay sesión iniciada', async () => {
    render(
      <UserButton
        user={{
          email: '123@gmail.com',
          name: '123',
          id: '1',
          role: 'admin',
          avatar: 'https://i.pinimg.com/736x/7e/54/70/7e54709b93abd9cdde22ae125b313ea8.jpg'
        }}
      />
    )

    const imgElement = await screen.findByAltText(/User Avatar/i)
    expect(imgElement).toBeInTheDocument()
  })
})
