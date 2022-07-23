<template>
  <div class="cards">
    <div v-for="(card, index) in cards" :key="card.id" class="card-box mb-4">
      <div class="card-inner">
        <div class="title d-flex">
          <h2>{{ card.title }}</h2>
          <div class="action-icons">
            <b-icon
              icon="pencil-square"
              title="Edit"
              variant="primary"
              font-scale="2"
              @click="$emit('editCard', card)"
            ></b-icon>
            <b-icon
              icon="trash"
              title="Remove"
              variant="danger"
              font-scale="2"
              @click="$emit('removeCard', index)"
            ></b-icon>
          </div>
        </div>
        <p class="author">{{ card.author }}</p>
        <p class="description">
          {{ card.body }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "card-list",
  props: {
    cards: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped>
.card-box .card-inner {
  padding: 30px;
  background-color: var(--bs-white);
  box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
  border-radius: 10px;
}
.card-box .author {
  color: var(--bs-gray-600);
  display: inline-block;
  padding: 3px 10px;
  border-radius: 5px;
  background-color: var(--bs-gray-400);
  margin-top: 5px;
}
.card-box .description {
  font-size: 1.2rem;
  margin: 0;
}
.card-box .action-icons {
  margin-left: auto;
}
.card-box .action-icons svg {
  cursor: pointer;
}
</style>
