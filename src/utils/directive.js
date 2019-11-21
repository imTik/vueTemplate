const directive = {
  rem: {
    inserted(el, binding) {
      let designWidth = 375;  // 设计稿基础宽度
      let baseSize    = 100;  // 倍数 100px = 1rem

      // 判断传参
      if(binding.value && binding.value.designWidth) {
        designWidth = binding.value.designWidth;
      } else if (binding.value && typeof binding.value === 'number') {
        designWidth = binding.value;
      };

      if (binding.value && binding.value.baseSize) baseSize = binding.value.baseSize;

      let _body = document.getElementsByTagName('html')[0];
      let bodyWidth = document.body.clientWidth;
      let coefficient = bodyWidth / designWidth;                // 系数

      let baseFontSize = (bodyWidth / (bodyWidth / baseSize)) * coefficient;  
      _body.style.fontSize = baseFontSize + 'px';
      
      window.onresize = function (e) {
        bodyWidth = document.body.clientWidth;
        coefficient = bodyWidth / designWidth;

        baseFontSize = (bodyWidth / (bodyWidth / baseSize)) * coefficient;
        _body.style.fontSize = baseFontSize + 'px';
      }
    }
  }
}

export default directive;