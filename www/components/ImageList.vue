<template>
  <div>
    <ul class="imageList">
      <ImageItem
        v-for="(image, index) in images"
        :key="index"
        :image="image"
      />
    </ul>
  </div>
</template>

<script>
import ImageItem from "./ImageItem.vue"

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
  }
}
</script>
<style lang="scss" scoped>
.imageList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-left: $image-list-gutter;
  padding-right: $image-list-gutter;

  &::after {
    content: "";
    width: getItemWidth(10px, 2);

    @media #{$breakpoint-s-m} {
      width: getItemWidth(10px, 3);
    }
  }
}
</style>
