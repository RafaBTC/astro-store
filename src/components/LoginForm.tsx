import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'

import { login } from '../lib/stores/authStores'
import type { LoginCredentials } from '../types/Auth'

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginCredentials>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const onSubmit: SubmitHandler<LoginCredentials> = async ({ email, password }) => {
    console.log(email)
    console.log(password)
    setLoading(true)
    try {
      await login(email, password)
      window.location.href = '/dashboard'
    } catch {
      setError('Email o contraseña incorrectos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='mt-8'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center justify-center gap-4'
      >
        <input
          type='email'
          required
          placeholder='Correo'
          className='min-w-md rounded-lg bg-white px-4 py-2 text-black'
          {...register('email')}
        />
        <input
          type='password'
          required
          placeholder='Contraseña'
          className='min-w-md rounded-lg bg-white px-4 py-2 text-black'
          {...register('password')}
        />
        {error && <p className='text-red-700'>{error}</p>}
        <button
          disabled={loading}
          className='min-w-36 rounded-lg bg-violet-600 px-4 py-2 transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:bg-violet-600/40'
        >
          {loading ? 'Cargando' : 'Iniciar sesión'}
        </button>
      </form>
    </div>
  )
}
