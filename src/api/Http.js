import Request from './Request';

const HTTP = (function() {
  function post(url, data, config) {
    Request({
      method: 'POST',
      url,
      data,
      ...config
    });
  }

  function get(url, data, config) {
    Request({
      method: 'GET',
      url,
      data,
      ...config
    });
  }

  return {
    post: post,
    get: get
  };
})();

export default HTTP;
