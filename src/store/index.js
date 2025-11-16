import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    tasks: []
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    }
  },
  actions: {
    async fetchTasks({ commit }) {
      const res = await axios.get('https://mockapi.io/api/v1/tasks');
      commit('setTasks', res.data);
    }
  }
});