import { relative } from 'node:path'
export function generatorOutputPath(options: { entry: string }) {
  const { entry } = options
  const path = relative(process.cwd(), entry)
  return path
    .replace(/\.tsx?$/, '.js')
    .replace(/\.jsx?$/, '.js')
    .replace(/\.ts?$/, '.js')
}
