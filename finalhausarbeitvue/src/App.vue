<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
//const jsonData = require("./exercises.json")
export default {
  name: 'App',
  components: {},
  created() {
    fetch("./exercises.json")
        .then(x => x.json())
        .then(x => this.$store.commit("readData", x));
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  min-height: 100vh;
  width: 100%;
}

html, body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
}

html {
  height: 100%;
}

body {
  min-height: 100%;
}

.content {
  padding: 30px;
}

.nav {
  padding: 10px 15px;
  background: lightgray;
  display: flex;
  flex-direction: column;
}

.nav a {
  font-weight: bold;
  color: #2c3e50;
}

.nav a.router-link-exact-active {
  color: white;
}
</style>