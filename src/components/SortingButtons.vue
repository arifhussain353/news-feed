<template>
  <div class="sorting-buttons d-inline-block">
    <span>Sort By:</span>
    <b-button
      v-for="button in buttons"
      :key="button.text"
      variant="outline-primary"
      :class="{ active: button.active }"
      @click="sort(button)"
    >
      <b-icon
        v-if="button.active"
        :icon="button.order === 'asc' ? 'sortUp' : 'sortDown'"
        title="Sorting"
      ></b-icon>
      {{ button.text }}</b-button
    >
  </div>
</template>

<script>
export default {
  name: "sorting-buttons-component",
  data() {
    return {
      buttons: [
        {
          text: "title",
          active: false,
          order: "asc",
        },
        {
          text: "author",
          active: false,
          order: "asc",
        },
        {
          text: "body",
          active: false,
          order: "asc",
        },
      ],
    };
  },
  methods: {
    reset() {
      this.buttons.map((b) => {
        b.active = false;
      });
    },
    sort(data) {
      this.reset();
      data.active = true;
      //passing filter data and filter type
      this.$emit("sortByFilter", { filterType: "sort", value: data });
      if (data.order === "asc") {
        data.order = "desc";
      } else {
        data.order = "asc";
      }
    },
  },
};
</script>
<style scoped>
.sorting-buttons button {
  margin-left: 10px;
}
</style>
