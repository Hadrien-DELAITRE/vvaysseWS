<template>
  <main class="main">
    <Menu />
    <ImageList :images="images"/>
  </main>
</template>

<script>
import url from "url"

import axios from "axios"

import ImageList from "~/components/ImageList.vue"
import Menu from "~/components/Menu/Menu.vue"

export default {
  components: {
    Menu,
    ImageList
  },

  /**
   * Handles async operation for getting images to display in page.
   *
   * @param  {Object} store Store app retrieved from context.
   * @return {Object} Returns images from HTTP API result.
   */
  async asyncData({ store }) {
    const { hostname, protocol } = store.state.config.app.api
    const imagesApiUrl = url.format({
      hostname,
      protocol,
      pathname: "images"
    })
    const { data: images } = await axios.get(imagesApiUrl).catch(() => ({
      data: []
    }))

    return {
      images
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  margin: 0;
  background-color: $main-background-color;
}
</style>
