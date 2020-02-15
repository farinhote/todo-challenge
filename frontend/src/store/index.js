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
    },
    projects: [],
  },
  mutations: {
    setProjects(state, projects) {
      // eslint-disable-next-line no-param-reassign
      state.projects = projects.data;
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

      const projectIndex = state.projects.findIndex((project) => project.id === projectId);
      const taskIndex = state.projects[projectIndex].tasks
        .findIndex((taskElement) => taskElement.id === taskId);

      if (description) {
        state.projects[projectIndex].tasks[taskIndex].description = description;
      }
      if (done !== undefined) {
        state.projects[projectIndex].tasks[taskIndex].done = done;
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

    signIn({ commit }, data) {
      return client
        .signIn(data)
        .then((user) => commit('setUser', user));
    },

    // eslint-disable-next-line no-unused-vars
    signUp(context, data) {
      return client
        .signUp(data)
        .then(context.dispatch('signIn', data));
    },

    signOut({ commit }) {
      commit('setUser', { data: {} });
      return Promise.resolve();
    },

    syncProject(context, projectId) {
      const project = context.state.projects
        .find((projectElement) => projectElement.id === projectId);

      return client
        .syncProject(project, projectId);
    },
  },
});
