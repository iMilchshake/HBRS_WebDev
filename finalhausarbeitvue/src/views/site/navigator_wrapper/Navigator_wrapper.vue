<template>
  <div class="navigation_wrapper">
    <!-- nav-bar -->
    <div class="nav_navigator" v-show="menuState">
      <div class="topic_group" v-for="exercise in data" v-bind:key="exercise">
        <a @click="topicChange(exercise.exercise)"> {{ exercise.exercise }}</a>
        <div class="subtopic_group" v-if="exercise.exercise === topic">
          <a @click="subTopicChange(task.task)" v-for="task in exercise.tasks" v-bind:key="task">
            {{ task.task }}
          </a>
        </div>
      </div>
    </div>

    <!-- main content -->
    <div class="collapse_menu_wrapper">

      <!-- menu switch button -->
      <button class="switch_button" @click="switchMenu" v-if="menuState">&lt;</button>
      <button class="switch_button" @click="switchMenu" v-else>&gt;</button>

      <!-- actual content -->
      <div class="content" v-if="topic !== ''">
        <h1> {{ topic }} - {{ heading }}</h1>
        <hr>
        <div class="QA" v-if="subTopic !== ''">
          <h2> {{ taskData.task }} - {{ taskData.txt }} </h2>
          <div class="QA_section" v-for="subtask in taskData.subtasks" v-bind:key="subtask">

            <!-- question heading -->
            <h3> {{ subtask.q }} </h3>
            <p v-if="subtask['q_extra'] !== undefined"> {{ subtask['q_extra'] }}</p>

            <!-- image -->
            <div v-if="subtask['wireframe'] !== undefined">
              <img :src="subtask['wireframe']">
              <br>
            </div>

            <!-- link to video-image -->
            <div v-if="subtask['video_link'] !== undefined">
              <a target="_blank" rel="noopener noreferrer" :href="subtask['video_link']"> Link to Video! </a>
              <br>
            </div>

            <!-- answer-block -->
            <div v-if="subtask.a !== undefined" class="codeblock">
              <code> {{ subtask.a }}</code>
            </div>

            <!-- source-code block (only one subtask!) -->
            <div v-if="subtask.src !== undefined" class="codeblock">
              <code> {{ current_src }}</code>
            </div>

            <!-- link to solution -->
            <a v-if="subtask.path !== undefined" target="_blank" rel="noopener noreferrer" :href="subtask.path"> Link to
              Solution! </a>
            <router-link v-if="subtask.route !== undefined" :to="subtask.route"> Link to Solution!</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Navigator_wrapper",
  data: function () {
    return {
      current_src: ""  // dynamically fetched src-code will be saved here
    }
  },
  methods: {
    topicChange: function (topic) {
      //console.log("change topic to:", topic);
      this.$store.commit('changeTopic', topic);
      this.$store.commit('changeSubTopic', "");
    },
    subTopicChange(subtopic) {
      //console.log("change subtopic to:", subtopic);
      this.$store.commit('changeSubTopic', subtopic);
      const currentSubTopic = this.taskData;

      if (subtopic !== "" && currentSubTopic.subtasks.length === 1 && currentSubTopic.subtasks[0].src !== undefined) {
        this.getSource(currentSubTopic.subtasks[0].src); // TODO: XD
      }
    },
    switchMenu() {
      this.$store.commit('switchMenu');
    },
    async getSource(path) {
      const code = await fetch(path).then(x => x.text());
      this.current_src = code;
    }
  },
  computed: {
    data: function () {
      return this.$store.state.data;
    },
    topic() {
      return this.$store.state.topic;
    },
    subTopic() {
      return this.$store.state.subtopic;
    },
    exerciseData() {
      return this.data.find(e => e.exercise === this.topic);
    },
    taskData() {
      return this.exerciseData.tasks.find(t => t.task === this.subTopic);
    },
    heading() {
      const exercise = this.exerciseData;
      if (exercise != undefined) {
        return exercise['heading'];
      } else {
        return "";
      }
    },
    menuState() {
      return this.$store.state.show_menu;
    }
  },
  created() {
    fetch("./exercises.json")
        .then(x => x.json())
        .then(x => this.$store.commit("readData", x));
    this.topicChange("");
  }
}
</script>

<style scoped>

.switch_button {
  border-width: 1px; /* top right bottom left */
  border-style: solid solid solid solid;
  border-color: gray black black gray;
  background-color: gray;
  cursor: pointer;
  outline: none;
}

.codeblock {
  margin-bottom: 1em;
  padding: 12px 8px;
  background-color: #eff0f1;
  border-radius: 3px;
  border: 1px solid black;
  max-height: 600px;
  overflow: auto;
}

.QA_section h1, h2, h3, p, code {
  white-space: pre-wrap;
}

.QA_section code {
  word-break: break-all; /* break code pieces to allow responsive design TODO: remove /t's when too small*/
}

.navigation_wrapper {
  /*display: grid;*/
  /*grid-template-columns: auto 1fr;*/
  /*grid-template-rows: 1fr;*/
  display: flex;
  flex-direction: row;
  height: 100%;
}

.content {
  padding: 5px 30px 30px 30px;
}

/*.collapse_menu_wrapper {*/
/*  flex-grow: 1;*/
/*  flex-shrink: 1;*/
/*  flex-basis: 100%;*/
/*}*/

.nav_navigator {
  padding-top: 1em;
  display: flex;
  flex-direction: column;
  background: gray;
  width: 105px;
  cursor: pointer;
  user-select: none;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 105px;
}

.topic_group {
  display: flex;
  flex-direction: column;
  background: gray;
}

.subtopic_group {
  display: flex;
  flex-direction: column;
  background: lightgrey;
}

.topic_group a {
  padding-left: 0.5em;
}

.subtopic_group a {
  padding-left: 1em;
}

.topic_group a:hover {
  background: #696969;
}

.subtopic_group a:hover {
  background: #e0e0e0;
}

a {
  color: black;
}

img {
  max-height: 450px;
  max-width: 100%;
  height: auto;
}

@media (max-width: 600px) {
  .codeblock {
    font-size: 11px;
  }
}

</style>