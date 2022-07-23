<template>
  <div id="app">
    <b-navbar type="dark" variant="secondary">
      <b-navbar-nav>
        <b-nav-item to="/news-feed">Task 1</b-nav-item>
        <b-nav-item to="/navigations/">Task 2</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <b-container>
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
body {
  background-color: rgb(245, 245, 245);
}
.container {
  background-color: #f4f4f4;
  padding: 15px;
  margin-top: 15px;
  border-radius: 5px;
}
.b-icon {
  cursor: pointer;
}
.toast:not(.show) {
  display: block !important;
}
</style>
