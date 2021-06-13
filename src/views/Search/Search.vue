<template>
	<div>
		search
		{{$route.params.msg}}
		{{$route.query.msgg}}
		{{key1}}
		{{key2}}
		{{key3}}
		{{key4}}
		{{key5}}
		{{key6}}
		<type-nav></type-nav>
		<Footer></Footer>
	</div>
</template>

<script>
import Footer from '@/components/Footer/Footer.vue'
export default  {
	props:['key1','key2','key3','key4','key5','key6'],
	name: 'Search',
	components:{
		Footer
	}
}
</script>

<style scoped>

</style>
