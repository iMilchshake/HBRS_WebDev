<template>
  <div id="app">
    <eingabe/>
    <eingabe/>
  </div>
</template>

<script>
import eingabe from "@/components/eingabe";

export default {
  name: 'App',
  components: {
    eingabe
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
