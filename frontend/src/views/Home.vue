<template>
  <div v-if="projects.length">
    <div class="cards">
      <card v-for="project in projects" :key="project.id" :project="project" />
    </div>
  </div>
  <spinner v-else />
</template>

<script>
import Spinner from '../components/Spinner.vue';
import Card from '../components/Card.vue';

export default {
  name: 'Home',
  components: {
    Spinner,
    Card,
  },

  computed: {
    projects() {
      const { projects } = this.$store.state;
      return Object.keys(projects).map((id) => ({ id, ...projects[id] }));
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

</style>
