import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000/';
const PROJECTS = 'projects/';
const USERS = 'users/';

export default {
  fetchProjects() {
    return axios
      .get(`${API_URL}${PROJECTS}`)
      .then((response) => response.data);
  },

  syncProject(project, projectId) {
    return axios.put(`${API_URL}${PROJECTS}${projectId}`, project)
      .then((response) => response.data);
  },

  signIn(user) {
    return axios
      .post(`${API_URL}${USERS}signIn`, user)
      .then((response) => {
        const { token, ...signedInUser } = response.data.data;

        if (token) {
          localStorage.setItem('access_token', JSON.stringify(token));
        }

        return signedInUser;
      });
  },

  signUp(user) {
    return axios.post(`${API_URL}${USERS}signUp`, user);
  },
};
