import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/index.ts'),
      name: 'cc-vue-ui',
      fileName: 'cc-vue-ui',
    },
    rollupOptions: {
      external: ['vue'],
      output: [
        {
          dir: 'dist/esm/',
          format: 'es',
        },
      ],
    },
  },
  plugins: [vue(), vueJsx(), UnoCSS()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
