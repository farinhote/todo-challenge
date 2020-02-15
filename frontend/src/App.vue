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

  created() {
    if (localStorage.getItem('access_token')) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        this.$store.commit('setUser', user);
      // } else {
      //   //implement backend function to validate token and bring user info.
      //
      }
    } else {
      this.$router.push('/sign');
    }
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
