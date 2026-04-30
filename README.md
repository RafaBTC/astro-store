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
- Documentar la arq del proyecto
- Crear un carrito con nanostores ✅
- Poder añadir productos ✅
- Poder eliminar productos ✅
- Hacer que el carrito se quede guardado (cookies o local storage) ✅
- Poder iniciar sesión (fake)
- Probar a Implementar Better Auth
- Mantener la sesión en cookies o local storage
- Añadir rutas protegidas con un Middleware
- Probar a implementar los diferentes tipos de testing
- Probar a llamar a una API
- **DOCUMENTAR LOS APRENDIZAJES**

```
CONFIGURACIÓN DE ESLINT:

La mejor estrategia combina ESLint (linting de JS/TS/JSX), Prettier (formateo) y opcionalmente Stylelint (CSS). Así queda el stack recomendado:

npm install --save-dev \
  eslint \
  eslint-plugin-astro \
  @typescript-eslint/parser \
  eslint-plugin-jsx-a11y \
  eslint-plugin-react \
  eslint-plugin-react-hooks
```

<!--



```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat). -->
