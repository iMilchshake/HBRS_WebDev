<template>
  <div id="app">
    <input v-model="message">
    <p>Message has {{ message.length}} characters ({{ message.split(" ").length - 1}} are whitespaces)</p>
    <p>Message has {{ message.split(" ").filter(x => x != "").length}} words</p>
  </div>
</template>

<script>
export default {
  name: "eingabe.vue",
  data: function () {
    return {
      message: "edit me"
    }
  }
}


</script>

<style scoped>
p {
  color: black;
}
</style>