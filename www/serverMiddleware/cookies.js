// This can't be import as ESM JS features. @see
// https://github.com/nuxt/nuxt.js/issues/2087
const cookieParser = require("cookie-parser")

// See https://github.com/expressjs/cookie-parser.
module.exports = cookieParser()
