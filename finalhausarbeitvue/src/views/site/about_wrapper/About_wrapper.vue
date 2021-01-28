<template>
  <div class="about_wrapper">
    <div class="nav">
      <router-link to="/site/about/about"> About 1 </router-link>
      <br>
      <router-link to="/site/about/about2"> About 2 </router-link>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>


</template>

<script>
export default {
  name: "About_wrapper"
}
</script>

<style scoped>
.about_wrapper {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
  height: 100%;
}
</style>