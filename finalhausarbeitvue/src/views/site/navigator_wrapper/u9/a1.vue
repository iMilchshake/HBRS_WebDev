<template>
  <div id="a1">
    <eingabe/>
    <br>
    <eingabe/>
  </div>
</template>

<script>
import eingabe from '@/components/eingabe';

export default {
  name: "a1",
  components: {eingabe}
}
</script>

<style scoped>
#a1 {
  margin: 1em;
}
</style>