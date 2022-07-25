<template>
  <div class="main-container">
    <card-modal :type="type" :selected-data="selectedItem"></card-modal>
    <div class="card-table">
      <div class="app-title">
        <h3>Welcome to NewsFeed</h3>
      </div>

      <div class="table-filters d-flex">
        <div class="table-left">
          <b-button class="mb-3" variant="primary" @click="addCard()"
            >Add Card</b-button
          >
        </div>
        <div class="table-right ms-auto">
          <SortingButtons @sortByFilter="filterValue = $event" />
          <Search @searchByText="filterValue = $event" />
        </div>
      </div>
      <template v-if="filteredCards.length">
        <CardList
          @removeCard="removeCard"
          @editCard="editCard"
          :cards="filteredCards"
        />
      </template>

      <div class="no-data p-4 text-center" v-else>
        <p class="mb-0">No data found.</p>
      </div>
    </div>
  </div>
</template>

<script>
import CardModal from "@/components/CardModal.vue";
import Search from "@/components/Search.vue";
import SortingButtons from "@/components/SortingButtons.vue";
import CardList from "@/components/CardList.vue";
export default {
  name: "news-feed",
  components: {
    CardModal,
    Search,
    SortingButtons,
    CardList,
  },
  data() {
    return {
      type: "",
      selectedItem: {},
      filterValue: "",
    };
  },

  computed: {
    filteredCards() {
      //passing filter arguments
      return this.$store.getters.getListItems(this.filterValue);
    },
  },
  methods: {
    editCard(item) {
      this.type = "edit";
      this.selectedItem = item;
      this.$bvModal.show("edit-modal");
    },
    addCard() {
      this.type = "add";
      this.$bvModal.show("edit-modal");
    },
    removeCard(index) {
      //upadte state
      this.$store.dispatch("SET_LIST_ITEMS", { index: index, vm: this });
    },
  },
};
</script>
<style scoped>
.app-title h3 {
  text-align: center;
  margin-top: 20px;
}
.no-data {
  background-color: var(--bs-white);
  border-radius: 10px;
}
</style>
