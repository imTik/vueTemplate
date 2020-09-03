import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/store';

// ui框架引入
import {
  Button,
  Toast,
  Loading,
  Field,
  Popup,
  Picker,
  Dialog,
  RadioGroup,
  Radio,
  Uploader,
  DropdownMenu,
  DropdownItem
} from 'vant';
import 'vant/lib/index.css';
Vue.use(Button)
  .use(Toast)
  .use(Loading)
  .use(Field)
  .use(Popup)
  .use(Picker)
  .use(Dialog)
  .use(RadioGroup)
  .use(Radio)
  .use(Uploader)
  .use(DropdownMenu)
  .use(DropdownItem);

Vue.config.productionTip = false;

import './utils/myApp';

// 全局组件
import globalComponent from './utils/components';
Vue.use(globalComponent);

// 全局混入
import mixin from './utils/mixin';
Vue.mixin(mixin);

import i18n from './i18n';
// document.title = i18n.t('pageTitle');

import vConsole from 'vconsole';
if (process.env.VUE_APP_HOST !== 'prod') new vConsole();

// 埋点使用方法
import BuriedDot from './utils/buriedDot';
BuriedDot(
  router,
  (mark, buriedData) => {
    console.log('触发埋点的标记: ', mark);
    // console.log('获取到的埋点信息: ', buriedData);
  },
  60000
);

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
