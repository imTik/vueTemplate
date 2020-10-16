<!-- Toast -->
<template>
  <transition name="alerttips">
    <div class="alert-tips">
      <img v-if="icon" :src="iconPath" alt="" />
      <span class="alert-txt">{{ message }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AlertTips',
  computed: {
    iconPath() {
      return require('@/assets/' + this.icon);
    }
  },
  data() {
    return {
      message: '',
      icon: '',
    }
  },
}
</script>

<style lang='less' scoped>
.alert-tips {
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 210px;
  padding: 20px 30px;
  transform: translate(-50%, -50%);
  font-size: 24px;
  box-sizing: border-box;
  color: #ffffff;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.8);
  transition: all 0.3s;
  opacity: 0;
  text-align: center;

  .alert-icon {
    vertical-align: middle;
    font-size: 40px;
    margin-right: 10px;
  }
  .alert-txt {
    display: inline-block;
    width: 100%;
    margin-top: 5px;
    vertical-align: middle;
  }
}
.alert-tips-show {
  opacity: 1;
}
</style>