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

  data() {
    return {
      images: [{ name: "Foo" }, { name: "Bar" }]
    }
  }
}
</script>
