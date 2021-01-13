<template>
  <div>
    <p> THIS WILL BE THE DYNAMIC SITE ! </p>
  </div>
</template>

<script>

// import json data
import json_data from "../assets/data";
import Home from "../views/Home";

// Vue Object
export default {
  name: "JsonLoader",
  created() {
    console.log("json data: ", json_data)

    // generate paths
    Object.keys(json_data["data"]).forEach(x => {
      this.$router.addRoutes([{
        path: '/'+x,
        name: x,
        component: Home
      }]);
      console.log(x);
    })
    console.log(this.$router.currentRoute);
    this.j = json_data;
  }
}

</script>

<style scoped>

</style>