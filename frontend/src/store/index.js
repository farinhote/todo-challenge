import Vue from 'vue';
import Vuex from 'vuex';
// eslint-disable-next-line import/no-unresolved
import client from 'api-client';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      // name: 'André Farinhote',
      // id: '1',
    },
    projects: {},
  },
  mutations: {
    setProjects(state, projects) {
      // eslint-disable-next-line no-param-reassign
      state.projects = projects;
    },
  },
  actions: {
    fetchProjects({ commit }, id) {
      return client
        .fetchProjects(id)
        .then((projects) => commit('setProjects', projects));
    },
  },
});
