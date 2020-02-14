import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000/';

export default {
  fetchProjects() {
    return axios
      .get(`${API_URL}projects/`)
      .then((response) => response.data);
  },

  signIn(user) {
    debugger;
    return axios
      .post(`${API_URL}users/signIn`, {
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
    return axios.post(`${API_URL}users/signUp`, {
      name: user.name,
      email: user.email,
      password: user.password,
    });
  },
};
