<template>
  <header :style="{ paddingTop: paddingTop + 'px' }" class="header">
    <div :class="{ sticky: isScrolled }" class="menu">
      <h1 :style="isScrolled ? prefix({ order: 1 }) : prefix({ order: menu.orderLogo })" class="title">
        <nuxt-link to="/" class="logo">
          <p v-if="isScrolled">
            <span class="topV">V</span>
            <span class="botV">V</span>
          </p>
          <p v-else>
            <span>Victor</span>
            <span>Vaysse</span>
          </p>
        </nuxt-link>
      </h1>
      <nuxt-link
        v-for="({ order, flex, urlPath, name }, index) in menu.links"
        :key="index"
        :style="isScrolled ? prefix({ order: order.sticky }) : prefix({ order: order.default, flex: flex })"
        :to="urlPath"
        class="nav"
      >
        {{ name }}
      </nuxt-link>
      <ToggleStyle v-if="isScrolled" :style="prefix({ order: menu.orderToggle.sticky })" class="toggleStyle" />
    </div>
    <ToggleStyle v-if="!isScrolled" class="toggleStyle" />
  </header>
</template>

<script>
import _ from "lodash"

import ToggleStyle from "./ToggleStyle.vue"

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
        sticky: position === "left" ? order + 1 : order
      },
      flex: 1 / _.size(links)
    }
    order++
    return orderedLink
  }
}

export default {
  components: {
    ToggleStyle
  },
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
        { urlPath: "/", name: "Home", position: "left" },
        { urlPath: "/cv", name: "About", position: "right" }
      ]
    }
  },

  computed: {
    /**
     * Computes inline style only for order and flex. It is done for old
     * browser like Safari on iOS devices.
     * @return {Object} Computed style with prefixed properties.
     */
    prefix() {
      return style => {
        const { order, flex } = style
        return _.omitBy(
          {
            "-webkit-box-ordinal-group": order + 1,
            "-webkit-order": order,
            "-moz-box-ordinal-group": order + 1,
            "-ms-flex-order": order,
            order: order,
            "-webkit-box-flex": flex,
            "-webkit-flex": flex,
            "-moz-box-flex": flex,
            "-ms-flex": flex,
            flex: flex
          },
          _.isNil
        )
      }
    },
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
     *     { urlPath: "/", name: "Home", position: "left", flex: 0.5, order { default: 1, sticky: 2 }},
     *     { urlPath: "/cv", name: "CV", position: "right", flex: 1, order { default: 3, sticky: 3 }},
     *   ],
     *   orderToggle: { default: 4, sticky: 4 },
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
      const orderToggle = {
        default: _.last(rightLinks).order.default + 1,
        sticky: _.last(rightLinks).order.sticky + 1
      }
      return {
        orderLogo,
        links: [...leftLinks, ...rightLinks],
        orderToggle
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
