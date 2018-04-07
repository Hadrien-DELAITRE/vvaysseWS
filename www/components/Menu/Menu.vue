<template>
  <header :style="{ paddingTop: paddingTop + 'px' }">
    <div :class="{ sticky: isScrolled }" class="menu">
      <h1 v-if="isScrolled" :style="{ order: 1 }" class="title">
        <p>
          <span class="topV">V</span>
          <span class="botV">V</span>
        </p>
      </h1>
      <h1 v-else :style="{ order: menu.orderLogo }" class="title">
        <p>
          <span>Victor</span>
          <span>Vaysse</span>
        </p>
      </h1>
      <nuxt-link
        v-for="({ order, flex, urlPath, name }, index) in menu.links"
        :key="index"
        :style="isScrolled ? { order: order.sticky } : { order: order.default, flex: flex }"
        :to="urlPath"
        class="nav"
      >
        {{ name }}
      </nuxt-link>
    </div>
  </header>
</template>

<script>
import _ from "lodash"

import styles from "./_menu.scss"

// Normalizes properties names to camel case.
const normalizedStyles = _.mapKeys(styles, (value, key) => _.camelCase(key))

const { menuSize, menuStickySize } = _.mapValues(normalizedStyles, px =>
  parseInt(px, 10)
)

/**
 * Orders links using given position.
 *
 * @param  {String} position Position to use for computes order of menu links.
 * @param  {Number} orderCount Count order to use for computes order of menu
 *                  links.
 * @return {Function} Function to use for map over to compute links order.
 */
const orderLinks = (position, orderStart) => {
  let order = orderStart
  return (link, index, links) => {
    const { position } = link
    const orderedLink = {
      ...link,
      order: {
        default: order,
        sticky: position === "left" ? order + 1 : order - 1
      },
      flex: 1 / _.size(links)
    }
    order++
    return orderedLink
  }
}

export default {
  /**
   * @prop {Boolean} isScrolled Whether menu is scrolled or not.
   * @prop {Boolean} paddingTop Defines padding top CSS style for header tag.
   * @prop {Array<Object>} menuLinks Defines links of menu.
   */
  data() {
    return {
      isScrolled: false,
      paddingTop: 0,
      menuLinks: [
        { urlPath: "/", name: "Galerie", position: "left" },
        { urlPath: "/cv", name: "CV", position: "right" }
      ]
    }
  },

  computed: {
    /**
     * Computes menu object in order to display links correctly around logo.
     *
     * @example
     * ```
     * const menuLinks = [
     *   { urlPath: "/", name: "Gallerie", position: "left" },
     *   { urlPath: "/cv", name: "CV", position: "right" }
     * ];
     *
     * // This will results to:
     * {
     *   orderLogo: 2,
     *   links: [
     *     { urlPath: "/", name: "Gallerie", position: "left", flex: 0.5, order { default: 1, sticky: 2 }},
     *     { urlPath: "/cv", name: "CV", position: "right", flex: 1, order { default: 3, sticky: 3 }},
     *   ]
     * }
     * ```
     *
     * @return {Object} Menu object that defines order of links related to logo
     * position.
     */
    menu() {
      const menuLinks = this.menuLinks
      const { left, right } = _.groupBy(menuLinks, "position")
      const leftLinks = _.map(left, orderLinks("left", 1))
      const orderLogo = _.size(leftLinks) + 1
      const rightLinks = _.map(right, orderLinks("right", orderLogo + 1))
      return {
        orderLogo,
        links: [...leftLinks, ...rightLinks]
      }
    }
  },

  /**
   * Initializes the throttle behavior for scrolling event handler.
   */
  created() {
    this.throttleHandleScroll = _.throttle(this.handleScroll, 250)
  },

  /**
   * Attachs scroll event to throttle handler.
   */
  beforeMount() {
    window.addEventListener("scroll", this.throttleHandleScroll)
  },

  /**
   * Detachs scroll event from throttle handler.
   */
  beforeDestroy() {
    window.removeEventListener("scroll", this.throttleHandleScroll)
  },
  methods: {
    /**
     * Handles scroll behavior when a 'scroll' is performed.
     * It updates boolean & style about scroll menu in order to make it sticky.
     */
    handleScroll() {
      const prevIsScrolled = this.isScrolled
      const isScrolled = window.scrollY > menuSize - menuStickySize
      if (prevIsScrolled !== isScrolled) {
        this.isScrolled = isScrolled
        this.paddingTop = isScrolled ? menuSize : 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./_menu.scss";
</style>
