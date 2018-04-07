<template>
  <div class="categoryWrapper">
    <div class="category">
      <div class="name">{{ _.toUpper(category.name) }}</div>
      <div class="stories">
        <div
          v-for="(story, index) in category.stories"
          :key="index"
          class="line"
        >
          <div class="dates">
            <p
              v-for="(date, index) in story.dates"
              :key="index"
              :class="{ 'dateRange': index !== 0 }"
            >
              {{ date }}
            </p>
          </div>
          <!-- Description text is inserted in a raw HTML way because it
          contains some tags that defines CSS styles. Thus, it's possible to add
          simply more description with some styles without build a big feature -->
          <div class="description" v-html="story.description" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  /**
   * @prop {Object} categories Object containing category of a CV. It defines:
   *                           - name: Name of category.
   *                           - stories: Array of stories.
   *                           - stories.dates: Dates of story.
   *                           - stories.description: Description of story.
   */
  props: {
    category: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import "./_category.scss";
</style>
