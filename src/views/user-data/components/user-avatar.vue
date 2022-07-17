<template>
  <div class="user-avatar">
    <img :src="img" ref="img" />
    <div class="toobar">
      <div class="cancel" @click="$emit('colse')">取消</div>
      <div class="confirm" @click="onCropper">确定</div>
    </div>
  </div>
</template>

<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { editUserPhotoAPI } from "@/api";
export default {
  name: "UserAvatar",
  props: {
    img: {
      type: [Object, String],
      required: true,
    },
    user: {
      trpe: [Object],
      required: true,
    },
  },
  data() {
    return {
      cropper: null,
    };
  },

  mounted() {
    const image = this.$refs.img;
    this.cropper = new Cropper(image, {
      //裁剪框能否超出图片
      viewMode: 1,
      //能够拖动图片
      dragMode: "move",
      //裁剪比例
      aspectRatio: 1,
      //自动截取区域
      autoCropArea: 1,
      //裁剪框能否移动
      cropBoxMovable: false,
      //裁剪框能否缩放
      cropBoxResizable: false,
      //背景色
      background: false,
    });
  },
  methods: {
    onCropper() {
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("photo", blob);
        try {
          const { data } = await editUserPhotoAPI(formData);
          //   关闭弹出层
          this.$emit("colse");
          //   更新视图
          this.user.photo = data.data.photo;
        } catch (err) {
          console.log(err);
        }
      });
    },
  },
};
</script>

<style scoped lang='less'>
.user-avatar {
  height: 100%;
  background-color: #000;
  padding-bottom: 90px;
  img {
    display: block;
    max-width: 100%;
  }
  .toobar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    .confirm,
    .cancel {
      height: 90px;
      width: 120px;
      font-size: 30px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      color: #fff;
    }
  }
}
</style>