const LOCAL = {
  get: function (key) {
    return JSON.parse(localStorage.getItem(key));
  },

  set: function (key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },
}

export default LOCAL;