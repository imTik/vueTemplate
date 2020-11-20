import Vue from 'vue';
import PaperLessLoading from './index.vue';

const LoadingConsructor = Vue.extend(PaperLessLoading);

function Loading(text = '加载中...') {
  let loadingData = {
    text,
    loading: null
  };
  const loadingInstence = new LoadingConsructor({
    data: loadingData
  });

  loadingInstence.vm = loadingInstence.$mount();
  document.getElementsByTagName('body')[0].appendChild(loadingInstence.vm.$el);
  return loadingInstence;
}

export default Loading;
