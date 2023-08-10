import babel from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'
import vue from 'rollup-plugin-vue'
// import typescript from 'rollup-plugin-typescript2'
import alias from '@rollup/plugin-alias';
// import tsConfig from '../tsconfig.build.json' assert { type: 'json' }
import { resolve as _resolve } from 'node:path';
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { join } from 'node:path'
import { readFileSync } from 'node:fs';
import { replaceAlias } from '../plugins/transformScssAlias.js';
const _alias = {
  '@': _resolve('./src'),
}

const outputOption = [
  {
    format: 'es',
    name: 'es',
  },
]
export const defineOutputOption = (options: { filePath: string }) => {
  return outputOption.map((option) => {
    const file = join(option.name, options.filePath)
    return {
      ...option,
      file,
    }
  })
}

export const defineInputOption = (input: string) => {
  return {
    input,
    external: ['vue', '@/hooks'],
    plugins: [
      {
        name: 'reload',
        load(path: string) {
          if (path.endsWith('.scss')) {
            const ctx = readFileSync(path, 'utf-8')
            return replaceAlias(_alias, ctx)
          }
          return null
        }
      },
      alias({
        'entries': [
          { find: '@', replacement: _resolve('./src') }
        ]
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
        babelHelpers: 'runtime',
        exclude: 'node_modules/**',
        extensions: ['.tsx', '.ts', '.js'],
        presets: [
          '@babel/preset-env',
          '@babel/preset-typescript',
          '@vue/babel-preset-jsx',
        ],
        plugins: ['@babel/plugin-transform-runtime']
      }),
      vue({}),
    ],
  }
}

