/**
 * Vuex uses a single state tree - that is, this single object contains all your
 * application level state and serves as the "single source of truth". This also
 * means usually you will have only one store for each application. A single
 * state tree makes it straightforward to locate a specific piece of state, and
 * allows us to easily take snapshots of the current app state for debugging
 * purposes.
 * @prop {Boolean} isExpanded Whether image item is expanded or not.
 * @prop {Boolean} imageUrlPath Image URL path of expanded image.
 */
const state = {
  isExpanded: false,
  imageUrlPath: null
}

/**
 * Vuex mutations are very similar to events: each mutation has a string type
 * and a handler. The handler function is where we perform actual state
 * modifications, and it will receive the state as the first argument
 * @type {Object}
 */
const mutations = {
  /**
   * Toggles expanded image.
   * @param {Object} state State of app.
   * @param {Boolean} isExpanded Whether an image is expanded or not.
   * @param {String} imageUrlPath Image URL path of expanded image.
   */
  toggleExpand: function(state, { isExpanded, imageUrlPath }) {
    state.isExpanded = isExpanded
    state.imageUrlPath = imageUrlPath
  }
}

export default {
  state,
  mutations
}
