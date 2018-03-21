<template>
  <li>
    <label>
      {{ image.name }}
    </label>
  </li>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      required: true
    }
  }
}
</script>
