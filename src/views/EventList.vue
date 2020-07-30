<template>
  <div>
    <h1>Events Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1 }}" rel="prev">Prev Page</router-link>
    </template> |
    <template v-if="eventsTotal > (page * 2)">
      <router-link :to="{ name: 'event-list', query: { page: page + 1 }}" rel="next">Next Page</router-link>
    </template>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import { mapState } from "vuex";

export default {
  components: {
    EventCard
  },
  data() {
    return {
      totalPages: 0
    };
  },
  created() {
    this.$store.dispatch("fetchEvents", {
      perPage: 2,
      page: this.page
    });
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    ...mapState(["events", "eventsTotal"])
  }
};
</script>
