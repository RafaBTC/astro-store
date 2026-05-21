import test, { expect } from '@playwright/test'

test.describe('flujo de compra e-commerce', () => {
  test.beforeEach(async ({ page }) => {
    // Limpia cookies/sesión
    await page.context().clearCookies()
    // Limpia localStorage (donde vive el carrito)
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
  })

  test('añade un producto en el carrito, se muestra el carrito y persiste al recargar', async ({
    page
  }) => {
    await page.goto('/')

    await page
      .getByRole('button', { name: /¡Añadir al carrito!/i })
      .first()
      .click()

    await expect(page.getByText(/Producto añadido al carrito/i)).toBeVisible({ timeout: 3000 })
    await expect(page.getByText(/Finalizar compra/i)).toBeVisible()

    await page.reload()

    await expect(page.getByTestId('cart-count')).toHaveText('1')
  })

  test('vacía el carrito correctamente', async ({ page }) => {
    await page.goto('/')
    //agregamos 1  productos
    await page
      .getByRole('button', { name: /¡Añadir al carrito!/i })
      .first()
      .click()
    await expect(page.getByText(/Producto añadido al carrito/i)).toBeVisible({ timeout: 3000 })

    //eliminar productos
    await page.getByRole('button', { name: 'x' }).first().click()

    await page.getByTestId('cart-button').click()
    await expect(page.getByText(/¡No hay productos en su carrito!/i)).toBeVisible()
  })

  test('abre el carrito, navega a la pagina del carrito y se CTA para comprar', async ({
    page
  }) => {
    await page.goto('/')

    await page.getByTestId('cart-button').click()
    await page
      .getByRole('link', { name: /Finalizar compra/i })
      .first()
      .click()

    await expect(page.getByText(/Resumen de su carrito/i)).toBeVisible()

    const ctaButton = page.getByRole('link', { name: /Continuar comprando/i })

    await expect(ctaButton).toBeVisible({ timeout: 10000 })

    await ctaButton.first().click()

    await expect(page.getByText(/¡Bienvenido a la Retro Store!/i)).toBeVisible()
  })

  test('añade un producto, navega a la pagina del carrito y se muestran los productos', async ({
    page
  }) => {
    await page.goto('/')

    await page
      .getByRole('button', { name: /¡Añadir al carrito!/i })
      .first()
      .click()
    await expect(page.getByText(/Producto añadido al carrito/i)).toBeVisible({ timeout: 3000 })

    await page
      .getByRole('link', { name: /Finalizar compra/i })
      .first()
      .click()

    await expect(page.getByText(/Resumen de su carrito/i)).toBeVisible()
    await expect(page.getByRole('heading', { name: /Mario Kart 64/i })).toBeVisible()

    const counter = page.getByTestId('products-counter')
    await expect(counter.getByText('Productos:')).toBeVisible()
    await expect(counter.locator('span')).toHaveText('1')
  })

  test('redirige al home si navega al checkout sin iniciar sesión', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page.getByText(/¡Bienvenido a la Retro Store!/i)).toBeVisible()
  })

  test('inicia sesión y redirige al carrito', async ({ page }) => {
    /*
    añade un producto, 
    navega a la pagina del carrito
    se muestran los productos
    da clic 
    
    */
    await page.goto('/')

    await page
      .getByRole('button', { name: /¡Añadir al carrito!/i })
      .first()
      .click()
    await expect(page.getByText(/Producto añadido al carrito/i)).toBeVisible({ timeout: 3000 })

    await page
      .getByRole('link', { name: /Finalizar compra/i })
      .first()
      .click()

    await page
      .getByRole('link', { name: /Iniciar sesión para finalizar compra/i })
      .first()
      .click()

    //Login
    await page.getByPlaceholder('Correo').fill('test@gmail.com')
    await page.getByPlaceholder('Contraseña').fill('password123')
    await page.getByRole('button', { name: /Iniciar sesión/i }).click()

    await expect(page.getByText(/Resumen de su carrito/i)).toBeVisible()
  })

  test('Finalizar compra', async ({ page }) => {
    await test.step('agrega producto al carrito', async () => {
      await page
        .getByRole('button', { name: /¡Añadir al carrito!/i })
        .first()
        .click()
      await expect(page.getByText(/Producto añadido al carrito/i)).toBeVisible({ timeout: 3000 })
    })

    await test.step('navega a la pagina del carrito', async () => {
      await page
        .getByRole('link', { name: /Finalizar compra/i })
        .first()
        .click()
      await expect(page.getByText(/Resumen de su carrito/i)).toBeVisible()
    })

    await test.step('inicia sesión para comprar y regresa a la pagina del carrito', async () => {
      await page.getByRole('link', { name: /Iniciar sesión para finalizar compra/i }).click()

      //Login
      await page.getByPlaceholder('Correo').fill('test@gmail.com')
      await page.getByPlaceholder('Contraseña').fill('password123')
      await page.getByRole('button', { name: /Iniciar sesión/i }).click()

      //de vuelta en cart
      await expect(page.getByText(/Resumen de su carrito/i)).toBeVisible()
    })

    await test.step('navega al checkout autenticado', async () => {
      await page.getByRole('link', { name: /Finalizar compra/i }).click()

      await expect(page.getByRole('heading', { name: /Finalizar compra/i })).toBeVisible()
      await expect(page.getByRole('heading', { name: /Método de pago/i })).toBeVisible()
    })

    // await test.step('completar pago con PayPal', async () => {
    //   //esperamos el popup
    //   const [popup] = await Promise.all([
    //     page.waitForEvent('popup'),
    //     page.getByRole('button', { name: /Pay with Paypal/i }).click()
    //   ])

    //   // await popup.waitForLoadState('networkidle', { timeout: 30000 })
    //   await expect(popup).toHaveURL(/sandbox.paypal/i)

    //   //logeamos en paypal
    //   await popup
    //     .getByPlaceholder('Email or mobile number')
    //     .fill('sb-imwo216746481@personal.example.com', { timeout: 15000 })

    //   await popup.getByRole('button', { name: /Next/i }).click()
    //   await popup.getByPlaceholder('Password').fill('/@33Up2s')
    //   await popup.getByRole('button', { name: /Log In/i }).click()

    //   await popup.waitForURL(/paypal\.com\/webapps\/hermes/, { timeout: 30000 })
    //   await popup.getByRole('button', { name: /Compra completa/i }).click({ timeout: 15000 })
    //   await popup.waitForEvent('close', { timeout: 30000 })
    // })
    // await test.step('renderiza el botón de pago de Paypal', async () => {
    //   //esperamos el popup
    //   // const [popup] = await Promise.all([
    //   //   page.waitForEvent('popup'),
    //   //   page.getByRole('button', { name: /Pay with Paypal/i }).click()
    //   // ])

    //   // // await popup.waitForLoadState('networkidle', { timeout: 30000 })
    //   // await expect(popup).toHaveURL(/sandbox.paypal/i)

    //   // //logeamos en paypal
    //   // await popup
    //   //   .getByPlaceholder('Email or mobile number')
    //   //   .fill('sb-imwo216746481@personal.example.com', { timeout: 15000 })

    //   // await popup.getByRole('button', { name: /Next/i }).click()
    //   // await popup.getByPlaceholder('Password').fill('/@33Up2s')
    //   // await popup.getByRole('button', { name: /Log In/i }).click()

    //   // await popup.waitForURL(/paypal\.com\/webapps\/hermes/, { timeout: 30000 })
    //   // await popup.getByRole('button', { name: /Compra completa/i }).click({ timeout: 15000 })
    //   // await popup.waitForEvent('close', { timeout: 30000 })
    //   await expect(page.getByRole('button', { name: /Pay with Paypal/i })).toBeVisible()
    // })

    // await test.step('verificar compra reflejada en dashbaord', async () => {
    //   await expect(page.getByRole('heading', { name: /Compras realizadas/i })).toBeVisible({
    //     timeout: 30000
    //   })
    //   await expect(page.getByText(/Pedido 1/i)).toBeVisible()
    //   await expect(page.getByText(/Mario Kart 64/i)).toBeVisible()
    // })
  })
})
