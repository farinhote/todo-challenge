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
      .post(`${API_URL}${USERS}signIn`, {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        if (response.data.data.token) {
          localStorage.setItem('access_token', JSON.stringify(response.data.data.token));
        }

        return response.data.data.user;
      });
  },

  signUp(user) {
    debugger;
    return axios.post(`${API_URL}${USERS}signUp`, {
      name: user.name,
      email: user.email,
      password: user.password,
    });
  },
};
