import Vue from 'vue';
import Vuex from 'vuex';
// eslint-disable-next-line import/no-unresolved
import client from 'api-client';

Vue.use(Vuex);

let timeout;

const debounce = (callback, wait) => (...args) => {
  const context = this;

  clearTimeout(timeout);
  timeout = setTimeout(() => callback.apply(context, args), wait);
};

export default new Vuex.Store({
  state: {
    user: {
      name: 'André Farinhote',
      _id: 'asdas',
    },
    projects: [],
  },
  mutations: {
    setProjects(state, projects) {
      // eslint-disable-next-line no-param-reassign
      state.projects = projects;
    },

    setUser(state, user) {
      localStorage.setItem('user', JSON.stringify(user));
      // eslint-disable-next-line no-param-reassign
      state.user = user;
    },

    updateTask(state, task) {
      const {
        projectId, taskId, description, done,
      } = task;

      if (description) {
        state.projects[projectId].tasks[taskId].description = description;
      }
      if (done !== undefined) {
        state.projects[projectId].tasks[taskId].done = done;
      }

      debounce(() => { this.dispatch('syncProject', projectId); }, 1000)();
    },
  },
  actions: {
    fetchProjects({ commit }, id) {
      return client
        .fetchProjects(id)
        .then((projects) => commit('setProjects', projects));
    },

    signUp({ commit }, data) {
      return client
        .signUp(data)
        .then((user) => commit('setUser', user.data));
    },

    signOut({ commit }) {
      commit('setUser', { data: {} });
      return Promise.resolve();
    },

    syncProject(context, projectId) {
      const project = context.state.projects[projectId];

      return client
        .syncProject(project);
    },
  },
});
