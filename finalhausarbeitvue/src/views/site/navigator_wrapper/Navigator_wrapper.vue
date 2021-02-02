<template>
  <div class="navigation_wrapper">
    <div class="nav_navigator">
      <div class="topic_group" v-for="exercise in getData" v-bind:key="exercise">
        <router-link to="" @click="topicChange(exercise.exercise)"> {{ exercise.exercise }}</router-link>
        <div class="subtopic_group" v-if="exercise.exercise === getTopic">
          <router-link to="" @click="subTopicChange(task.task)" v-for="task in exercise.tasks" v-bind:key="task">
            {{ task.task }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="content" v-if="getTopic !== ''">
      <h1> {{ getTopic }} - {{ getHeading }}</h1>
      <hr>
      <div class="QA" v-if="getSubTopic !== ''">
        <h2> {{ getTaskData.task }} - {{ getTaskData.txt }} </h2>
        <br>
        <div class="QA_section" v-for="subtask in getTaskData.subtasks" v-bind:key="subtask">
          <div v-if="subtask.override === undefined">
            <h3> {{ subtask.q }} </h3>
            <p> {{ subtask.a }}</p>
          </div>
          <div v-else-if="subtask.override === 'html_wireframe'">
            <h3> {{ subtask.q }} </h3>
            <img v-if="subtask.wireframe !== undefined" :src="subtask.wireframe">
            <br>
            <a v-if="subtask.video_link !== undefined" target="_blank" rel="noopener noreferrer" :href=subtask.video_link> Link to Video! </a>
            <br>
            <a target="_blank" rel="noopener noreferrer" :href="subtask.path"> Link to Solution! </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Navigator_wrapper",
  methods: {
    topicChange: function (topic) {
      console.log("change topic to:", topic);
      this.$store.commit('changeTopic', topic)
      this.$store.commit('changeSubTopic', "")
    },
    subTopicChange(subtopic) {
      console.log("change subtopic to:", subtopic);
      this.$store.commit('changeSubTopic', subtopic)
    }
  },
  computed: {
    getData: function () {
      return this.$store.state.data;
    },
    getTopic() {
      return this.$store.state.topic;
    },
    getSubTopic() {
      return this.$store.state.subtopic;
    },
    getExerciseData() {
      return this.getData.find(e => e.exercise === this.getTopic);
    },
    getTaskData() {
      return this.getExerciseData.tasks.find(t => t.task === this.getSubTopic);
    },
    getHeading() {
      const exercise = this.getExerciseData;
      if (exercise != undefined) {
        return exercise['heading'];
      } else {
        return "";
      }
    }
  },
  created() {
    //this.topicChange("");
    //this.subTopicChange("");
  }
}
</script>

<style scoped>

.QA_section p, h3 {
  white-space: pre-wrap;
}

.nav_navigator {
  padding-top: 1em;
  display: flex;
  flex-direction: column;
  background: gray;
  width: 105px;
}

.subtopic_group {
  padding-left: 1em;
  display: flex;
  flex-direction: column;
  background: lightgrey;
}

.topic_group {
  display: flex;
  flex-direction: column;
  background: gray;
}

a {
  color: black;
}

img {
  max-width: 600px;
  max-height: 450px;
}

.navigation_wrapper {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
  height: 100%;
}
</style>