import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import user from './user'
import search from './search'
import detail from './detail'
import shopcar from './shopcar'
import trade from './trade'
Vue.use(Vuex)
const state={

}
const mutations={

}
const actions={

}
const getters={

}

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters,
	modules:{
		home,
		user,
		search,
		detail,
		shopcar,
		trade
	}
})