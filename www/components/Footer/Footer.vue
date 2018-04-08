<template>
  <footer class="footer">
    <p class="mail" >{{ mail }}</p>
    <p class="address" >{{ address }}</p>
  </footer>
</template>

<script>
export default {
  /**
   * @prop {String} mail Mail of Victor Vaysse to display in footer.
   * @prop {String} address Address of Victor Vaysse to display in footer.
   */
  data() {
    return {
      mail: "vaysse.victor@gmail.com",
      address: "15 rue carnot, 93310, Le Pré-Saint-Gervais"
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  color: $typo-color;
  background-color: $footer-background-color;
  padding: 10px;
  text-align: center;

  p {
    margin: 0;
  }

  .mail {
    font-style: italic;
    margin-bottom: 5px;
  }

  .address {
    font-size: 12px;
  }
}
</style>
