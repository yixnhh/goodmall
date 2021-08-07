import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import Login from '../views/Login/Login.vue'
import Register from '../views/Register/Register.vue'
import Search from '../views/Search/Search.vue'
import Detail from '../views/Detail/Detail.vue'
import AddCartSuccess from '../views/AddCartSuccess/AddCartSuccess.vue'
import ShopCart from '../views/ShopCart'
import Pay from '../views/Pay'
import PaySuccess from '../views/PaySuccess'
import Trade from '../views/Trade'
import Center from '../views/Center'
import GroupOrder from '../views/Center/GroupOrder'
import MyOrder from '../views/Center/MyOrder'

import store from '@/store'
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
		props:route=>({
			skuNum:route.query.skuNum
		}) ,
		component:AddCartSuccess,
		meta:{
			isShowFooter:true
		}
	},
	{
		path:'/shopcart',
		name:'ShopCart',
		component:ShopCart,
		meta:{
			isShowFooter:false
		}
	},
	{
		path:'/pay',
		name:'Pay',
		component:Pay,
		meta:{
			isShowFooter:false
		}
	},
	{
		path:'/paysuccess',
		name:'PaySuccess',
		component:PaySuccess,
		meta:{
			isShowFooter:false
		}
	},
	{
		path:'/trade',
		name:'Trade',
		component:Trade,
		meta:{
			isShowFooter:false
		}
	},
	{
		path:'/center',
		name:'Center',
		component:Center,
		children:[
			{
				path:'myorder',
				component:MyOrder
			},
			{
				path:'grouporder',
				component:GroupOrder
			},
			{
				path:'',
				redirect:'myorder'
			}
		],
		meta:{
			isShowFooter:false
		}
	},
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  //配置滚动行为，跳转到新的路由界面滚动条位置
	scrollBehavior (to, from, savedPosition) {
		return { x: 0, y: 0 }
	}
})

//注册全局前置导航守卫，用来对token校验（根据token获取用户信息）
router.beforeEach(async (to, from, next) => {
let token=store.state.user.token
let userInfo=store.state.user.userInfo.nickName
if(token){
	//token存在，代表用户登录过
	if(to.path==='/login'){
		next('/')
	}else{
		if(userInfo){
			next()
		}else{
			try {
				await store.dispatch('getUserInfo')
				next()
			} catch (error) {
				//token过期
				//把用户token清除
				store.dispatch('toLoginOut')
				next('/login')
			}
		}
	}
}else{
	//用户没登录
	next()
}
})

export default router
