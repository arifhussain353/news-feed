//import vue and vue-router
import Vue from "vue";
import Router from "vue-router";
//import view components
import NewsFeed from "@/views/task1/NewsFeed.vue";
import Navigation from "@/views/task2/Navigation.vue";
import Page404 from "@/views/otherPages/Page404.vue";
import Sample1 from "@/views/task2/navigationPages/Sample1.vue";
import Sample2 from "@/views/task2/navigationPages/Sample2.vue";
import Sample3 from "@/views/task2/navigationPages/Sample3.vue";

//bind vue router with vue
Vue.use(Router);
const router = new Router({
	routes: [
		{
			path: "*",
			component: Page404,
			name: "page404",
			meta: {
				title: "404 Page not found",
			},
		},
		{
			path: "/",
			redirect:'/news-feed'
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
			children:[
				{
					path: "/",
					redirect:'sample1'
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
				}
			]
		},
	
	],
    mode: 'history',
    linkActiveClass: "active",
});
export default router;