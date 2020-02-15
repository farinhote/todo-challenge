<template>
  <div class="cards" v-if="projects.length">
    <card v-for="project in projects" :key="project.id" :project="project" />
  </div>
  <div class="spinner" v-else>
    <spinner v-if="!hasLoaded" />
    <h1 v-else >{{ $t("home.createProject") }}</h1>
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

  data() {
    return {
      hasLoaded: false,
    };
  },

  computed: {
    projects() {
      return this.$store.state.projects;
    },
  },

  created() {
    if (!this.$store.state.user.name) {
      this.$router.push('/sign');
    } else {
      this.$store.dispatch('fetchProjects')
        .then(() => { this.hasLoaded = true; });
    }
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
