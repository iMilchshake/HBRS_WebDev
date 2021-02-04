<template>
  <div class="navigation_wrapper">
    <!-- nav-bar -->
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

    <!-- main content -->
    <div class="content" v-if="getTopic !== ''">
      <h1> {{ getTopic }} - {{ getHeading }}</h1>
      <hr>
      <div class="QA" v-if="getSubTopic !== ''">
        <h2> {{ getTaskData.task }} - {{ getTaskData.txt }} </h2>
        <div class="QA_section" v-for="subtask in getTaskData.subtasks" v-bind:key="subtask">
          <div v-if="subtask.override === undefined">
            <h3> {{ subtask.q }} </h3>
            <div class="codeblock">
              <code> {{ subtask.a }}</code>
            </div>
          </div>
          <div v-else-if="subtask.override === 'html_wireframe'">
            <!-- question heading -->
            <h3> {{ subtask.q }} </h3>
            <p v-if="subtask.q_extra !== undefined"> {{ subtask.q_extra }}</p>

            <br>

            <!-- image -->
            <div v-if="subtask.wireframe !== undefined">
              <img :src="subtask.wireframe">
              <br>
            </div>

            <!-- link to video-image -->
            <div v-if="subtask.video_link !== undefined">
              <a target="_blank" rel="noopener noreferrer" :href=subtask.video_link> Link to Video! </a>
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
            <a v-if="subtask.path !== undefined" target="_blank" rel="noopener noreferrer" :href="subtask.path"> Link to Solution! </a>
            <router-link v-if="subtask.route !== undefined" :to="subtask.route"> Link to Solution! </router-link>
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
      current_src: ""
    }
  },
  methods: {
    topicChange: function (topic) {
      console.log("change topic to:", topic);
      this.$store.commit('changeTopic', topic);
      this.$store.commit('changeSubTopic', "");
    },
    subTopicChange(subtopic) {
      console.log("change subtopic to:", subtopic);
      this.$store.commit('changeSubTopic', subtopic);
      const currentSubTopic = this.getTaskData;

      if (subtopic !== "" && currentSubTopic.subtasks.length === 1 && currentSubTopic.subtasks[0].src !== undefined) {
        this.getSource(currentSubTopic.subtasks[0].src); // TODO: XD
      }
    },
    async getSource(path) {
      const code = await fetch(path).then(x => x.text());
      this.current_src = code;
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

.codeblock {
  margin-bottom: 1em;
  padding: 12px 8px;
  background-color: #eff0f1;
  border-radius: 3px;
  border: 1px solid black;
}

.QA_section h1, h2, h3, p, code {
  white-space: pre-wrap;
}

.QA_section code {
  word-break: break-all; /* break code pieces to allow responsive design TODO: remove /t's when too small*/
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
  max-height: 450px;
  max-width: 100%;
  height: auto;
}

.navigation_wrapper {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
  height: 100%;
}
</style>