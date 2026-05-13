// @ts-check
import { defineConfig } from 'astro/config'

import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

import icon from 'astro-icon'

import vercel from '@astrojs/vercel'

//import node from '@astrojs/node'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [react(), icon()],

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: vercel()
})
