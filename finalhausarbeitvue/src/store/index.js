import {createStore} from 'vuex'

export default createStore({
    state: {
        topic: "",
        subtopic: "",
        show_menu: true,
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
            console.log("navigator is fetching data..", d);
        },
        switchMenu(state) {
            state.show_menu = !state.show_menu;
            //console.log(state.show_menu);
        }

    },
    actions: {},
    modules: {}
})
