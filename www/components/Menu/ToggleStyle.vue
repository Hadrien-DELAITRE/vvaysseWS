<template>
  <div>
    <div class="toggleButtonStyle sun" @click="style" />
  </div>
</template>
<script>
export default {
  methods: {
    /**
     * Toggles "on/off" for styling site with dark or light theme using Vuex
     * `style` store.
     */
    style() {
      this.$store.commit("toggleStyle", {
        isLightStyle: !this.$store.state.style.isLightStyle
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.toggleButtonStyle {
  position: relative;
  z-index: $menu-toggle-index;
  cursor: pointer;
}

// Defines CSS sun icon.
.sun {
  width: 12px;
  height: 12px;
  border: 2px solid;
  border-radius: 50%;
  box-shadow: -9px 0 0 -5px, 9px 0 0 -5px, 0 -9px 0 -5px, 0 9px 0 -5px,
    7px 7px 0 -5px, -7px -7px 0 -5px, 7px -7px 0 -5px, -7px 7px 0 -5px;
  margin: 6px;
  transition: all 0.5s linear;

  &::before {
    content: "";
    pointer-events: none;
    position: absolute;
  }
}

// Defines CSS moon icon.
.main--light {
  .sun {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    overflow: hidden;
    margin: 2px;
    color: $main-background-color;
    border: none;
    box-shadow: none;
    margin: 2;

    &::before {
      content: "";
      pointer-events: none;
      position: absolute;
      width: 16px;
      height: 16px;
      top: -2px;
      left: 6px;
      border-radius: 50%;
      box-shadow: 0 0 0 28px;
    }
  }
}
</style>
