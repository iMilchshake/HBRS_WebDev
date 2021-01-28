<template>
  <div id="app">
    <Main/>
  </div>
</template>

<script>
import Main from "./components/Main";

export default {
  name: 'App',
  components: {Main}
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  height: 100vh;
  width: 100%;
}

html, body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
}
</style>

<!--<meta charset="UTF-8">-->
<!--<title>Tobias Schneider</title>-->
<!--<meta name="viewport" content="width=device-width, initial-scale=1">-->

<!--&lt;!&ndash; fonts &ndash;&gt;-->
<!--<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">-->

<!--&lt;!&ndash; social media icons &ndash;&gt;-->
<!--<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">-->
<!--<script src="https://kit.fontawesome.com/022faa5e65.js" crossorigin="anonymous"></script>-->

<!--&lt;!&ndash; stylesheets &ndash;&gt;-->
<!--<link rel="stylesheet" href="style.css">-->
<!--<link rel="stylesheet" href="fa_icons.css">-->