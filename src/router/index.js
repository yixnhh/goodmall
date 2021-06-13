import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import Login from '../views/Login/Login.vue'
import Register from '../views/Register/Register.vue'
import Search from '../views/Search/Search.vue'

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
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
		meta:{
			isShowFooter:true
		}
  },
	{
		path:'/resiger',
		name:'Resiger',
		component:Register,
		meta:{
			isShowFooter:true
		}
	},
	{
		path:'/search/:msg?',
		name:'Search',
		component:Search,
	props:route=>({key1:route.params.msg,key2:route.query.msgg,key3:route.query.categoryName,key4:route.query.category1Id,key5:route.query.category2Id,key6:route.query.category3Id}),
	meta:{
		isShowFooter:true
	}
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
