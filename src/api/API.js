import HTTP from './Http';
import { paramsHandler } from '../utils/publicFn';

const LOCAL_URL = {};
if (process.env.VUE_APP_HOST === 'dev')
  LOCAL_URL.baseURL = process.env.VUE_APP_PROXY;

export function getSignatureByApp(params) {
  return HTTP.post(
    '/workwx-api/workwechat/getSignatureByApp',
    paramsHandler(params)
  );
}

export function loginWX(params) {
  return HTTP.post('/user-center/security/user/loginWX', paramsHandler(params));
}
