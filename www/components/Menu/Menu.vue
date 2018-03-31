<template>
  <header :style="{ paddingTop: paddingTop + 'px' }">
    <div :class="{ sticky: isScrolled }" class="title">
      <h1 v-if="isScrolled">
        <p>
          <span class="top-v">V</span>
          <span class="bot-v">V</span>
        </p>
      </h1>
      <h1 v-else>
        <p>
          <span>Victor</span>
          <span>Vaysse</span>
        </p>
      </h1>
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

export default {
  /**
   * @prop {Boolean} isScrolled Whether menu is scrolled or not.
   * @prop {Boolean} paddingTop Defines padding top CSS style for header tag.
   */
  data() {
    return {
      isScrolled: false,
      paddingTop: 0
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
