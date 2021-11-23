import HTTP from './utils/Http';

const LOCAL_URL = {};
if (process.env.VUE_APP_HOST === 'dev') LOCAL_URL.baseURL = '/local';

export function testApi(params) {
  return HTTP.post('/xxx/test', params);
}


export function downPDF(file) {
  return HTTP.get('/paperless-4408-h5-api/file/pic/download/' + file, '', {
    headers: {
      format: 'blob'
    },
    responseType: 'blob'
  });
}