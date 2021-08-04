import { getUUID } from '@/util'
import { reqRegister, reqRegisterCode, reqLogin, reqUserInfo, loginOut, reqUserAddressList } from '@/api'

const state = {
	userTempId: getUUID(),
	code: '',
	token: localStorage.getItem('TOKEN'),
	userInfo: '',
	userAddressList: []
}
const mutations = {
	GETCODE(state, data) {
		state.code = data
	},
	GETTOKEN(state, token) {
		state.token = token
	},
	GETUSERINFO(state, data) {
		state.userInfo = data
	},
	RESET_USER(state) {
		state.token = ''
		state.userInfo = {}
	},
	RECEIVE_USERADDRESS(state, list) {
		state.userAddressList = list
	}
}
const actions = {
	//用户注册
	async register({ commit }, userInfo) {
		let result = await reqRegister(userInfo)
		if (result.code === 200) {
			return 'ok'
		} else {
			return Promise.reject('注册失败')
		}
	},
	//获取验证码
	async getCode({ commit }, phone) {
		let result = await reqRegisterCode(phone)
		if (result.code === 200) {
			commit('GETCODE', result.data)
			return 'ok'
		} else {
			return Promise.reject('获取失败')
		}
	},
	//用户登录
	async login({ commit }, userInfo) {
		const result = await reqLogin(userInfo)
		if (result.code === 200) {
			commit('GETTOKEN', result.data.token)
			localStorage.setItem('TOKEN', result.data.token)
			return 'ok'
		} else {
			return Promise.reject('登录失败')
		}
	},
	//获取用户信息
	async getUserInfo({ commit }) {
		const result = await reqUserInfo()
		if (result.code === 200) {
			commit('GETUSERINFO', result.data)
			return 'ok'
		} else {
			return Promise.reject('获取失败')
		}
	},
	//清除token
	// async clearToken({commit}){
	// 	commit('RESET_TOKEN')
	// 	localStorage.removeItem('TOKEN')
	// },

	async toLoginOut({ commit }) {
		const result = await loginOut()
		if (result.code === 200) {
			//清空数据
			commit('RESET_USER')
			localStorage.removeItem('TOKEN')
			return 'ok'
		} else {
			return Promise.reject('退出登录失败')
		}
	},
	//获取用户收货地址信息
	async getUserAddress({ commit }) {
		const result = await reqUserAddressList()
		if (result.code === 200) {
			commit('RECEIVE_USERADDRESS', result.data)
		}
	}

}
const getters = {

}
export default {
	state,
	mutations,
	actions,
	getters
}