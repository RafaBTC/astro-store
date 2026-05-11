# Práctica: Sesiones y carrito

El objetivo de este proyecto es **practicar las diferentes formas de iniciar sesión con Astro y hacer un carrito** que pueda añadir productos, eliminar y que se guarde de manera local.

**Igualmente, el objetivo es lograr lo siguente:**

- Configurar el ESLint con un estandar o airbnb de base

### Pasos para instalar ESLint:
1. Instalar los siguientes paquetes:
```
npm install --save-dev eslint prettier eslint-plugin-astro eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier-plugin-astro prettier-plugin-tailwindcss eslint-config-prettier
```

2. Crear archivo 
```
eslint.config.ts
```

3. Empezar a configurar el archivo
*Después de como una hora, he logrado hacer funcionar el ESLINT, se debe de hacer referencia a las reglas que aquí se explican, ya que los plugins no dan nada más:
https://eslint.org/docs/latest/rules
*

4. Seguir customizando el archivo hasta hacerlo lo más amigable y como lo queremos posible

5. Ejecutar

```
npm run lint
```
Para ver los errores de ESLINT

6. Ejecutar 

```
npm run lint: fix
```
Con --fix se corregiran todos los problemas de formato y se conseguirá el estandar siempre

(Lo mismo para Prettier)

## Checklist de la practica
- Crear un carrito con nanostores ✅
- Poder añadir productos ✅
- Poder eliminar productos ✅
- Hacer que el carrito se quede guardado (cookies o local storage) ✅
- Poder iniciar sesión (fake) ✅ (con cookies)
- Mantener la sesión en cookies o local storage ✅ (en cookies es más seguro y se puede usar en SSR)
- Probar a Implementar OAuth ✅ (al final, se utilizó arctic)
- Añadir rutas protegidas con un Middleware ✅
- Probar a llamar a una API ✅
- Integrar PayPal v6 ✅
- Probar a implementar los diferentes tipos de testing
- Documentar la arq del proyecto ( La solución es definir capas con responsabilidades únicas.)
- **DOCUMENTAR LOS APRENDIZAJES**


---
---
--

## Arquitectura del proyecto
Después de entender el framework de Astro, creo que es más sencillo entender la arquitectura de desarrollo para el proyecto del sitio web con e-commerce e inicio de sesión:

(extraído de claude)
**PROMT:**

>vale, ya he implementando paypal sdk v6 en astro y ya está funcionando, podemos pasar al punto numero 2 de mi mensaje? es decir:

>>Cuál es la mejor manera de trabajar con endpoints? esto es más un tema de arquitectura, ya que... tengo mis API endpoints dentro de pages, todo ok, pero la duda es en donde crear las funciones que hacen fetch a las rutas, ya que lo hago desde los archivos de los nanostores, otros en archivos tipo servicios, otros en archivos tipo lib... ayúdame a estandarizar esto [explícame esto hasta que yo te diga y terminemos primero lo de paypal] .
>>Y en general, dime cual es la mejor arquitectura para mi proyecto de Astro, con react, componentes interactivos o reactivos de react, llamadas a apis (backend externo), notificación con toast y modals, etc.

Buena pregunta, y es algo que vale la pena resolver bien desde el principio porque si no, el proyecto se vuelve un caos de imports cruzados.

Primero déjame ver qué recomienda Astro oficialmente sobre organización de proyecto:Perfecto. Astro no te obliga a nada fuera de `src/pages/`, así que la arquitectura es una decisión de diseño tuya. Déjame darte la estructura que mejor encaja con tu stack exacto.

---

## El problema que tienes ahora

```
stores/cart.ts      → tiene fetch a /api/cart
lib/paypal.ts       → tiene fetch a /api/paypal  
services/auth.ts    → tiene fetch a /api/auth
components/X.tsx    → a veces también hace fetch directo
```

El caos viene de no tener una **regla clara** de quién es responsable de qué. La solución es definir capas con responsabilidades únicas.

---

## La arquitectura en capas

```
src/
├── pages/
│   └── api/                ← Capa 1: HTTP (solo recibe y responde)
│
├── services/               ← Capa 2: comunicación con tu backend externo
│
├── stores/                 ← Capa 3: estado reactivo del cliente
│
├── hooks/                  ← Capa 4: lógica React reutilizable
│
├── components/             ← Capa 5: UI pura, sin fetch directo
│
├── lib/                    ← Utilidades puras (no fetch, no estado)
└── types/                  ← Tipos compartidos entre todas las capas
```

