import Vue from "vue";
import Vuex from "vuex";
import * as user from "@/store/modules/user.js"; // access the user module as this: user.state
import * as event from "@/store/modules/event.js";
import * as notification from "@/store/modules/notification.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    event,
    notification,
  },
  state: {
    categories: ["sustainability", "housing", "education", "food", "community"],
  },
});
