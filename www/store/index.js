import Vuex from "vuex"

// Hook here different store modules. @see
// https://vuex.vuejs.org/fr/modules.html
import config from "./config"
import isExpanded from "./isExpanded"

/**
 * Creates store that contains our app state.
 * @see https://vuex.vuejs.org/fr/api.html#vuexstore
 *
 * @return {Vuex.Store} Vuex store with state.
 */
const createStore = () => {
  return new Vuex.Store({
    modules: {
      config,
      isExpanded
    }
  })
}

export default createStore
