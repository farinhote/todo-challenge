<template>
  <div>
    <form v-on:submit.prevent>
      <div class="toggle">
        <h1 class="toggleUp" :class="{ active: signUp }" @click="toggleUp">
          {{ $t("sign.signUp") }}
        </h1>
        <h1 class="toggleIn" :class="{ active: !signUp }" @click="toggleIn">
          {{ $t("sign.signIn") }}
        </h1>
      </div>
      <fieldset>
        <legend>{{ $t("sign.legend") }}</legend>

        <label v-show="signUp" for="name">{{ $t("sign.name") }}</label>
        <input v-show="signUp" id="name" type="text" v-model="name" required autofocus />

        <label for="email">{{ $t("sign.email") }}</label>
        <input id="email" type="email" v-model="email" required />

        <label for="password">{{ $t("sign.password") }}</label>
        <input id="password" type="password" v-model="password" required />

        <button v-show="signUp" v-on:click="register" type="submit">{{ $t("sign.submit") }}</button>
        <button v-show="!signUp" v-on:click="login" type="submit">{{ $t("sign.login") }}</button>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      signUp: true,
    };
  },

  methods: {
    register() {
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
    login() {
      const data = {
        email: this.email,
        password: this.password,
      };

      this.$store
        .dispatch('signIn', data)
        .then(() => this.$router.push('/'))
        .catch((err) => console.log(err));
    },

    toggleUp() {
      this.signUp = true;
    },
    toggleIn() {
      this.signUp = false;
    },
  },
};
</script>

<style scoped>
*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  font-family: "Nunito", sans-serif;
  color: #384047;
}

form {
  max-width: 300px;
  margin: 10px auto;
  padding: 10px 20px;
  background: #f4f7f8;
  border-radius: 8px;
}

.toggle {
  display: grid;
  padding-top: 1rem;
  grid-template-columns: 1fr 1fr;
}

h1 {
  margin: 0 0 30px 0;
  text-align: center;
}

.active {
  background: #2c3e50;
  color: white
}

input {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  font-size: 16px;
  height: auto;
  margin: 0;
  outline: 0;
  padding: 15px;
  width: 100%;
  background-color: #e8eeef;
  color: #8a97a0;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03) inset;
  margin-bottom: 30px;
}

button {
  padding: 19px 39px 18px 39px;
  color: #fff;
  background-color: #4bc970;
  font-size: 18px;
  text-align: center;
  font-style: normal;
  border-radius: 5px;
  width: 100%;
  border: 1px solid #3ac162;
  border-width: 1px 1px 3px;
  box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.1) inset;
  margin-bottom: 10px;
}

fieldset {
  margin-bottom: 30px;
  border: none;
}

legend {
  font-size: 1.4em;
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 8px;
}

label.light {
  font-weight: 300;
  display: inline;
}

form {
  max-width: 480px;
}
</style>
