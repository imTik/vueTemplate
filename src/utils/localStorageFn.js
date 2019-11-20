const FN = {

  // 获取localStorage数据
  getLocalData: function (key) {
    let _detail = JSON.parse(localStorage.getItem(key));
    return _detail;
  },

  // 保存用户信息
  saveUserInfo: function (data) {
    localStorage.setItem('USER_INFO', JSON.stringify(data));
  },

  // 保存batchNumber
  saveBatchNumber: function (number) {
    localStorage.setItem('BATCH_NUMBER', number);
  },

  getBatchNumber: function () {
    let _num = '';
    if (localStorage.getItem('BATCH_NUMBER') !== 'undefined') _num = localStorage.getItem('BATCH_NUMBER');
    return _num;
  }

}

export default FN;