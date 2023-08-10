import * as pkg from 'gulp'
const { series, src, dest } = pkg.default
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import { execSync } from 'child_process'
import { rimrafSync } from 'rimraf'
import transformScssAlias from './plugins/transformScssAlias.js'
import { resolve } from 'path'
const sass = gulpSass(dartSass)
export const clean = (done) => {
  rimrafSync('./es')
  done()
}
export const clear = (done) => {
  rimrafSync('./es/style.css')
  done()
}

export const buildStyle = async (done) => {
  const alias = {
    '@': resolve('./src'),
  }
  const scssPath = []
  await src('./src/components/**/*.scss')
    .pipe(transformScssAlias(alias, scssPath))
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./es/components'))
  done()
}

export const buildComponents = async (done) => {
  execSync('pnpm run build')
  done()
}

export default series(clean, buildComponents, clear, buildStyle)
