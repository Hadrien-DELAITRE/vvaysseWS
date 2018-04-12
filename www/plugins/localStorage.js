import createPersistedState from "vuex-persistedstate"
import * as Cookies from "js-cookie"

export default ({ store }) => {
  createPersistedState({
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, { expires: 30 }),
      removeItem: key => Cookies.remove(key)
    }
  })(store)
}
