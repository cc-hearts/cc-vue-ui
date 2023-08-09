import { Transform } from 'stream'


const trans = (transform) => new Transform({ transform, objectMode: true })

function replaceAlias(alias, ctx) {
  const RE = new Function(`return /^['"](${Object.keys(alias).join('|')})/g`)()
  return ctx.replace(/['"](.*?)['"]/gm, (value) => {
    return value.replace(RE, (matchVReg) => {
      const char = /['"]/.exec(matchVReg)[0]
      const removeSingleReg = matchVReg.replace(/['"]/, '')
      return alias[removeSingleReg]
        ? `${char}${alias[removeSingleReg]}`
        : matchVReg
    })
  })
}

function transformScssAlias(alias) {
  return trans(function (file, encoding, callback) {
    const ctx = file.contents.toString('utf-8')
    const result = replaceAlias(alias, ctx)
    file.contents = Buffer.from(result)
    callback(null, file)
  })
}

export default transformScssAlias
