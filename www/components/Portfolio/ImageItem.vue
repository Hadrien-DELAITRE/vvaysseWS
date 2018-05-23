<template>
  <li class="imageItem">
    <img
      :data-src="isLazyloadEnabled ? `${image.imageUrlPath.small}` : null"
      :class="isImageLoaded ? '' : 'hide'"
      :src="isImageReadyToLoad ? `${image.imageUrlPath.small}` : null"
      class="thumbnailImage"
      @click="expand"
      @load="onImageLoaded"
    />
  </li>
</template>

<script>
export default {
  /**
   * @prop {Object} images Object image using `fileName` prop for filename.
   * @prop {Function} masonry Handles all masonry framework.
   * @prop {Function} isImageListInViewport Defines whether related image list
   *                                        in viewport or not.
   * @prop {Function} isLazyloadEnabled Defines whether lazyload image is
   *                                        enabled or not.
   */
  props: {
    image: {
      type: Object,
      required: true
    },
    masonry: {
      type: Object,
      required: false,
      default: null
    },
    isImageListInViewport: {
      type: Boolean,
      required: true
    },
    isLazyloadEnabled: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      isImageReadyToLoad: !this.isLazyloadEnabled,
      isImageLoaded: false
    }
  },

  watch: {
    isImageListInViewport: function(
      nextIsImageListInViewport,
      prevIsImageListInViewport
    ) {
      if (nextIsImageListInViewport && !prevIsImageListInViewport) {
        this.isImageReadyToLoad = true
      }
    }
  },

  methods: {
    /**
     * Toggles "on" for expanding image using Vuex `expand` store.
     * It provides data about image URL path.
     */
    expand: function() {
      this.$store.commit("toggleExpand", {
        isExpanded: true,
        imageUrlPath: this.image.imageUrlPath.default
      })
    },
    onImageLoaded: function() {
      this.isImageLoaded = true
      this.masonry.layout()
    }
  }
}
</script>
<style lang="scss" scoped>
.imageItem {
  margin-bottom: $image-list-gutter / 2;

  img {
    transition: opacity 0.5s linear;
  }

  .hide {
    opacity: 0;
  }

  .thumbnailImage {
    // Performance issue, for more informations
    // @see https://aerotwist.com/blog/on-translate3d-and-layer-creation-hacks/
    transform: translate3d(0, 0, 0);
    width: 100%;
    cursor: pointer;
  }
}
</style>
