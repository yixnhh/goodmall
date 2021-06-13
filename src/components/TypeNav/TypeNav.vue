<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="yinIt" @mouseenter="showIt">
        <h2 class="all">全部商品分类</h2>
        <div class="sort" v-show="showItem">
          <div class="all-sort-list2" @click="toSearch">
            <div
              class="item"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
            >
              <h3
                :class="{ c: current ===index }"
                @mouseenter="current = index;moveInItem(index)"
              >
                <!-- <a href="javascript:;" @click="pushdata({categoryName:c1.categoryName,category1Id:c1.categoryId})">{{ c1.categoryName }}</a> -->
								<a href="javascript:;" :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dt>
                      <!-- <a href="javascript:;" @click="pushdata({categoryName:c2.categoryName,category2Id:c2.categoryId})">{{ c2.categoryName }}</a> -->
											<a href="javascript:;" :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <!-- <a href="javascript:;" @click="pushdata({categoryName:c3.categoryName,category3Id:c3.categoryId})">{{ c3.categoryName }}</a> -->
												<a href="javascript:;" :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from 'lodash/throttle'

export default {
  name: "TypeNav",
  data() {
    return {
      current: -1,
			showItem:['/'].includes(this.$route.path)
    };
  },
  mounted() {
    this.$store.dispatch("getBaseCategoryList");
  },
	methods:{
   moveInItem:throttle(function(index){
		 this.current=index
		 console.log(index);
	 },200,{'trailing':false}),

	 toSearch(event){
// let query={categoryName}
// category1Id?query.category1Id=category1Id:""
// category2Id?query.category2Id=category2Id:""
// category3Id?query.category3Id=category3Id:""
// 		 this.$router.push({
// 			 name:'Search',
// 			 query
// 		 })
// console.log(event.target.dataset);
const {categoryname,category1id,category2id,category3id}=event.target.dataset
let query={categoryName:categoryname}
category1id?query.category1Id=category1id:""
category2id?query.category2Id=category2id:""
category3id?query.category3Id=category3id:""
this.$router.push({
	name:'Search',
	query
})
		//  console.log(categoryname);
	 },
	 showIt(){
		 if(!['/'].includes(this.$route.path)){
			 this.showItem=true
		 }
	 },
	 yinIt(){
		 this.current = -1
		 	 if(!['/'].includes(this.$route.path)){
			 this.showItem=false
		 }
	 }
	 
	},
  computed: {
    ...mapState({
      categoryList: (state) => state.home.baseCategoryList,
    }),
  },
  mapState,
};
</script>

<style scoped>
.outer .type-nav {
  border-bottom: 2px solid #e1251b;
}
.outer .type-nav .container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  position: relative;
}
.outer .type-nav .container .all {
  width: 210px;
  height: 45px;
  background-color: #e1251b;
  line-height: 45px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
}
.outer .type-nav .container .nav a {
  height: 45px;
  margin: 0 22px;
  line-height: 45px;
  font-size: 16px;
  color: #333;
}
.outer .type-nav .container .sort {
  left: 0;
  top: 45px;
  width: 210px;
  height: 461px;
  position: absolute;
  background: #fafafa;
  z-index: 999;
}
.outer .type-nav .container .sort .all-sort-list2 .item h3 {
  line-height: 30px;
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  padding: 0 20px;
  margin: 0;
}
.outer .type-nav .container .sort .all-sort-list2 .item h3 a {
  color: #333;
}
.outer .type-nav .container .sort .all-sort-list2 .item .item-list {
  display: none;
  position: absolute;
  width: 734px;
  min-height: 460px;
  background: #f7f7f7;
  left: 210px;
  border: 1px solid #ddd;
  top: 0;
  z-index: 9999 !important;
}
.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem {
  float: left;
  width: 650px;
  padding: 0 4px 0 8px;
}
.outer .type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl {
  border-top: 1px solid #eee;
  padding: 6px 0;
  overflow: hidden;
  zoom: 1;
}
.outer
  .type-nav
  .container
  .sort
  .all-sort-list2
  .item
  .item-list
  .subitem
  dl.fore {
  border-top: 0;
}
.outer
  .type-nav
  .container
  .sort
  .all-sort-list2
  .item
  .item-list
  .subitem
  dl
  dt {
  float: left;
  width: 54px;
  line-height: 22px;
  text-align: right;
  padding: 3px 6px 0 0;
  font-weight: 700;
}
.outer
  .type-nav
  .container
  .sort
  .all-sort-list2
  .item
  .item-list
  .subitem
  dl
  dd {
  float: left;
  width: 600px;
  padding: 3px 0 0;
  overflow: hidden;
}
.outer
  .type-nav
  .container
  .sort
  .all-sort-list2
  .item
  .item-list
  .subitem
  dl
  dd
  em {
  float: left;
  height: 14px;
  line-height: 14px;
  padding: 0 8px;
  margin-top: 5px;
  border-left: 1px solid #ccc;
}
.outer .type-nav .container .sort .all-sort-list2 .item:hover .item-list {
  display: block;
}
.c {
  background: #d6837f;
}
</style>
