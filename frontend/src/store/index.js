import Vue from 'vue';
import Vuex from 'vuex';
// eslint-disable-next-line import/no-unresolved
import client from 'api-client';
import lodash from 'lodash';

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
    fetchProjects({ commit }) {
      return client
        .fetchProjects()
        .then((projects) => commit('setProjects', projects));
    },

    syncProject(context, projectId) {
      const project = context.state.projects
        .find((projectElement) => projectElement.id === projectId);

      return client
        .syncProject(project, projectId);
    },

    createProject(context, project) {
      client.createProject(project)
        .then(debounce(() => { context.dispatch('fetchProjects'); }, 500)());
    },

    deleteProject(context, projectId) {
      client.deleteProject(projectId)
        .then(debounce(() => { context.dispatch('fetchProjects'); }, 500)());
    },

    createTask(context, { description, projectId }) {
      const project = context.state.projects
        .find((projectElement) => projectElement.id === projectId);

      project.tasks.push({ description });
      client.syncProject(project, projectId)
        .then(debounce(() => { context.dispatch('fetchProjects'); }, 500)());
    },

    deleteTask(context, { projectId, taskId }) {
      const project = context.state.projects
        .find((projectElement) => projectElement.id === projectId);
      const clonedTasks = lodash.cloneDeep(project.tasks);

      project.tasks = clonedTasks.filter((element) => element.id !== taskId);
      client.syncProject(project, projectId)
        .then(debounce(() => { context.dispatch('fetchProjects'); }, 500)());
    },

    // eslint-disable-next-line no-unused-vars
    signUp(context, user) {
      return client
        .signUp(user)
        .then(context.dispatch('signIn', user));
    },

    signIn({ commit }, user) {
      return client
        .signIn(user)
        .then((signedInUser) => { commit('setUser', signedInUser); });
    },

    signOut({ commit }) {
      commit('setUser', { data: {} });
      return Promise.resolve();
    },
  },
});
