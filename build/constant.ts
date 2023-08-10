import babel from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'
import vue from 'rollup-plugin-vue'
import alias from '@rollup/plugin-alias'
import { resolve as _resolve } from 'node:path'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { readFileSync } from 'node:fs'
import replace from 'rollup-plugin-replace'
import { replaceAlias } from '../plugins/transformScssAlias.js'
const _alias = {
  '@': _resolve('./src'),
}

const outputOption = [
  {
    format: 'es',
    name: 'es',
    dir: './es',
    hoistTransitiveImports: false,
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
]
export const defineOutputOption = () => {
  return outputOption.map((option) => {
    return {
      ...option,
    }
  })
}

export const defineInputOption = (input: string) => {
  return {
    input,
    external: [
      'vue',
      /node_modules/,
      '@cc-heart/utils-client',
      /\.scss/,
      /\.css/,
    ],
    plugins: [
      {
        name: 'reload',
        load(path: string) {
          if (path.endsWith('.scss')) {
            const ctx = readFileSync(path, 'utf-8')
            return replaceAlias(_alias, ctx)
          }
          return null
        },
      },
      alias({
        entries: [{ find: '@', replacement: _resolve('./src') }],
      }),
      replace({
        '.scss': '.css',
      }),
      resolve(),
      postcss({
        plugins: [],
        modules: false,
        extract: true,
      }),
      commonjs(),
      typescript(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        extensions: ['.tsx', '.ts', '.js'],
        plugins: ['@vue/babel-plugin-jsx'],
      }),
      vue({}),
    ],
  }
}
