<template>
  <div class="loading-box" :class="{'mask' : mask === 'full'}">

    <van-loading vertical :color="color" class="loading" :class="{'bg' : mask === 'small'}">
      <span :style="'color:' + color">{{txt}}</span> 
    </van-loading>

  </div>
</template>

<script>
export default {
  name: 'globalLoading',
  props: {
    mask: {
      type: String,
      default: 'full'  // full - 全屏 / small - 小框 
    },
    color: {
      type: String,
      default: '#fff'
    },
    txt: {
      type: String,
      default: 'loading...'
    }
  }
}
</script>

<style lang="less" scoped>
.loading-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;

  .loading {
    // position: absolute;
    position: relative;
    top: 50%;
    max-width: 170px;
    padding: 25px 15px;
    margin: auto;
    border-radius: 5px;
    transform: translateY(-50%);
    span {font-size: @medium;}
  }
  .bg {
    background: rgba(0,0,0,.6);
    box-shadow: 0 5px 8px rgba(0,0,0,.2);
  }
}
.mask {background: rgba(0,0,0,.6);}
</style>