<template>
	<div>
	<type-nav></type-nav>
	<list-container></list-container>
  <tody-rec></tody-rec>
	<like></like>
	<rank></rank>
	<floor></floor>
	<floor></floor>
	<brand></brand>
	</div>
</template>


<script>
import ListContainer from './ListContainer/ListContainer.vue'
import TodyRec from './TodyRec/TodyRec.vue'
import Brand from './Brand/Brand'
import Floor from './Floor/Floor'
import Like from './Like/Like'
import Rank from './Rank/Rank'
export default {
  components: { ListContainer, TodyRec,Brand,Floor,Like,Rank, Like},
	name: 'Home',
}
</script>

