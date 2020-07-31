<template>
  <div>
    <h1>Create new event</h1>
    <form @submit.prevent="createEvent">
      <label>Select a category</label>
      <br />
      <select v-model="event.category">
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>

      <h3>Name & describe your event</h3>
      <div class="field">
        <label>Title</label>
        <br />
        <input type="text" v-model="event.title" placeholder="Event title" />
      </div>

      <div class="field">
        <label>Description</label>
        <br />
        <input type="text" v-model="event.description" placeholder="Event description" />
      </div>

      <h3>Where is your event?</h3>
      <div class="field">
        <label>Location</label>
        <br />
        <input type="text" v-model="event.location" placeholder="Event location" />
      </div>

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <br />
        <Datepicker v-model="event.date" placeholder="Select a date" />
      </div>

      <div class="field">
        <label>Select a time</label>
        <br />
        <select v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>

      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";

export default {
  components: {
    Datepicker
  },
  data() {
    const times = [];
    for (let i = 1; i <= 24; i++) {
      times.push(i + ":00");
    }
    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject()
    };
  },
  methods: {
    createEvent() {
      this.$store
        .dispatch("event/createEvent", this.event)
        .then(() => {
          this.$router.push({
            name: "event-show",
            params: { id: this.event.id }
          });
          this.event = this.createFreshEventObject();
        })
        .catch(() => {});
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user;
      const id = Math.floor(Math.random() * 10000000);

      return {
        id,
        user,
        category: "",
        organizer: user,
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        attendees: []
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.field {
  margin-bottom: 24px;
}
</style>
