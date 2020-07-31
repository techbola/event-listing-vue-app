<template>
  <div class="event-card">
    <h1>Showing event {{ event.title }}</h1>
    <span>@{{ event.time }} on {{ event.date }}</span>
    <h4 class="title">{{ event.title }}</h4>
    <h5>Organized by {{ event.organizer ? event.organizer.name : "" }}</h5>
    <span>{{ event.attendees ? event.attendees.length : 0 }} attending</span>
  </div>
</template>

<script>
// import { mapState, mapActions } from "vuex";
import { mapState } from "vuex";
import NProgress from "nprogress";
import store from "@/store";

export default {
  props: ["id"],
  // components: {
  //   NProgress,
  // },
  beforeRouteEnter(routeTo, routeFrom, next) {
    NProgress.start();
    store.dispatch("event/fetchEvent", routeTo.params.id).then(() => {
      NProgress.done();
      next();
    });
  },
  // created() {
  //   this.fetchEvent(this.id);
  // },
  computed: {
    ...mapState({
      event: (state) => state.event.event,
    }),
  },
  // methods: {
  //   // ...mapActions("event/fetchEvent");
  //   ...mapActions("event", ["fetchEvent"])
  // }
};
</script>

<style lang="scss" scoped>
.event-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
.event-card > .title {
  margin: 0;
}
.event-link {
  color: black;
  text-decoration: none;
}
</style>
