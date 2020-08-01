import EventService from "@/services/EventService.js";

export const namespaced = true;

export const state = {
  events: [],
  todos: [
    { id: 1, text: "...", done: true },
    { id: 2, text: "...", done: false },
    { id: 3, text: "...", done: true },
    { id: 4, text: "...", done: false },
  ],
  eventsTotal: 0,
  event: {},
};

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal;
  },
  SET_EVENT(state, event) {
    state.event = event;
  },
};

export const actions = {
  createEvent({ commit, dispatch }, event) {
    // accessing states from another module using the rootState
    // e.g accessing user module from event...
    // rootState.user.user.name

    // if calling action from another module
    // dispatch('moduleName/actionToCall', null, { root: true })

    return EventService.postEvent(event)
      .then(() => {
        commit("ADD_EVENT", event);
        const notification = {
          type: "success",
          message: "Your event has been created!",
        };
        dispatch("notification/add", notification, { root: true });
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "There was a problem creating your event: " + error.message,
        };
        dispatch("notification/add", notification, { root: true });
        throw error;
      });
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then((response) => {
        commit("SET_EVENTS_TOTAL", response.headers["x-total-count"]);
        commit("SET_EVENTS", response.data);
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "There was a problem fetching events: " + error.message,
        };
        dispatch("notification/add", notification, { root: true });
      });
  },
  fetchEvent({ commit, getters, dispatch }, event_id) {
    let event = getters.getEventById(event_id);
    if (event) {
      commit("SET_EVENT", event);
      return event;
    } else {
      // Ensure API promise gets returned, so then() will work where the action is being implemented
      return EventService.getEvent(event_id)
        .then((response) => {
          commit("SET_EVENT", response.data);
          return response.data;
        })
        .catch((error) => {
          const notification = {
            type: "error",
            message: "There was a problem fetching event: " + error.message,
          };
          dispatch("notification/add", notification, { root: true });
        });
    }
  },
};

export const getters = {
  catLength: (state) => {
    return state.categories.length;
  },
  getEventById: (state) => (id) => {
    return state.events.find((event) => event.id == id);
  },
  doneTodos: (state) => {
    return state.todos.filter((todo) => todo.done);
  },
  activeTodosCount: (state) => {
    return state.todos.filter((todo) => !todo.done).length;
  },
};
