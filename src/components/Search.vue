<template>
  <!-- emit passing filter data and filter type -->
  <input
    class="form-control my-0 py-2 d-inline-block ms-2 w-auto"
    type="text"
    @input="$emit('searchByText', { filterType: 'search', value: text })"
    v-model="text"
    placeholder="Search a card by title..."
    aria-label="Search"
  />
</template>

<script>
export default {
  name: "search-component",
  data() {
    return {
      text: "",
    };
  },
};
</script>
>
