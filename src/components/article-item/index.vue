<template>
  <div>
    <van-cell
      class="artcle-item"
      v-for="(item, index) in list"
      :key="index"
      :to="{
        name: 'article',
        params: {
          articleId: item.art_id,
        },
      }"
    >
      <div slot="title" class="title">{{ item.title }}</div>
      <div slot="label">
        <!-- 三张封面 -->
        <div class="cover-img" v-if="item.cover.type === 3">
          <div
            class="cover-item"
            v-for="(img, index) in item.cover.images"
            :key="index"
          >
            <van-image class="cover-item-img" fit="cover" :src="img" />
          </div>
        </div>
        <!-- 文字 -->
        <div class="btm-text">
          <span>{{ item.aut_name }}</span>
          <span>{{ item.comm_count }} 评论</span>
          <span>{{ item.pubdate | relativeTime }}</span>
        </div>
      </div>
      <!-- 一张封面 -->
      <van-image
        class="cover-right"
        v-if="item.cover.type === 1"
        slot="default"
        fit="cover"
        :src="item.cover.images[0]"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "articleItem",
  props: {
    list: {
      type: [Array, Object],
      required: true,
    },
  },
};
</script>

<style scoped lang='less'>
.artcle-item {
  display: flex;
  .title {
    font-size: 32px;
    color: #3a3a3a;
    font-family: ArialMT;
    letter-spacing: 2px;
  }
  .cover-img {
    display: flex;
    margin-top: 29px;
    margin-bottom: 29px;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        height: 146px;
        width: 100%;
      }
    }
  }
  .cover-right {
    width: 232px;
    height: 146px;
  }
  .van-cell__value {
    width: 232px;
    height: 146px;
    flex: unset;
    margin-left: 15px;
  }
  .btm-text span {
    margin-right: 25px;
  }
}
</style>