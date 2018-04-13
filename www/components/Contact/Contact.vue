<template>
  <Mail class="contact" />
</template>

<script>
import Mail from "../Contact/Mail.vue"

export default {
  components: {
    Mail
  }
}
</script>

<style lang="scss" scoped>
.contact {
  text-align: center;
  color: white;
  transition: color $toggle-style-time-ease;

  .main--light & {
    color: $typo-color-highlight-light;
  }
}
</style>
