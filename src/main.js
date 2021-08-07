import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from './components/TypeNav/TypeNav'
import SlideLoop from './components/slideLoop'
import Pagination from './components/Pagination'
import "@/assets/css/transition.css"
import '@/mock/mockServer'
import 'swiper/css/swiper.css'
import * as API from '@/api'
import { Button,MessageBox,Message } from 'element-ui'

Vue.use(Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;

Vue.config.productionTip = false
Vue.component('TypeNav',TypeNav)
Vue.component('SlideLoop',SlideLoop)
Vue.component('Pagination',Pagination)

new Vue({
	beforeCreate(){
   Vue.prototype.$bus=this //安装总线 代表任意组件内部都可以通过this.$bus访问到vm实例
   Vue.prototype.$API=API
	},
  router,
  store,
  render: h => h(App)
}).$mount('#app')

