window.onload = () => {
  window.addEventListener('message', function(res) {
    const ENV = process.env.NODE_ENV;
    const oneDay = 1 * 24 * 60 * 60 * 1000;

    const ORIGIN =
      ENV === 'production'
        ? 'https://wechat.cn'
        : 'https://wechat-qa.cn';

    console.log('message --> ', res);
    console.log('origin --> ', res.origin, ORIGIN);
    if (res.origin === ORIGIN) {
      let d = new Date();
      d.setTime(d.getTime() + oneDay);
      let expiresTime = 'expires=' + d.toString();
      document.cookie = 'TOKEN=' + res.data + '; ' + expiresTime;
    }
  });
};
