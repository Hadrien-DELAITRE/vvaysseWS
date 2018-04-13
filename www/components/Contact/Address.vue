<template>
  <p class="address" >{{ address }}</p>
</template>

<script>
export default {
  /**
   * @prop {String} address Address of Victor Vaysse to display in footer.
   */
  data() {
    return {
      address: "15 rue carnot, 93310, Le Pré-Saint-Gervais"
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.address {
  font-size: 12px;
  .main--light & {
    font-weight: 600;
  }
}
</style>
