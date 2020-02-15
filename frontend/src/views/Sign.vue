<template>
  <div>
    <div class="sign">
      <div class="toggle">
        <h1 class="signUp" :class="{ 'active-mode': signUp }" @click="toggleMode(true)">
          {{ $t("sign.signUp") }}
        </h1>
        <h1 class="signIn" :class="{ 'active-mode': !signUp }" @click="toggleMode(false)">
          {{ $t("sign.signIn") }}
        </h1>
      </div>
      <div class="form">
        <label v-show="signUp" for="name">{{ $t("sign.name") }}</label>
        <input v-show="signUp" id="name" type="text" v-model="name" required autofocus />

        <label for="email">{{ $t("sign.email") }}</label>
        <input id="email" type="email" v-model="email" required />

        <label for="password">{{ $t("sign.password") }}</label>
        <input id="password" type="password" v-model="password" required />

        <button v-on:click="submit" type="submit">
          {{ $t("sign.go") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      signUp: true,
      name: '',
      email: '',
      password: '',
    };
  },

  methods: {
    submit() {
      debugger;

      if (this.signUp) {
        this.dispatchSignUp();
      } else {
        this.dispatchSignIn();
      }
    },
    dispatchSignUp() {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
      };

      this.$store
        .dispatch('signUp', data)
        .then(() => this.$router.push('/'))
        .catch((err) => console.log(err));
    },
    dispatchSignIn() {
      const data = {
        email: this.email,
        password: this.password,
      };

      this.$store
        .dispatch('signIn', data)
        .then(() => this.$router.push('/'))
        .catch((err) => console.log(err));
    },
    toggleMode(signUp) {
      this.signUp = signUp;
    },
  },
};
</script>

<style scoped>
.sign {
  width: 30rem;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 0.5rem;
}

.toggle {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 2rem;
}
.signUp, .signIn {
  margin: 0 0.25rem;
  background: none;
  color: black;
  text-align: center;
  cursor: pointer;
}
.active-mode {
  border-bottom: 4px solid lightseagreen;
}

.form input {
  box-sizing: border-box;
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  border: none;
  background-color: #e8eeef;
  color: #8a97a0;
  font-size: 1rem;
  outline: 0;
}
.form label {
  display: block;
  margin-bottom: 8px;
}
.form button {
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 0.5rem;
  border: 1px solid lightseagreen;
  background-color: lightseagreen;
  font-size: 1.5rem;
  color: white;
  outline: 0;
  cursor: pointer;
}
</style>
