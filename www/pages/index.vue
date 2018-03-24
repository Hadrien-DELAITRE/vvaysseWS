<template>
  <main>
    <h1>Hello world !</h1>
    <ImageList :images="images"/>
  </main>
</template>

<script>
import url from "url"

import axios from "axios"

import ImageList from "~/components/ImageList.vue"

export default {
  components: {
    ImageList
  },

  /**
   * Handles async operation for getting images to display in page.
   *
   * @param  {Object} store Store app retrieved from context.
   * @return {Object} Returns images from HTTP API result.
   */
  async asyncData({ store }) {
    const { hostname, port, protocol } = store.state.config.app.api
    const imagesApiUrl = url.format({
      hostname,
      port,
      protocol,
      pathname: "images"
    })
    const { data: images } = await axios.get(imagesApiUrl)

    return {
      images
    }
  }
}
</script>
