<template>
  <div>
    <ul>
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
