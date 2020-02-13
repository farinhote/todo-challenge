<template>
  <div class="header">
    <div class="presentation">
      <router-link to="/"></router-link>
      <div class="presentationText">
        <h1>{{ $t("header.title") }}</h1>
      </div>
    </div>
    <div class="nav" v-if="this.$store.state.user.id">
      <span>{{ this.$store.state.user.name }}</span>
      <router-link to="/sign-out">
        <span>{{ $t("header.signOut") }}</span>
      </router-link>
    </div>
    <div class="nav" v-else>
      <router-link to="/sign-up">
        <span>{{ $t("header.signUp") }}</span>
      </router-link>
      <router-link to="/sign-in">
        <span>{{ $t("header.signIn") }}</span>
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
  margin-bottom: 3rem;
}

.presentation {
  text-align: left;
}

.nav {
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

.header {
  grid-template-columns: repeat(2, 1fr);
}

.nav span{
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
