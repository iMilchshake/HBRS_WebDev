<template>
  <div class="menu" :style="cssVars">
    <button type="button" class="button" v-for="item in elements" :key="item.id"> {{ item }}</button>
  </div>
</template>

<script>
export default {
  name: "Menu",
  props: {
    elements: Array,
    direction: String
  },
  computed: {
    cssVars() {
      return {
        '--dir': this.direction,
      }
    }
  }
}
</script>

<style scoped>

.menu {
  display: flex;
  flex-direction: var(--dir);
}

.button {
  background-color: #646464;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: block;
  font-size: 16px;
  height: 100%;
  width: 200px;
}

.button:hover {
  background-color: #7c7c7c;
}

</style>