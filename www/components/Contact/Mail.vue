<template>
  <p class="mail" >{{ mail }}</p>
</template>

<script>
export default {
  /**
   * @prop {String} mail Mail of Victor Vaysse to display in footer.
   */
  data() {
    return {
      mail: "vaysse.victor@gmail.com"
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.mail {
  font-style: italic;
  margin-bottom: 5px;
}
</style>
