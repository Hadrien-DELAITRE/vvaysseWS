<template>
  <li class="imageItem">
    <img
      :data-src="`${image.imageUrlPath}`"
      class="thumbnailImage"
      @click="expand" />
  </li>
</template>

<script>
export default {
  /**
   * @prop {Object} images Object image using `fileName` prop for filename.
   */
  props: {
    image: {
      type: Object,
      required: true
    }
  },

  methods: {
    /**
     * Toggles "on" for expanding image using Vuex `isExpanded` store.
     * It provides data about image URL path.
     */
    expand: function() {
      this.$store.commit("toggle", {
        isExpanded: true,
        imageUrlPath: this.image.imageUrlPath
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.imageItem {
  margin-bottom: $image-list-gutter / 2;

  .thumbnailImage {
    // Performance issue, for more informations
    // @see https://aerotwist.com/blog/on-translate3d-and-layer-creation-hacks/
    transform: translate3d(0, 0, 0);
    width: 100%;
    cursor: pointer;
  }
}
</style>
