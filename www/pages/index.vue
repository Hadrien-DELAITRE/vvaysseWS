<template>
  <main class="main">
    <Menu />
    <Portfolio :portfolio="portfolio"/>
    <ExpandedImage />
  </main>
</template>

<script>
import path from "path"
import url from "url"

import axios from "axios"
import _ from "lodash"

import ExpandedImage from "~/components/ExpandedImage/ExpandedImage.vue"
import Portfolio from "~/components/Portfolio/Portfolio.vue"
import Menu from "~/components/Menu/Menu.vue"

const yearRegex = /^(\d{4}).*/

export default {
  components: {
    Menu,
    Portfolio,
    ExpandedImage
  },

  /**
   * Handles async operation for getting images to display in page.
   * It retrieves images and formats it as keyed-value pairs for each years.
   *
   * @example
   * [
   *   ['2016', [{ imageUrlPath: 'foo.jpg' }, { imageUrlPath: 'bar.jpg' }]],
   *   ['2017', [{ imageUrlPath: 'qux.jpg' }, { imageUrlPath: 'corge.jpg' }]],
   * ]
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

    // Builds images by year using regex on filename.
    // Note: if file doesn't contains first 4 digits (/^(\d{4}).*/), it will be
    // omitted from the portfolio.
    const imagesByYear = _.reduce(
      images,
      (result, { imageUrlPath }) => {
        const matchingWords = path.basename(imageUrlPath).match(yearRegex)
        if (_.isNil(matchingWords)) {
          return result
        }
        const [, year] = matchingWords
        if (_.isNil(result[year])) {
          result[year] = []
        }
        result[year].push({ imageUrlPath })

        return result
      },
      {}
    )

    // Sorts portfolio by year and use a keyed-value pairs to preserve order
    // (instead of classical JS object).
    const portfolio = _.orderBy(
      _.toPairs(imagesByYear),
      [([year]) => parseInt(year, 10)],
      ["desc"]
    )

    return {
      portfolio
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  margin: 0;
}
</style>
