import Toast from './Toast.vue'
const obj = {}
obj.install = Vue => {
  const toastConstructor = Vue.extend(Toast),
        toast = new toastConstructor()
  toast.$mount(document.createElement('div'))
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast
}
export default obj
