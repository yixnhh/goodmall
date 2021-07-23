
import ajax from './ajax'
import mockAjax from './mockAjax'
export const reqBaseCategoryList = ()=>ajax.get('/product/getBaseCategoryList')



// 提供今日推荐数据的接口
export const reqBannerList=()=>mockAjax.get('/banner')
// 提供所有楼层数据的接口
export const reqFloorList=()=>mockAjax.get('/floor')

export const reqSearchInfo=(searchParams)=>{
	return ajax({
		url:'/list',
		method:'post',
		data:searchParams
	})
}

export const reqDetailInfo=(skuId)=>{
	return ajax({
		url:`/item/${skuId}`,
		method:'get'
	})
}


export const reqAddOrUpdateShopCart=(skuId,skuNum)=>{
	return ajax({
      url:`/cart/addToCart/${skuId}/${skuNum}`,
			method:'post'
	})
}
export const reqUpdateCartIscheck=(skuId,isChecked)=>{
	return ajax({
		url:`/cart/checkCart/${skuId}/${isChecked}`,
		method:'GET'
	})
}

export const reqDeleteShopCart=(skuId)=>{
	return ajax({
		url:`/cart/deleteCart/${skuId}`,
		method:'delete'
	})
}

export const getGoodsFromCart=()=>{
	return ajax({
		url:'/cart/cartList',
		method:'get'
	})
}