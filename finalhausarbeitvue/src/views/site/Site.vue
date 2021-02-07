<template>
  <div class="layout">
    <div class="heading">
      <h1 @click="$router.push('/')"> Tobias Schneider </h1>
      <div class="socialmedia">
        <a class="icon" href="https://github.com/iMilchshake"><img src="@/assets/GitHub-Mark-64px.png"></a>
        <a class="icon" href="mailto:tobias.schneider@smail.inf.h-brs.de"><img src="@/assets/mail.png"></a>

      </div>
    </div>
    <div class="menu">
      <button class="menu_button" @click="$router.push('/site/home')">Home</button>
      <button class="menu_button" @click="$router.push('/site/navigator/')">Navigator</button>
      <button class="menu_button" @click="redirectToRouter()">Editor</button>
    </div>
    <div class="content_wrapper">
      <router-view/>
    </div>

  </div>
</template>

<script>
export default {
  name: "Site",
  methods: {
    redirectToRouter: function () {
      // check if user is already logged in
      fetch("editor/login_check.php").then(response => response.json()).then(json => {
        if (json["login"] === "True") {
          window.location.href = 'editor/main.html';
        } else {
          window.location.href = 'editor/login.html';
        }
      }).catch(error => console.error(error));
    }
  }
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
  /*background-color: #a9cbff;*/
  background-image: linear-gradient(to right, #cee2ff, #8aa5d0);
}

.socialmedia {
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  align-self: center;
}

.icon{
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
  border-radius: 32px;
  height: 64px;
}

.menu {
  grid-area: 2 / 1 / span 1 / span 1;
  background: #646464;
  position: sticky;
  top: 0;
  display: flex;
  gap: 0;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
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
  min-width: 105px;
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