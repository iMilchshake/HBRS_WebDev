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
      <button class="menu_button" @click="$router.push('/site/home')">Start</button>
      <button class="menu_button" @click="$router.push('/site/navigator/')">Navigator</button>
      <button class="menu_button" @click="redirectToRouter()">Editor</button>
      <button class="menu_button" @click="$router.push('/site/navigator/')">TicTacToe</button>
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
          window.location.href = './editor/main.html';
        } else {
          window.location.href = './editor/login.html';
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
  background-image: linear-gradient(to right, #cee2ff, #8aa5d0);
  user-select: none;
}

.socialmedia {
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  align-self: center;
}

.icon {
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
  border-radius: 32px;
  height: 64px;
}

.content_wrapper {
  grid-area: 3 / 1 / span 1/ span 1;
  background: whitesmoke;
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
  cursor: pointer;
}

@media (max-width: 600px) {
  .socialmedia {
    display: none;
    visibility: hidden;
  }

  .icon {
    display: none;
  }
}

@media (max-width: 480px) {
  .menu_button {
    padding-left: 0;
    padding-right: 0;
    min-width: 0;
    width: auto;
  }

  .menu {
    gap: 8px;
    justify-content: space-around;
  }

  .heading {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
}


</style>