<template>
  <div id="a2">
    <h2> Menu horizontal</h2>
    <Menu v-bind:elements="['Menu1', 'Menu2', 'Menu3', 'Menu4']" direction="row"/>

    <br>
    <h2> Menu vertical </h2>
    <Menu v-bind:elements="['Menu1', 'Menu2', 'Menu3', 'Menu4']" direction="column"/>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue/";

export default {
  name: "a2",
  components: {Menu}
}
</script>

<style scoped>
#a2 {
  margin: 1em;
}
</style>