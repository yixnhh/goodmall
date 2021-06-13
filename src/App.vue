<template>
  <div class="outer">
		<Header></Header>
 <router-view></router-view>
<Footer v-show="!$route.meta.isShowFooter"></Footer>
	 </div>
</template>
<script>
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import {reqBaseCategoryList} from "./api/index"
export default {
	components:{
		Header,
		Footer
		},
		async mounted() {
			const result=await reqBaseCategoryList()
			console.log('result',result);
		},
}
</script>
<style>

</style>
