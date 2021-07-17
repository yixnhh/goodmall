import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import Login from '../views/Login/Login.vue'
import Register from '../views/Register/Register.vue'
import Search from '../views/Search/Search.vue'
import Detail from '../views/Detail/Detail.vue'
import AddCartSuccess from '../views/AddCartSuccess/AddCartSuccess.vue'
Vue.use(VueRouter)
// 缓存原型上的push函数
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
// 给原型对象上的push指定新函数函数
VueRouter.prototype.push = function (location, onComplete, onAbort) {
  // 判断如果没有指定回调函数, 通过call调用源函数并使用catch来处理错误
  if (onComplete===undefined && onAbort===undefined) {
    return originPush.call(this, location, onComplete, onAbort).catch(() => {})
  } else { // 如果有指定任意回调函数, 通过call调用源push函数处理
    originPush.call(this, location, onComplete, onAbort)
  }
}
// replace同理处理
VueRouter.prototype.replace = function (location, onComplete, onAbort) {
  if (onComplete===undefined && onAbort===undefined) {
    return originReplace.call(this, location, onComplete, onAbort).catch(() => {})
  } else {
    originReplace.call(this, location, onComplete, onAbort)
  }
}
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
		meta:{
			isShowFooter:true
		}
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
		meta:{
			isShowFooter:false
		}
  },
	{
		path:'/resiger',
		name:'Resiger',
		component:Register,
		meta:{
			isShowFooter:false
		}
	},
	{
		path:'/search/:keyword?',
		name:'Search',
		component:Search,
	meta:{
		isShowFooter:true
	}
	},
	{
		path:'/detail/:goodsId?',
		name:'Detail',
		component:Detail,
		meta:{
			isShowFooter:true
		}
	},
	{
		path:'/addcartsuccess',
		name:'AddCartSuccess',
		component:AddCartSuccess,
		meta:{
			isShowFooter:false
		}
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
	scrollBehavior (to, from, savedPosition) {
		return { x: 0, y: 0 }
	}
})

export default router
