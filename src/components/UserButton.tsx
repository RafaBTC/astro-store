import type { User } from '../types/Auth'

interface Props {
  user: User | undefined
}

export default function UserButton({ user }: Props) {
  return user ? (
    <a href='/dashboard'>
      <img
        src={user.avatar}
        alt='User Avatar'
        className='flex h-11 w-11 rounded-full object-cover'
      />
    </a>
  ) : (
    <a href='/login' className='rounded-lg bg-violet-600 px-4 py-2 transition hover:bg-violet-700'>
      Iniciar sesión
    </a>
  )
}
