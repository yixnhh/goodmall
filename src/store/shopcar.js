import {reqAddOrUpdateShopCart} from '@/api'

const state={
   
}
const mutations={

}
const actions={
async addOrUpdateShopCart({commit},{skuId,skuNum}){
	const result=await reqAddOrUpdateShopCart(skuId,skuNum)
	if(result.code===200){
      return 'ok'
	}
	else{
		return Promise.reject(new Error('failed'))
	}
}
}
const getters={

}
export default {
	state,
	mutations,
	actions,
	getters
}