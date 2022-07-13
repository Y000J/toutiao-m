<template>
  <div class="channel-edit">
    <van-cell>
      <van-cell
        title="我的频道"
        :border="false"
        :center="true"
        class="my-channel-title"
      >
        <!-- 我的频道 -->
        <van-button
          slot="default"
          type="default"
          size="mini"
          round
          class="edit-btn"
          @click="isEditActive = !isEditActive"
          >{{ isEditActive ? "完成" : "编辑" }}
        </van-button>
      </van-cell>
      <van-grid class="my-channel" :column-num="4" :gutter="12" :border="false">
        <van-grid-item
          class="my-channel-item"
          v-for="(item, index) in channelList"
          :key="item.id"
          @click="channelBtn(index, item)"
        >
          <div slot="text" class="my-channel-text">
            <van-icon name="clear" class="del-icon" v-if="isEditActive" />
            {{ item.name }}
          </div>
        </van-grid-item>
      </van-grid>

      <van-cell
        title="推荐频道"
        :border="false"
        :center="true"
        class="my-channel-title"
      ></van-cell>
      <!-- 推荐频道列表 -->
      <van-grid class="my-channel" :column-num="4" :gutter="12" :border="false">
        <van-grid-item
          class="my-channel-item"
          v-for="item in recommendChannels"
          :key="item.id"
          @click="addChannel(item)"
        >
          <div slot="text" class="my-channel-text">
            <van-icon slot="icon" name="plus" />
            {{ item.name }}
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell>
  </div>
</template>

<script>
import {
  addChannelAPI,
  deleteAssignChannelAPI,
  getUserAllChannelAPI,
} from "@/api";
import { setItem } from "@/utils/storage";
export default {
  name: "ChannelEdit",
  props: {
    channelList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      allChannels: [], //全部频道列表
      isEditActive: false, //控制编辑状态
    };
  },
  created() {
    this.getALLChannel();
  },
  methods: {
    // 获取全部频道列表
    async getALLChannel() {
      try {
        const { data } = await getUserAllChannelAPI();
        this.allChannels = data.data.channels;
      } catch (err) {
        if (err.response.status === 507) {
          this.$toast("数据库错误", err.message);
        } else {
          this.$toast("请稍后再试", err.message);
        }
      }
    },

    // 点击跳转到对应的频道  或者删除操作

    channelBtn(index, channel) {
      if (this.isEditActive) {
        if (channel.name === "推荐") {
          return;
        }
        // 在编辑状态下，删除频道
        this.channelList.splice(index, 1);
        this.deleteChannel(channel);
      } else {
        // 未在编辑状态下，切换操作
        // 将获取到的索引传递给
        this.$emit("channelActive", index);
      }
    },

    // 删除请求
    async deleteChannel(channel) {
      console.log();
      try {
        // 已登录  数据存储到线上
        await deleteAssignChannelAPI(channel.id);
        // 未登录  数据存储到本地
        setItem("channels", this.userChan);
      } catch (err) {
        this.$toast("删除频道失败，请稍后重试");
      }
    },
    // 添加频道
    async addChannel(channel) {
      console.log(channel.id);
      try {
        this.channelList.push(channel);
        await addChannelAPI({
          target: channel.id, // 频道 id
          Body: {
            seq: this.channelList.length, // 频道的 序号
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
  },

  computed: {
    // 筛选推荐频道
    recommendChannels() {
      return this.allChannels.filter((item) => {
        return (
          this.channelList.findIndex((element) => {
            return element.id === item.id;
          }) === -1
        );
      });
    },
  },
};
</script>

<style scoped lang='less'>
.channel-edit {
  padding-top: 80px;
  .van-cell {
    padding: 22px;
    color: #333333;
    font-size: 32px;
    align-items: center;
    .my-channel-title {
      .van-cell__value {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .edit-btn {
          width: 105px;
          height: 48px;
          font-size: 26px;
          color: #f86363;
          border-color: #f86363;
        }
      }
    }

    .my-channel {
      .my-channel-item {
        padding: unset !important;
        height: 86px;
        max-width: 160px;
        background-color: #f4f5f6;
        border-radius: 6px;
        margin-right: 10px;
        /deep/.van-grid-item__content {
          background-color: unset;
          .my-channel-text {
            color: #222;
            font-size: 28px;
            white-space: nowrap;
            .del-icon {
              position: absolute;
              top: -5px;
              right: -5px;
              color: red;
            }
          }
        }
      }
    }
  }
}
</style>