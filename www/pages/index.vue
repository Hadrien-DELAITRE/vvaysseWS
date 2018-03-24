<template>
  <main>
    <h1>Hello world !</h1>
    <ImageList :images="images"/>
  </main>
</template>

<script>
import path from "path"
import url from "url"

import axios from "axios"
import _ from "lodash"

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

    const { portfolioDirPath, staticDirPath } = store.state.config.app.www

    return {
      images: _.map(images, ({ fileName }) => ({
        imageUrlPath: path.join(
          portfolioDirPath.replace(staticDirPath, ""),
          fileName
        )
      }))
    }
  }
}
</script>
