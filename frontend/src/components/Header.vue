<template>
  <div class="header">
    <h1 class="title">{{ $t("header.title") }}</h1>
    <div class="user" v-if="this.$store.state.user._id">
      <button class="sign-out" v-on:click="signOut">{{ $t("header.signOut") }}</button>
      <h1 class="username">{{ this.$store.state.user.name }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    signOut() {
      this.$store
        .dispatch('signOut')
        .then(() => this.$router.push('/sign'))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: #cc6347;
  border-bottom: 0.25rem solid #2c3e50;
  padding: 0 2rem;
}

.title {
  grid-column: 1;
}

.user {
  grid-column: 2;
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  align-items: center
}

.sign-out {
  grid-column: 2;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #2c3e50;
  box-shadow: 0 -2px 0 #2c3e50 inset;
  background-color: rgb(223, 217, 217);
  font-weight: bold;
  font-size: 1rem;
  color: #2c3e50;
  outline: 0;
  cursor: pointer;
}

.username {
  grid-column: 3;
  text-align: right;
}
</style>
