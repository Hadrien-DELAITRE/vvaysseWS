/**
 * Vuex mutations are very similar to events: each mutation has a string type
 * and a handler. The handler function is where we perform actual state
 * modifications, and it will receive the state as the first argument
 * @type {Object}
 */
const mutations = {
  /**
   * Installs app configuration in state.
   * @param  {Object} state State of app.
   * @param  {Object} app   App configuration object.
   */
  install: function(state, app) {
    state.app = app
  }
}

/**
 * Actions are similar to mutations, the differences being that:
 *
 * - Instead of mutating the state, actions commit mutations.
 * - Actions can contain arbitrary asynchronous operations.
 * @type {Object}
 */
const actions = {
  /**
   * Nuxt.js will call it with the context (only from the server-side).
   *
   * @param {Vuex} Vuex Vuex API.
   * @param {Object} context Context of nuxt render server.
   */
  nuxtServerInit({ commit }, { req }) {
    commit("install", req.$config)
  }
}

export default {
  mutations,
  actions
}
