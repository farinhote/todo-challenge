<template>
  <div class="header">
    <div class="presentation">
      <router-link to="/">
        <div class="presentationText">
          <h1>{{ $t("header.title") }}</h1>
        </div>
      </router-link>
    </div>
    <div class="nav" v-if="this.$store.state.user.id">
      <span>{{ this.$store.state.user.name }}</span>
      <router-link to="/sign-out">
        <span>{{ $t("header.signOut") }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped>
.header {
  display: grid;
  background: rgb(204, 99, 71);
  width: 100vw;
  z-index: 1;
  grid-template-columns: repeat(5, 1fr);
}

.presentation {
  text-align: left;
  grid-column: 2;
}

.presentation a {
    text-decoration: inherit;
    cursor: pointer;
}

.nav {
  grid-column: 3/5;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  font-size: 30px;
}

.nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 0.5rem;
}

.header a.router-link-exact-active {
  color: #42b983;
}

.nav span {
  grid-column: 2/4;
  text-align: right;
}

.nav a:nth-child(1) {
  grid-column: 3;
}
.nav a:nth-child(2) {
  grid-column: 4;
}
</style>
