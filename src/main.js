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
import VueLazyload from 'vue-lazyload'
import loading from '@/assets/images/loading.gif'
import VeeValidate from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN'

Vue.use(VeeValidate);//表单校验
//错误提示信息本地化
VeeValidate.Validator.localize('zh_CN',{
  messages:{
    ...zh_CN.messages,
    is:(field)=>`${field}必须与密码相同`
  },
  attributes:{//给校验filed属性映射成中文
    phone:'手机号',
    code:'验证码',
    password:'密码',
    surePassword:'确认密码',
    isCheck:'协议'
  }
})

VeeValidate.Validator.extend('agree',{
  validate:value=>{
    return value
  },
  getMessage:field=>field+'必需同意'
})

Vue.use(VueLazyload,{//内部自定义一个指令lazy
  loading
})
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

