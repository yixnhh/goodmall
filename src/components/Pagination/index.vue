<template>
  <div class="pagination">
    <button
      :disabled="currentPageNum === 1"
      @click="$emit('changeNum', currentPageNum - 1)"
    >
      上一页
    </button>
    <button v-if="startEnd.start !== 1" @click="$emit('changeNum', 1)">
      1
    </button>
    <button v-if="startEnd.start > 2">···</button>

    <!-- vfor和vif两个指令可以混用
    如果他们混用了，vfor的优先级比vif高
    -->
    <button
      :class="{ active: currentPageNum === page }"
      v-for="page in startEnd.end"
      :key="page"
      v-if="page >= startEnd.start"
      @click="$emit('changeNum', page)"
    >
      {{ page }}
    </button>

    <button v-if="startEnd.end < totalPageNum - 1">···</button>
    <button
      v-if="startEnd.end !== totalPageNum"
      @click="$emit('changeNum', totalPageNum)"
    >
      {{ totalPageNum }}
    </button>
    <button
      :disabled="currentPageNum === totalPageNum"
      @click="$emit('changeNum', currentPageNum + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
    <span>跳至</span>
    <input type="text" v-model="page" @keyup.enter="changePage" />
    <span>页</span>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
      page: null,
    };
  },
  props: {
    currentPageNum: Number,
    pageSize: Number,
    total: {
      type: Number,
      default: 0,
    },
    continueNum: {
      type: Number,
      required: true,
    },
  },
  methods: {
    changePage() {
      if(parseInt(this.page)>=1&&parseInt(this.page)<=this.totalPageNum){
      this.$emit("changeNum", parseInt(this.page));
      }else{
         this.$message.warning("请输入正确页码");
      }
      this.page = "";
    },
  },
  computed: {
    totalPageNum() {
      return Math.ceil(this.total / this.pageSize);
    },
    startEnd() {
      let { currentPageNum, continueNum, totalPageNum } = this;
      let start, end, disNum;
      if (totalPageNum <= continueNum) {
        //如果我计算出来的总页数比连续页数小
        start = 1;
        end = totalPageNum;
      } else {
        //计算起始位置和结束位置，除去左右两端,下面两行是没问题的，但是左右两端有问题
        start = currentPageNum - Math.floor(continueNum / 2);
        end = currentPageNum + Math.floor(continueNum / 2);
        //修正左右两端的情况
        if (start < 1) {
          disNum = 1 - start;
          start += disNum;
          end += disNum;
        }
        if (end > totalPageNum) {
          disNum = end - totalPageNum;
          start -= disNum;
          end -= disNum;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button,
  input {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;
    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }
    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
  input {
    width: 70px;
  }
  span {
    margin: 0 20px;
    display: inline-block;
    height: 28px;
    line-height: 28px;
  }
}
</style>