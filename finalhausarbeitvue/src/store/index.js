import {createStore} from 'vuex'

export default createStore({
    state: {
        topic: "",
        subtopic: "",
        data: []
    },
    mutations: {
        changeTopic(state, t) {
            state.topic = t;
        },
        changeSubTopic(state, st) {
            state.subtopic = st;
        },
        readData(state, d) {
            state.data = d;
            console.log("reading data..", d);
        }
    },
    actions: {},
    modules: {}
})
