import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from "vue-socket.io"
import toast from 'components/common/toast/toast.js'
Vue.prototype.$bus = new Vue()
/**
 * 1.基本配置
 * 2.当需要在组件中使用时：
 * 
 */
Vue.use(toast)
Vue.use(new VueSocketIO({
  debug:false ,
  connection:"http://192.168.0.6:4000/",
}))


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
