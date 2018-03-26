/**
 * Handles exception inside of async express routes.
 *
 * @param  {Function} fn Wrapper function for middleware.
 * @return {Function}    Error handling middleware.
 */
const asyncError = fn => {
  return function $asyncError(req, res, next, ...args) {
    const fnReturn = fn(req, res, next, ...args)
    return Promise.resolve(fnReturn).catch(next)
  }
}

export default asyncError
