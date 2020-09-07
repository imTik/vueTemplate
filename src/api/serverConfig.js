let SERVER = {
  WECHAT: 'https://wechat-qa.walmartmobile.cn',
  ALOHA: 'https://aloha-qa.walmartmobile.cn'
};

const ENV = process.env.NODE_ENV;
const HOST = process.env.VUE_APP_HOST;

if (ENV === 'production' && HOST === 'prod') {
  SERVER.WECHAT = 'https://wechat.walmartmobile.cn';
  SERVER.ALOHA = 'https://aloha.walmartmobile.cn';
}

export default SERVER;
