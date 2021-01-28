<template>
  <div class="layout">
    <div class="heading">
      <h1> Tobias Schneider </h1>
      <div class="socialmedia">
        <a href="https://github.com/iMilchshake" class="fa fa-github"></a>
        <a href="mailto:Tobias20.3@hotmail.de" class="fas fa-envelope"></a>
      </div>
    </div>
    <div class="menu">
      <button class="menu_button" @click="$router.push('home')">Home</button>
      <button class="menu_button" @click="$router.push('about')">About</button>
    </div>
    <div class="side">
      <ul>
        <li>Übung 1</li>
        <li>Übung 2</li>
        <li>Übung 3</li>
        <li>Übung 4</li>
        <li>Übung 5</li>
        <li>Übung 6</li>
        <li>Übung 7</li>
      </ul>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main"
}
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto auto 1fr;
  width: 100%;
  height: 100%;
}

.heading {
  grid-area: 1 / 1 / span 1 / span 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  font-size: 23px;
}

.menu {
  grid-area: 2 / 1 / span 1 / span 2;
  background: #646464;
  position: sticky;
  top: 0;
  display: flex;
  gap: 0;
}

.menu_button {
  background-color: #646464;
  border: none;
  outline:none;
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

.side {
  grid-area: 3 / 1 / span 1 / span 1;
  background: lightgray;
}

.content {
  grid-area: 3 / 2 / span 1/ span 1;
  background: whitesmoke;
  padding: 5px;
}

body {
  margin: 0;
}

h1 {
  margin: 0;
}
</style>