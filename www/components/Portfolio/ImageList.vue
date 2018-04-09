<template>
  <div>
    <div class="imageListWrapper">
      <ul
        v-masonry
        transition-duration="0.5s"
        percent-position="true"
        item-selector=".item"
        gutter=".gutter"
        column-width=".sizer">
        <div class="gutter" />
        <div class="sizer" />
        <ImageItem
          v-masonry-tile
          v-for="(image, index) in images"
          :key="index"
          :image="image"
          :class="{ 'item--first': index === 0 }"
          class="item" />
      </ul>
    </div>
  </div>
</template>

<script>
import ImageItem from "~/components/Portfolio/ImageItem.vue"

export default {
  components: { ImageItem },

  /**
   * @prop {Array<Object>} images Array containing images as object.
   */
  props: {
    images: {
      type: Array,
      required: true
    }
  },

  /**
   * Called after the instance has been mounted, where el is replaced by the
   * newly created vm.$el. If the root instance is mounted to an in-document
   * element, vm.$el will also be in-document when mounted is called.
   *
   * In our implementation, we use it in order to re-render mansory layout when
   * - Vue component is mounted;
   */
  mounted() {
    if (typeof this.$redrawVueMasonry === "function") {
      this.$redrawVueMasonry()
    }
  }
}
</script>
<style lang="scss" scoped>
.imageListWrapper {
  min-height: 150px;
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
