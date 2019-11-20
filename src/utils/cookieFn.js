
function cookieToObj () {
  let cookieArr = document.cookie.split(';');
  let cookieObj = {};

  cookieArr = cookieArr.map(item => item.trim().split('='));

  cookieArr.forEach(item => {
    if (item[0]) cookieObj[item[0]] = item[1];
  });
  return cookieObj
}

function cookieClear () {
  let cookie = cookieToObj();
  for(let i in cookie) {
    setCookie(i, '', -1);
  };
};

export function setCookie (key, val, exdays = 1) {
  let d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = 'expires=' + d.toString();
  document.cookie = key + '=' + val + '; ' + expires;
}

export function getCookie (key) {
  let cookie = cookieToObj();
  return cookie[key];
}

export function delCookie (key) {
  setCookie(key, '', -1);
}
