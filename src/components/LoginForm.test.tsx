import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { toast } from 'react-toastify'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { login } from '../lib/stores/authStore'

import LoginForm from './LoginForm'

vi.mock('../lib/stores/authStore', () => ({ login: vi.fn() }))
vi.mock('react-toastify', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))
vi.mock('../services')

describe('Login Form', () => {
  beforeEach(() => {
    delete (window as any).location
    ;(window as any).location = { replace: vi.fn(), search: '' }
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('Muestra error si las credenciales son inválidas', async () => {
    //"mockeamos" un error al hacer login
    vi.mocked(login).mockRejectedValue(new Error('Credenciales Inválidas (test)'))

    render(<LoginForm />)

    await userEvent.type(screen.getByPlaceholderText(/correo/i), 'test@test.com')
    await userEvent.type(screen.getByPlaceholderText(/contra/i), 'wrong')
    await userEvent.click(screen.getByRole('button', { name: /iniciar/i }))
    //que se muestre el toast pues con el mensaje ese xd
    expect(toast.error).toHaveBeenCalledWith('Hubo un error')
  })

  it('logea al usuario si no hay ningún error', async () => {
    vi.mocked(login).mockResolvedValue()

    render(<LoginForm />)
    await userEvent.type(screen.getByPlaceholderText(/correo/i), 'test@test.com')
    await userEvent.type(screen.getByPlaceholderText(/contra/i), 'correcto')
    await userEvent.click(screen.getByRole('button', { name: /iniciar/i }))
    expect(toast.success).toHaveBeenCalledWith('Login correcto')
  })
})
