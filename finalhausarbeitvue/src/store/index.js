import {createStore} from 'vuex'

export default createStore({
    state: {
        topic: "",
        subtopic: "",
        data: []
    },
    mutations: {
        changeTopic(state, t) {
            if(state.topic !== t) {
                state.topic = t;
            } else {
                state.topic = "";
            }
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
