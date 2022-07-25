import Vue from "vue";
import Vuex from "vuex";
//bind vuex with vue
Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    list: [],
  },
  getters: {
    getListItems: (state) => (filterValue) => {
      if (filterValue.filterType === "search") {
        if (!filterValue.value.length) return state.list;
        return state.list.filter((card) => {
          return card.title
            .toLowerCase()
            .includes(filterValue.value.toLowerCase());
        });
      } else if (filterValue.filterType === "sort") {
        //for sorting filter
        //using spread syntax so data will not mutate by sort function
        return [...state.list].sort((a, b) => {
          //Ascending Order
          if (filterValue.value.order === "asc") {
            return a[filterValue.value.text] > b[filterValue.value.text]
              ? 1
              : -1;
          } else {
            //Descending Order
            return a[filterValue.value.text] > b[filterValue.value.text]
              ? -1
              : 1;
          }
        });
      } else {
        //for default on load
        return state.list;
      }
    },
  },
  mutations: {
    SET_LIST_ITEMS(state, payload) {
      state.list = payload;
    },
  },
  actions: {
    SET_LIST_ITEMS({ commit, state }, payload) {
      let cards = state.list;
      //add new card
      if (payload.type === "add") {
        payload.data.id = Date.now(); // generating unique ID ( It will generate from Back-end side)
        cards.push(payload.data);
        payload.vm.$bvToast.toast("New card successfully added.", {
          title: "Successfully added!",
          toaster: "b-toaster-bottom-right",
          variant: "success",
        });
        commit("SET_LIST_ITEMS", cards);
      } else if (payload.type === "edit") {
        //edit current card
        cards.map((card) => {
          if (card.id === payload.selectedData.id) {
            card.title = payload.data.title;
            card.author = payload.data.author;
            card.body = payload.data.body;
          }
        });
        payload.vm.$bvToast.toast("Card successfully updated.", {
          title: "Successfully updated!",
          toaster: "b-toaster-bottom-right",
          variant: "success",
        });
        commit("SET_LIST_ITEMS", cards);
      } else {
        cards.splice(payload.index, 1);
        commit("SET_LIST_ITEMS", cards);
      }
      payload.vm.$bvModal.hide("edit-modal");
    },
  },
});
