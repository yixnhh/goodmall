
import ajax from './ajax'

export const reqBaseCategoryList = ()=>ajax.get('/product/getBaseCategoryList')
export const reqBanners=()=>ajax.get('/cms/banner')