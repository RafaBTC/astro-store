import { cn } from '../../lib/cn'

interface NoItemsCTAProps {
  className?: string
  message?: string
  cta?: string
}

export default function NoItemsCTA({ className, message, cta }: NoItemsCTAProps) {
  return (
    <div
      className={cn(
        'flex min-h-[60vh] w-full flex-col items-center justify-center gap-6',
        className
      )}
    >
      <p className='text-center text-2xl font-medium'>
        {message ?? '¡No hay productos en su carrito!'}
      </p>

      <a
        href='/#productos'
        className='w-full rounded-lg border-2 border-violet-600 px-4 py-2 text-center text-lg transition hover:bg-violet-600 md:w-[50%]'
      >
        {cta ?? 'Continuar comprando'}
      </a>
    </div>
  )
}
