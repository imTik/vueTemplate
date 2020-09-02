import packageConfig from '../../package';
import store from '../store/store';
const Base64 = require('js-base64').Base64;

export function getClientInfo() {
  const clientInfo = {
    ct: (navigator.language || navigator.browserLanguage).toLowerCase(),
    lg: (navigator.language || navigator.browserLanguage).toLowerCase(),
    ti: new Date().getTime(),
    tz: '',
    nt: '',
    op: '',
    os: '',
    ov: '',
    dn: '',
    di: '',
    ii: '',
    mac: '',
    ip: '',
    ss: '',
    av: packageConfig.version,
    ui: '',
    tk: '',
    clientType: packageConfig.name,
    logId: getUUID(),
    userId: store.getters.USER_ID || '',
    storeId: store.getters.STORE_ID || ''
  }
  return Base64.encode(JSON.stringify(clientInfo));
}

function getUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16);
  });
};