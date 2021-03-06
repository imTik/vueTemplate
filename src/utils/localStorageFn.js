const LOCAL = {
  get: function(key) {
    let val = localStorage.getItem(key);
    return val ? JSON.parse(val) : null;
  },

  set: function(key, data) {
    data && localStorage.setItem(key, JSON.stringify(data));
  },

  del: function(key) {
    localStorage.removeItem(key);
  }
};

export default LOCAL;
