<template>
  <div class="header">
    <h1 class="title">{{ $t("header.title") }}</h1>
    <div v-show="this.$store.state.user.name" class="create-project">
      <button class="header-button create-button" type="submit" @click="createProject" >
        {{ $t("header.newProject") }}
      </button>
      <input class="create-input" @keyup.enter="createProject" v-model="projectName" type="text"/>
    </div>
    <div class="user" v-if="this.$store.state.user.name">
      <button class="header-button" v-on:click="signOut">{{ $t("header.signOut") }}</button>
      <h1 class="username">{{ this.$store.state.user.name }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      projectName: '',
    };
  },
  methods: {
    createProject() {
      this.$store
        .dispatch('createProject', { name: this.projectName });

      this.projectName = '';
    },
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
  grid-template-columns: 1fr 1fr 2fr;
  background-color: #cc6347;
  border-bottom: 0.25rem solid #2c3e50;
  padding: 0 2rem;
}

.header-button {
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

.create-project {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
}
.create-button {
  flex: 1;
  border-radius: 0.5rem 0 0 0.5rem;
  text-align: center;
  outline: 0;
  cursor: pointer;
}
.create-input {
  flex: 1;
  height: 30px;
  border-radius: 0 0.5rem 0.5rem 0;
  font-size: inherit;
  font-family:inherit;
  outline: 0;
}

.user {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  align-items: center;
}

.username {
  grid-column: 3;
  text-align: right;
}
</style>
