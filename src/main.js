import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/store';

import './config/uiFrame';
import './config/tool';

Vue.config.productionTip = false;

import i18n from './i18n';
// document.title = i18n.t('pageTitle');

import vConsole from 'vconsole';
if (process.env.VUE_APP_HOST !== 'prod') new vConsole();

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
