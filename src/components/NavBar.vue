<template>
  <div id="nav">
    <router-link :to="{ name: 'event-list' }">Event List</router-link>|
    <router-link :to="{ name: 'event-create' }">Create Event</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
