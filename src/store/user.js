import { getUUID } from '@/util'
import { reqRegister,reqRegisterCode,reqLogin,reqUserInfo } from '@/api'

const state = {
	userTempId: getUUID(),
	code:'',
	token:'',
	userInfo:''
}
const mutations = {
	GETCODE(state,data){
            state.code=data
	},
	GETTOKEN(state,token){
           state.token=token
	},
	GETUSERINFO(state,data){
           state.userInfo=data
	}
}
const actions = {

	async register({commit},userInfo) {
		let result = await reqRegister(userInfo)
		if (result.code === 200) {
			return 'ok'
		} else {
			return Promise.reject('注册失败')
		}
	},

	async getCode({commit},phone){
      let result = await reqRegisterCode(phone)
	  if(result.code===200){
		 commit('GETCODE',result.data)
		 return 'ok'
	  }else{
		  return Promise.reject('获取失败')
	  }
	},

	async login({commit},userInfo){
		const result = await reqLogin(userInfo)
		if(result.code===200){
			commit('GETTOKEN',result.data.token)
			return 'ok'
		}else{
			return Promise.reject('登录失败')
		}
	},
	async getUserInfo({commit}){
         const result= await reqUserInfo()
		 if(result.code===200){
			 commit('GETUSERINFO',result.data)
		 }else{
			 
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