<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button class="search-btn" slot="title" type="info" round to="search">
        <i slot="icon" class="toutiao toutiao-sousuo"></i>
        搜索</van-button
      >
    </van-nav-bar>
    <!-- 导航栏 -->
    <!-- 标签页 -->
    <van-tabs
      v-model="active"
      class="channel-tab"
      swipeable
      animated
      swipe-threshold="3"
    >
      <!-- 频道列表 -->
      <van-tab
        class="channel-item"
        :title="channel.name"
        v-for="channel in channelList"
        :key="channel.id"
      >
        <div class="container">
          <ArticleList :channel="channel"></ArticleList>
        </div>
      </van-tab>
      <!-- 占位符 -->
      <div class="placeholder" slot="nav-right"></div>
      <!-- 占位符 -->

      <!-- 更多按钮 -->
      <div slot="nav-right" class="nav-list" @click="moreBtn">
        <img src="~@/assets/gradient-gray-line.png" class="border-left" />
        <i class="toutiao toutiao-gengduo"></i>
      </div>
      <!-- 更多按钮 -->
    </van-tabs>
    <!-- 标签页 -->

    <!-- 更多按钮弹出层 -->
    <van-popup
      v-model="isShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      duration="0.2"
      round
      close-icon-position="top-left"
    >
      <!-- 编辑频道模块 -->
      <ChannelEdit :channelList="channelList" @channelActive="getActive" />
      <!-- 编辑频道模块 -->
    </van-popup>
    <!-- 更多按钮弹出层 -->
  </div>
</template>

<script>
import ArticleList from "./components/ArticleList.vue";
import ChannelEdit from "./components/channel-edit.vue";
import { getUserChannelListAPI } from "@/api";
export default {
  components: {
    ArticleList,
    ChannelEdit,
  },
  name: "homeIndex",
  data() {
    return {
      active: 0,
      channelList: "", //频道列表
      isShow: false, //控制更多按钮弹出层
    };
  },
  async created() {
    // 请求用户频道列表
    try {
      const { data } = await getUserChannelListAPI();
      this.channelList = data.data.channels;
    } catch (err) {
      this.$toast("请求失败！" + err);
    }
  },
  methods: {
    moreBtn() {
      // 点击后显示弹出层
      this.isShow = true;
    },
    getActive(index) {
      // 接收频道高亮索引，关闭更多弹窗
      this.active = index;
      this.isShow = false;
    },
  },
};
</script>
<style scoped lang="less">
.home-container {
  padding-top: 176px;
  padding-bottom: 98px;
  .page-nav-bar {
    background-color: #3296fa;
    height: 96px;
    z-index: 3;
    /deep/ .van-nav-bar__title {
      max-width: unset;
    }
    .search-btn {
      width: 555px;
      height: 64px;
      color: #fff;
      font-size: 28px;
      background-color: #5babfb;
      border: none;
      i.toutiao {
        font-size: 32px;
      }
    }
  }
  .channel-tab {
    .channel-item {
      height: 100%;
      // position: fixed;
    }
    /deep/.van-tabs__wrap {
      position: fixed;
      top: 96px;
      left: 0;
      right: 0;
      z-index: 2;
      height: 80px;
      .van-tab {
        border-right: 1px solid #edeff3;
        border-bottom: 1px solid #edeff3;
        min-width: 192px;
        color: #777777;
        font-size: 28px;
      }
      .van-tab--active {
        color: #333333;
      }
      .van-tabs__nav--line {
        padding-bottom: 0;
        padding-right: 0;
        .van-tabs__line {
          bottom: 8px;
        }
      }
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 100%;
    }
    .nav-list {
      display: flex;
      align-items: center;
      text-align: center;
      position: fixed;
      right: 0;
      height: 80px;
      width: 66px;
      border-bottom: 1px solid #edeff3;
      background-color: #fff;
      box-sizing: border-box;
      opacity: 0.92;
      i.toutiao {
        flex: 1;
        font-size: 40px;
      }
      .border-left {
        height: 100%;
      }
    }
  }
  /deep/.van-popup__close-icon {
    color: #222222;
  }
}
</style>