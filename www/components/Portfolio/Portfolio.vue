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
      <ImageList
        :images="images"
        :is-lazyload-enabled="index !== 0"
        :in-viewport-offset-top="100"
        :in-viewport-once="true"
      />
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
    justify-content: flex-start;
    align-items: center;

    margin-bottom: 2px;
    margin-left: 10px;
    margin-right: 10px;

    border-bottom: 8px solid $border-foreground-color;
    transition: border-color $toggle-style-time-ease;

    .year {
      font-family: "Roboto Condensed";
      font-weight: 600;
      font-size: 30px;
      color: $main-background-color-light;
      transition: color $toggle-style-time-ease;

      margin: 0;

      @media #{$breakpoint-xs-s} {
        font-size: 26px;
      }

      .main--light & {
        color: $typo-color-title;
      }
    }

    .main--light & {
      border-color: $typo-color-highlight-light;
    }
  }
}
</style>
