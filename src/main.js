import Vue from 'vue'
import App from './App'
import router from './router'
import './directives'
import './components'
import store from './store'
import VueSweetalert2 from './plugins/vue-sweetalert2'
// 引入插件
import Message from './plugins/message'
import axios from 'axios'

Vue.use(VueSweetalert2)
// 使用插件
Vue.use(Message)

Vue.prototype.$axios = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  created() {
    // 自定义的 axios 响应拦截器
    this.$axios.interceptors.response.use((response) => {
      // 判断一下响应中是否有 token，如果有就直接使用此 token 替换掉本地的 token。你可以根据你的业务需求自己编写更新 token 的逻辑
      var token = response.headers.authorization
      if (token) {
        this.$store.dispatch('refreshToken', {
          token: token
        })
      }
      return response
    }, (error) => {
      var token = error.response.headers.authorization;
      switch (error.response.status) {
        case 403:
          if (token) {
            this.$store.dispatch('refreshToken', {
              token: token
            })
            return this.$message.show('请重试', 'warning')
          } else {
            return this.$store.dispatch('errlogout')
          }
          break
        case 414:
          return this.$store.dispatch('errlogout')
          break
      }
      return Promise.reject(error)
    })
  }
})
