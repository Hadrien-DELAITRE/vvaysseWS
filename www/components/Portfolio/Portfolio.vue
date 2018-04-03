<template>
  <div>
    <div
      v-for="([year, images], index) in portfolio"
      :key="index"
      class="portfolio"
    >
      <div class="yearTitle">
        <h2 class="year">{{ year }}</h2>
      </div>
      <ImageList :images="images"/>
    </div>
  </div>
</template>

<script>
import ImageList from "~/components/Portfolio/ImageList.vue"

export default {
  components: {
    ImageList
  },
  /**
   * @prop {Array<Array>} portfolio Array containing images as keyed-value
   * pairs for each years.
   */
  props: {
    portfolio: {
      type: Array,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.portfolio {
  padding-bottom: 20px;

  .yearTitle {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: 2px;
    margin-left: 10px;
    margin-right: 10px;

    border-bottom: 8px solid $icon-foreground-color;

    .year {
      font-family: "Roboto Condensed";
      font-weight: 600;
      font-size: 34px;
      color: white;

      margin: 0;

      @media #{$breakpoint-xs-s} {
        font-size: 26px;
      }
    }
  }
}
</style>
