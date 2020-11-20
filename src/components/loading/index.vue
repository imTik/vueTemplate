<!--  -->
<template>
  <div class="paper-less-loading">
    <div class="paper-less-loading_main" ref="pl-loadding"></div>
  </div>
</template>

<script>
import { Loading } from 'element-ui';
export default {
  name: 'loading',
  data() {
    return {
      loading: null,
      text: '',
    }
  },
  mounted() {
    this.loading = Loading.service({
      target: this.$refs['pl-loadding'],
      text: this.text,
      background: 'rgba(0,0,0,.7)',
      customClass: 'customize'
    });
  },
  methods: {
    close() {
      this.loading.close();
      document.getElementsByTagName('body')[0].removeChild(this.$el);
    }
  }
}
</script>

<style lang='less' scoped>
.paper-less-loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
  color: #ffffff;
  font-size: 0.28rem;

  .paper-less-loading_main {
    position: absolute !important;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 2rem;
    height: 2rem;
    margin: auto;
    border-radius: 8px;
    overflow: hidden;
  }
}
</style>