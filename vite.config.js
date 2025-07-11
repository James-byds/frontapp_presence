import { defineConfig } from 'vite'

export default defineConfig({//used for bulma css
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['node_modules']
      }
    }
  }
})