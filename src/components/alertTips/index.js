import Vue from 'vue';
import AlertTips from './index.vue';

const TipsConstructor = Vue.extend(AlertTips);

function alertTips(message, icon, delay) {
  if (typeof message !== 'object' && typeof message !== 'string') {
    console.error('传参错误');
    return;
  }

  let tipsData = {};
  if (typeof message === 'object') {
    Object.assgin(tipsData, message);
  } else if (typeof message === 'string') {
    tipsData = {
      message,
      icon,
      delay
    };
  }

  const tipsInstence = new TipsConstructor({ data: tipsData });

  let _delay = tipsData.delay || 3000;
  tipsInstence.vm = tipsInstence.$mount();
  document.getElementsByTagName('body')[0].appendChild(tipsInstence.vm.$el);

  setTimeout(() => {
    tipsInstence.vm.$el.classList.add('alert-tips-show');

    setTimeout(() => {
      tipsInstence.vm.$el.classList.remove('alert-tips-show');

      setTimeout(() => {
        document
          .getElementsByTagName('body')[0]
          .removeChild(tipsInstence.vm.$el);
      }, 100);
    }, _delay);
  }, 100);
}
export default alertTips;
