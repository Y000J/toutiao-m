<template>
  <div class="user-gender">
    <!-- 性别选择 -->
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      :default-index="2"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import { editUserDataAPI } from "@/api";
export default {
  name: "UserGender",
  data() {
    return {
      columns: ["男", "女"],
    };
  },
  model: {
    prop: "genderShow",
    event: "cancelShow",
  },
  props: {
    genderShow: {
      type: Boolean,
      required: true,
    },
    user: {
      type: [Object, String, Array],
      required: true,
    },
  },
  methods: {
    async onConfirm(value, index) {
      try {
        const { data } = await editUserDataAPI({
          gender: index,
        });
        this.user.gender = data.data.gender;
      } catch (err) {
        this.$toast.fail("设置失败！");
      }
      this.$toast("设置成功！");
      this.$emit("cancelShow", false);
    },
    onCancel() {
      this.$emit("cancelShow", false);
    },
  },
};
</script>

<style>
</style>