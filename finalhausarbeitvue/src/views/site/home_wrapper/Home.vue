<template>
  <div class="content">
    <h2> Startseite </h2>
    <hr>
    <h3> Herzlich Willkommen! </h3>
    <p> Diese Website ist im Rahmen der Lehrveranstaltung <a
        href="https://eva2.inf.h-brs.de/studium/curriculum/2017/matrix/bi/398/de/"> Einführung in Web Engineering </a>
      von Prof. Dr. Kaul entstanden. In der Menüleiste kann man einen Navigator wählen, mit welchem man sich meine
      Lösungen zu den Übungsaufgaben der Lehrveranstaltung anschauen kann.</p>

    <h3> Credits: </h3>
    <ul>
      <li> Email-logo: <a href='https://www.freepik.com/vectors/cards'>Cards vector created by makyzz -
        www.freepik.com</a></li>
      <li> Font: <a
          href="https://fonts.google.com/specimen/Roboto+Condensed?preview.text_type=custom&sidebar.open=true&selection.family=Roboto+Condensed">
        Roboto Condensed by Christian Robertson</a></li>
    </ul>

    <h3> Kontakt: </h3>
    <ul>
      <li><a href="https://github.com/iMilchshake">Github</a></li>
      <li><a href="mailto:tobias.schneider@smail.inf.h-brs.de">via Mail</a></li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "Home",
  components: {}
}
</script>

<style scoped>
.content {
  max-width: 800px;
}

a {
  color: black;
}

a:hover {
  color: gray;
}
</style>