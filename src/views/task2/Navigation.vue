<template>
  <div class="navigation-bar">
    <b-navbar type="dark" variant="secondary">
      <b-navbar-nav>
        <b-nav-item to="sample1">Sample 1</b-nav-item>
        <b-nav-item to="sample2">Sample 2</b-nav-item>
        <b-nav-item to="sample3">Sample 3</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <div class="navigation-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "navigation-view",
};
</script>

<style scoped>
.navigation-container {
  background-color: #f4f4f4;
  padding: 15px;
  margin-top: 15px;
  border-radius: 5px;
}
</style>
