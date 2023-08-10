import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { defineInputOption, defineOutputOption } from './constant.js'
import { rollup } from 'rollup'
import { generatorOutputPath } from './utils.js'
async function build(inputOption: any, outputOption: any) {
  try {
    const bundle = await rollup(inputOption)
    await bundle.write(outputOption)
  } catch (e) {
    console.log('e', e)
  }
}

interface Option {
  entry: string
}
async function loadInputOption(option: Option) {
  const { entry } = option
  const dirs = await readdir(entry, {
    withFileTypes: true,
  })
  const inputOptions = dirs
    .filter((dir) => dir.isDirectory())
    .map((dir) => join(entry, dir.name, 'index.ts'))
    .map((entry) => {
      return defineInputOption(entry)
    })

  const task = inputOptions.map(async (inputOption) => {
    const filePath = generatorOutputPath({ entry: inputOption.input })
    const outputOptions = defineOutputOption({ filePath })
    return outputOptions.map(async (option) => {
      await build(inputOption, option)
    })
  })

  await Promise.all(task)
  console.log('success')
}

loadInputOption({ entry: join(process.cwd(), './src/components') })
