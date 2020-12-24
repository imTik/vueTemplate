import Vue from 'vue';

import alertTips from '../components/alertTips';
import loading from '../components/loading';
Vue.prototype.$alertTips = alertTips;
Vue.prototype.$loading = loading;

// 全局组件
import globalComponent from '../utils/components';
Vue.use(globalComponent);

// 全局混入
import GL_Mixin from '../utils/GL_Mixin';
Vue.mixin(GL_Mixin);