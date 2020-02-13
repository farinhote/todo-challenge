import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import router from './router';
import store from './store';
import localeEn from './locales/en';
import './assets/global.css';

Vue.use(VueI18n);
Vue.config.productionTip = false;

const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: localeEn,
  },
});

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
