<template>
  <li>
    <img :src="`${image.imageUrlPath}`" />
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
  }
}
</script>
