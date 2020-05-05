import Vue from "vue";
import VueRouter from "vue-router";
import EventList from "../views/EventList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList,
  },
  {
    path: "/create/event",
    name: "event-create",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/EventCreate.vue"),
  },
  {
    path: "/event/:id",
    name: "event-show",
    component: () => import("../views/EventShow.vue"),
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
