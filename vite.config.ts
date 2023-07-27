import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    //压缩
    //minify: false,
    emptyOutDir: true,
    rollupOptions: {
      //忽略打包vue文件
      external: ['vue', '@cc-heart/utils'],
      output: [
        {
          format: 'es',
          entryFileNames: (chunkInfo) => {
            if (chunkInfo.name.endsWith('.scss')) {
              return chunkInfo.name.replace('scss', 'css')
            }
            return '[name].js'
          },
          //让打包目录和我们目录对应
          hoistTransitiveImports: false,
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          dir: './es',
        },
        // {
        //   //打包格式
        //   format: 'cjs',
        //   //打包后文件名
        //   entryFileNames: '[name].js',
        //   //让打包目录和我们目录对应
        //   preserveModules: true,
        //   exports: 'named',
        //   //配置打包根目录
        //   dir: './cjs',
        // },
      ],
    },
    lib: {
      entry: ['src/components/index.ts'],
    },
  },
  plugins: [vue(), vueJsx(), UnoCSS()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})