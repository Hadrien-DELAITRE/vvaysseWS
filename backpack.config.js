const path = require("path")

const { config } = require("./package.json")

const entries = {
  api: path.join(__dirname, config.api.srcDir, "index.js"),
  proxy: path.join(__dirname, config.proxy.srcDir, "index.js")
}

module.exports = {
  webpack: config => {
    config.entry = {}
    config.entry[process.env.BACKPACK_ENTRY] = [
      entries[process.env.BACKPACK_ENTRY]
    ]
    config.output.filename = `${process.env.BACKPACK_ENTRY}.js`
    return config
  }
}
