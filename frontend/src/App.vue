<template>
  <div id="app">
    <Header class="header" />
    <router-view class="body"/>
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
  text-align: center;
  color: #2c3e50;
}

.header {
  top: 0;
  left: 0;
  position: fixed;
  border-bottom: 2px solid gray;
}


.body {
    padding: 5rem;
    width: 60vw;
    margin: auto;
}
</style>
