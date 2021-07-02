
import ajax from './ajax'
import mockAjax from './mockAjax'
export const reqBaseCategoryList = ()=>ajax.get('/product/getBaseCategoryList')



// 提供今日推荐数据的接口
export const reqBannerList=()=>mockAjax.get('/banner')
// 提供所有楼层数据的接口
export const reqFloorList=()=>mockAjax.get('/floor')
