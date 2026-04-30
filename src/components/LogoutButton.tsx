import { useState } from 'react'

import { logout } from '../lib/stores/authStores'

export default function LogoutButton() {
  const [loading, setLoading] = useState(false)
  const handleLogout = async () => {
    try {
      setLoading(true)
      await logout()
    } catch {
    } finally {
      setLoading(false)
    }
  }
  return (
    <button
      onClick={handleLogout}
      className='rounded-lg bg-violet-600 px-4 py-2 transition hover:bg-violet-800'
    >
      {loading ? 'Cargando' : 'Cerrar sesión'}
    </button>
  )
}
