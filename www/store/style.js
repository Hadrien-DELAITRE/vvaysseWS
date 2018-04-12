import _ from "lodash"

/**
 * Vuex uses a single state tree - that is, this single object contains all your
 * application level state and serves as the "single source of truth". This also
 * means usually you will have only one store for each application. A single
 * state tree makes it straightforward to locate a specific piece of state, and
 * allows us to easily take snapshots of the current app state for debugging
 * purposes.
 * @prop {Boolean} isLightStyle Whether style is light or not.
 */
const state = {
  isLightStyle: true
}

/**
 * Vuex mutations are very similar to events: each mutation has a string type
 * and a handler. The handler function is where we perform actual state
 * modifications, and it will receive the state as the first argument
 * @type {Object}
 */
const mutations = {
  /**
   * Toggles style between dark & light.
   * @param {Object} state State of app.
   * @param {Boolean} isLightStyle Whether style is light or not.
   */
  toggleStyle: function(state, { isLightStyle }) {
    state.isLightStyle = isLightStyle
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
   * If `vuex` cookie is defined, it is used to populate this store state with
   * the retrieved style data.
   *
   * @param {Vuex} Vuex Vuex API.
   * @param {Object} context Context of nuxt render server.
   */
  nuxtServerInit({ commit }, { req }) {
    const vuexCookies = req.cookies.vuex
    if (!_.isNil(vuexCookies)) {
      const cookies = JSON.parse(vuexCookies)
      commit("toggleStyle", cookies.style)
    }
  }
}

export default {
  actions,
  state,
  mutations
}
