<template>
  <div id="app">
    <Header />
    <router-view class="view"/>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'Home',
  components: {
    Header,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.view {
  flex: 1;
  padding: 1rem 5rem;
}
</style>
