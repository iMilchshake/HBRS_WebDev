<template>
  <div id="app">
    <h2> Menu horizontal</h2>
    <Menu v-bind:elements="['Menu1', 'Menu2', 'Menu3', 'Menu4']" direction="row"/>

    <br>
    <h2> Menu vertical </h2>
    <Menu v-bind:elements="['Menu1', 'Menu2', 'Menu3', 'Menu4']" direction="column"/>
  </div>
</template>

<script>
import Menu from "./components/Menu";

export default {
  name: 'App',
  components: {
    Menu
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
