import test, { expect } from '@playwright/test'

test.describe('Autenticación', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
  })
  test('Flujo de sesión del usuario normal', async ({ page }) => {
    await test.step('Usuario puede iniciar sesión', async () => {
      await page.getByPlaceholder('Correo').fill('test@gmail.com')
      await page.getByPlaceholder('Contraseña').fill('password123')
      await page.getByRole('button', { name: /Iniciar sesión/i }).click({ timeout: 15000 })

      //verifica que redirige a /dashboard
      await expect(page).toHaveURL('/dashboard', { timeout: 20000 })
      await expect(page.getByText('¡Bienvenido, test!')).toBeVisible()
      await expect(page.getByRole('heading', { name: /Compras realizadas/i })).toBeVisible()
    })

    await test.step('usuario puede cerrar sesión', async () => {
      await page.getByRole('button', { name: /Cerrar sesión/i }).click({ timeout: 15000 })

      await expect(page.getByText('¡Bienvenido a la Retro Store!')).toBeVisible({ timeout: 30000 })
      await expect(page).toHaveURL('/', { timeout: 30000 })
    })
  })
})
