import globalLoading from '../components/globalLoading'

const allComponents = {
  install: function(Vue) {
    Vue.component('globalLoading', globalLoading);
  }
};

export default allComponents