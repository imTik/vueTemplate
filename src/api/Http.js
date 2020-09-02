import Request from './Request';

const HTTP = {
  post: (url, data, config) => {
    Request({
      method: 'POST',
      url,
      data,
      ...config
    });
  },

  get: (url, data, config) => {
    Request({
      method: 'GET',
      url,
      data,
      ...config
    });
  }
};

export default HTTP;
