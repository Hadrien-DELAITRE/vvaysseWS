const { config } = require("./package.json")

// For any documentation about Nuxt configuration, @see
// https://fr.nuxtjs.org/guide/configuration/
module.exports = {
  dev: process.env.NODE_ENV !== "production",
  srcDir: config.www.srcDir,
  modules: ["@nuxtjs/axios"],
  serverMiddleware: ["~/serverMiddleware/config"]
}
