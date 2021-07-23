import {reqAddOrUpdateShopCart,reqDeleteShopCart,getGoodsFromCart,reqUpdateCartIscheck } from '@/api'

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
},
  //修改购物车选中
  async updateCartIscheck({commit},{skuId,isChecked}){
    const result = await reqUpdateCartIscheck(skuId,isChecked)
    if(result.code === 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('failed'))
    }
  },
  async updateCartIscheckAll({commit,getters,dispatch},isChecked){
    let promises = []
    // getters.cartInfo.cartInfoList  获取到的就是我们的购物车列表数据
    getters.cartInfo.cartInfoList.forEach(item => {
      if(item.isChecked === isChecked) return   //如果发现其中的每个购物车数据已经和要改变的状态一样，那就不用请求改变了
      //拿一个数据提交给上面修改单个的接口去处理
      //也就是说本质还是通过修改单个的去修改多个的，只是采用了Promise.all一次处理
      let promise = dispatch('updateCartIscheck',{skuId:item.skuId,isChecked})
      promises.push(promise)
    })
    return Promise.all(promises)
  },
}
const getters={
	cartInfo(state){
		return state.cartGoods[0] ||{}
	}

}
export default {
	state,
	mutations,
	actions,
	getters
}