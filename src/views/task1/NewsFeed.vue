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
      <template v-if="cards.length">
        <CardList
          @removeCard="removeCard"
          @editCard="editCard"
          :cards="filteredCards"
        />
        <div class="no-data p-4 text-center" v-if="!filteredCards.length">
          <p class="mb-0">
            No card found with your search. Try different text.
          </p>
        </div>
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
      cards: [],
    };
  },
  created() {
    this.cards = this.$store.getters.getListItems;
  },
  computed: {
    filteredCards() {
      //for search filter
      if (this.filterValue.filterType === "search") {
        if (!this.filterValue.value.length) return this.cards;
        return this.cards.filter((card) => {
          return card.title
            .toLowerCase()
            .includes(this.filterValue.value.toLowerCase());
        });
      } else if (this.filterValue.filterType === "sort") {
        //for sorting filter
        //using spread syntax so data will not mutate by sort function
        return [...this.cards].sort((a, b) => {
          //Ascending Order
          if (this.filterValue.value.order === "asc") {
            return a[this.filterValue.value.text] >
              b[this.filterValue.value.text]
              ? 1
              : -1;
          } else {
            //Descending Order
            return a[this.filterValue.value.text] >
              b[this.filterValue.value.text]
              ? -1
              : 1;
          }
        });
      } else {
        //for default on load
        return this.cards;
      }
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
      this.cards.splice(index, 1);
      //upadte state
      this.$store.dispatch("SET_LIST_ITEMS", this.cards);
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
