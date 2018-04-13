<template>
  <footer class="footer">
    <Mail />
    <Address />
  </footer>
</template>

<script>
import Address from "../Contact/Address.vue"
import Mail from "../Contact/Mail.vue"
export default {
  components: {
    Address,
    Mail
  }
}
</script>

<style lang="scss" scoped>
.footer {
  color: $typo-color;
  background-color: $footer-background-color;
  padding: 10px;
  text-align: center;
  transition: color $toggle-style-time-ease,
    background-color $toggle-style-time-ease;

  .main--light & {
    color: $typo-color-light;
    background-color: white;
  }
}
</style>
