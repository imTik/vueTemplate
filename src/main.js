import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import API from './api/API'

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
  DropdownItem,
  SwipeCell,
  ImagePreview
} from 'vant'
import 'vant/lib/index.css'
Vue
.use(Button)
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
.use(DropdownItem)
.use(SwipeCell)
.use(ImagePreview);

Vue.config.productionTip = false;
Vue.prototype.$http = API;

// 全局组件
import globalComponent from './utils/components'
Vue.use(globalComponent);

// mixin
import mixin from './utils/mixin'
Vue.mixin(mixin);

import i18n from './i18n'
document.title = i18n.t('pageTitle');

import vConsole from 'vconsole'
if (process.env.VUE_APP_HOST !== 'prod') {
  const vconsole = new vConsole();
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
