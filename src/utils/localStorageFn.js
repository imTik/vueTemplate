const FN = {

  // 获取localStorage数据
  getLocalData: function (key, isString = false) {
    let _detail = '';
    isString ? _detail = localStorage.getItem(key) : JSON.parse(localStorage.getItem(key));
    return _detail;
  },

  // 保存用户信息
  saveUserInfo: function (data) {
    localStorage.setItem('USER_INFO', JSON.stringify(data));
  },


}

export default FN;