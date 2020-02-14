import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000/api/';

export default {
  fetchProjects() {
    return axios
      .get('https://someurl')
      .then((response) => response.data);
  },

  signIn(user) {
    return axios
      .post(`${API_URL}signin`, {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem('access_token', JSON.stringify(response.data.accessToken));
        }

        return response.data;
      });
  },

  signUp(user) {
    return axios.post(`${API_URL}users/`, {
      name: user.name,
      email: user.email,
      password: user.password,
    });
  },
};
