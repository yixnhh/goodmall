<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="$store.state.user.userInfo.nickName">
            <span>{{$store.state.user.userInfo.name}}</span>
            <a href="javascript:;" @click="loginOut" class="register">退出</a>
          </p>
          <p v-else>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/resiger" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to="/" class="logo">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click.prevent="toSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  mounted() {
    this.$bus.$on("clearKeyword", this.clearKeyword);
  },
  methods: {
    toSearch() {
      // this.$router.push({
      //   name: "Search",
      //   query: { msgg: this.msg
      // 	},
      //   params: {
      //     msg: this.msg,
      //   },
      // });
      let { keyword } = this;
      let query = this.$route.query;
      let location = {
        name: "Search",
        params: {
          keyword: keyword ? keyword : undefined,
        },
      };
      // this.$router.push(`search/${this.msg}?1`)
      // keyword?location.params=keyword:""
      query ? (location.query = query) : "";
      if (this.$route.path !== "/") {
        this.$router.replace(location);
      } else {
        this.$router.push(location);
      }
      this.keyword = "";
    },
    clearKeyword() {
      this.keyword = "";
    },
    async loginOut(){
       try {
         await this.$store.dispatch('toLoginOut')
         alert('退出成功')
         this.$router.push('/')
       } catch (error) {
         alert(error)
       }
    }
  },
};
</script>

<style scoped>
.outer .header > .top {
  background-color: #eaeaea;
  height: 30px;
  line-height: 30px;
}
.outer .header > .top .container {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.outer .header > .top .container .loginList {
  float: left;
}
.outer .header > .top .container .loginList p {
  float: left;
  margin-right: 10px;
}
.outer .header > .top .container .loginList p .register {
  border-left: 1px solid #b3aeae;
  padding: 0 5px;
  margin-left: 5px;
}
.outer .header > .top .container .typeList {
  float: right;
}
.outer .header > .top .container .typeList a {
  padding: 0 10px;
}
.outer .header > .top .container .typeList a + a {
  border-left: 1px solid #b3aeae;
}
.outer .header > .bottom {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.outer .header > .bottom .logoArea {
  float: left;
}
.outer .header > .bottom .logoArea .logo img {
  width: 175px;
  margin: 25px 45px;
}
.outer .header > .bottom .searchArea {
  float: right;
  margin-top: 35px;
}
.outer .header > .bottom .searchArea .searchForm {
  overflow: hidden;
}
.outer .header > .bottom .searchArea .searchForm input {
  box-sizing: border-box;
  width: 490px;
  height: 32px;
  padding: 0px 4px;
  border: 2px solid #ea4a36;
  float: left;
}
.outer .header > .bottom .searchArea .searchForm input:focus {
  outline: none;
}
.outer .header > .bottom .searchArea .searchForm button {
  height: 32px;
  width: 68px;
  background-color: #ea4a36;
  border: none;
  color: #fff;
  float: left;
  cursor: pointer;
}
.outer .header > .bottom .searchArea .searchForm button:focus {
  outline: none;
}
</style>
