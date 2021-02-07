<template>
  <div class="layout">
    <div class="heading">
      <h1 @click="$router.push('/')"> Tobias Schneider </h1>
      <div class="socialmedia">
        <a href="https://github.com/iMilchshake" class="fa fa-github"></a>
        <a href="mailto:Tobias20.3@hotmail.de" class="fas fa-envelope"></a>
      </div>
    </div>
    <div class="menu">
      <button class="menu_button" @click="$router.push('/site/home')">Home</button>
      <button class="menu_button" @click="$router.push('/site/about/about')">About</button>
      <button class="menu_button" @click="$router.push('/site/navigator/')">Navigator</button>
      <button class="menu_button" onclick="window.location.href = './editor/login.html'">Editor</button>
    </div>
    <div class="content_wrapper">
      <router-view/>
    </div>

  </div>
</template>

<script>
export default {
  name: "Site"
}
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr;
  width: 100%;
  min-height: 100vh;
}

.heading {
  grid-area: 1 / 1 / span 1 / span 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 23px;
  background-color: #a9cbff;
}

.menu {
  grid-area: 2 / 1 / span 1 / span 1;
  background: #646464;
  position: sticky;
  top: 0;
  display: flex;
  gap: 0;
}

.content_wrapper {
  grid-area: 3 / 1 / span 1/ span 1;
  background: whitesmoke;
}

.menu_button {
  background-color: #646464;
  border: none;
  outline: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  height: 100%;
}

.menu_button_current {
  background-color: #7c7c7c;
}

.menu_button:hover {
  background-color: whitesmoke;
  color: black;
}

body {
  margin: 0;
}

h1 {
  margin: 0;
}
</style>