<template>
  <div>
    <!-- 标签页入口 -->
    <router-view></router-view>
    <!-- nav-bar -->
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item to="/home" replace active>
        <i slot="icon" class="toutiao toutiao-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/askQuestion" replace>
        <i slot="icon" class="toutiao toutiao-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video" replace>
        <i slot="icon" class="toutiao toutiao-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my" replace>
        <i slot="icon" class="toutiao toutiao-wode"></i>
        <span class="text">我的</span>
      </van-tabbar-item>
    </van-tabbar>
    <!-- nav-bar -->
  </div>
</template>

<script>
export default {
  name: "nav-bar",
};
</script>

<style scoped lang='less'>
.layout-tabbar {
  i.toutiao {
    font-size: 40px;
  }
  span.text {
    font-size: 20px;
  }
}
</style>