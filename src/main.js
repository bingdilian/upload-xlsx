import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
Vue.use(ElementUI)


// import Blob from './vendor/Blob'
// import Export2Excel  from'./vendor/Export2Excel'
// Vue.use(Blob)
// Vue.use(Export2Excel)


import XLSX from 'xlsx'
Vue.use(XLSX)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
