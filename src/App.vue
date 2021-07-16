<template>
  <div class="outer">
		<Header></Header>
 <router-view></router-view>
<Footer v-show="$route.meta.isShowFooter"></Footer>
	 </div>
</template>
<script>
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
export default {
	components:{
		Header,
		Footer
		},
	 mounted() {
			this.$store.dispatch('getBaseCategoryList')
			
		},
}
</script>
<style>

</style>
