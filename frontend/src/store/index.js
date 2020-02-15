import Vue from 'vue';
import Vuex from 'vuex';
// eslint-disable-next-line import/no-unresolved
import client from 'api-client';
import lodash from 'lodash';
import VueRouter from '../router/index';

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
      return projects.data;
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
      const today = new Date().toLocaleDateString('pt');

      if (description) {
        state.projects[projectIndex].tasks[taskIndex].description = description;
      }
      if (done !== undefined) {
        state.projects[projectIndex].tasks[taskIndex].done = done;
        state.projects[projectIndex].tasks[taskIndex].finishDate = today;
      }

      debounce(() => { this.dispatch('syncProject', projectId); }, 1000)();
    },
  },
  actions: {
    fetchProjects({ commit }) {
      return client
        .fetchProjects()
        .then((projects) => {
          commit('setProjects', projects);
          return projects.data;
        });
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

    signUp(context, user) {
      return client
        .signUp(user)
        .then(() => {
          context.dispatch('signIn', user);
          return true;
        });
    },

    signIn({ commit }, user) {
      debugger;
      return client
        .signIn(user)
        .then((signedInUser) => { commit('setUser', signedInUser); })
        .then(() => { VueRouter.push('/'); });
    },

    signOut({ commit }) {
      commit('setUser', { data: {} });
      commit('setProjects', { data: [] });

      localStorage.removeItem('access_token');
      return Promise.resolve();
    },
  },
});
