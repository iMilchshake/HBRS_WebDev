<template>
  <div id="app">
    <div id="nav">
      <router-link v-for="item in Object.keys(this.j['data'])" :key="item.id" :to="{path: item}">{{
          item
        }}
      </router-link>
    </div>
    <router-view name="submenu"/>
  </div>
</template>

<script>
import json_data from "./assets/data";
//import Home from "./views/Home";
import Menu from "../../a2/src/components/Menu";

export default {
  name: 'App',
  components: {},
  created() {
    console.log("json data: ", json_data)

    // generate paths
    Object.keys(json_data["data"]).forEach(x => {
      this.$router.addRoutes([{
        path: '/' + x,
        name: x,
        components: {
          submenu: Menu
        },
        props: {
          submenu: {
            elements: "['Menu1', 'Menu2', 'Menu3', 'Menu4']",
            direction: "row"
          }
        }
      }]);
      console.log(x);
    })
    console.log(this.$router.currentRoute);
    this.j = json_data;
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
}

#nav {
  display: flex;
  justify-content: center;
  gap: 10px;

  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
