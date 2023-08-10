import { readdir, writeFile } from "node:fs/promises";

export async function generatorExports(path) {
  let dirs = await readdir(path, { withFileTypes: true })
  dirs = dirs.filter(dir => dir.isDirectory())
  const exports = dirs.map(dir => `export * from './${dir.name}/index.js'`).join('\n')
  await writeFile(`${path}/index.js`, exports, { 'encoding': 'utf-8' })
  console.log('exports generated');
}