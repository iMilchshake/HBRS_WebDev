<template>
  <div id="app">
    <p> this is text {{ 3 + 3 }} :) </p>
    <input v-model="message" placeholder="edit me">
    <p>Message is: {{ message }}</p>
  </div>
</template>

<script>
export default {
  name: "eingabe.vue",
  data: function () {
    return {
      message: "message default"
    }
  }
}


</script>

<style scoped>
p {
  color: red;
}
</style>