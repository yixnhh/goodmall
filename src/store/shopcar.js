import {reqAddOrUpdateShopCart,reqDeleteShopCart,getGoodsFromCart } from '@/api'

const state={
    cartGoods:[]
}
const mutations={
  RECEIVE_CARTGOODS(state,data){
		state.cartGoods=data
	}
}
const actions={
async addOrUpdateShopCart({},{skuId,skuNum}){
	try{
		const result=await reqAddOrUpdateShopCart(skuId,skuNum)
		if(result.code!==200){
			throw new Error("添加购物车"+result.message)
				//请求成功 添加购物车没有成功
		}
	}catch(e){
		//网络问题进这个catch
		throw new Error('网络异常')
	}
	

},
async deleteShopCart({commit},skuId){
const result=await reqDeleteShopCart(skuId)
if(result.code===200){
	return 'ok'
}else{
	return Promise.reject(new Error('failed'))
}
},
async  reqGoodsFromCart({commit}){
	const result=await getGoodsFromCart()
	if(result.code===200){
		commit('RECEIVE_CARTGOODS',result.data)
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