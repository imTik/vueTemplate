import HTTP from './Http';
import { paramFormat } from '../utils/publicFn';

const LOCAL_URL = {};
if (process.env.VUE_APP_HOST === 'dev') LOCAL_URL.baseURL = '/local';

export function getSignatureByApp(params) {
  return HTTP.post(
    '/workwx-api/workwechat/getSignatureByApp',
    paramFormat(params)
  );
}

export function loginWX(params) {
  return HTTP.post('/user-center/security/user/loginWX', paramFormat(params));
}
