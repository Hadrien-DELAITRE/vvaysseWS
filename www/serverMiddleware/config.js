// This can't be import as ESM JS features. @see
// https://github.com/nuxt/nuxt.js/issues/2087
const { config } = require("../../package.json")

/**
 * Injects app configuration in request object.
 *
 * @param  {Object}   req  Received request.
 * @param  {Object}   res  Response to send.
 * @param  {Function} next Function used to trigger next middleware.
 */
function configMiddleware(req, res, next) {
  req.$config = config
  next()
}

module.exports = configMiddleware
