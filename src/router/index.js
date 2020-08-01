import Vue from "vue";
import VueRouter from "vue-router";
import EventList from "../views/EventList.vue";
import NProgress from "nprogress";
import store from "@/store";
import NotFound from "../views/NotFound.vue";

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
    beforeEnter(routeTo, routeFrom, next) {
      NProgress.start();
      store.dispatch("event/fetchEvent", routeTo.params.id).then((event) => {
        routeTo.params.event = event;
        next();
      });
    },
  },
  {
    path: "/404",
    name: "404",
    component: NotFound,
  },
  {
    path: "*",
    redirect: { name: "404" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
