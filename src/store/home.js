/* 
vuex管理的home模块
*/
import { reqBaseCategoryList,reqBannerList,reqFloorList } from '@/api'

const state = {
	baseCategoryList: [], // 所有分类的数组
	bannerList: [],
	floorList:[]
}

const mutations = {
	/* 
	接收保存分类列表
	*/
	RECEIVE_BASE_CATEGORY_LIST(state, list) {
		state.baseCategoryList = list
	},
	RECEIVE_BANNERS(state, list) {
		state.bannerList = list
	},
	RECEIVE_FLOORLIST(state,list){
		state.floorList=list
	}
}

const actions = {
	/* 
	异步获取商品三级分类列表
	*/
	async getBaseCategoryList({ commit }) {
		const result = await reqBaseCategoryList();
		if (result.code === 200) {
			commit('RECEIVE_BASE_CATEGORY_LIST', result.data)
		}
	},
	async getBannerList({commit}){
		const {data,code}=await reqBannerList()
		if(code===200){
			commit('RECEIVE_BANNERS',data)
		}
	},
	async getFloorList({commit}){
		const result=await reqFloorList()
		if(result.code===200){
			commit('RECEIVE_FLOORLIST',result.data)
		}
	}
}

const getters = {

}

export default {
	state,
	actions,
	mutations,
	getters
}