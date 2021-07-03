import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from './components/TypeNav/TypeNav'
import SlideLoop from './components/slideLoop/'
import "@/assets/css/transition.css"
import '@/mock/mockServer'
import 'swiper/css/swiper.css'
Vue.config.productionTip = false
Vue.component('TypeNav',TypeNav)
Vue.component('SlideLoop',SlideLoop)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
