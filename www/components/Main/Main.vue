<template>
  <main>
    <div :class="{ 'main--light': isLightStyle }" class="main">
      <slot />
    </div>
  </main>
</template>
<script>
export default {
  /**
   * @prop {Boolean} isLightStyle Whether style is light or not.
   */
  computed: {
    isLightStyle() {
      return this.$store.state.style.isLightStyle
    }
  }
}
</script>

<style lang="scss">
.main {
  background-color: $main-background-color;
  transition: background-color $toggle-style-time-ease;

  &--light {
    background-color: $main-background-color-light;
  }
}
</style>
