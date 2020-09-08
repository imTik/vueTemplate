let SERVER = {
  WECHAT: '',
  ALOHA: ''
};

const ENV = process.env.NODE_ENV;
const HOST = process.env.VUE_APP_HOST;

if (ENV === 'production' && HOST === 'prod') {
  SERVER.WECHAT = '';
  SERVER.ALOHA = '';
}

export default SERVER;
