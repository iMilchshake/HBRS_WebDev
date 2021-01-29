<template>
  <div class="about_wrapper">
    <div class="nav_navigator">
      <div class="topic_group" v-for="topic in getData" v-bind:key="topic">
        <router-link to="" @click="topicChange(topic.head)"> {{ topic.head }}</router-link>
        <div class="subtopic_group" v-if="topic.head == getTopic">
          <router-link to="" v-for="subtopic in topic.children" v-bind:key="subtopic"> {{ subtopic }}</router-link>
        </div>
      </div>
    </div>
    <div class="content">
      <h2> current topic is: {{getTopic}}</h2>
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
    }
  },
  created() {
    this.topicChange("");
    this.subTopicChange("");
  }
}
</script>

<style scoped>
.nav_navigator {
  padding: 10px 15px;
  background: lightgray;
  display: flex;
  flex-direction: column;
  background: gray;
}

.subtopic_group {
  display: flex;
  flex-direction: column;
  background: white;
}

.subtopic_group a {
  color: black;
}

.topic_group {
  display: flex;
  flex-direction: column;
  background: darkgray;
}

.about_wrapper {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
  height: 100%;
}
</style>