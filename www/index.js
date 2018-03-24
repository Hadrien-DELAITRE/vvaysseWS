const { Nuxt, Builder } = require("nuxt")
const express = require("express")

const { config } = require("../package.json")
const nuxtConfig = require("../nuxt.config.js")

const STATIC_DIR_PATH = `${nuxtConfig.srcDir}/static`

// Throws if static dir path is not named `STATIC_DIR_PATH`.
if (!config.www.staticDirPath.startsWith(STATIC_DIR_PATH)) {
  throw TypeError(`
    WWW configuration error 'staticDirPath':
    expected '${config.www.staticDirPath}' to be '${STATIC_DIR_PATH}'.
  `)
}

// Instanciates Nuxt.js with options.
const nuxt = new Nuxt(nuxtConfig)

const app = express()
app.use(nuxt.render)

// Only build in development environment.
if (nuxtConfig.dev) {
  new Builder(nuxt).build().catch(error => {
    console.error(error)
    process.exit(1)
  })
}

// Starts Nuxt server with port and host retrieved from config.
app.listen(config.www.port, config.www.hostname, function() {
  console.log(`WWW listening on port ${config.www.port}`)
})
