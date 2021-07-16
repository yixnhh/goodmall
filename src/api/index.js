
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