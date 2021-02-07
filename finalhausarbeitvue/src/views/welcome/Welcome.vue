<template>
  <div id="welcome" class="bg">
    <div class="center">
      <div class="caption">
        <h1> Hey, im Tobi! </h1>
        <hr>
        <button type="button" class="welcome_button" @click="$router.push('/site/home')"> check out my site</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome"
}
</script>

<style scoped>

hr {
  width: 100%;
}

h1 {
  margin: 2em 1em;
}

.welcome_button {
  background-color: white;
  border: none;
  outline: none;
  color: #000000;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  height: 100%;
  border-radius: 4px;
  margin: 1.5em 1em 0.5em 1em;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.welcome_button:hover {
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
  background-color: ghostwhite;
}

.bg {
  background-image: linear-gradient(#cee2ff, #8aa5d0);
  width: 100%;
  min-height: 100vh;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
}

.caption {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 1em;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
}
</style>