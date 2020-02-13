import axios from 'axios';

export default {
  fetchProjects() {
    return axios
      .get('https://someurl')
      .then((response) => response.data);
  },
};
