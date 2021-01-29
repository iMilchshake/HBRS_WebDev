import {createStore} from 'vuex'

export default createStore({
    state: {
        topic: "",
        subtopic: "",
        data: [
            {
                head: "Entry 1",
                children: ["Sub1_1", "Sub1_2"]
            },
            {
                head: "Entry 2",
                children: ["Sub2_1", "Sub2_2"]
            },
            {
                head: "Entry 3",
                children: ["Sub3_1", "Sub3_2"]
            },
            {
                head: "Entry 4",
                children: ["Sub4_1", "Sub4_2"]
            }
        ]
    },
    mutations: {
        changeTopic(state, t) {
            state.topic = t;
        },
        changeSubTopic(state, st) {
            state.subtopic = st;
        }
    },
    actions: {},
    modules: {}
})
