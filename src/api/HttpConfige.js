let SERVER = {
  WECHAT: '',
  ALOHA: ''
};

const ENV = process.env.NODE_ENV;
const HOST = process.env.VUE_APP_HOST;

const QA_WECHAT = 'https://wechat-qa.walmartmobile.cn';
const QA_ALOHA = 'https://aloha-qa.walmartmobile.cn';

const PROD_WECHAT = 'https://wechat.walmartmobile.cn';
const PROD_ALOHA = 'https://aloha.walmartmobile.cn';

if (ENV === 'development' || (ENV === 'production' && HOST === 'qa')) {
  
  SERVER.WECHAT = QA_WECHAT;
  SERVER.ALOHA = QA_ALOHA;

} else if (ENV === 'production' && HOST === 'prod') {

  SERVER.WECHAT = PROD_WECHAT;
  SERVER.ALOHA = PROD_ALOHA;

}
export default SERVER;
