import { mapGetters } from 'vuex'
import { errHandler } from './ErrorHandler'
const GL_Mixin = {
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'USER_INFO', 
    ]),
  },
  methods: {

    go(path, params, type = 'path') {
      if (type === 'name') {
        this.$router.push({
          name: path,
          params,
        });
      } else {
        this.$router.push({
          path,
          query: params
        })
      }
    },
    
    // 错误处理
    errHandler
  }
}

export default GL_Mixin;