La regla de oro es: **cada capa solo habla con la capa inmediatamente debajo**.

```
components → hooks → stores → services → API routes → backend externo
```

---

## Qué va en cada carpeta

### `src/pages/api/` — Solo HTTP

Su única responsabilidad es recibir una request, llamar a un servicio, y devolver una Response. **Sin lógica de negocio.**

```ts
// src/pages/api/cart/add.ts
import { cartService } from '../../../services/cart'

export const POST: APIRoute = async ({ request, cookies }) => {
  const token = cookies.get('auth-token')?.value
  const body = await request.json()

  const result = await cartService.addItem(token!, body)

  return new Response(JSON.stringify(result), { status: 200 })
}
```

### `src/services/` — Comunicación con tu backend externo

Solo habla con tu API externa. No sabe nada de React, cookies de Astro, ni de nanostores. Recibe parámetros, hace fetch, devuelve datos tipados.

```ts
// src/services/cart.ts
import type { CartItem, CartState } from '../types/cart'

const BASE = import.meta.env.BACKEND_URL

export const cartService = {
  async getCart(token: string): Promise<CartState> {
    const res = await fetch(`${BASE}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) throw new Error('Error fetching cart')
    return res.json()
  },

  async addItem(token: string, item: Omit<CartItem, 'quantity'>): Promise<CartState> {
    const res = await fetch(`${BASE}/cart/items`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
    if (!res.ok) throw new Error('Error adding item')
    return res.json()
  },

  async removeItem(token: string, itemId: string): Promise<CartState> {
    const res = await fetch(`${BASE}/cart/items/${itemId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) throw new Error('Error removing item')
    return res.json()
  },
}
```

### `src/stores/` — Solo estado reactivo

Los stores **no hacen fetch directo a tu backend**. Hacen fetch a tus propias API routes de Astro (`/api/...`) y guardan el resultado. Nada más.

```ts
// src/stores/cart.ts
import { persistentAtom } from '@nanostores/persistent'
import type { CartState, CartItem } from '../types/cart'

export const cartStore = persistentAtom<CartState>(
  'app:cart',
  { items: [], total: 0 },
  { encode: JSON.stringify, decode: JSON.parse }
)

// Las mutaciones llaman a /api/..., no al backend directamente
export async function addToCart(item: Omit<CartItem, 'quantity'>) {
  const res = await fetch('/api/cart/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  })
  if (!res.ok) throw new Error('Error adding to cart')
  const updated: CartState = await res.json()
  cartStore.set(updated)
}

export async function removeFromCart(itemId: string) {
  const res = await fetch(`/api/cart/remove/${itemId}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Error removing from cart')
  const updated: CartState = await res.json()
  cartStore.set(updated)
}
```

### `src/hooks/` — Lógica React reutilizable

Combinan stores + toast + loading states. Los componentes los usan para no tener lógica inline.

```ts
// src/hooks/useCart.ts
import { useStore } from '@nanostores/react'
import { cartStore, addToCart, removeFromCart } from '../stores/cart'
import { toast } from 'react-toastify'
import { useState } from 'react'
import type { CartItem } from '../types/cart'

export function useCart() {
  const { items, total } = useStore(cartStore)
  const [loading, setLoading] = useState(false)

  const handleAddToCart = async (item: Omit<CartItem, 'quantity'>) => {
    setLoading(true)
    try {
      await addToCart(item)
      toast.success(`${item.name} agregado al carrito`)
    } catch {
      toast.error('No se pudo agregar el producto')
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveFromCart = async (itemId: string) => {
    try {
      await removeFromCart(itemId)
      toast.info('Producto eliminado')
    } catch {
      toast.error('No se pudo eliminar el producto')
    }
  }

  return { items, total, loading, addToCart: handleAddToCart, removeFromCart: handleRemoveFromCart }
}
```

### `src/components/` — UI pura

Los componentes **nunca hacen fetch**. Solo usan hooks y muestran datos.

```tsx
// src/components/ProductCard.tsx
import { useCart } from '../hooks/useCart'
import type { CartItem } from '../types/cart'

type Props = { product: Omit<CartItem, 'quantity'> }

export default function ProductCard({ product }: Props) {
  const { addToCart, loading } = useCart()

  return (
    <div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => addToCart(product)} disabled={loading}>
        {loading ? 'Agregando...' : 'Agregar al carrito'}
      </button>
    </div>
  )
}
```

### `src/lib/` — Utilidades puras

Sin fetch, sin estado, sin React. Solo funciones puras: formatters, validadores, helpers.

```ts
// src/lib/format.ts
export const formatPrice = (amount: number, currency = 'USD') =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency }).format(amount)

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat('es-MX').format(new Date(date))
```

---

## La estructura completa

```
src/
├── pages/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login.ts
│   │   │   ├── logout.ts
│   │   │   └── google/
│   │   ├── cart/
│   │   │   ├── add.ts
│   │   │   └── remove/[id].ts
│   │   └── paypal/
│   │       ├── create-order.ts
│   │       └── capture-order.ts
│   ├── checkout.astro
│   └── index.astro
│
├── services/          ← fetch a tu backend externo
│   ├── auth.ts
│   ├── cart.ts
│   └── orders.ts
│
├── stores/            ← estado del cliente, fetch a /api/*
│   ├── auth.ts
│   └── cart.ts
│
├── hooks/             ← lógica React (store + toast + loading)
│   ├── useAuth.ts
│   └── useCart.ts
│
├── components/        ← UI pura, solo usa hooks
│   ├── Header.tsx
│   ├── Cart.tsx
│   ├── ProductCard.tsx
│   └── PayPalCheckout.tsx
│
├── layouts/
│   └── Layout.astro
│
├── lib/               ← utilidades puras, sin fetch ni estado
│   ├── format.ts
│   └── oauth.ts       ← config de Arctic (es configuración, no lógica)
│
└── types/             ← tipos compartidos por todas las capas
    ├── auth.ts
    ├── cart.ts
    └── paypal.ts
```

---

## El flujo completo con esta arquitectura

```
[ProductCard.tsx]
  usa useCart() hook
    que llama a addToCart() del store
      que hace fetch a /api/cart/add (Astro API route)
        que llama a cartService.addItem() del service
          que hace fetch a tu-backend.com/cart/items
```

Cada capa tiene una responsabilidad única y nunca salta niveles. Si mañana cambias tu backend externo, solo tocas `src/services/`. Si cambias la UI, solo tocas `src/components/`. Si agregas lógica de toast o loading, solo tocas `src/hooks/`.



# TESTING
Existen 3 tipos de test (pensar en ellos como piramide):

1. _**E2E (end to end) Test**_ (pocos, lentos, simulan al usuario real)
2. _**Component Test**_ (medios, prueban componentes de react u otra librería)
3. _**Unit test**_ (muchos, rápidos, prueban funciones puras (lib, services, etc))
      
     / \
    /   \
   /  1  \
  /   2   \
 /    3    \
/___________\


| Tipo      | Qué prueba                           | Herramientas | Velocidad   |
| --------- |:------------------------------------:|:------------:|:-----------:|
| Unit      | Funciones puras (lib, services, etc) | Vitest       | Instantáneo |
| Component | Componentes React en aislamiento     | Vitest + RTL | Rápido      |
| E2E       | Flujo completo en el navegador real  | Playwright   | Lento       |

## Setup para el proyecto
1. **Instalar dependencias**
```ts
# Unit + components tests
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event happy-dom

# E2E tests
npm install -D @playwright/test
npx playwright install chromium
```

2. **Configurar Vitest**
```ts
// vitest.config.ts
/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config'

export default getViteConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    include: ['src/**/*.test.{ts,tsx,astro}'],
    exclude: ['e2e/**', 'node_modules/**']
  }
})


// src/test/setup.ts
import '@testing-library/jest-dom'  // agrega matchers como toBeInTheDocument
```

3. **Configurar Playwright**
Se recomienda ejecutar
```ts
npm init playwright@latest
```

Y configurar el archivo
```ts
// playwright.config.ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  baseURL: 'http://localhost:4321',
  use: {
    headless: true,
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
  },
})
```
Lo estandar es tener en la raíz del proyecto la carpeta /e2e y el archivo playwright.config.ts

4. **Crear los scripts de test en el package.json**
```ts
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

5. **Proceder a crear los tests para funciones, components y e2e, mantenerlo de la siguiente manera (estructura de archivos y carpetas)**

* Lo ideal es tener los tests por el nombre del archivo al que se le hace test, por ejemplo:
```
components/
  ProductCard/
    ProductCard.tsx
    ProductCard.test.tsx
```

```
e2e/
  checkout.spec.ts
  login.spec.ts
```
PREGUNTAR EL MANEJO CORRECTO DE ERRORES Y CÓMO APLICAR DRY EN LOS NANOSTORES AL LLAMAR A LAS API

Y si tengo tiempo, en el futuro...
- Implementar bases de datos
- Hacer las APIs Routes un backend seguro
- conectar bases de datos con API Routes


