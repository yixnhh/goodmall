
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

//用户注册
export const reqRegister = (userInfo) => ajax.post('/user/passport/register',userInfo)

//获取验证码
export const reqRegisterCode=(phone)=>{
	return ajax({
		url:`/user/passport/sendCode/${phone}`,
		method:'get'
	})
}

//登录
export const reqLogin=(userInfo)=>ajax.post('/user/passport/login',userInfo)

//获取当前用户信息
export const reqUserInfo=()=>ajax.get('/user/passport/auth/getUserInfo')

//退出登录
export const loginOut=()=>ajax.get('/user/passport/logout')

//获取用户地址
export const reqUserAddressList=()=>{
	return ajax({
		url:'/user/userAddress/auth/findUserAddressList',
		method:'get'
	})
}

//获取订单交易页面信息
export const reqTradeInfo=()=>ajax.get('/order/auth/trade')

//请求提交创建订单
export const reqSubmitOrder = (tradeNo,tradeInfo)=>{
	return ajax({
		url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
		method:'post',
		data:tradeInfo
	})
}

//请求获取支付信息
export const reqPayInfo=(orderId)=>{
	return ajax({
		url:`/payment/weixin/createNative/${orderId}`,
		method:'get'
	})
}

//查询订单支付状态
export const reqPayStatus=(orderId)=>{
	return ajax({
		url:`/payment/weixin/queryPayStatus/${orderId}`,
		method:'get'
	})
}

//获取我的订单
export const reqMyOrder=(page,limit)=>ajax.get(`/order/auth/${page}/${limit}`)