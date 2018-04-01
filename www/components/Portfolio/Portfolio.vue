<template>
  <div>
    <div
      v-for="([year, images], index) in portfolio"
      :key="index"
      class="portfolio"
    >
      <div class="yearTitle">
        <icon name="calendar" class="calendar" scale="1.3" />
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
  margin-bottom: 20px;

  .yearTitle {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: 2px;
    margin-left: 10px;
    margin-right: 10px;

    border-bottom: 8px solid $icon-foreground-color;

    .calendar {
      color: $icon-foreground-color;
      margin-right: 5px;
    }

    .year {
      font-family: "Roboto Condensed";
      font-weight: 500;
      font-size: 26px;
      color: white;

      margin: 0;
    }
  }
}
</style>
