<template>
  <div>
    <div class="imageListWrapper">
      <ul
        ref="masonryList"
      >
        <div class="gutter" />
        <div class="sizer" />
        <ImageItem
          v-for="(image, index) in images"
          :key="index"
          :image="image"
          :class="{ 'item--first': index === 0 }"
          :masonry="masonry"
          :is-image-list-in-viewport="isInViewport"
          :is-lazyload-enabled="isLazyloadEnabled"
          class="item"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import inViewport from "vue-in-viewport-mixin"

import ImageItem from "~/components/Portfolio/ImageItem.vue"

let Masonry = null

// Only requires masonry layout for browser side.
if (process.browser) {
  Masonry = require("masonry-layout")
}

export default {
  components: { ImageItem },
  mixins: [inViewport],

  /**
   * @prop {Array<Object>} images Array containing images as object.
   * @prop {Array<Object>} isLazyloadEnabled Whether lazyload is enable or not
   *                       for this image list.
   */
  props: {
    images: {
      type: Array,
      required: true
    },
    isLazyloadEnabled: {
      type: Boolean,
      required: true
    }
  },

  /**
   * @prop {Boolean} isInViewport Whether component is in viewport or not.
   */
  data() {
    return {
      isInViewport: false
    }
  },

  watch: {
    /**
     * Defines if is some part of the component currently in the viewport.
     *
     * @param  {Boolean} isVisible Whether component is visible or not.
     */
    "inViewport.now": function(isVisible) {
      if (isVisible) {
        this.isInViewport = true
      }
    }
  },

  /**
   * Called synchronously after the instance is created.
   *
   * Initializes masonry framework with null value.
   */
  created() {
    this.masonry = null
  },

  /**
   * Called after the instance has been mounted, where el is replaced by the
   * newly created vm.$el. If the root instance is mounted to an in-document
   * element, vm.$el will also be in-document when mounted is called.
   *
   * In our implementation, we use it in order to initialize mansory layout when
   * - Vue component is mounted;
   */
  mounted() {
    this.masonry = new Masonry(this.$refs.masonryList, {
      columnWidth: ".sizer",
      gutter: ".gutter",
      percentPosition: true,
      transitionDuration: 0
    })
  }
}
</script>
<style lang="scss" scoped>
.imageListWrapper {
  min-height: 900px;
  display: flex;
  flex-wrap: wrap;

  margin-left: $image-list-gutter;
  margin-right: $image-list-gutter;

  ul {
    width: 100%;
    .gutter {
      width: $image-list-gutter;
      @media #{$breakpoint-xs-s} {
        width: ($image-list-gutter - 1);
      }
    }

    .sizer,
    .item {
      display: inline-block;

      // For Desktop screen, shows 4 items a row. Except for 2 first items.
      width: getItemWidth($image-list-gutter, 4);

      // For XS screen, shows 2 items a row. Except for the first item which is
      // full width.
      @media #{$breakpoint-xs-s} {
        width: getItemWidth($image-list-gutter, 2);
        &--first {
          width: getItemWidth($image-list-gutter, 1);
        }
      }

      // For M screen, shows 3 items a row. Except for two first items.
      @media #{$breakpoint-s-m} {
        width: getItemWidth($image-list-gutter, 3);
        &--first {
          width: getItemWidth($image-list-gutter, 1.5);
        }
      }
    }
  }
}
</style>
