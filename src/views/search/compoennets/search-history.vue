<template>
  <div class="search-history">
    <van-cell title="搜索历史" class="search-option">
      <span v-if="isDeleteShow" @click="$emit('allDelete',[])">全部删除</span>
      <span v-if="isDeleteShow" @click="isDeleteShow = false">完成</span>
      <van-icon name="delete" v-else @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      v-for="(item, index) in historyItem"
      :key="index"
      :title="item"
      clickable
      @click="deleteBtn(index,item)"
    >
      <van-icon name="close" v-if="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  data() {
    return {
      isDeleteShow: false,
    };
  },
  props: {
    historyItem: {
      type: Array,
      required: true,
    },
  },
  methods: {
    deleteBtn(index,item) {
      // 删除状态
      if (this.isDeleteShow) {
        this.historyItem.splice(index, 1);
      } else {
        this.$emit('onSearchs',item)
      }
    },
  },
  created() {},
};
</script>

<style scpoed lang='less'>
.search-option {
  span {
    margin-right: 10px;
  }
}
</style>