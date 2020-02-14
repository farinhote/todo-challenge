import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000/api/';

export default {
  fetchProjects() {
    return axios
      .get('https://someurl')
      .then((response) => response.data);
  },

  login(user) {
    return axios
      .post(`${API_URL}signin`, {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  },

  logout() {
    localStorage.removeItem('user');
  },

  register(user) {
    return axios.post(`${API_URL}users/`, {
      name: user.name,
      email: user.email,
      password: user.password,
    });
  },
};
