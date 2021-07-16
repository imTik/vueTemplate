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

// 埋点使用方法
// import BuriedDot from './utils/buriedDot';
// BuriedDot(
//   router,
//   (mark, buriedData) => {
//     console.log('触发埋点的标记: ', mark);
//     // console.log('获取到的埋点信息: ', buriedData);
//   },
//   60000
// );

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
