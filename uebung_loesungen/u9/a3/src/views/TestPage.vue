<template>
  <div id="app">
    <p> Hello World :) </p>
    <p>{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="reset">0</button>
    </p>
    <JsonLoader/>
  </div>
</template>

<script>
import JsonLoader from "../components/JsonLoader";

export default {
  name: "TestPage",
  components: {JsonLoader},
  computed: {
    count() {
      return this.$store.state.count
    }
  },
  methods: {
    increment() {
      this.$store.commit('increment')
    },
    reset() {
      this.$store.commit('reset')
    }
  }

}
</script>

<style scoped>

</style>