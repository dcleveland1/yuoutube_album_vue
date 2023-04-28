import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import db from './firebase/firebaseConfig';

loadFonts();

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .provide('db', db)
  .mount('#app');
