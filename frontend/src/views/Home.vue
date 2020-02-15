<template>
  <div class="cards" v-if="projects.length">
    <card v-for="project in projects" :key="project.id" :project="project" />
  </div>
  <div class="spinner" v-else>
    <spinner />
  </div>
</template>

<script>
import Spinner from '../components/Spinner.vue';
import Card from '../components/Card.vue';

export default {
  name: 'Home',
  components: {
    Card,
    Spinner,
  },

  computed: {
    projects() {
      return this.$store.state.projects;
    },
  },

  created() {
    this.$store.dispatch('fetchProjects');
  },
};
</script>

<style>
.cards {
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr 1fr;
}

.spinner {
  display: grid;
  justify-items: center;
}
</style>
