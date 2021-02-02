<template>
  <div id="NotFound" class="bg">
    <div class="center">
      <div class="caption">
        <h1> Hey, you got lost! </h1>
        <button type="button" class="welcome_button" @click="$router.push('/site/home')"> return to main page </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound"
}
</script>

<style scoped>

.welcome_button {
  background-color: rgba(0, 0, 0, 1);
  border: none;
  outline: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  height: 100%;
  border-radius: 4px;
}

.bg {
  background-image: url("../../assets/code_blurred.jpg");
  /*filter: blur(12px);
  -webkit-filter: blur(12px);
*/
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
}
</style>