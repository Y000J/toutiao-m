import Vue from 'vue'
import App from './App.vue'
// 全局样式
import '@/styles/index.less'
import { Button } from 'vant'


Vue.config.productionTip = false
Vue.use(Button);



new Vue({
  render: h => h(App),
}).$mount('#app')
