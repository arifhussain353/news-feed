import Vue from "vue";
import Vuex from "vuex";
//bind vuex with vue
Vue.use(Vuex);
export const store = new Vuex.Store({
    state: {
        list: []
    },
    getters: {
        getListItems: (state) => state.list,
    },
    mutations: {
        SET_LIST_ITEMS(state, payload) {
            state.list = payload;
        },
    },
    actions: {
        SET_LIST_ITEMS({commit}, payload) {
            commit("SET_LIST_ITEMS", payload);
        }
    },
});

