//import vue and vue-router
import Vue from "vue";
import Router from "vue-router";
//import components as lazy load
const NewsFeed = () => import("@/views/task1/NewsFeed.vue");
const Navigation = () => import("@/views/task2/Navigation.vue");
const Page404 = () => import("@/views/otherPages/Page404.vue");
const Sample1 = () => import("@/views/task2/navigationPages/Sample1.vue");
const Sample2 = () => import("@/views/task2/navigationPages/Sample2.vue");
const Sample3 = () => import("@/views/task2/navigationPages/Sample3.vue");

//bind vue router with vue
Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/news-feed",
    },
    {
      path: "/news-feed",
      component: NewsFeed,
      meta: {
        title: "News Feed Listing",
      },
    },
    {
      path: "/navigations/",
      component: Navigation,
      meta: {
        title: "Router Navigation View",
      },
      children: [
        {
          path: "/",
          redirect: "sample1",
        },
        {
          path: "sample1",
          component: Sample1,
          meta: {
            title: "Sample page 1",
          },
        },
        {
          path: "sample2",
          component: Sample2,
          meta: {
            title: "Sample page 2",
          },
        },
        {
          path: "sample3",
          component: Sample3,
          meta: {
            title: "Sample page 3",
          },
        },
      ],
    },
    {
      path: "*",
      component: Page404,
      name: "page404",
      meta: {
        title: "404 Page not found",
      },
    },
  ],
  mode: "history",
  linkActiveClass: "active",
});
export default router;
