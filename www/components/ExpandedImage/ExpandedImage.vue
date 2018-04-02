<template>
  <div v-if="isExpanded" class="expandedImage" @click="expand">
    <img :src="imageUrlPath" class="image" />
  </div>
</template>

<script>
export default {
  /**
   * @prop {Boolean} isExpanded Whether image item is expanded or not.
   * @prop {Boolean} imageUrlPath Image URL path of expanded image.
   */
  computed: {
    isExpanded() {
      return this.$store.state.isExpanded.isExpanded
    },
    imageUrlPath() {
      return this.$store.state.isExpanded.imageUrlPath
    }
  },

  methods: {
    /**
     * Toggles "off" for expanding image using Vuex `isExpanded` store.
     * It reset image URL path to null value.
     */
    expand: function() {
      this.$store.commit("toggle", {
        isExpanded: false,
        imageUrlPath: null
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.expandedImage {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: $image-expanded-index;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
}

.image {
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  padding: 20px;

  // Performance issue, for more informations
  // @see https://aerotwist.com/blog/on-translate3d-and-layer-creation-hacks/
  transform: translate3d(0, 0, 0);

  animation: opacityAnimate 0.4s ease-out;
}
</style>
