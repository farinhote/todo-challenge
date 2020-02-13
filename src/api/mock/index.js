import projects from './data/projects.json';

const fetch = (mockData, time = 0) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(mockData);
  }, time);
});

export default {
  fetchProjects() {
    return fetch(projects, 250); // wait a bit before returning projects
  },
};
