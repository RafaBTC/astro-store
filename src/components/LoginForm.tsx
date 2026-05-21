import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'

import { login } from '../lib/stores/authStore'
import type { LoginCredentials } from '../types/Auth'

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginCredentials>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit: SubmitHandler<LoginCredentials> = async ({ email, password }) => {
    setLoading(true)
    console.log('submit')
    try {
      await login(email, password)
      const params = new URLSearchParams(window.location.search)
      toast.success('Login correcto')
      const redirect = params.get('redirect') || '/dashboard'
      //si la pagina anterior era /cart, volver al cart
      window.location.replace(redirect)
    } catch (e) {
      setError('Email o contraseña incorrectos')
      toast.error('Hubo un error')
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
          id='email'
          required
          placeholder='Correo'
          className='w-full max-w-md rounded-lg bg-white px-4 py-2 text-black'
          {...register('email')}
        />
        <input
          type='password'
          id='pass'
          required
          placeholder='Contraseña'
          className='w-full max-w-md rounded-lg bg-white px-4 py-2 text-black'
          {...register('password')}
        />
        {error && <p className='text-red-700'>{error}</p>}
        <button
          disabled={loading}
          className='min-w-36 rounded-lg bg-violet-600 px-4 py-2 transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:bg-violet-600/40'
          type='submit'
        >
          {loading ? 'Cargando' : 'Iniciar sesión'}
        </button>
      </form>
    </div>
  )
}
